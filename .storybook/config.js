import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/BookCard/story.tsx');
}

configure(loadStories, module);
