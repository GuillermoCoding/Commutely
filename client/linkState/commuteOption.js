import query from '../queries';

const commuteOption = {
    defaults: {
        commuteOption: {
            __typename: "commuteOption",
            commuteSelected: "Driving" 
        }
    },
    resolvers: {
        Mutation: {
            updateCommuteOption: (_,{commuteSelected},{cache})=>{
                console.log('resolver');
                console.log(commuteSelected);
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