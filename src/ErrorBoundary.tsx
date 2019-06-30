/* eslint-disable class-methods-use-this */
import React from 'react';

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // Ideally, the error would be reported to the server
    // eslint-disable-next-line
    console.error(error, info);
  }

  render() {
    if (this.state.hasError)
      // fallback UI
      return <h1>Something went wrong.</h1>;

    return this.props.children;
  }
}
