import React from 'react';
import { Book } from '../../redux/books/types';
import BookCard from '../BookCard';

export type Props = {
  books: Book[];
  onBookClick: (book: Book) => void;
  onBookLike: (book: Book) => void;
};

const BookList = (props: Props) => (
  <>
    {props.books.map(book => (
      <BookCard
        book={book}
        key={book.id}
        onViewDetails={props.onBookClick}
        onLike={props.onBookLike}
      />
    ))}
  </>
);

BookList.displayName = 'BookList';

export default BookList;
