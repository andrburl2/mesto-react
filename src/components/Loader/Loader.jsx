import { React, PureComponent } from 'react';
import './loader.css';

function WithLoader(Component) {
  return class extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        renderLoading: false,
      };
    }

    toggleLoader = () => {
      this.setState((state) => ({
        renderLoading: !state.renderLoading
      }));
    }

    render() {
      return (
        <Component toggleLoader={this.toggleLoader} isLoading={this.state.renderLoading} {...this.props} >
          <div className={`loader ${this.state.renderLoading ? '' : 'hidden'}`}></div>
        </Component>
      )
    }
  };
}

export default WithLoader;