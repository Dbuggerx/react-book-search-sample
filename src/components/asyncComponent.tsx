import React, { Component, ComponentType } from 'react';
import { BehaviorSubject } from 'rxjs';
import { ModuleInfo } from '../redux/append-reducer';
import { State as StoreState } from '../redux/store';
import { DetailRouteModule } from '../routes/bookDetail/types';
import { HomeRouteModule } from '../routes/home/types';

type State = {
  component: ComponentType<any> | null;
};

type RouteModule = HomeRouteModule | DetailRouteModule;

// @see: https://github.com/AnomalyInnovations/serverless-stack-demo-client/blob/code-splitting-in-create-react-app/src/components/AsyncComponent.js
export default function asyncComponent(
  appendAsyncReducer?: (newModuleInfo: ModuleInfo) => void,
  epicSubject$?: BehaviorSubject<any>,
  importComponent?: () => RouteModule | Promise<RouteModule>,
  loadedChunkNames?: string[],
  chunkName?: keyof StoreState | undefined
) {
  class AsyncComponent extends Component<any, State> {
    static setupModuleState(mod: RouteModule) {
      console.log('Appending reducer for:', chunkName);
      if (appendAsyncReducer && chunkName)
        appendAsyncReducer({
          name: chunkName,
          reducer: mod.reducer
        });

      console.log('Appending epic for:', chunkName);

      if (epicSubject$) epicSubject$.next(mod.epic);
    }
    constructor(props: any) {
      super(props);

      this.state = {
        component: null
      };

      if (
        process.env.SERVER &&
        loadedChunkNames &&
        chunkName &&
        importComponent
      ) {
        if (loadedChunkNames) loadedChunkNames.push(chunkName);

        const mod = importComponent();
        if (mod instanceof Promise) throw Error('Promise not expected!');

        AsyncComponent.setupModuleState(mod);
        this.state = {
          component: mod.default
        };
      }
    }

    async componentDidMount() {
      if (!importComponent) return;
      const modulePromise = importComponent();

      const mod = await modulePromise;
      AsyncComponent.setupModuleState(mod);

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
