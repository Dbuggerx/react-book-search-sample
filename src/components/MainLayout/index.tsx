import React from 'react';
import './MainLayout.scss';

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
      <h2>This is still a work in progress</h2>
      For now, I would ask to please consider the technical aspects involved, like:
      <ul>
        <li>Server side rendering</li>
        <li>Code Splitting</li>
        <li>NodeJS / Express API</li>
        <li>
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            React
          </a>{' '}
          best practices
        </li>
        <li>
          <a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
            Redux
          </a>{' '}
          (static and dynamic imported)
        </li>
        <li>
          <a
            href="https://redux-observable.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux-Observable
          </a>{' '}
          middleware, powered by RxJs (with dynamic imported epics)
        </li>
        <li>
          <a
            href="https://github.com/alexnm/re-ducks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Re-ducks
          </a>{' '}
          modular architecture
        </li>
        <li>
          styles created using{' '}
          <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer">
            SASS
          </a>{' '}
          with the{' '}
          <a href="http://getbem.com/" target="_blank" rel="noopener noreferrer">
            BEM methodology
          </a>
        </li>
        <li>CSS Grid</li>
        <li>
          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Typescript
          </a>
        </li>
        <li>
          <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer">
            Sass
          </a>{' '}
          styles
        </li>
        <li>
          Testing with{' '}
          <a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer">
            Jest
          </a>{' '}
          and{' '}
          <a
            href="https://testing-library.com/docs/react-testing-library/intro"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Testing Library
          </a>
        </li>
        <li>
          End-to-end tests using{' '}
          <a
            href="https://devexpress.github.io/testcafe/documentation/getting-started/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TestCafe
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/Dbuggerx/gherkin-testcafe"
            target="_blank"
            rel="noopener noreferrer"
          >
            gherkin-testcafe
          </a>
        </li>
      </ul>
    </div>
  </div>
);

MainLayout.displayName = 'MainLayout';

export default MainLayout;
