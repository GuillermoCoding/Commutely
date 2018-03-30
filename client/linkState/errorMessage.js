
const errorMessage = {
  defaults: {
    errorMessage: {
      __typename: 'errorMessage',
      content: ''
    }
  },
  resolvers: {
    Mutation: {
      updateErrorMessage : (_,{content},{cache}) =>{
        const data = {
          errorMessage : {
            __typename: 'errorMessage',
            content
          }
        }
        cache.writeData({data});
        return null;
      }
    }
  }
};

export default errorMessage;