import { TestScheduler } from 'rxjs/testing';
import epics from './epics';

describe('books epics', () => {
  test('it chains "GET_BOOK_PAGE" to "PAGED_BOOKS_RECEIVED"', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: 'react-book-search/books/GET_BOOK_PAGE', payload: { test: true } }
      });
      const state$ = null;
      const dependencies = {
        ajax: () => cold('--a', {
          a: {
            response: ['bookObj1', 'bookObj2'],
            xhr: {
              getResponseHeader(name) {
                return name === 'x-total-count' ? 123 : -1;
              }
            }
          }
        })
      };

      const output$ = epics(action$, state$, dependencies);

      expectObservable(output$).toBe('---a', {
        a: {
          type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
          payload: { books: ['bookObj1', 'bookObj2'], pageCount: 123 }
        }
      });
    });
  });
});
