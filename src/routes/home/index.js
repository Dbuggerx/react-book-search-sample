// @flow

// $FlowFixMe: No types available for StrictMode yet
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
  books: Book[]
};

type ActionProps = {
  actions: {
    getBookPage: *
  }
};

export class Home extends Component<StateProps & ActionProps> {
  componentDidMount() {
    this.props.actions.getBookPage(1);
  }

  search = (category: string, genre: string, query: string) => {
    this.props.actions.getBookPage(1, category, genre, query);
  };

  showPage = (page: number) => {
    if (page < 1 || page > this.props.pageCount) return;
    this.props.actions.getBookPage(page, this.props.category, this.props.genre, this.props.query);
  };

  render() {
    /* eslint-disable-next-line no-shadow */ // (clashing with flow type)
    const { actions, ...values } = this.props;
    const propValues = { ...values, search: this.search, showPage: this.showPage };
    return (
      <StrictMode>
        <MainLayout {...propValues} />
      </StrictMode>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  const books = selectors(state);

  return state.books
    ? { ...state.books, books }
    : {
      currentPage: 0,
      pageCount: 0,
      category: '',
      genre: '',
      query: '',
      books
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch<Action>): ActionProps {
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
