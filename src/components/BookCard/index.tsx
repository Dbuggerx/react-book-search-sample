import React, { Component } from 'react';
import dayjs from 'dayjs';
// @ts-ignore
import relativeTime from 'dayjs/plugin/relativeTime';
import { Book } from '../../redux/books/types';
import './BookCard.scss';

export type Props = {
  book: Book;
  onViewDetails: (book: Book) => void;
  onLike: (book: Book) => void;
};

export default class BookCard extends Component<Props> {
  constructor(props: Props) {
    super(props);
    dayjs.extend(relativeTime);
  }

  handleViewDetails = () => {
    this.props.onViewDetails(this.props.book);
  };

  handleLike = () => {
    this.props.onLike(this.props.book);
  };

  // @ts-ignore
  getRelativeDate = () => dayjs(this.props.book.published).fromNow();

  render() {
    return (
      <div className="book-card">
        <div className="book-card__image" onClick={this.handleViewDetails}>
          <img src={this.props.book.cover} alt={this.props.book.name} />
        </div>
        <div className="book-card__header" onClick={this.handleViewDetails}>
          <div className="book-card__title">{this.props.book.name}</div>
          <div className="book-card__author">{this.props.book.author.name}</div>
        </div>
        <div className="book-card__actions">
          <div className="book-card__action" onClick={this.handleLike}>
            <i className="material-icons book-card__icon">
              {this.props.book.liked ? 'favorite' : 'favorite_border'}
            </i>
            {`${this.props.book.likes} ${
              this.props.book.likes > 1 ? 'likes' : 'like'
            }`}
          </div>
          <div className="book-card__action book-card__action--align-right book-card__action--no-click">
            <i className="material-icons book-card__icon">date_range</i>
            <div>
              {this.getRelativeDate()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
