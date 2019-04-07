import {
  combineEpics,
  Epic,
  ActionsObservable,
  StateObservable
} from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';
import { mergeMap } from 'rxjs/operators';
import { epics } from './dummy';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default () => {
  const epic$ = new BehaviorSubject<Epic>(combineEpics(epics));

  return {
    rootEpic: (
      action$: ActionsObservable<any>,
      state$: StateObservable<any>,
      { ajax }: { ajax: AjaxCreationMethod }
    ) => epic$.pipe<any>(mergeMap(epic => epic(action$, state$, { ajax }))),
    epicSubject$: epic$
  };
};
