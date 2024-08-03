/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@agsolutions/eslint-config/next', 'next/core-web-vitals'],
  // plugins: ['simple-import-sort'],
  rules: {
    // 'simple-import-sort/imports': 'error',
    camelcase: 'off',
    'no-restricted-syntax': 'off',
    "jsx-a11y/control-has-associated-label": 'off',
  },
}
