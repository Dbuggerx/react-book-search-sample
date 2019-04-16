export type Book = {
  author: {
    avatar: string;
    name: string;
  };
  cover: string;
  description: string;
  genre: {
    category: string;
    name: string;
  };
  id: string;
  introduction: string;
  likes: number;
  name: string;
  published: string;
  liked?: boolean;
};

export type SearchParams = {
  page: number;
  category?: string;
  genre?: string;
  query?: string;
};

export type GetBookPageAction = {
  type: 'react-book-search/books/GET_BOOK_PAGE';
  payload: SearchParams;
};

export type PagedBooksReceivedAction = {
  type: 'react-book-search/books/PAGED_BOOKS_RECEIVED';
  payload: {
    books: Book[];
    pageCount: number;
  };
};

export type LikeBookAction = {
  type: 'react-book-search/books/LIKE_BOOK';
  payload: {
    bookId: string;
    liked: boolean;
  };
};

export type BookRefreshedAction = {
  type: 'react-book-search/books/BOOK_REFRESHED';
  payload: {
    book: Book;
  };
};

export type BookServerErrorAction = {
  type: 'react-book-search/books/SERVER_ERROR';
  payload: {
    error: string;
  };
};

export type Action =
  | GetBookPageAction
  | PagedBooksReceivedAction
  | LikeBookAction
  | BookRefreshedAction
  | BookServerErrorAction;

export type State = Readonly<{
  loading: boolean;
  books: Book[];
  currentPage: number;
  pageCount: number;
  category?: string;
  genre?: string;
  query?: string;
  error?: string;
}>;
