import React, { PureComponent } from 'react';
import './loader.css';

// HOC, добавляющий компоненту лоадер
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
        // получет функцию для переключение рендера, состояние рендера и остальные пропсы
        <Component toggleLoader={this.toggleLoader} isLoading={this.state.renderLoading} {...this.props} >
          {/* лоадер будет доступен в компоненте через свойство children */}
          <div className={`loader ${this.state.renderLoading ? '' : 'hidden'}`}></div>
        </Component>
      )
    }
  };
}

export default WithLoader;