import React, { useCallback, useState, useEffect } from 'react';
import dayjs from 'dayjs';
// @ts-ignore
import relativeTime from 'dayjs/plugin/relativeTime';
import favoriteIcon from 'material-design-icons/action/svg/production/ic_favorite_24px.svg';
import favoriteBorderIcon from 'material-design-icons/action/svg/production/ic_favorite_border_24px.svg';
import calendarIcon from 'material-design-icons/action/svg/production/ic_date_range_24px.svg';
import { Book } from '../../redux/books/types';
import './BookCard.scss';

export type Props = {
  book: Book;
  onViewDetails: (book: Book) => void;
  onLike: (book: Book) => void;
};

dayjs.extend(relativeTime);

const BookCard = ({onViewDetails, onLike, book}: Props) => {
  const handleViewDetails = useCallback(() => {
    onViewDetails(book);
  }, [onViewDetails, book]);

  const handleLike = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onLike(book);
    },
    [onLike, book]
  );

  const [relativeDate, setRelativeDate] = useState('');
  useEffect(() => {
    setRelativeDate(dayjs(book.published).fromNow());
  }, [book.published]);

  return (
    <div
      className="book-card"
      style={{ backgroundImage: `url(${book.cover})`, }}
      onClick={handleViewDetails}
    >
      <div className="book-card__header">
        <div className="book-card__title">{book.name}</div>
        <div className="book-card__author">{book.author.name}</div>
      </div>
      <div className="book-card__actions">
        <div className="book-card__action" onClick={handleLike} data-testid="like-button">
          {book.liked && (
            <svg viewBox={favoriteIcon.viewBox} className="book-card__icon">
              <use xlinkHref={`#${favoriteIcon.id}`} />
            </svg>
          )}
          {!book.liked && (
            <svg viewBox={favoriteBorderIcon.viewBox} className="book-card__icon">
              <use xlinkHref={`#${favoriteBorderIcon.id}`} />
            </svg>
          )}
          {`${book.likes} ${book.likes > 1 ? 'likes' : 'like'}`}
        </div>
        <div className="book-card__action book-card__action--align-right book-card__action--no-click">
          <svg viewBox={calendarIcon.viewBox} className="book-card__icon">
            <use xlinkHref={`#${calendarIcon.id}`} />
          </svg>
          <div data-testid="relative-date">{relativeDate}</div>
        </div>
      </div>
    </div>
  );
};

BookCard.displayName = 'BookCard';

export default React.memo(BookCard);
