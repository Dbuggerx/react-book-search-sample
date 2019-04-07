/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  RenderResult
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';
import Home from './index';
import { State } from '../../redux/store';

const mockStore = configureStore([]);

function getDateForDaysAgo(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
}

const bookMock = {
  author: { avatar: 'http://lorempixel.com/250/250/', name: 'Author name' },
  cover: 'http://lorempixel.com/500/700/',
  description: 'Book description',
  genre: { category: 'Non-Fiction', name: 'History' },
  id: '123',
  introduction:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus pretium ante, eu condimentum nulla pretium nec. Nunc lacus ligula, tincidunt eu diam non, varius viverra tortor. Sed interdum arcu id molestie cursus. Sed vel pharetra enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas vitae nisl faucibus, auctor tortor nec, finibus nunc. Maecenas vel orci facilisis, consectetur libero nec, faucibus purus. Vivamus sed sapien in dui tempor lacinia. Vestibulum at tempus ligula. Nam at sem sed velit venenatis tempor.Integer pretium quam et venenatis pellentesque. Vivamus non congue risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque purus nisi, facilisis et imperdiet et, consectetur nec sapien. Fusce lobortis non felis eu volutpat. Aliquam eget dapibus eros, in ultricies dui. Etiam quis ante a tortor fermentum eleifend ac nec elit.Curabitur ultrices accumsan purus, at sagittis dolor. Etiam eleifend scelerisque mi eu dapibus. Cras ut turpis vestibulum, varius nisl vel, sodales ante. Quisque vulputate dignissim felis. Pellentesque sagittis ultricies erat at dictum. Nam augue metus, efficitur id feugiat eu, lobortis scelerisque turpis. Donec maximus, dolor quis lacinia iaculis, lacus libero condimentum tortor, id porttitor quam tortor nec massa. Ut dignissim nibh ante, id suscipit turpis blandit in. Nam mauris dolor, eleifend nec consequat placerat, tempor in neque. Nulla semper, arcu nec ultrices mattis, nibh mauris ornare mauris, eu tristique nibh neque sit amet justo. Praesent sollicitudin in tortor ac iaculis. Nunc non eros urna.Donec at tempus augue. Sed nec efficitur arcu. Nam eu aliquet felis, vitae feugiat mauris. Integer eget quam nec ligula venenatis aliquet. Cras aliquam odio quis orci elementum, vitae interdum dui efficitur. Vivamus sed nisi lorem. Mauris varius, augue at pellentesque laoreet, turpis metus viverra urna, id vulputate erat lacus a diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras vitae blandit arcu. Proin rutrum ante nisi, et porttitor lectus egestas at. Donec sit amet pharetra neque. Interdum et malesuada fames ac ante ipsum primis in faucibus.Sed feugiat metus arcu, quis porttitor mauris cursus et. In eget interdum justo, nec commodo dui. In hac habitasse platea dictumst. Quisque eget ipsum non lectus mattis efficitur non et est. Suspendisse vehicula massa venenatis sodales commodo. Donec commodo pellentesque felis, a bibendum turpis mattis ut. Cras volutpat quam vitae cursus elementum.',
  likes: 816,
  name: 'Book Name',
  published: getDateForDaysAgo(30).toISOString()
};

describe('Home route', () => {
  let store;
  let wrapper: RenderResult;

  beforeEach(() => {
    store = mockStore({
      home: {
        loading: false,
        books: [bookMock],
        currentPage: 3,
        pageCount: 6,
        category: 'test categ',
        genre: 'test genre',
        query: 'test query',
        error: null
      }
    } as State);

    wrapper = render(
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
  });

  afterEach(cleanup);

  describe('Pagination', () => {
    test('dispatches GET_BOOK_PAGE on "next page button" click', () => {
      fireEvent.click(wrapper.getByTestId('goto-next-page'));

      expect(store.getActions()).toEqual([
        {
          payload: {
            category: 'test categ',
            genre: 'test genre',
            page: 4,
            query: 'test query'
          },
          type: 'react-book-search/books/GET_BOOK_PAGE'
        }
      ]);
    });

    test('dispatches GET_BOOK_PAGE on "prev page button" click', () => {
      fireEvent.click(wrapper.getByTestId('goto-prev-page'));

      expect(store.getActions()).toEqual([
        {
          payload: {
            category: 'test categ',
            genre: 'test genre',
            page: 2,
            query: 'test query'
          },
          type: 'react-book-search/books/GET_BOOK_PAGE'
        }
      ]);
    });
  });

  describe('Search', () => {
    test('dispatches GET_BOOK_PAGE with search params on "search button" click', () => {
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

      expect(store.getActions()).toEqual([
        {
          payload: {
            category: 'aaa',
            genre: 'bbb',
            page: 1,
            query: 'ccc'
          },
          type: 'react-book-search/books/GET_BOOK_PAGE'
        }
      ]);
    });
  });

  describe('Books', () => {
    test('shows details on card click', () => {
      fireEvent.click(wrapper.container.querySelector('.book-card__image'));
      expect(wrapper.container.textContent).toEqual('book 123 details');
    });

    test('dispatches LIKE_BOOK on "like button" click', () => {
      fireEvent.click(wrapper.getByTestId('like-button'));
      expect(store.getActions()).toEqual([
        {
          payload: {
            bookId: '123',
            liked: true
          },
          type: 'react-book-search/books/LIKE_BOOK'
        }
      ]);
    });
  });
});
