import { Book } from './types';

export function getBookPage(page: number, category?: string, genre?: string, query?: string) {
  return {
    type: 'react-book-search/books/GET_BOOK_PAGE',
    payload: {
      page,
      category,
      genre,
      query
    }
  } as const;
}

export function booksReceived(books: Book[], pageCount: number) {
  return {
    type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
    payload: {
      books,
      pageCount
    }
  } as const;
}

export function likeBook(bookId: string, liked: boolean) {
  return {
    type: 'react-book-search/books/LIKE_BOOK',
    payload: {
      bookId,
      liked
    }
  } as const;
}

export function bookRefreshed(book: Book) {
  return {
    type: 'react-book-search/books/BOOK_REFRESHED',
    payload: {
      book
    }
  } as const;
}

export function serverError(err: Error) {
  return {
    type: 'react-book-search/books/SERVER_ERROR',
    payload: {
      error: err.message
    }
  } as const;
}
