import React from 'react';
import styles from '../styles/ViewJobButton.css';

const ViewJobButton = ({url})=> {

  return (
      <button
        className={styles.button}
        onClick={()=>window.open(url)}
        >
        <h6 className={styles.text}>
        View job
        </h6>
      </button>
  );
};

export default ViewJobButton;