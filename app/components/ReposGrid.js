import React from 'react';
import PropTypes from 'prop-types';
import RepoCard from './RepoCard';

const ReposGrid = ({ repos }) => (
  <ul className="grid space-around">
    {repos.map((repo, index) => (
      <li key={repo.html_url}>
        <RepoCard repo={repo} index={index} />
      </li>
    ))}
  </ul>
);

ReposGrid.propTypes = { repos: PropTypes.array.isRequired };

export default ReposGrid;
