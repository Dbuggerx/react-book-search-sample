import { Action, State } from './types';

const initialState: State = {
  loading: false,
  books: [],
  currentPage: 0,
  pageCount: 0
};

export default function booksReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'react-book-search/books/GET_BOOK_PAGE':
      return {
        ...state,
        loading: true,
        currentPage: action.payload.page,
        category: action.payload.category,
        genre: action.payload.genre,
        query: action.payload.query
      };
    case 'react-book-search/books/PAGED_BOOKS_RECEIVED':
      return {
        ...state,
        loading: false,
        books: action.payload.books,
        pageCount: action.payload.pageCount
      };
    case 'react-book-search/books/LIKE_BOOK':
      return {
        ...state,
        loading: true
      };
    case 'react-book-search/books/BOOK_REFRESHED':
      return {
        ...state,
        loading: false,
        books: state.books.map(book => (
          book.id === action.payload.book.id ? action.payload.book : book
        ))
      };
    case 'react-book-search/books/SERVER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
