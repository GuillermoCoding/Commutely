import gql from 'graphql-tag';

export default gql`
    mutation updateTimeOption($timeSelected: String){
        updateTimeOption(timeSelected: $timeSelected) @client{
            timeSelected
        }
    }
`;

