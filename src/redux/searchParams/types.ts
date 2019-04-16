/* eslint-disable */

export type SearchParam = {
  id: number;
  label: string;
};

export type State = Readonly<{
  categories: SearchParam[];
}>;
