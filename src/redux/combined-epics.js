// @flow
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { epics } from './search';

export const epic$ = new BehaviorSubject(combineEpics(epics));

export const rootEpic = (action$: any, state$: any) => epic$.pipe(
  mergeMap(epic => epic(action$, state$))
);
