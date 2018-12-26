import { BookDetail, BookDetailReceivedAction, GetBookDetailAction } from './types';

function getBookDetail(
  bookId: string
): GetBookDetailAction {
  return {
    type: 'react-book-search/bookDetail/GET_BOOK_DETAIL',
    payload: {
      bookId
    }
  };
}

function bookDetailsReturned(bookDetail: BookDetail): BookDetailReceivedAction {
  return {
    type: 'react-book-search/bookDetail/BOOK_DETAIL_RECEIVED',
    payload: {
      bookDetail
    }
  };
}

export default {
  getBookDetail,
  bookDetailsReturned
};
