import React, { useCallback } from 'react';
import navigateIcon from 'material-design-icons/navigation/svg/production/ic_chevron_left_24px.svg';
import './Pagination.scss';

export type Props = {
  currentPage: number;
  pageCount: number;
  showPage: (page: number) => void;
};

const Pagination = (props: Props) => {
  const handlePrevPage = useCallback(() => {
    props.showPage(props.currentPage - 1);
  }, [props.showPage, props.currentPage]);

  const handleNextPage = useCallback(() => {
    props.showPage(props.currentPage + 1);
  }, [props.showPage, props.currentPage]);

  return (
    <nav className="pagination">
      <button
        className="pagination__prev-button"
        data-testid="goto-prev-page"
        onClick={handlePrevPage}
      >
        <svg viewBox={navigateIcon.viewBox}>
          <use xlinkHref={`#${navigateIcon.id}`} />
        </svg>
      </button>
      <span data-testid="current-page">
        Showing page {props.currentPage} of {props.pageCount}
      </span>
      <button
        className="pagination__next-button"
        data-testid="goto-next-page"
        onClick={handleNextPage}
      >
        <svg viewBox={navigateIcon.viewBox}>
          <use xlinkHref={`#${navigateIcon.id}`} />
        </svg>
      </button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export default React.memo(Pagination);
