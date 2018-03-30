import gql from 'graphql-tag';

export default gql`
  query fetchLocationSuggestions($input: String){
	  locationSuggestions(input: $input)
  }`;