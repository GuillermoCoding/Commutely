import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Phrase.css';

const Phrase = ({ text }) => (
  <h6 className={styles.phrase}>{text}</h6>
);
Phrase.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Phrase;
