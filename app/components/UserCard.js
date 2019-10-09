import React from 'react';
import PropTypes from 'prop-types';
import {
  FaCompass,
  FaBriefcase,
  FaCode,
  FaUsers,
  FaUserFriends,
  FaUser,
} from 'react-icons/fa';
import Card from './Card';
import Tooltip from './Tooltip';

const UserCard = ({ label, player }) => (
  <Card
    header={label}
    image={player.profile.avatar_url}
    subheader={`Score: ${player.score.toLocaleString()}`}
    link={player.profile.html_url}
    text={player.profile.login}
  >
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {player.profile.name}
      </li>
      {player.profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {player.profile.location}
          </Tooltip>
        </li>
      )}
      {player.profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color="#795548" size={22} />
            {player.profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {player.profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {player.profile.following.toLocaleString()} following
      </li>
      <li>
        <FaCode color="rgb(64, 64, 64)" size={22} />
        {player.profile.public_repos.toLocaleString()} repositories
      </li>
    </ul>
  </Card>
);

UserCard.propTypes = {
  label: PropTypes.string.isRequired,
  player: PropTypes.object.isRequired,
};

export default UserCard;
