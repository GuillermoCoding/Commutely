import gql from 'graphql-tag';


export default gql`
  mutation updateStartingIndex($index: Int){
    updateStartingIndex(jobs: $jobs) @client {
      title
    }
  }`;