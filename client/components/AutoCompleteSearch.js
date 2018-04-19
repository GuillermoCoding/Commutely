import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import styles from '../styles/AutoCompleteSearch.css';

const AutoCompleteSearch = ({
  placeholder, getInputProps, isLoading, heading,
}) => (
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
export default AutoCompleteSearch;
