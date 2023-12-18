// @ts-expect-error alias-hq does not have type definitions...
import hq from 'alias-hq'

/**
 * @type {import('jest').Config}
 */
export default {
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  resolver: '<rootDir>/jest.resolver.cjs',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/apps/web/.next/',
    '/apps/web/out/',
  ],
  watchPathIgnorePatterns: [
    '\\.gen\\.d\\.ts',
    '\\.gen\\.ts',
    '\\.gen\\.json',
    '\\.schema\\.json',
  ],
  testRegex: '\\.(spec|test)\\.[jt]sx?$',
  transform: {
    '^.+\\.(js|ts|tsx)$': [
      'esbuild-jest',
      {
        sourcemap: true,
        target: 'node20',
        format: 'esm',
      },
    ],
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  // https://github.com/davestewart/alias-hq/blob/main/docs/api/api.md
  // maybe this would be a reason to use ts-jest which has native support for pathsToModuleNameMapper
  // instead of esbuild-jest which does not?
  moduleNameMapper: hq.get('jest'),
}
