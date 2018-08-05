import { TestScheduler } from 'rxjs/testing';
import epics from './epics';

describe('books epics', () => {
  test('it maps "GET_BOOK_PAGE" to "PAGED_BOOKS_RECEIVED"', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: { type: 'react-book-search/books/GET_BOOK_PAGE' }
      });
      const state$ = null;
      // const dependencies = {
      //   getJSON: url => cold('--a', {
      //     a: { url }
      //   })
      // };

      const output$ = epics(action$, state$ /* , dependencies */);

      expectObservable(output$).toBe('-a', {
        a: expect.objectContaining({
          type: 'react-book-search/books/PAGED_BOOKS_RECEIVED'
        })
      });
    });
  });
});
