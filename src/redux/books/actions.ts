import {
  Book,
  GetBookPageAction,
  PagedBooksReceivedAction,
  LikeBookAction,
  BookRefreshedAction,
  BookServerErrorAction
} from './types';

function getBookPage(
  page: number,
  category?: string,
  genre?: string,
  query?: string
): GetBookPageAction {
  return {
    type: 'react-book-search/books/GET_BOOK_PAGE',
    payload: {
      page,
      category,
      genre,
      query
    }
  };
}

function booksReturned(
  books: Book[],
  page: number,
  pageCount: number
): PagedBooksReceivedAction {
  return {
    type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
    payload: {
      books,
      pageCount
    }
  };
}

function likeBook(bookId: string, liked: boolean): LikeBookAction {
  return {
    type: 'react-book-search/books/LIKE_BOOK',
    payload: {
      bookId,
      liked
    }
  };
}

function bookRefreshed(book: Book): BookRefreshedAction {
  return {
    type: 'react-book-search/books/BOOK_REFRESHED',
    payload: {
      book
    }
  };
}

function serverError(err: Error): BookServerErrorAction {
  return {
    type: 'react-book-search/books/SERVER_ERROR',
    payload: {
      error: err.message
    }
  };
}

export default {
  getBookPage,
  booksReturned,
  likeBook,
  bookRefreshed,
  serverError
};
