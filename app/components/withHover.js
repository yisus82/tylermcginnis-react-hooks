import React from 'react';

const withHover = (Component, propName = 'hovering') =>
  class WithHover extends React.Component {
    state = {
      hovering: false,
    };

    mouseOver = () =>
      this.setState({
        hovering: true,
      });

    mouseOut = () =>
      this.setState({
        hovering: false,
      });

    render = () => {
      const props = {
        [propName]: this.state.hovering,
        ...this.props,
      };

      return (
        <div
          onMouseOver={this.mouseOver}
          onFocus={this.mouseOver}
          onMouseOut={this.mouseOut}
          onBlur={this.mouseOut}
        >
          <Component {...props} />
        </div>
      );
    };
  };

export default withHover;
