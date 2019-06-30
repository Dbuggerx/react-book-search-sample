export function ssrReady() {
  return {
    type: 'react-book-search/ssr/RENDER_READY',
    payload: {
      ready: true
    }
  } as const;
}
