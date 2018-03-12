import query from '../queries/fetchAddress';

const address = {
    defaults: {
        address: {
            __typename: 'address',
            lat: null,
            lng: null,
            zipcode: null,
        }

    },
    resolvers: {
        Mutation: {
            updateAddress : (_,{lat,lng,zipcode},{cache}) =>{
                const data = {
                    address : {
                        __typename: 'address',
                        lat,
                        lng,
                        zipcode
                    }
                }
                cache.writeData({data});
                return null;
            }
        }
    }
}

export default address;