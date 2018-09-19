// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import { hot } from 'react-hot-loader';
import { actions } from '../../redux/books';
import type { Action } from '../../redux/books/types';
import type { State } from '../../redux/store';

type StateProps = {
  category: ?string,
  genre: ?string,
  query: ?string
};

type ActionProps = {
  actions: {
    getBookPage: *
  }
};

export class SearchContainer extends Component<StateProps & ActionProps> {
  render() {
    return (
      <div>
        <input type="text" value={this.props.query} />
      </div>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  return {
    currentPage: state.books ? state.books.currentPage : 0,
    pageCount: state.books ? state.books.pageCount : 0,
    category: state.books ? state.books.category : '',
    genre: state.books ? state.books.genre : '',
    query: state.books ? state.books.query : ''
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
)(hot(module)(SearchContainer));
/* To make HMR work properly
* @see: https://github.com/gaearon/react-hot-loader/issues/959#issuecomment-385680569
*/

export { default as reducer, epic } from '../../redux/books';
