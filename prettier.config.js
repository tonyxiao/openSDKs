/** @satisfies {import('prettier').Config & Record<string, unknown>} */
const config = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: false,
  importOrder: [
    '^node:(.+)$',
    '<THIRD_PARTY_MODULES>',
    '^@opensdks/(.+)$',
    '^@/(.+)$',
    '^[./]',
  ],
  jsxSingleQuote: false,
  plugins: [
    // This plugin breaks on makeSyncEngine.ts... So commenting out for now.
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 80,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
}
module.exports = config

