import React, { Component, StrictMode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch as ReduxDispatch, AnyAction } from 'redux';
import MainLayout from '../../components/MainLayout';
import { actions, selectors } from '../../redux/books';
import { Book } from '../../redux/books/types';
import { State } from '../../redux/store';

type StateProps = {
  currentPage?: number;
  pageCount?: number;
  category?: string;
  genre?: string;
  query?: string;
  books: Book[];
  loadingBooks: boolean;
};

type ActionProps = {
  actions: typeof actions;
};

export class Home extends Component<StateProps & ActionProps> {
  componentDidMount() {
    if (this.props.books.length === 0) this.props.actions.getBookPage(1);
  }

  search = (category: string, genre: string, query: string) => {
    this.props.actions.getBookPage(1, category, genre, query);
  }

  showPage = (page: number) => {
    if (page < 1 || page > (this.props.pageCount || 0)) return;
    this.props.actions.getBookPage(
      page,
      this.props.category,
      this.props.genre,
      this.props.query
    );
  }

  handleBookClick = (book: Book) => {
    console.log('TODO!', book);
  }

  render() {
    return (
      <StrictMode>
        <MainLayout
          books={this.props.books}
          currentPage={this.props.currentPage || 0}
          loadingBooks={this.props.loadingBooks}
          pageCount={this.props.pageCount || 0}
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

function mapDispatchToProps(dispatch: ReduxDispatch<AnyAction>) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export { default as reducer, epic } from '../../redux/books';
