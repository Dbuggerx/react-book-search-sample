import React, { Component, StrictMode } from 'react';
import { connect } from 'react-redux';
import {
  bindActionCreators,
  Dispatch as ReduxDispatch,
  AnyAction,
  combineReducers
} from 'redux';
import { hot } from 'react-hot-loader/root';
import { RouteChildrenProps } from 'react-router';
import { combineEpics } from 'redux-observable';
import MainLayout from '../../components/MainLayout';
import booksReducer, {
  actions as booksActions,
  selectors,
  epic as booksEpic
} from '../../redux/books';
import searchParamsReducer, {
  actions as searchActions,
  epic as searchParamsEpic
} from '../../redux/searchParams';
import { Book } from '../../redux/books/types';
import { State } from '../../redux/store';
import { SearchParam } from '../../redux/searchParams/types';
import { RouteModule } from './types';

type StateProps = {
  currentPage?: number;
  pageCount?: number;
  category?: string;
  genre?: string;
  query?: string;
  books: Book[];
  loadingBooks: boolean;
  error?: string;
  searchCategories: {
    results: SearchParam[];
    loading: boolean;
    error?: string;
  };
};

type ActionProps = {
  actions: typeof booksActions & typeof searchActions;
};

export class Home extends Component<StateProps & ActionProps & RouteChildrenProps> {
  componentDidMount() {
    if (this.props.books.length === 0) this.props.actions.getBookPage(1);
    if (this.props.searchCategories.results.length === 0)
      this.props.actions.getCategories();
  }

  handleSearch = (category: string, genre: string, query: string) => {
    this.props.actions.getBookPage(1, category, genre, query);
  };

  handleShowPage = (page: number) => {
    if (page < 1 || page > (this.props.pageCount || 0)) return;
    this.props.actions.getBookPage(
      page,
      this.props.category,
      this.props.genre,
      this.props.query
    );
  };

  handleBookClick = (book: Book) => {
    this.props.history.push(`/book/${book.id}`);
  };

  handleBookLike = (book: Book) => {
    this.props.actions.likeBook(book.id, !book.liked);
  };

  render() {
    return (
      <StrictMode>
        <MainLayout
          error={this.props.error}
          books={this.props.books}
          currentPage={this.props.currentPage || 0}
          loadingBooks={this.props.loadingBooks}
          pageCount={this.props.pageCount || 0}
          search={this.handleSearch}
          category={this.props.category}
          genre={this.props.genre}
          query={this.props.query}
          showPage={this.handleShowPage}
          onBookClick={this.handleBookClick}
          onBookLike={this.handleBookLike}
        />
      </StrictMode>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  const books = selectors(state);
  const loading =
    state.home && state.home.bookResults ? state.home.bookResults.loading : false;
  const error =
    state.home && state.home.bookResults ? state.home.bookResults.error : undefined;
  const bookResults = state.home && state.home.bookResults;

  const searchCategories = state.home
    ? state.home.searchParams.categories
    : {
      loading: false,
      results: []
    };
  return { ...bookResults, books, loadingBooks: loading, error, searchCategories };
}

function mapDispatchToProps(dispatch: ReduxDispatch<AnyAction>): ActionProps {
  return {
    actions: bindActionCreators({ ...booksActions, ...searchActions }, dispatch)
  };
}

export default hot(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);

export const routeModule: Pick<RouteModule, Exclude<keyof RouteModule, 'state'>> = {
  routeName: 'home',
  epic: combineEpics(booksEpic, searchParamsEpic),
  reducer: combineReducers({
    bookResults: booksReducer,
    searchParams: searchParamsReducer
  })
};
