import gql from 'graphql-tag';

export default gql`
    query {
        fetchAddressSuggestion($input: String)
    }
`;