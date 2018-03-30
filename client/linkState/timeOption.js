const timeOption = {
    defaults: {
        timeOption: {
            __typename: "timeOption",
            timeSelected: "20" 
        }
    },
    resolvers: {
        Mutation: {
            updateTimeOption: (_,{timeSelected},{cache})=>{
                const data = {
                    timeOption: {
                        __typename: "timeOption",
                        timeSelected
                    }
                };
                cache.writeData({data});
            }
        }
    }
}
export default timeOption;