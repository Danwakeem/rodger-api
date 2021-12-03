const fs = require('fs');
const path = require('path');
const { printSchema } = require('graphql');
const { makeSchema } = require('../graphql/make-schema');

try {
  const outputPath = path.resolve(process.cwd(), 'schema.graphql');
  fs.writeFileSync(outputPath, printSchema(makeSchema()), 'utf-8');
} catch (error) {
  throw new Error(error);
}
