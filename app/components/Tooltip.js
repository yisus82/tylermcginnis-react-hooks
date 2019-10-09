import React from 'react';
import PropTypes from 'prop-types';
import Hover from './Hover';

const Tooltip = ({ text, children }) => (
  <Hover
    render={hovering => (
      <div className="hover-container">
        {hovering === true && <div className="hover-tooltip">{text}</div>}
        {children}
      </div>
    )}
  />
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Tooltip;
