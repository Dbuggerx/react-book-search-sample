// @flow

import React from 'react';
import type { Book } from '../redux/books/types';

type Props = {
  books: Book[]
};

const render = (props: Props) => (
  <div {...props}>BookList - {props.books && props.books.length} books</div>
);

render.displayName = 'BookList';

export default render;
