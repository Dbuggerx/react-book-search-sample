// @flow

import React from 'react';
import type { Book } from '../../redux/books/types';
import BookCard from '../BookCard';

export type Props = {
  books: Book[],
  loadingBooks: boolean,
  onBookClick: (event: SyntheticMouseEvent<HTMLDivElement>) => void
};

const BookList = (props: Props) => {
  if (props.loadingBooks) return <h2>Loading...</h2>;
  return (
    <>
      {props.books.map(book => (
        <BookCard book={book} onClick={props.onBookClick} key={book.id} id={book.id} />
      ))}
    </>
  );
};

BookList.displayName = 'BookList';

export default BookList;
