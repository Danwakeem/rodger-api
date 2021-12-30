const { promisify } = require('util');
const { unzip: unz } = require('zlib');
const { ApolloServerPluginUsageReporting } = require("apollo-server-core");
const { Report } = require("apollo-reporting-protobuf");

const unzip = promisify(unz);

module.exports = () => new ApolloServerPluginUsageReporting({
  sendReportsImmediately: true,
  fetcher: async (a, data) => {
    const unzippedBody = await unzip(data.body);
    console.log(JSON.stringify(Report.decode(unzippedBody), null, 2));
    return {
      status: 200,
      headers: {
        get: () => null,
      },
      text: () => Promise.resolve({message: 'done'})
    };
  }
})