// @flow

import React from 'react';
import './MainLayout.scss';
import BookList from '../BookList';
import SearchForm from '../SearchForm';
import Pagination from '../Pagination';
import type { Props as SearchFormProps } from '../SearchForm';
import type { Props as BookListProps } from '../BookList';
import type { Props as PaginationProps } from '../Pagination';

type Props = BookListProps & SearchFormProps & PaginationProps;

const MainLayout = (props: Props) => (
  <div className="main-layout">
    <div className="main-layout__books">
      <BookList books={props.books} onBookClick={props.onBookClick} />
    </div>
    <div className="main-layout__search">
      <SearchForm search={props.search} />
    </div>
    <div className="main-layout__pagination">
      <Pagination
        currentPage={props.currentPage}
        pageCount={props.pageCount}
        showPage={props.showPage}
      />
    </div>
  </div>
);

MainLayout.displayName = 'MainLayout';

export default MainLayout;
