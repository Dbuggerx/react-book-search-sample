/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Dropdown, { Props } from './index';
import { SearchParam } from '../../redux/searchParams/types';

function getSearchParams(count: number) {
  return Array.from({ length: count }, (v, idx) => ({
    id: idx,
    label: `Item ${String.fromCharCode(97 + (idx % 26)).repeat(idx / 26 + 1)}`
  }));
}

const MemoizedDropdown = React.memo<Props<SearchParam>>(Dropdown);

const DummyText = () => (
  <p>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a
    type specimen book. It has survived not only five centuries, but also the
    leap into electronic typesetting, remaining essentially unchanged. It was
    popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum.
  </p>
);

storiesOf('Dropdown', module)
  .add('with few items', () => (
    <div>
      <MemoizedDropdown
        items={getSearchParams(5)}
        renderItem={i => ({ id: i.id, el: <div>{i.label}</div> })}
        onSelect={action('onSelect')}
      />
      <DummyText />
      <DummyText />
    </div>
  ))
  .add('with many items', () => (
    <div>
      <MemoizedDropdown
        items={getSearchParams(35)}
        renderItem={i => ({ id: i.id, el: <div>{i.label}</div> })}
        onSelect={action('onSelect')}
      />
      <DummyText />
      <DummyText />
    </div>
  ));
