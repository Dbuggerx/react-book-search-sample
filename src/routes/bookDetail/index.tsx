import React, { Component, StrictMode } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch as ReduxDispatch } from 'redux';
import { actions, selectors } from '../../redux/bookDetail';
import { Action, BookDetail } from '../../redux/bookDetail/types';
import { State } from '../../redux/store';

type StateProps = {
  bookDetail: BookDetail | null,
  loading: boolean
};

type ActionProps = {
  actions: typeof actions
};

type OwnProps = {
  bookId: string | null
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

function mapStateToProps(state: State, routeProps: RouteComponentProps): StateProps & OwnProps {
  const bookDetail = selectors(state) || null;
  const loading = state.bookDetail ? state.bookDetail.loading : false;
  return { bookDetail, loading, bookId: (routeProps.match.params as any).bookId };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);

export { default as reducer, epic } from '../../redux/bookDetail';
