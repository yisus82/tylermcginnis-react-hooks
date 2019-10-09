import React from 'react';
import PropTypes from 'prop-types';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa';
import Card from './Card';
import Tooltip from './Tooltip';

const RepoCard = ({ repo, index }) => {
  const {
    name,
    owner,
    html_url: htmlUrl,
    stargazers_count: stargazersCount,
    forks,
    open_issues: openIssues,
  } = repo;
  const { login, avatar_url: avatarUrl } = owner;

  return (
    <Card header={`#${index + 1}`} image={avatarUrl} link={htmlUrl} text={name}>
      <ul className="card-list">
        <li>
          <Tooltip text="Github username">
            <FaUser color="rgb(255, 191, 116)" size={22} />
            <a href={`https://github.com/${login}`}>{login}</a>
          </Tooltip>
        </li>
        <li>
          <FaStar color="rgb(255, 215, 0)" size={22} />
          {stargazersCount.toLocaleString()} stars
        </li>
        <li>
          <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
          {forks.toLocaleString()} forks
        </li>
        <li>
          <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
          {openIssues.toLocaleString()} open
        </li>
      </ul>
    </Card>
  );
};

RepoCard.propTypes = {
  repo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default RepoCard;
