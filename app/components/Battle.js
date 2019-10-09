import React from 'react';
import { Link } from 'react-router-dom';
import Instructions from './Instructions';
import PlayerInput from './PlayerInput';
import PlayerPreview from './PlayerPreview';

const Battle = () => {
  const [playerOne, setPlayerOne] = React.useState(null);
  const [playerTwo, setPlayerTwo] = React.useState(null);

  /**
   * Handles submit
   * @param {string} id Player Id
   * @param {string} username Github username
   */
  const handleSubmit = (id, username) =>
    id === 'playerOne' ? setPlayerOne(username) : setPlayerTwo(username);

  /**
   * Handles reset
   * @param {string} id Player Id
   */
  const handleReset = id =>
    id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null);

  return (
    <React.Fragment>
      <Instructions />
      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={player => handleSubmit('playerOne', player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={() => handleReset('playerOne')}
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={player => handleSubmit('playerTwo', player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={() => handleReset('playerTwo')}
            />
          )}
        </div>
        {playerOne && playerTwo && (
          <Link
            type="button"
            className="btn dark-btn btn-space"
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  );
};

export default Battle;
