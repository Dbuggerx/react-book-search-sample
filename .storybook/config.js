import { configure } from '@storybook/react';
import '../src/components/mainStyles';

function loadStories() {
  require('../src/components/BookCard/story.tsx');
}

configure(loadStories, module);
