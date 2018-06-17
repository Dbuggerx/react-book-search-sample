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

export type SearchUpdatedAction = {
  type: 'react-book-search/home/SEARCH_UPDATED',
  payload: {
    category: string,
    genre: string,
    term: string
  }
};

export type GetBookPageAction = {
  type: 'react-book-search/home/GET_BOOK_PAGE'
};

export type PagedBooksReceivedAction = {
  type: 'react-book-search/home/PAGED_BOOKS_RECEIVED',
  payload: {
    books: Book[],
    page: number,
    pageCount: number
  }
};

export type Action = SearchUpdatedAction | GetBookPageAction | PagedBooksReceivedAction;

export type State = {|
  +pagedBooks: Book[][],
  +currentPage: number,
  +pageCount: number
|}
