import gql from 'graphql-tag';

export default gql`
    query {
        errorMessage @client{
            content
        }
    }
`;