import gql from 'graphql-tag';

export default gql`
  query {
    jobResults @client{
      jobs {
        title
        company
        address
        commuteTime
        commuteDistance
        snippet
        url
      }
    }
  }`;
