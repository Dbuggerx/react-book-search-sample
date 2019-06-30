import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import {
  AjaxCreationMethod,
  AjaxError
} from 'rxjs/internal/observable/dom/AjaxObservable';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  Action,
  GetCategoriesAction,
  CategoriesReceivedAction,
  CategoriesErrorAction,
  State
} from './types';
import * as actions from './actions';

export default function getCategoriesEpic(
  action$: Observable<Action>,
  state$: Observable<State>,
  { ajax }: { ajax: AjaxCreationMethod }
): Observable<CategoriesReceivedAction | GetCategoriesAction | CategoriesErrorAction> {
  return action$.pipe(
    ofType('react-book-search/searchParams/GET_CATEGORIES'),
    mergeMap(() =>
      ajax({
        url: 'http://localhost:3001/api/searchCategories'
      }).pipe(
        map(result => actions.categoriesReceived(result.response)),
        catchError((error: AjaxError) =>
          of<CategoriesErrorAction>(actions.categoriesError(error.message))
        )
      )
    )
  );
}
