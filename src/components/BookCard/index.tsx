import React, { Component } from 'react';
import { Book } from '../../redux/books/types';
import './BookCard.scss';

export type Props = {
  book: Book,
  onClick: (book: Book) => void
};

export default class BookCard extends Component<Props> {
  handleClick = () => {
    this.props.onClick(this.props.book);
  };

  render() {
    return (
      <div className="book-card" onClick={this.handleClick}>
        {this.props.book.name}
      </div>
    );
  }
}
