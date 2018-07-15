// @flow
import React, { Component } from 'react';
import appendReducer from '../redux/append-reducer';
import type { State as StoreState } from '../redux/store';

type State = {
  component: ?React$ComponentType<*>
};

type ImportedComponent = {
  default: React$ComponentType<*>,
  reducer: any
};

// @see: https://github.com/AnomalyInnovations/serverless-stack-demo-client/blob/code-splitting-in-create-react-app/src/components/AsyncComponent.js
export default function asyncComponent(
  importComponent: () => ImportedComponent | Promise<ImportedComponent>,
  loadedChunkNames: ?(string[]),
  chunkName: $Keys<StoreState>
) {
  class AsyncComponent extends Component<any, State> {
    constructor(props: any) {
      super(props);

      this.state = {
        component: null
      };

      if (process.env.SERVER) {
        if (loadedChunkNames) loadedChunkNames.push(chunkName);

        const mod = importComponent();
        if (!(mod instanceof Promise))
          this.state = {
            component: mod.default
          };
        else throw Error('Promise not expected!');
      }
    }

    async componentDidMount() {
      const component = await importComponent();

      appendReducer({
        name: chunkName,
        reducer: component.reducer
      });

      this.setState({
        component: component.default
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : <div>Loading...</div>;
    }
  }

  return AsyncComponent;
}
