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
  introduction: {
    content: string
  }[]
};

export type GetBookPageAction = {
  type: 'react-book-search/books/GET_BOOK_PAGE'
};

export type PagedBooksReceivedAction = {
  type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
  payload: {
    books: Book[],
    page: number,
    pageCount: number
  }
};

export type Action = GetBookPageAction | PagedBooksReceivedAction;

export type State = {|
  +pagedBooks: Book[][],
  +currentPage: number,
  +pageCount: number
|};

export type Reducer = {
  'books'?: State
}
