import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/HomeNavBar.css';

export default function HomeNavBar({ children }) {
  HomeNavBar.propTypes = {
    children: PropTypes.element.isRequired,
  };
  return (
    <div>
      <h2 className={styles.header}> Daily Commute</h2>
      {children}
    </div>
  );
}

