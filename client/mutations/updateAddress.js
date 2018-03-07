import gql from 'graphql-tag';

export default gql`
    mutation updateAddress($address: Address) {
        updateAddress(address : $address) @client {
            lat
            lng
            zipcode
        }
    }
`;