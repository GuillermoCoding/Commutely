import gql from 'graphql-tag';

export default gql`
    query {
        jobList @client{
           jobs {
               title
                company
                city
                state
                country
                url
                routeAvailable
           }
        }
    }`;
