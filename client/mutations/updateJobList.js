import gql from 'graphql-tag';


export default gql`
    mutation updateJobList($jobs: [Jobs]){
        updateJobList(jobs: $jobs) @client {
            title
        }
    }
`;