import React from 'react';
import PropTypes from 'prop-types';

const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

const LanguagesNav = ({ selectedLanguage, onUpdateLanguage }) => (
  <ul className="flex-center">
    {languages.map(language => (
      <li key={language}>
        <button
          type="button"
          className="btn-clear nav-link"
          style={
            language === selectedLanguage ? { color: 'rgb(187, 46, 31)' } : null
          }
          onClick={() => onUpdateLanguage(language)}
        >
          {language}
        </button>
      </li>
    ))}
  </ul>
);

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

export default LanguagesNav;
