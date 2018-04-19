import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/AutoCompleteResults.css';

export default function AutoCompleteResults({
  results, getItemProps, highlightedIndex,
}) {
  AutoCompleteResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    getItemProps: PropTypes.func.isRequired,
    highlightedIndex: PropTypes.number.isRequired,
  };
  return (
    <div className={styles.results}>
      {results.map((result, index) => (
        <div
          className={styles.item}
          key={result}
          {...getItemProps({ item: result })}
          style={{ backgroundColor: index === highlightedIndex ? 'rgb(179, 255, 224)' : 'white' }}
        >
          {result}
        </div>
        ))}
    </div>
  );
}

