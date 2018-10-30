// @flow

import React from 'react';
import type { Book } from '../../redux/books/types';
import './BookCard.scss';

export type Props = {
  book: Book,
  onClick: (event: SyntheticMouseEvent<HTMLDivElement>) => void
};

const BookCard = (props: Props) => (
  <div className="book-card" onClick={props.onClick}>
    {props.book.name}
  </div>
);

BookCard.displayName = 'BookCard';

export default BookCard;
