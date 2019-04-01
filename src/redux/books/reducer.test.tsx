import reducer from './reducer';

describe('books reducer', () => {
  test('returns the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      books: [],
      currentPage: 0,
      pageCount: 0
    });
  });

  test('handles "GET_BOOK_PAGE"', () => {
    expect(
      reducer(
        // @ts-ignore
        { previousState: 'prev' },
        {
          type: 'react-book-search/books/GET_BOOK_PAGE',
          payload: {
            page: 10,
            category: 'test categ',
            genre: 'test genre',
            query: 'test query'
          }
        }
      )
    ).toEqual({
      loading: true,
      currentPage: 10,
      category: 'test categ',
      genre: 'test genre',
      previousState: 'prev',
      query: 'test query'
    });
  });

  test('handles "PAGED_BOOKS_RECEIVED"', () => {
    expect(
      reducer(
        // @ts-ignore
        { previousState: [1, 2, 3] },
        {
          type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
          payload: {
            books: [
              {
                id: 123,
                description: 'test'
              },
              {
                id: 456,
                description: 'test2'
              }
            ],
            pageCount: 5
          }
        }
      )
    ).toEqual({
      loading: false,
      books: [
        {
          id: 123,
          description: 'test'
        },
        {
          id: 456,
          description: 'test2'
        }
      ],
      pageCount: 5,
      previousState: [1, 2, 3]
    });
  });

  test('handles "LIKE_BOOK"', () => {
    expect(
      reducer(
        // @ts-ignore
        { previousState: [1, 2, 3] },
        {
          type: 'react-book-search/books/LIKE_BOOK',
          payload: {
            bookId: '123',
            liked: true
          }
        }
      )
    ).toEqual({
      loading: true,
      previousState: [1, 2, 3]
    });
  });

  test('handles "BOOK_REFRESHED"', () => {
    expect(
      reducer(
        {
          books: [
            // @ts-ignore
            {
              id: '111',
              description: '11'
            },
            // @ts-ignore
            {
              id: '123',
              description: 'aaa'
            },
            // @ts-ignore
            {
              id: '222',
              description: '22'
            }
          ]
        },
        {
          type: 'react-book-search/books/BOOK_REFRESHED',
          payload: {
            book: {
              id: '123',
              description: 'test'
            }
          }
        }
      )
    ).toEqual({
      loading: false,
      books: [
        {
          id: '111',
          description: '11'
        },
        {
          id: '123',
          description: 'test'
        },
        {
          id: '222',
          description: '22'
        }
      ]
    });
  });

  test('handles "SERVER_ERROR"', () => {
    expect(
      reducer(
        // @ts-ignore
        { prevState: 'test' },
        {
          type: 'react-book-search/books/SERVER_ERROR',
          payload: {
            error: 'test msg'
          }
        }
      )
    ).toEqual({
      loading: false,
      error: 'test msg',
      prevState: 'test'
    });
  });
});

export default undefined;
