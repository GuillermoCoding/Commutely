import gql from 'graphql-tag';


export default gql`
    mutation updateCurrentPage($currentPage: Int){
        updateCurrentPage(currentPage : $currentPage) @client{
            currentPage
        }
    }`;