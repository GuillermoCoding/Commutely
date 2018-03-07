import gql from 'graphql-tag';

export default gql`
	query fetchSuggestions($title: String){
		suggestions(title: $title) {
			title
		}
	}`;