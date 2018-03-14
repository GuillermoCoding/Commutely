import query from '../queries';

const commuteOption = {
    defaults: {
        commuteOption: {
            __typename: "commuteOption",
            commuteSelected: "Car" 
        }
    },
    resolvers: {
        Mutation: {
            updateCommuteOption: (_,{commuteSelected},{cache})=>{
                const data = {
                    commuteOption: {
                        __typename: "commuteOption",
                        commuteSelected
                    }
                };
                cache.writeData({data});
            }
        }
    }
}
export default commuteOption;