import gql from 'graphql-tag';

export default gql`
	query fetchJobsTitles($jobPhrase: String){
		jobs(jobPhrase: $jobPhrase) {
			jobTitle
		}
	}`;