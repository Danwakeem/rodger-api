const { gql } = require('apollo-server-lambda');
const { createTestClient } = require('apollo-server-testing');
const { getApolloServer } = require('./../get-apollo-server');

console.warn = jest.fn();

describe('GQL::Healthcheck', () => {
  let testServer;
  beforeEach(async () => {
    console.info = jest.fn();
    const server = await getApolloServer();
    testServer = createTestClient(server);
  });

  describe('Query::rodgerHealthCheck', () => {
    it('should return true', async () => {
      const out = await testServer.query({
        query: gql`
          query {
            rodgerHealthCheck
          }
        `,
      });

      expect(out.data.rodgerHealthCheck).toEqual(true);
    });
  });

  describe('Mutation::rodgerEcho', () => {
    it('should return input string', async () => {
      const expectedString = 'hi mom';
      const out = await testServer.query({
        mutation: gql`
          mutation ($input: Echo!) {
            rodgerEcho(input: $input)
          }
        `,
        variables: {
          input: { text: expectedString },
        },
      });

      expect(out.data.rodgerEcho).toEqual(expectedString);
    });
  });
});
