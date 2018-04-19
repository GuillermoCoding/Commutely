import gql from 'graphql-tag';

export default gql`
  mutation updateSearchedJob($title: String!) {
    updateSearchedJob(title: $title) @client{
      title
    }
  }`;
