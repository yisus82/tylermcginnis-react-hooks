import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkUserExists } from '../utils/api';
import ThemeContext, { ThemeConsumer } from '../contexts/theme';

const PlayerInput = ({ onSubmit, label }) => {
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState(null);
  const theme = React.useContext(ThemeContext);

  const handleSubmit = event => {
    event.preventDefault();
    checkUserExists(username).then(exists => {
      if (exists) {
        onSubmit(username);
      } else {
        setError(`Username ${username} does not exist.`);
      }
    });
  };

  const handleChange = event => setUsername(event.target.value);

  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          id="username"
          className={`input-${theme}`}
          placeholder="Github username"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button
          className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PlayerInput;
