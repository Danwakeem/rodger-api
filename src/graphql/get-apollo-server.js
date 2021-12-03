const { ApolloServer } = require('apollo-server-lambda');
const { makeSchema } = require('./make-schema');
const { get } = require('lodash');

let server;

const getApolloServer = async () => {
  if (!server) {
    server = new ApolloServer({
      schema: makeSchema(),
      context: ({ event }) => {
        /* istanbul ignore next */
        if (process.env.MOCKED_VIEWER === 'true') {
          event = {
            headers: {
              viewer: JSON.stringify({ id: 'fakeId' }),
            },
          };
        }
        const headerViewer = get(event, 'headers.viewer') || '{}';
        const viewer = JSON.parse(headerViewer);
        return {
          event,
          viewer,
        };
      },
      introspection: true,
    });
  }

  return server;
};

module.exports = { getApolloServer };
