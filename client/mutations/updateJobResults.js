import gql from 'graphql-tag';


export default gql`
  mutation updateJobResults($jobs: [Jobs]){
    updateJobResults(jobs: $jobs) @client {
      jobs
    }
  }`;
