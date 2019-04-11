/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Dropdown, {Props} from './index';
import { SearchParam } from '../../redux/searchParams/types';

const values: SearchParam[] = [
  { id: 1, label: 'Aaa' },
  { id: 2, label: 'Bbb' },
  { id: 3, label: 'Ccc' }
];

const MemoizedDropdown = React.memo<Props<SearchParam>>(
  Dropdown
);

storiesOf('Dropdown', module).add('default', () => (
  <MemoizedDropdown
    items={values}
    renderItem={i => ({ id: i.id, el: <div>{i.label}</div> })}
  />
));
