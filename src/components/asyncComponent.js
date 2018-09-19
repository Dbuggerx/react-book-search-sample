// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import appendReducer from '../redux/append-reducer';
import type { State as StoreState } from '../redux/store';
import type { RouteModule } from '../routes/types';
import { epic$ } from '../redux/combined-epics';

type State = {
  component: ?ComponentType<*>
};

// @see: https://github.com/AnomalyInnovations/serverless-stack-demo-client/blob/code-splitting-in-create-react-app/src/components/AsyncComponent.js
export default function asyncComponent(
  importComponent: () => RouteModule | Promise<RouteModule>,
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
        if (mod instanceof Promise) throw Error('Promise not expected!');

        this.constructor.setupModuleState(mod);
        this.state = {
          component: mod.default
        };
      }
    }

    static setupModuleState(mod: RouteModule) {
      console.log('Appending reducer for:', chunkName);
      appendReducer({
        name: chunkName,
        reducer: mod.reducer
      });

      console.log('Appending epic for:', chunkName);
      epic$.next(mod.epic);
    }

    async componentDidMount() {
      const modulePromise = importComponent();
      if (!(modulePromise instanceof Promise)) throw Error('Promise expected!');

      const mod = await modulePromise;
      this.constructor.setupModuleState(mod);

      this.setState({
        component: mod.default
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : <div>Loading...</div>;
    }
  }

  return AsyncComponent;
}
