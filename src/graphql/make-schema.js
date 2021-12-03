const { buildSubgraphSchema } = require('@apollo/federation');
const { healthCheckSchema } = require('./schemas/healthcheck');

const makeSchema = () => {
  const schemas = [healthCheckSchema];

  const schema = buildSubgraphSchema([
    ...schemas.map((s) => ({
      typeDefs: s.typeDefs,
      resolvers: s.resolvers,
    })),
  ]);

  return schema;
};

module.exports = { makeSchema };
