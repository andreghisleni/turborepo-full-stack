/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@agsolutions/eslint-config/nest'],
  // plugins: ['simple-import-sort'],
  rules: {
    'prettier/prettier': 'error',
    // 'simple-import-sort/imports': 'error',
    camelcase: 'off',
    "@typescript-eslint/no-unsafe-call": "off",
  },
}
