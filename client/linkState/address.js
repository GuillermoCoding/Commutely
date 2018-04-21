
const address = {
  defaults: {
    address: {
      __typename: 'address',
      homeAddress: '',
      city: null,
      state: null,
      error: false,
    },
  },
  resolvers: {
    Mutation: {
      updateAddress: (_, { homeAddress, city, state }, { cache }) => {
        const data = {
          address: {
            __typename: 'address',
            homeAddress,
            city,
            state,
          },
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
};

export default address;
