/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig } */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 320,
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  useTabs: false
}

export default config