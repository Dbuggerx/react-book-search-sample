/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { of, empty } from 'rxjs';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Home, { routeModule } from './index';
import { State } from '../../redux/store';

function getDateForDaysAgo(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
}

const bookMock = {
  author: {
    avatar: 'http://lorempixel.com/250/250/',
    name: 'Author name'
  },
  cover: 'http://lorempixel.com/500/700/',
  description: 'Book description',
  genre: { category: 'Non-Fiction', name: 'History' },
  id: '123',
  introduction: 'intro',
  likes: 1,
  name: 'Book Name',
  published: getDateForDaysAgo(30).toISOString()
};
const bookMock2 = {
  author: {
    avatar: 'http://lorempixel.com/111/111/',
    name: 'Author name2'
  },
  cover: 'http://lorempixel.com/222/222/',
  description: 'Book description2',
  genre: { category: 'Non-Fiction2', name: 'History2' },
  id: '456',
  introduction: 'into2',
  likes: 1,
  name: 'Book Name2',
  published: getDateForDaysAgo(60).toISOString()
};
const categoriesMock = [{ id: 1, label: 'Fiction' }, { id: 2, label: 'Non-Fiction' }];

function setupStore(ajaxMock, initialState) {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { ajax: ajaxMock }
  });

  const dispatchSpy = jest.fn();
  const reducerSpy = (state, action) => {
    dispatchSpy(action);
    return {};
  };

  const store = createStore(
    combineReducers({
      [routeModule.routeName]: routeModule.reducer,
      reducerSpy
    }),
    initialState,
    applyMiddleware(epicMiddleware)
  );
  epicMiddleware.run(routeModule.epic);

  dispatchSpy.mockClear();

  return { store, ajaxMock, dispatchSpy };
}

function getMockedStore(ajaxMock) {
  return setupStore(ajaxMock, {
    home: {
      bookResults: {
        loading: false,
        books: [bookMock],
        currentPage: 3,
        pageCount: 6,
        category: 'test categ',
        genre: 'test genre',
        query: 'test query',
        error: null
      },
      searchParams: {
        categories: {
          loading: false,
          results: []
        }
      }
    }
  } as State);
}

function renderHomeWithStore(store) {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <Route path="/" exact component={Home} />
        <Route
          path="/book/:bookId"
          exact
          render={({ match }) => `book ${match.params.bookId} details`}
        />
      </Provider>
    </MemoryRouter>
  );
}

describe('Home route', () => {
  let store;
  let dispatchSpy;
  let wrapper: RenderResult;
  let ajaxMock: jest.Mock;

  afterEach(() => {
    cleanup();
    if (ajaxMock.mockReset) ajaxMock.mockReset();
  });

  describe('Pagination', () => {
    beforeEach(() => {
      ajaxMock = jest.fn().mockImplementation(req =>
        (req.url.includes('books')
          ? of({
            response: [bookMock2],
            xhr: {
              getResponseHeader: jest
                .fn()
                .mockImplementation(header => (header === 'x-total-count' ? 123 : null))
            }
          })
          : of({
            response: categoriesMock
          }))
      );
      ({ store, dispatchSpy } = getMockedStore(ajaxMock));
      wrapper = renderHomeWithStore(store);
    });

    test('dispatches [GET_BOOK_PAGE, PAGED_BOOKS_RECEIVED] on "next page button" click', done => {
      expect(wrapper.getByTestId('current-page')).toHaveTextContent(
        'Showing page 3 of 6'
      );
      fireEvent.click(wrapper.getByTestId('goto-next-page'));

      setTimeout(() => {
        expect(wrapper.getByTestId('current-page')).toHaveTextContent(
          'Showing page 4 of 123'
        );
        expect(dispatchSpy.mock.calls).toEqual([
          [
            {
              type: 'react-book-search/searchParams/GET_CATEGORIES'
            }
          ],
          [
            {
              type: 'react-book-search/searchParams/CATEGORIES_RECEIVED',
              payload: categoriesMock
            }
          ],
          [
            {
              payload: {
                category: 'test categ',
                genre: 'test genre',
                page: 4,
                query: 'test query'
              },
              type: 'react-book-search/books/GET_BOOK_PAGE'
            }
          ],
          [
            {
              payload: {
                books: [bookMock2],
                pageCount: 123
              },
              type: 'react-book-search/books/PAGED_BOOKS_RECEIVED'
            }
          ]
        ]);

        expect(ajaxMock).toHaveBeenCalledTimes(2);
        expect(ajaxMock.mock.calls[0][0].url).toEqual(
          expect.stringMatching(/\/api\/searchCategories$/)
        );

        expect(ajaxMock).toHaveBeenCalledTimes(2);
        expect(ajaxMock.mock.calls[1][0].url).toEqual(
          expect.stringMatching(
            /\/api\/books\?page=4&category=test categ&genre=test genre&query=test query$/
          )
        );
        done();
      }, 510);
    });

    test('dispatches [GET_BOOK_PAGE, PAGED_BOOKS_RECEIVED] on "prev page button" click', done => {
      expect(wrapper.getByTestId('current-page')).toHaveTextContent(
        'Showing page 3 of 6'
      );

      fireEvent.click(wrapper.getByTestId('goto-prev-page'));

      setTimeout(() => {
        expect(wrapper.getByTestId('current-page')).toHaveTextContent(
          'Showing page 2 of 123'
        );

        expect(dispatchSpy.mock.calls).toEqual([
          [
            {
              type: 'react-book-search/searchParams/GET_CATEGORIES'
            }
          ],
          [
            {
              type: 'react-book-search/searchParams/CATEGORIES_RECEIVED',
              payload: categoriesMock
            }
          ],
          [
            {
              payload: {
                category: 'test categ',
                genre: 'test genre',
                page: 2,
                query: 'test query'
              },
              type: 'react-book-search/books/GET_BOOK_PAGE'
            }
          ],
          [
            {
              payload: {
                books: [bookMock2],
                pageCount: 123
              },
              type: 'react-book-search/books/PAGED_BOOKS_RECEIVED'
            }
          ]
        ]);

        expect(ajaxMock).toHaveBeenCalledTimes(2);

        expect(ajaxMock).toHaveBeenCalledTimes(2);
        expect(ajaxMock.mock.calls[0][0].url).toEqual(
          expect.stringMatching(/\/api\/searchCategories$/)
        );

        expect(ajaxMock.mock.calls[1][0].url).toEqual(
          expect.stringMatching(
            /\/api\/books\?page=2&category=test categ&genre=test genre&query=test query$/
          )
        );
        done();
      }, 510);
    });
  });

  describe('Search', () => {
    beforeEach(() => {
      ajaxMock = jest.fn().mockImplementation(req =>
        (req.url.includes('books')
          ? of({
            response: [bookMock2],
            xhr: {
              getResponseHeader: jest
                .fn()
                .mockImplementation(header => (header === 'x-total-count' ? 10 : null))
            }
          })
          : of({
            response: categoriesMock
          }))
      );
      ({ store, dispatchSpy } = getMockedStore(ajaxMock));
      wrapper = renderHomeWithStore(store);
    });

    test('dispatches [GET_BOOK_PAGE, PAGED_BOOKS_RECEIVED] with search params on "search button" click', done => {
      expect(wrapper.getByTestId('current-category')).toHaveTextContent('');
      expect(wrapper.getByTestId('current-genre')).toHaveTextContent('');
      expect(wrapper.getByTestId('current-query')).toHaveTextContent('');

      fireEvent.change(wrapper.getByTestId('categ-input'), {
        target: { value: 'aaa' }
      });
      fireEvent.change(wrapper.getByTestId('genre-input'), {
        target: { value: 'bbb' }
      });
      fireEvent.change(wrapper.getByTestId('query-input'), {
        target: { value: 'ccc' }
      });
      fireEvent.click(wrapper.getByTestId('search-button'));

      setTimeout(() => {
        expect(wrapper.getByTestId('current-category')).toHaveTextContent('aaa');
        expect(wrapper.getByTestId('current-genre')).toHaveTextContent('bbb');
        expect(wrapper.getByTestId('current-query')).toHaveTextContent('ccc');

        expect(dispatchSpy.mock.calls).toEqual([
          [
            {
              type: 'react-book-search/searchParams/GET_CATEGORIES'
            }
          ],
          [
            {
              type: 'react-book-search/searchParams/CATEGORIES_RECEIVED',
              payload: categoriesMock
            }
          ],
          [
            {
              payload: {
                category: 'aaa',
                genre: 'bbb',
                page: 1,
                query: 'ccc'
              },
              type: 'react-book-search/books/GET_BOOK_PAGE'
            }
          ],
          [
            {
              payload: {
                books: [bookMock2],
                pageCount: 10
              },
              type: 'react-book-search/books/PAGED_BOOKS_RECEIVED'
            }
          ]
        ]);

        expect(ajaxMock).toHaveBeenCalledTimes(2);
        expect(ajaxMock.mock.calls[0][0].url).toEqual(
          expect.stringMatching(/\/api\/searchCategories$/)
        );
        expect(ajaxMock.mock.calls[1][0].url).toEqual(
          expect.stringMatching(/\/api\/books\?page=1&category=aaa&genre=bbb&query=ccc$/)
        );
        done();
      }, 510);
    });
  });

  describe('Books', () => {
    test('shows details on card click', () => {
      ({ store, dispatchSpy } = getMockedStore(jest.fn().mockReturnValue(empty())));
      wrapper = renderHomeWithStore(store);

      fireEvent.click(wrapper.container.querySelector('.book-card'));
      expect(wrapper.container.textContent).toEqual('book 123 details');
    });

    test('dispatches [LIKE_BOOK, BOOK_REFRESHED] on "like button" click', done => {
      const updatedBook = {
        ...bookMock,
        likes: 2
      };

      const ajaxMockObj = () =>
        of({
          response: categoriesMock
        });
      ajaxMockObj.patch = jest.fn().mockReturnValue(
        of({
          response: updatedBook
        })
      );

      ({ store, dispatchSpy } = getMockedStore(ajaxMockObj));
      wrapper = renderHomeWithStore(store);

      expect(wrapper.getByTestId('like-button')).toHaveTextContent('1 like');

      // Act
      fireEvent.click(wrapper.getByTestId('like-button'));

      // Assert
      setTimeout(() => {
        expect(wrapper.getByTestId('like-button')).toHaveTextContent('2 likes');

        expect(dispatchSpy.mock.calls).toEqual([
          [
            {
              type: 'react-book-search/searchParams/GET_CATEGORIES'
            }
          ],
          [
            {
              type: 'react-book-search/searchParams/CATEGORIES_RECEIVED',
              payload: categoriesMock
            }
          ],
          [
            {
              payload: {
                bookId: '123',
                liked: true
              },
              type: 'react-book-search/books/LIKE_BOOK'
            }
          ],
          [
            {
              payload: {
                book: updatedBook
              },
              type: 'react-book-search/books/BOOK_REFRESHED'
            }
          ]
        ]);

        expect(ajaxMockObj.patch).toHaveBeenCalledTimes(1);
        expect(ajaxMockObj.patch.mock.calls[0][0]).toEqual(
          expect.stringMatching(/\/api\/books\/123$/)
        );
        expect(ajaxMockObj.patch.mock.calls[0][1]).toEqual({
          liked: true
        });
        expect(ajaxMockObj.patch.mock.calls[0][2]).toEqual({
          'Content-Type': 'application/json'
        });

        done();
      }, 510);
    });
  });
});
