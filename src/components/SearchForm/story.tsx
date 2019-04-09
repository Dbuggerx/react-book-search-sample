/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import SearchForm from './index';

storiesOf('Search form', module).add('default', () => (
  <div style={{ display: 'flex', }}>
    <SearchForm
      search={action('search')}
      category="category"
      genre="genre"
      query="query"
    />
  </div>
));
