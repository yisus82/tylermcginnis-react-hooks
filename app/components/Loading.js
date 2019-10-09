import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ text = 'Loading', speed = 300 }) => {
  const [content, setContent] = React.useState(text);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setContent(OldContent =>
        OldContent === `${text}...` ? text : `${OldContent}.`
      );
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return <p className="loading-text">{content}</p>;
};

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

export default Loading;
