import gql from 'graphql-tag';

export default gql`
  query fetchJobs(
    $title: String, 
    $homeAddress: String,
    $city: String,
    $state: String,
    $commuteSelected: String,
    $timeSelected: Int
    $startingIndex: Int,
    ){
      jobs(
        title: $title,
        homeAddress: $homeAddress,
        city: $city,
        state: $state,
        commuteSelected: $commuteSelected,
        timeSelected: $timeSelected,
        startingIndex: $startingIndex,
        ){
        title
        company
        address
        commuteTime
        commuteDistance
        snippet
        url
      }
    }`;
