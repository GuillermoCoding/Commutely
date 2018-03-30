import React from 'react';
import styles from '../styles/Phrase.css';

const Phrase = ({text})=> {
  return (
    <h6 className={styles.phrase}>{text}</h6>
  );
};

export default Phrase;