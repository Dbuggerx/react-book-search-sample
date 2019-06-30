import * as actions from './actions';

export type SearchParam = {
  id: number;
  label: string;
};

export type State = Readonly<{
  categories: {
    results: SearchParam[];
    loading: boolean;
    error?: string;
  };
}>;

export type GetCategoriesAction = ReturnType<typeof actions.getCategories>;

export type CategoriesReceivedAction = ReturnType<typeof actions.categoriesReceived>;

export type CategoriesErrorAction = ReturnType<typeof actions.categoriesError>;

export type Action = GetCategoriesAction | CategoriesReceivedAction;
