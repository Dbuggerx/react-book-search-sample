/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Pagination from './index';

storiesOf('Pagination', module).add('default', () => (
  <Pagination currentPage={3} pageCount={6} showPage={action('showPage')} />
));
