import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'qs';
import { battle } from '../utils/api';
import UserCard from './UserCard';
import Loading from './Loading';

export default class Results extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  componentDidMount = () => {
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search.slice(1)
    );

    console.log(playerOne, playerTwo);

    battle([playerOne, playerTwo])
      .then(players => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  };

  render = () => {
    const { winner, loser, error, loading } = this.state;

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
            label={winner.score === loser.score ? 'Tie' : 'Winner'}
            player={loser}
          />
        </div>
        <Link to="/battle" className="btn dark-btn btn-space">
          Reset
        </Link>
      </React.Fragment>
    );
  };
}
