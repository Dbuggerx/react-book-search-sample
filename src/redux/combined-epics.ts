import { combineEpics, Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';
import { mergeMap } from 'rxjs/operators';
import { epics as dummyEpic } from './dummy';
import { epic as ssrEpic } from './ssr';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default () => {
  const combinedEpics = process.env.SERVER
    ? combineEpics(dummyEpic, ssrEpic)
    : combineEpics(dummyEpic);

  const epic$ = new BehaviorSubject<Epic>(combinedEpics);

  return {
    rootEpic: (
      action$: ActionsObservable<any>,
      state$: StateObservable<any>,
      { ajax }: { ajax: AjaxCreationMethod }
    ) => epic$.pipe<any>(mergeMap(epic => epic(action$, state$, { ajax }))),
    epicSubject$: epic$
  };
};
