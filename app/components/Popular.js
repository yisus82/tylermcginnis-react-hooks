import React from 'react';
import { fetchPopularRepos } from '../utils/api';
import LanguagesNav from './LanguagesNav';
import ReposGrid from './ReposGrid';
import Loading from './Loading';

export default class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: {},
    error: null,
  };

  componentDidMount = () => this.updateLanguage(this.state.selectedLanguage);

  /**
   * Updates the selected language
   * @param {string} selectedLanguage Selected language
   */
  updateLanguage = selectedLanguage => {
    this.setState({ selectedLanguage, error: null });
    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data,
            },
          }));
        })
        .catch(error => {
          console.warn('Error fetching repos: ', error);

          this.setState({
            error: `There was an error fetching the repositories.`,
          });
        });
    }
  };

  /**
   * Checks if component is loading repos
   */
  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
  };

  render = () => {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <Loading text="Fetching Repos" />}
        {error && <p className="center-text error">{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  };
}
