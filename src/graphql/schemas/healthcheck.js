const { gql } = require('apollo-server-lambda');
const { animal } = require('faker');

const typeDefs = gql`
  input Echo {
    text: String!
  }
  type Query {
    rodgerHealthCheck: Boolean
    rodgerHealthCheck2: EchoType
    rodgerHealthError: Boolean
  }
  type EchoType {
    something: String
    random: String
    another: String
  }
  type Mutation {
    rodgerEcho(input: Echo!): String
    rodgerEcho2(input: Echo!): EchoType
  }
`;

const resolvers = {
  Query: {
    rodgerHealthCheck: () => true,
    rodgerHealthCheck2: () => ({
      something: animal.cat(),
      random: animal.dog()
    }),
    rodgerHealthError: () => {
      throw new Error('Sorry bub');
    },
  },
  Mutation: {
    rodgerEcho: (_, { input }) => input.text,
    rodgerEcho2: (_, { input }) => ({
      something: input.text,
      random: animal.dog(),
    })
  },
  EchoType: {
    another: async () => {
      const getBear = () => new Promise((resolve) => {
        setTimeout(() => {
          resolve(animal.bear());
        }, 1233);
      });
      const bear = await getBear();
      return bear;
    }
  }
};

module.exports = {
  healthCheckSchema: { typeDefs, resolvers },
};
