import gql from 'graphql-tag';

export default gql`
  mutation updateAddress($homeAddress: String, $city: String, $state: String) {
    updateAddress(homeAddress : $homeAddress, city: $city, state: $state) @client {
      homeAddress
      city
      state
    }
  }`;
