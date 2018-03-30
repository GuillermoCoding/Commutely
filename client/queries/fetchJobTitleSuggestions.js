import gql from 'graphql-tag';

export default gql`
  query fetchJobTitleSuggestions($input: String){
	  jobTitleSuggestions(input: $input)
  }`;