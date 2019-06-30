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
  selectors as booksSelectors,
  epic as booksEpic
} from '../../redux/books';
import searchParamsReducer, {
  actions as searchActions,
  epic as searchParamsEpic,
  selectors as searchParamsSelectors
} from '../../redux/searchParams';
import { Book } from '../../redux/books/types';
import { State } from '../../redux/store';
import { SearchParam } from '../../redux/searchParams/types';
import { RouteModule } from './types';
import BookList from '../../components/BookList';
import SearchForm from '../../components/SearchForm';
import Pagination from '../../components/Pagination';

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
  searchGenres: {
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
    if (this.props.searchGenres.results.length === 0) this.props.actions.getGenres();
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
          bookList={
            <BookList
              books={this.props.books}
              onBookClick={this.handleBookClick}
              onBookLike={this.handleBookLike}
            />
          }
          searchForm={
            <SearchForm
              search={this.handleSearch}
              selectedCategory={this.props.category}
              selectedGenre={this.props.genre}
              selectedQuery={this.props.query}
              availableCategories={this.props.searchCategories.results}
              availableGenres={this.props.searchGenres.results}
            />
          }
          pagination={
            <Pagination
              currentPage={this.props.currentPage || 0}
              pageCount={this.props.pageCount || 0}
              showPage={this.handleShowPage}
            />
          }
          error={this.props.error}
          loadingBooks={this.props.loadingBooks}
        />
      </StrictMode>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  const bookResults = booksSelectors.bookResults(state);

  return {
    ...bookResults,
    loadingBooks: booksSelectors.loading(state),
    error: booksSelectors.error(state),
    searchCategories: searchParamsSelectors.categories(state),
    searchGenres: searchParamsSelectors.genres(state)
  };
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

export const routeModule: Omit<RouteModule, 'state'> = {
  routeName: 'home',
  epic: combineEpics(booksEpic, searchParamsEpic),
  reducer: combineReducers({
    bookResults: booksReducer,
    searchParams: searchParamsReducer
  })
};
