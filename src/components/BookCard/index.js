// @flow

import React from 'react';
import type { Book } from '../../redux/books/types';
import './BookCard.scss';

export type Props = {
  book: Book;
};

const BookCard = (props: Props) => (
  <div className="book-card">
    {props.book.name}
  </div>
);

BookCard.displayName = 'BookCard';

export default BookCard;
