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
                View more
            </button>
        );
    }

}

export default ViewMoreButton;