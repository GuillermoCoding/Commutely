import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import styles from '../styles/AutoCompleteSearch.css';


//  <input className={styles.input} placeholder={placeholder} {...getInputProps()} />
const AutoCompleteSearch = ({placeholder,getInputProps, isLoading})=>{
  return (
    /*<InputGroup>
      <FormControl type="text" placeholder={placeholder}{...getInputProps()}/>
      <InputGroup.Addon>.00</InputGroup.Addon>
    </InputGroup>*/
    <div className={styles.container}>
    <div className={styles.icon}>
      {isLoading?(
        <Loader
          type='Oval'
          color="rgb(0, 255, 153)"
          height="35"	
          width="35"
        />
      ):null}
    </div>
    <input className={styles.input} placeholder={placeholder} {...getInputProps()}/>
    </div>
  );
}
export default AutoCompleteSearch;