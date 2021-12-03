const { gql } = require('apollo-server-lambda');
const { animal } = require('faker');

const typeDefs = gql`
  input Echo {
    text: String!
  }
  type Query {
    rodgerHealthCheck: Boolean
    rodgerHealthCheck2: EchoType
  }
  type EchoType {
    something: String
    random: String
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
  },
  Mutation: {
    rodgerEcho: (_, { input }) => input.text,
    rodgerEcho2: (_, { input }) => ({
      something: input.text,
      random: animal.dog(),
    })
  },
};

module.exports = {
  healthCheckSchema: { typeDefs, resolvers },
};
