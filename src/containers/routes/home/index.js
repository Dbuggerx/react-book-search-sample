// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import { selectors, getBookPage } from '../../../redux/books';
import type { Book, Action } from '../../../redux/books/types';
import type { State } from '../../../redux/store';

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

type Props = ValueProps & ActionProps;

class Home extends Component<Props> {
  componentDidMount() {
    this.props.actions.getBookPage(1);
  }

  render() {
    return (
      <div>
        <h1>Home!</h1>
        Showing page {this.props.currentPage} of {this.props.pageCount}
      </div>
    );
  }
}

function mapStateToProps(state: State): ValueProps {
  // eslint-disable-next-line
  return {
    books: selectors(state),
    currentPage: state.books.currentPage,
    pageCount: state.books.pageCount
  };
}

function mapDispatchToProps(dispatch: ReduxDispatch<Action>): ActionProps {
  return {
    actions: bindActionCreators({ getBookPage }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
