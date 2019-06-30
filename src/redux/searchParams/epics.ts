import { ofType, combineEpics } from 'redux-observable';
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
  GenresReceivedAction,
  CategoriesErrorAction,
  State,
  GetGenresAction,
  GenresErrorAction
} from './types';
import * as actions from './actions';

function getCategoriesEpic(
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

function getGenresEpic(
  action$: Observable<Action>,
  state$: Observable<State>,
  { ajax }: { ajax: AjaxCreationMethod }
): Observable<GenresReceivedAction | GetGenresAction | GenresErrorAction> {
  return action$.pipe(
    ofType('react-book-search/searchParams/GET_GENRES'),
    mergeMap(() =>
      ajax({
        url: 'http://localhost:3001/api/searchGenres'
      }).pipe(
        map(result => actions.genresReceived(result.response)),
        catchError((error: AjaxError) =>
          of<GenresErrorAction>(actions.genresError(error.message))
        )
      )
    )
  );
}

export default combineEpics(getCategoriesEpic, getGenresEpic);
