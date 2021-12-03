const { getApolloServer } = require('./get-apollo-server');

const graphqlHandler = async (event, context, callback) => {
  return getApolloServer().then((server) => {
    const apolloHandler = server.createHandler({
      cors: {
        origin: '*',
        methods: 'POST',
        allowedHeaders: ['Content-Type', 'Origin', 'Accept'],
      },
    });
    return apolloHandler(event, context, callback);
  });
};

module.exports = { handler: graphqlHandler };
