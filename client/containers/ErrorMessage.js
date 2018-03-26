import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { fetchErrorMessage } from '../queries';
import { updateErrorMessage } from '../mutations';
import styles from '../styles/ErrorMessage.css';

class ErrorMessage extends Component {
    render(){
        return (
            <div>
                <h2 className={styles.text}>{this.props.fetchErrorMessage.errorMessage.content}</h2>
            </div>
        );  
    }

}

export default compose(
    graphql(fetchErrorMessage,{
        name: 'fetchErrorMessage'
    }),
    graphql(updateErrorMessage,{
        name: 'updateErrorMessage'
    })
)(ErrorMessage);
