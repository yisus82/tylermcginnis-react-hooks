import React from 'react';
import PropTypes from 'prop-types';
import { ThemeConsumer } from '../contexts/theme';

const Card = ({ header, image, subheader, link, text, children }) => (
  <ThemeConsumer>
    {({ theme }) => (
      <div className={`card bg-${theme}`}>
        <h4 className="header-lg center-text">{header}</h4>
        <img className="avatar" src={image} alt={text} />
        {subheader && <h4 className="center-text">{subheader}</h4>}
        <h2 className="center-text">
          <a className="link" href={link}>
            {text}
          </a>
        </h2>
        {children}
      </div>
    )}
  </ThemeConsumer>
);

Card.propTypes = {
  header: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Card;
