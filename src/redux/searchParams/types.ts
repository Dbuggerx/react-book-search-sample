import * as actions from './actions';

export type SearchParam = {
  id: number;
  label: string;
};

type SearchList = {
  results: SearchParam[];
  loading: boolean;
  error?: string;
};

export type State = Readonly<{
  categories: SearchList;
  genres: SearchList;
}>;

export type GetCategoriesAction = ReturnType<typeof actions.getCategories>;
export type GetGenresAction = ReturnType<typeof actions.getGenres>;
export type CategoriesReceivedAction = ReturnType<typeof actions.categoriesReceived>;
export type GenresReceivedAction = ReturnType<typeof actions.genresReceived>;
export type CategoriesErrorAction = ReturnType<typeof actions.categoriesError>;
export type GenresErrorAction = ReturnType<typeof actions.genresError>;

export type Action =
  | GetCategoriesAction
  | GetGenresAction
  | CategoriesReceivedAction
  | GenresReceivedAction
  | CategoriesErrorAction
  | GenresErrorAction;

