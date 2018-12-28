import { Book, GetBookPageAction, PagedBooksReceivedAction } from './types';

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

function booksReturned(books: Book[], page: number, pageCount: number): PagedBooksReceivedAction {
  return {
    type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
    payload: {
      books,
      pageCount
    }
  };
}

export default {
  getBookPage,
  booksReturned
};
