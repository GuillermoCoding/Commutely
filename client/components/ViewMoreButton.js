import React, { Component } from 'react';
import styles from '../styles/ViewMoreButton.css';

class ViewMoreButton extends Component {
    handleClick(){
        window.open(this.props.url);
    }
    render () {
        return (
            <button
                className={styles.button}
                onClick={this.handleClick.bind(this)}
                >
                <h6 className={styles.text}>
                View more
                </h6>
            </button>
        );
    }

}

export default ViewMoreButton;