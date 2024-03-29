import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'qs';
import { battle } from '../utils/api';
import UserCard from './UserCard';
import Loading from './Loading';

const battleReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        winner: action.winner,
        loser: action.loser,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        ...state,
        error: action.message,
        loading: false,
      };
    default:
      throw new Error(`That action type isn't supported`);
  }
};

const Results = ({ location }) => {
  const { playerOne, playerTwo } = queryString.parse(location.search.slice(1));
  const [state, dispatch] = React.useReducer(battleReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  });

  React.useEffect(() => {
    battle([playerOne, playerTwo])
      .then(players =>
        dispatch({ type: 'success', winner: players[0], loser: players[1] })
      )
      .catch(({ message }) => dispatch({ type: 'error', message }));
  }, [playerOne, playerTwo]);

  const { winner, loser, error, loading } = state;

  if (loading) {
    return <Loading text="Battling" />;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      <div className="grid space-around container-sm">
        <UserCard
          label={winner.score === loser.score ? 'Tie' : 'Winner'}
          player={winner}
        />
        <UserCard
          label={winner.score === loser.score ? 'Tie' : 'Loser'}
          player={loser}
        />
      </div>
      <Link to="/battle" className="btn dark-btn btn-space">
        Reset
      </Link>
    </React.Fragment>
  );
};

Results.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Results;
