import React from 'react';
import { PageHeader } from 'react-bootstrap';
import styles from '../styles/HomeNavBar.css';

const HomeNavBar = (props)=>{
  return (
    <div>
      <h2 className={styles.header}> Daily Commute</h2>
      {props.children}
    </div>
    );
}

export default HomeNavBar;