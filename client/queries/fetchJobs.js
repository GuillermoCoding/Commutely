import gql from 'graphql-tag';

export default gql`
    query fetchJobs($title: String, $zipcode: String){
        jobs(title: $title, zipcode: $zipcode){
            title
            company
            city
            state
            country
            url
        }
    }`;
