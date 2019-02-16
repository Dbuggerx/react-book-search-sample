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

const BookCard = (props: Props) => {
  const handleViewDetails = useCallback(() => {
    props.onViewDetails(props.book);
  }, [props.onViewDetails, props.book]);

  const handleLike = useCallback(() => {
    props.onLike(props.book);
  }, [props.onLike, props.book]);

  const [relativeDate, setRelativeDate] = useState('');
  useEffect(() => {
    // @ts-ignore
    setRelativeDate(dayjs(props.book.published).fromNow());
  }, [props.book.published]);

  return (
    <div className="book-card">
      <div className="book-card__image" onClick={handleViewDetails}>
        <img src={props.book.cover} alt={props.book.name} />
      </div>
      <div className="book-card__header" onClick={handleViewDetails}>
        <div className="book-card__title">{props.book.name}</div>
        <div className="book-card__author">{props.book.author.name}</div>
      </div>
      <div className="book-card__actions">
        <div className="book-card__action" onClick={handleLike}>
          {props.book.liked && (
            <svg viewBox={favoriteIcon.viewBox} className="book-card__icon">
              <use xlinkHref={`#${favoriteIcon.id}`} />
            </svg>
          )}
          {!props.book.liked && (
            <svg
              viewBox={favoriteBorderIcon.viewBox}
              className="book-card__icon"
            >
              <use xlinkHref={`#${favoriteBorderIcon.id}`} />
            </svg>
          )}
          {`${props.book.likes} ${props.book.likes > 1 ? 'likes' : 'like'}`}
        </div>
        <div className="book-card__action book-card__action--align-right book-card__action--no-click">
          <svg viewBox={calendarIcon.viewBox} className="book-card__icon">
            <use xlinkHref={`#${calendarIcon.id}`} />
          </svg>
          <div>{relativeDate}</div>
        </div>
      </div>
    </div>
  );
};

BookCard.displayName = 'BookCard';

export default React.memo(BookCard);
