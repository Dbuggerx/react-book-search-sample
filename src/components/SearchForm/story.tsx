/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import SearchForm from './index';

function getSearchParams(count: number) {
  return Array.from({ length: count }, (v, idx) => ({
    id: idx,
    label: `Item ${String.fromCharCode(97 + (idx % 26)).repeat(idx / 26 + 1)}`
  }));
}

storiesOf('Search form', module).add('default', () => (
  <div>
    <SearchForm
      search={action('search')}
      selectedCategory="selected category"
      selectedGenre="selected genre"
      selectedQuery="selected query"
      availableCategories={getSearchParams(2)}
      availableGenres={getSearchParams(5)}
    />
  </div>
));
