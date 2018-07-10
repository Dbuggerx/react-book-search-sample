// @flow
import React, { Component } from 'react';

type State = {
  component: ?React$ComponentType<*>
};

type ImportedComponent = { default: React$ComponentType<*> };

// @see: https://github.com/AnomalyInnovations/serverless-stack-demo-client/blob/code-splitting-in-create-react-app/src/components/AsyncComponent.js
export default function
asyncComponent(importComponent: () => ImportedComponent | Promise<ImportedComponent>) {
  class AsyncComponent extends Component<any, State> {
    constructor(props: any) {
      super(props);

      this.state = {
        component: null
      };

      if (process.env.SERVER) {
        const mod = importComponent();
        if (!(mod instanceof Promise))
          this.state = {
            component: mod.default
          };
        else throw Error('Promise not expected!');
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : <div>Loading...</div>;
    }
  }

  return AsyncComponent;
}
