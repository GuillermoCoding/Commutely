import React from 'react';
import { PageHeader } from 'react-bootstrap';
import styles from '../styles/HomeNavBar.css';

const HomeNavBar = (props)=>{
    return (
        <PageHeader className={styles.header}>
            <h2 className={styles.text}>Daily Commute</h2>
        </PageHeader>
    );
}

export default HomeNavBar;