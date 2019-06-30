import * as actions from './actions';

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

export type GetBookDetailAction = ReturnType<typeof actions.getBookDetail>;

export type BookDetailReceivedAction = ReturnType<typeof actions.bookDetailsReceived>;

export type Action = GetBookDetailAction | BookDetailReceivedAction;

export type State = Readonly<{
  loading: boolean;
  bookDetail: BookDetail | null;
}>;
