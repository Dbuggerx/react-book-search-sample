import React, { Component } from 'react';
import './Pagination.scss';

export type Props = {
  currentPage: number;
  pageCount: number;
  showPage: (page: number) => void;
};

class Pagination extends Component<Props> {
  previousPage = () => {
    this.props.showPage(this.props.currentPage - 1);
  };

  nextPage = () => {
    this.props.showPage(this.props.currentPage + 1);
  };

  render() {
    return (
      <div>
        <button data-testid="goto-prev-page" onClick={this.previousPage}> 👈 </button>
        Showing page {this.props.currentPage} of {this.props.pageCount}
        <button data-testid="goto-next-page" onClick={this.nextPage}> 👉 </button>
      </div>
    );
  }
}

export default Pagination;
