import { configure } from '@storybook/react';
import '../src/components/mainStyles';

function importAll (r) {
  r.keys().forEach(r);
}

function loadStories() {
  importAll(require.context('../src/components', true, /story.tsx$/));
}

configure(loadStories, module);
