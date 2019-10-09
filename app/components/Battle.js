import React from 'react';
import { Link } from 'react-router-dom';
import Instructions from './Instructions';
import PlayerInput from './PlayerInput';
import PlayerPreview from './PlayerPreview';

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
  };

  /**
   * Handles submit
   * @param {string} id Player Id
   * @param {string} username Github username
   */
  handleSubmit = (id, username) =>
    this.setState({
      [id]: username,
    });

  /**
   * Handles reset
   * @param {string} id Player Id
   */
  handleReset = id =>
    this.setState({
      [id]: null,
    });

  render = () => {
    const { playerOne, playerTwo } = this.state;

    return (
      <React.Fragment>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={player => this.handleSubmit('playerOne', player)}
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                label="Player One"
                onReset={() => this.handleReset('playerOne')}
              />
            )}
            {playerTwo === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={player => this.handleSubmit('playerTwo', player)}
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                label="Player Two"
                onReset={() => this.handleReset('playerTwo')}
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
}
