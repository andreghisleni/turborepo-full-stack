// codegen.js
// change the schema's uri with our graphql server end point
module.exports = {
  overwrite: true,
  schema:'../api/src/schema.gql',
  documents: [
    '**/*.graphql',
  ],
  generates: {
    'src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ]
    }
  }
};