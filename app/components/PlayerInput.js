import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkUserExists } from '../utils/api';
import { ThemeConsumer } from '../contexts/theme';

class PlayerInput extends Component {
  state = {
    username: '',
    error: null,
  };

  /**
   * Handles submit
   * @param {{ preventDefault: () => void; }} event Submit event
   */
  handleSubmit = event => {
    event.preventDefault();
    const { username } = this.state;
    checkUserExists(username).then(exists => {
      if (exists) {
        this.props.onSubmit(username);
      } else {
        this.setState({ error: `Username ${username} does not exist.` });
      }
    });
  };

  /**
   * Handles change
   * @param {{ target: { value: any; }; }} event Change event
   */
  handleChange = event => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="player-label">
              {this.props.label}
            </label>
            <div className="row player-inputs">
              <input
                type="text"
                id="username"
                className={`input-${theme}`}
                placeholder="Github username"
                autoComplete="off"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
                type="submit"
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
            {this.state.error && <p className="error">{this.state.error}</p>}
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PlayerInput;
