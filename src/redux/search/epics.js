// // @flow
import { combineEpics } from 'redux-observable';
// import { Observable } from 'rxjs/Observable';
// import { filter, mapTo } from 'rxjs/operators';
// import type { Action } from './types';
// import type { PagedBooksReceivedAction } from '../books/types';

// const filterSearchUpdatedAction = filter((value: Action) => value.type
//   === ('react-book-search/search/SEARCH_UPDATED': $PropertyType<Action, 'type'>));

// // TODO: make the ajax request
// const mapToPagedBooksReturnedAction = mapTo({
//   type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
//   payload: {
//     page: 1,
//     pageCount: 10,
//     books: [
//       {
//         author: {
//           avatar: 'aaa',
//           name: 'aaaaaaa'
//         },
//         cover: 'aa',
//         description: 'aaa',
//         genre: {
//           category: 'aaa',
//           name: 'aaa'
//         },
//         id: 'aaa',
//         introduction: [
//           {
//             content: 'aaa'
//           }
//         ]
//       }
//     ]
//   }
// });

// function bookSearchEpic(action$: Observable<Action>): Observable<PagedBooksReceivedAction> {
//   return action$.pipe(filterSearchUpdatedAction, mapToPagedBooksReturnedAction);
// }

export default combineEpics();
