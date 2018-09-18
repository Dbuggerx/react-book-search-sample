// @flow

import React from 'react';
import type { Book } from '../redux/books/types';

type Props = {
  books: Book[]
};

const BookList = (props: Props) => (
  <div {...props}>BookList - {props.books && props.books.length} books</div>
);

BookList.displayName = 'BookList';

export default BookList;
