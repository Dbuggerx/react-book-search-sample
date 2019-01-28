import { configure } from '@storybook/react';
import '../src/components/_globals.scss';

function loadStories() {
  require('../src/components/BookCard/story.tsx');
}

configure(loadStories, module);
