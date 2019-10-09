import React from 'react';
import PropTypes from 'prop-types';
import useHover from '../hooks/useHover';

const Tooltip = ({ text, children }) => {
  const [hovering, attrs] = useHover();

  return (
    <div className="hover-container" {...attrs}>
      {hovering === true && <div className="hover-tooltip">{text}</div>}
      {children}
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Tooltip;
