import React, { Component } from 'react';
import {
  Card,
  CardTitle,
  CardActions,
  Button,
  Media,
  MediaOverlay
} from 'react-md';
import { Book } from '../../redux/books/types';
import './BookCard.scss';

export type Props = {
  book: Book;
  onViewDetails: (book: Book) => void;
  onLike: (book: Book) => void;
};

export default class BookCard extends Component<Props> {
  handleViewDetails = () => {
    this.props.onViewDetails(this.props.book);
  };

  handleLike = () => {
    this.props.onLike(this.props.book);
  };

  render() {
    return (
      <Card className="book-card md-cell md-cell--6 md-cell--8-tablet" raise>
        <Media>
          <img src={this.props.book.cover} alt={this.props.book.name} />
          <MediaOverlay>
            <CardTitle
              title={this.props.book.name}
              subtitle={`${this.props.book.likes} likes`}
            />
          </MediaOverlay>
        </Media>
        <CardActions>
          <Button flat primary onClick={this.handleViewDetails}>
            View Details
          </Button>
          <Button
            icon
            primary={this.props.book.liked}
            className="book-card__like-button"
            onClick={this.handleLike}
          >
            favorite
          </Button>
        </CardActions>
      </Card>
    );
  }
}
