// @flow
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { epics } from './search';

export const epic$ = new BehaviorSubject(combineEpics(epics));

export const rootEpic = (
  action$: Observable<any>,
  state$: Observable<any>,
  { getJSON }: { getJSON: (url: string) => Observable<any[]> }
) => epic$.pipe(mergeMap(epic => epic(action$, state$, { getJSON })));
