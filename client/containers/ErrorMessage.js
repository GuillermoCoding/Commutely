import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { fetchErrorMessage } from '../queries';
import { updateErrorMessage } from '../mutations';

class ErrorMessage extends Component {
    render(){
        console.log('error message displayed');
        console.log(this.props.fetchErrorMessage.errorMessage.content);
        return (
            <div>
                {this.props.fetchErrorMessage.errorMessage.content}
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
