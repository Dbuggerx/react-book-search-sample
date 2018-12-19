// @flow

export type Book = {
  author: {
    avatar: string,
    name: string
  },
  cover: string,
  description: string,
  genre: {
    category: string,
    name: string
  },
  id: string,
  introduction: string,
  likes: number,
  name: string,
  published: string
};

export type SearchParams = {|
  page: number,
  category?: string,
  genre?: string,
  query?: string
|};

export type GetBookPageAction = {|
  type: 'react-book-search/books/GET_BOOK_PAGE',
  payload: SearchParams
|};

export type PagedBooksReceivedAction = {|
  type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
  payload: {|
    books: Book[],
    pageCount: number
  |}
|};

export type Action = GetBookPageAction | PagedBooksReceivedAction;

export type State = {|
  +loading: boolean,
  +books: Book[],
  +currentPage: number,
  +pageCount: number,
  +category?: string,
  +genre?: string,
  +query?: string
|};

export type BookState = {|
  books?: State
|};
