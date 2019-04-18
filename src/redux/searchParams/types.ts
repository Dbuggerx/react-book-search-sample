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

export type GetCategoriesAction = {
  type: 'react-book-search/searchParams/GET_CATEGORIES';
};

export type CategoriesReceivedAction = {
  type: 'react-book-search/searchParams/CATEGORIES_RECEIVED';
  payload: SearchParam[];
};

export type CategoriesErrorAction = {
  type: 'react-book-search/searchParams/CATEGORIES_ERROR';
  payload: string;
};

export type Action = GetCategoriesAction | CategoriesReceivedAction;
