import gql from 'graphql-tag';

export default gql`
    query {
        address @client{
            lat
            lng
            zipcode
        }
    }
`;