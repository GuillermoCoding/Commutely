import gql from 'graphql-tag';

export default gql`
  mutation resetJobList{
    resetJobList @client{
      response
    }
  }`;

