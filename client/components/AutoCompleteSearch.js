import React from 'react';
import styles from '../styles/AutoCompleteSearch.css';

const AutoCompleteSearch = ({placeholder,getInputProps})=>{
  return (
    <input className={styles.input} placeholder={placeholder} {...getInputProps()} />
  );
}
export default AutoCompleteSearch;