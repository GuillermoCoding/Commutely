import gql from 'graphql-tag';

export default gql`
    query fetchJobs($title: String, $zipcode: String, $startingPage: Int){
        jobs(title: $title, zipcode: $zipcode, startingPage: $startingPage){
            title
            company
            city
            state
            country
            url
        }
    }`;
