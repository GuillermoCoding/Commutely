import gql from 'graphql-tag';

export default gql`
  query{
    searchedJob @client{
      __typename
      title
    }
  }`;