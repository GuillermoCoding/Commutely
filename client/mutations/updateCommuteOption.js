import gql from 'graphql-tag';

export default gql`
    mutation updateCommuteOption($commuteSelected: String){
        updateCommuteOption(commuteSelected: $commuteSelected) @client{
            commuteSelected
        }
    }
`;

