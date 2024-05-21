/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@agsolutions/eslint-config/nest'],
  // plugins: ['simple-import-sort'],
  rules: {
    // 'simple-import-sort/imports': 'error',
    camelcase: 'off',
    "t@typescript-eslint/no-unsafe-call": "off",
  },
}
