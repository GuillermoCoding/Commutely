import gql from 'graphql-tag';

export default gql`
    query fetchJobs(
        $title: String, 
        $zipcode: String, 
        $startingPage: Int,
        $lat: Int,
        $lng: Int,
        $commuteSelected: String,
        $timeSelected: Int
        ){
        jobs(
            title: $title, 
            zipcode: $zipcode, 
            startingPage: $startingPage,
            lat : $lat,
            lng: $lng,
            commuteSelected: $commuteSelected,
            timeSelected: $timeSelected 
            ){
            title
            company
            city
            state
            country
            url
            routeAvailable
        }
    }`;
