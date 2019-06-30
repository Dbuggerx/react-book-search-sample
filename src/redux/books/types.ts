import * as actions from './actions';

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

export type GetBookPageAction = ReturnType<typeof actions.getBookPage>;

export type PagedBooksReceivedAction = ReturnType<typeof actions.booksReceived>;

export type LikeBookAction = ReturnType<typeof actions.likeBook>;

export type BookRefreshedAction = ReturnType<typeof actions.bookRefreshed>;

export type BookServerErrorAction = ReturnType<typeof actions.serverError>;

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
