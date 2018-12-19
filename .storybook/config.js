import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/BookCard/story.js');
}

configure(loadStories, module);
