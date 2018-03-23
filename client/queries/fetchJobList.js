import gql from 'graphql-tag';

export default gql`
    query {
        jobList @client{
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
