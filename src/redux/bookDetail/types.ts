export type BookDetail = {
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
  published: Date;
};

export type GetBookDetailAction = {
  type: 'react-book-search/bookDetail/GET_BOOK_DETAIL';
  payload: {
    bookId: string;
  };
};

export type BookDetailReceivedAction = {
  type: 'react-book-search/bookDetail/BOOK_DETAIL_RECEIVED';
  payload: {
    bookDetail: BookDetail;
  };
};

export type Action = GetBookDetailAction | BookDetailReceivedAction;

export type BookDetailState = Readonly<{
  bookDetail?: {
    loading: boolean;
    bookDetail?: BookDetail | null;
  };
}>;
