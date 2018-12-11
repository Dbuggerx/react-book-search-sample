// @flow
import React, { Component, StrictMode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch as ReduxDispatch } from 'redux';
import { hot } from 'react-hot-loader';
import type { ContextRouter } from 'react-router';
import { selectors, actions } from '../../redux/bookDetail';
import type { BookDetail, Action } from '../../redux/bookDetail/types';
import type { State } from '../../redux/store';

type StateProps = {
  bookDetail: ?BookDetail,
  loading: boolean
};

type ActionProps = {
  actions: typeof actions
};

type OwnProps = {
  bookId: ?string
};

export class Detail extends Component<StateProps & ActionProps & OwnProps> {
  componentDidMount() {
    if (!this.props.bookDetail && this.props.bookId)
      this.props.actions.getBookDetail(this.props.bookId);
  }

  render() {
    return this.props.loading ? (
      <div>Loading details...</div>
    ) : (
      <StrictMode>
        <div>{this.props.bookDetail && this.props.bookDetail.description}</div>
      </StrictMode>
    );
  }
}

function mapStateToProps(state: State, routeProps: ContextRouter): StateProps & OwnProps {
  const bookDetail = selectors(state);
  const loading = state.bookDetail ? state.bookDetail.loading : false;
  return { bookDetail, loading, bookId: routeProps.match.params.bookId };
}

function mapDispatchToProps(dispatch: ReduxDispatch<Action>) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(Detail));
/* To make HMR work properly
 * @see: https://github.com/gaearon/react-hot-loader/issues/959#issuecomment-385680569
 */

export { default as reducer, epic } from '../../redux/bookDetail';
