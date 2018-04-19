import gql from 'graphql-tag';


export default gql`
  mutation updateErrorMessage($content: String){
    updateErrorMessage(content: $content) @client {
      content
    }
  }`;
