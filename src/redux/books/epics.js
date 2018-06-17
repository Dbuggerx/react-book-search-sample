// @flow
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { filter, mapTo } from 'rxjs/operators';
import type { Action, PagedBooksReceivedAction } from './types';

const filterSearchUpdatedAction = filter((value: Action) =>
  value.type ===
    ('react-book-search/home/SEARCH_UPDATED': $PropertyType<Action, 'type'>));

const filterGetBookPageAction = filter((value: Action) =>
  value.type ===
      ('react-book-search/home/GET_BOOK_PAGE': $PropertyType<Action, 'type'>));

const mapToPagedBooksReturnedAction = mapTo({
  type: 'react-book-search/home/PAGED_BOOKS_RECEIVED',
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

function bookSearchEpic(action$: Observable<Action>): Observable<PagedBooksReceivedAction> {
  return action$.pipe(filterSearchUpdatedAction, mapToPagedBooksReturnedAction);
}

function getBookPageEpic(action$: Observable<Action>): Observable<PagedBooksReceivedAction> {
  return action$.pipe(filterGetBookPageAction, mapToPagedBooksReturnedAction);
}

export default combineEpics(bookSearchEpic, getBookPageEpic);
