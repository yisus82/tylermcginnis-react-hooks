import React from 'react';
import { fetchPopularRepos } from '../utils/api';
import LanguagesNav from './LanguagesNav';
import ReposGrid from './ReposGrid';
import Loading from './Loading';

const popularReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        [action.selectedLanguage]: action.repos,
        error: null,
      };
    case 'error':
      return {
        ...state,
        error: action.error.message,
      };
    default:
      throw new Error(`That action type isn't supported.`);
  }
};

const Popular = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('All');
  const [state, dispatch] = React.useReducer(popularReducer, { error: null });

  const fetchedLanguages = React.useRef([]);

  React.useEffect(() => {
    if (!fetchedLanguages.current.includes(selectedLanguage)) {
      fetchedLanguages.current.push(selectedLanguage);
      fetchPopularRepos(selectedLanguage)
        .then(repos => dispatch({ type: 'success', selectedLanguage, repos }))
        .catch(error => dispatch({ type: 'error', error }));
    }
  }, [fetchedLanguages, selectedLanguage]);

  const isLoading = () => !state[selectedLanguage] && state.error === null;

  return (
    <React.Fragment>
      <LanguagesNav
        selectedLanguage={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />
      {isLoading() && <Loading text="Fetching Repos" />}
      {state.error && <p className="center-text error">{state.error}</p>}
      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </React.Fragment>
  );
};

export default Popular;
