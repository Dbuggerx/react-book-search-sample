// @flow
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { filter, mapTo } from 'rxjs/operators';
import type { Action, PagedBooksReceivedAction } from './types';

const filterGetBookPageAction = filter((value: Action) => value.type
  === ('react-book-search/books/GET_BOOK_PAGE': $PropertyType<Action, 'type'>));

// TODO: make the ajax request
const mapToPagedBooksReturnedAction = mapTo({
  type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
  payload: {
    page: 1,
    pageCount: 10,
    books: [
      {
        author: {
          avatar: 'aaa',
          name: 'aaaaaaa'
        },
        cover: 'aa',
        description: 'aaa',
        genre: {
          category: 'aaa',
          name: 'aaa'
        },
        id: 'aaa',
        introduction: [
          {
            content: 'aaa'
          }
        ]
      }
    ]
  }
});

function getBookPageEpic(action$: Observable<Action>): Observable<PagedBooksReceivedAction> {
  return action$.pipe(filterGetBookPageAction, mapToPagedBooksReturnedAction);
}

export default combineEpics(getBookPageEpic);
