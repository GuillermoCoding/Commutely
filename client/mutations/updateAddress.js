import gql from 'graphql-tag';

export default gql`
    mutation updateAddress($lat: String, $lng: String, $zipcode: String) {
        updateAddress(lat: $lat, lng: $lng, zipcode: $zipcode) @client {
            lat
            lng
            zipcode
        }
    }
`;