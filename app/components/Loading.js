import React from 'react';
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
  };

  static defaultProps = {
    text: 'Loading',
    speed: 300,
  };

  state = {
    content: this.props.text,
  };

  componentDidMount = () => {
    const { speed, text } = this.props;

    this.interval = window.setInterval(
      () =>
        this.state.content === `${text}...`
          ? this.setState({ content: text })
          : this.setState(({ content }) => ({ content: `${content}.` })),
      speed
    );
  };

  componentWillUnmount = () => window.clearInterval(this.interval);

  render = () => <p className="loading-text">{this.state.content}</p>;
}
