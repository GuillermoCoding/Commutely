import gql from 'graphql-tag';
export default gql`
    query{
        timeOption @client {
            timeSelected
        }
    }

`;