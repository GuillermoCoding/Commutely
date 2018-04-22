import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ErrorMessage.css';

export default function ErrorMessage({ content }) {
  ErrorMessage.propTypes = {
    content: PropTypes.string.isRequired,
  };
  return (
    <div>
      <h2 className={styles.text}>{content }</h2>
    </div>
  );
}


