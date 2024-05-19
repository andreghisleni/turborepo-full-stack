/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@agsolutions/eslint-config/nest'],
  // plugins: ['simple-import-sort'],
  rules: {
    // 'simple-import-sort/imports': 'error',
    camelcase: 'off',
  },
}
