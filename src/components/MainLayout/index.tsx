import React from 'react';
import './MainLayout.scss';
import Info from '../Info';

type Props = {
  loadingBooks: boolean;
  error?: string;
  bookList: React.ReactElement;
  searchForm: React.ReactElement;
  pagination: React.ReactElement;
};

const MainLayout = (props: Props) => (
  <div className="main-layout">
    <div className="main-layout__status">
      {props.loadingBooks && <h2>Loading...</h2>}
      {props.error && <h2>{props.error}</h2>}
    </div>
    <div className="main-layout__books">{props.bookList}</div>
    <div className="main-layout__search">{props.searchForm}</div>
    <div className="main-layout__pagination">{props.pagination}</div>
    <div className="main-layout__info">
      <Info />
    </div>
  </div>
);

MainLayout.displayName = 'MainLayout';

export default MainLayout;
