import gql from 'graphql-tag';

export default gql`
  mutation resetJobResults{
    resetJobResults @client{
      response
    }
  }`;

