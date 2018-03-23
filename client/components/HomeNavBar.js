import React from 'react';
import { PageHeader } from 'react-bootstrap';
import styles from '../styles/HomeNavBar.css';

const HomeNavBar = (props)=>{
    return (
        <div>
            <PageHeader className={styles.header}>
                <h2 className={styles.text}>Daily Commute</h2>
            </PageHeader>
            {props.children}
        </div>
    );
}

export default HomeNavBar;