// @flow
import React, { Component, StrictMode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import { hot } from 'react-hot-loader';
import MainLayout from '../../components/MainLayout';
import { selectors, actions } from '../../redux/books';
import type { Book, Action } from '../../redux/books/types';
import type { State } from '../../redux/store';

type StateProps = {
  currentPage: number,
  pageCount: number,
  category: string,
  genre: string,
  query: string,
  books: Book[],
  loadingBooks: boolean
};

type ActionProps = {
  actions: typeof actions
};

export class Home extends Component<StateProps & ActionProps> {
  componentDidMount() {
    if (this.props.books.length === 0) this.props.actions.getBookPage(1);
  }

  search = (category: string, genre: string, query: string) => {
    this.props.actions.getBookPage(1, category, genre, query);
  };

  showPage = (page: number) => {
    if (page < 1 || page > this.props.pageCount) return;
    this.props.actions.getBookPage(page, this.props.category, this.props.genre, this.props.query);
  };

  handleBookClick = (book: Book) => {
    console.log('TODO!', book);
  };

  render() {
    return (
      <StrictMode>
        <MainLayout
          books={this.props.books}
          currentPage={this.props.currentPage}
          loadingBooks={this.props.loadingBooks}
          pageCount={this.props.pageCount}
          search={this.search}
          showPage={this.showPage}
          onBookClick={this.handleBookClick}
        />
      </StrictMode>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  const books = selectors(state);
  const loading = state.home ? state.home.loading : false;

  return { ...state.home, books, loadingBooks: loading };
}

function mapDispatchToProps(dispatch: ReduxDispatch<Action>) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(Home));
/* To make HMR work properly
 * @see: https://github.com/gaearon/react-hot-loader/issues/959#issuecomment-385680569
 */

export { default as reducer, epic } from '../../redux/books';
