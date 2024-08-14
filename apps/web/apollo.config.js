module.exports = {
  client: {
    excludes: ["**/generated/**/*"],
    service: {
      name: "full-stack",
      localSchemaFile: "./apps/api/src/schema.gql",
      // url: "http://localhost:5444/graphql",
    },
  },
};
