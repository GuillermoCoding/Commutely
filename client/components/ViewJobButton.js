import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ViewJobButton.css';

const ViewJobButton = ({ url }) => (
  <button
    className={styles.button}
    onClick={() => window.open(url)}
  >
    <h6 className={styles.text}>
        View job
    </h6>
  </button>
);
ViewJobButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ViewJobButton;
