// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import { hot } from 'react-hot-loader';
import { selectors, actions } from '../../../redux/books';
import BookList from '../../../components/BookList';
import type { Book, Action } from '../../../redux/books/types';
import type { State } from '../../../redux/store';
import './test.scss';

type ValueProps = {
  currentPage: number,
  pageCount: number,
  books: Book[]
};

type ActionProps = {
  actions: {
    getBookPage: *
  }
};

class Home extends Component<ValueProps & ActionProps> {
  componentDidMount() {
    this.props.actions.getBookPage(1);
  }

  render() {
    return (
      <div>
        <h1>Home!</h1>
        Showing page {this.props.currentPage} of {this.props.pageCount}
        <BookList books={this.props.books} />
      </div>
    );
  }
}

function mapStateToProps(state: State): ValueProps {
  return {
    books: selectors(state),
    currentPage: state.books ? state.books.currentPage : 0,
    pageCount: state.books ? state.books.pageCount : 0
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

export { default as reducer, epic } from '../../../redux/books';
