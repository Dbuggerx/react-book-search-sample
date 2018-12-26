import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';
import { epics } from './dummy';

export default () => {
  const epic$ = new BehaviorSubject<any>(combineEpics(epics));

  return {
    rootEpic: (
      action$: Observable<any>,
      state$: Observable<any>,
      { ajax }: { ajax: AjaxCreationMethod }
    ) => epic$.pipe<any>(mergeMap(epic => epic(action$, state$, { ajax }))),
    epicSubject$: epic$
  };
};
