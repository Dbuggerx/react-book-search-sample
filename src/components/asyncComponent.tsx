import React, { Component, ComponentType } from 'react';
import { Epic } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { RouteModuleInfo } from '../routes/types';
import ErrorBoundary from '../ErrorBoundary';

type State = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any> | null;
};

type AsyncModule = { routeModule: RouteModuleInfo; default: ComponentType<unknown> };

// @see: https://github.com/AnomalyInnovations/serverless-stack-demo-client/blob/code-splitting-in-create-react-app/src/components/AsyncComponent.js
export default function asyncComponent(
  appendAsyncReducer?: (newModuleInfo: RouteModuleInfo) => void,
  epicSubject$?: BehaviorSubject<Epic>,
  importComponent?: () => AsyncModule | Promise<AsyncModule>,
  loadedChunkNames?: string[],
  chunkName?: RouteModuleInfo['routeName'] | undefined
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return class AsyncComponent extends Component<any, State> {
    static setupModuleState(mod: AsyncModule) {
      console.log('Appending reducer for:', chunkName);
      if (appendAsyncReducer && chunkName) appendAsyncReducer(mod.routeModule);

      console.log('Appending epic for:', chunkName);
      if (epicSubject$) epicSubject$.next(mod.routeModule.epic);
    }

    elementRef = React.createRef<HTMLDivElement>();

    constructor(props: unknown) {
      super(props);

      this.state = {
        component: null
      };

      if (process.env.SERVER && loadedChunkNames && chunkName && importComponent) {
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
      const mod = await importComponent();
      AsyncComponent.setupModuleState(mod);

      if (this.elementRef.current)
        this.setState({
          component: mod.default
        });
    }

    render() {
      const C = this.state.component;
      return (
        <ErrorBoundary>
          <div ref={this.elementRef}>{C ? <C {...this.props} /> : 'Loading...'}</div>
        </ErrorBoundary>
      );
    }
  };
}
