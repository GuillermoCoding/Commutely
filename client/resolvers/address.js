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
            updateAddress : (_,{address},{cache}) =>{

                const data = {
                    address: {
                        lat : address.lat,
                        lng : address.lng,
                        zipcode : address.zipcode
                    }
                }
                cache.writeData({data});
                const result = cache.readQuery({query});
                console.log(result);
            }
        }
    }
}

export default address;