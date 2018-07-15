// @flow

export type SearchUpdatedAction = {
  type: 'react-book-search/search/SEARCH_UPDATED',
  payload: {
    category: string,
    genre: string,
    term: string
  }
};

export type Action = SearchUpdatedAction;

export type State = {|
  +category: string,
  +genre: string,
  +term: string
|}

export type Reducer = {
  'search': State
}
