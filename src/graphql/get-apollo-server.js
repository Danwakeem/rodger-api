const { ApolloServer } = require('apollo-server-lambda');
const { makeSchema } = require('./make-schema');
const { get } = require('lodash');
const ServerlessConsolePlugin = require('./../util/ExtendedApolloMetics');

let server;

const getApolloServer = async () => {
  if (!server) {
    server = new ApolloServer({
      schema: makeSchema(),
      apollo: {
        key: 'key1',
        graphRef: 'danj',
      },
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
      plugins: [
        ServerlessConsolePlugin(),
      ]
    });
  }

  return server;
};

module.exports = { getApolloServer };
