import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import styles from '../styles/AutoCompleteSearch.css';

export default function AutoCompleteSearch({
  placeholder, getInputProps, isLoading, heading,
}) {
  AutoCompleteSearch.propTypes = {
    placeholder: PropTypes.string.isRequired,
    getInputProps: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    heading: PropTypes.string.isRequired,
  };
  return (
    <div>
      <h6 className={styles.heading}>{heading}</h6>
      <div className={styles.container}>
        <div className={styles.icon}>
          {isLoading ? (
            <Loader
              type="Oval"
              color="rgb(0, 255, 153)"
              height="35"
              width="35"
            />
        ) : null}
        </div>
        <input className={styles.input} placeholder={placeholder} {...getInputProps()} />
      </div>
    </div>
  );
}
