// @ts-nocheck

// Idea via https://github.com/kulshekhar/ts-jest/blob/main/e2e/native-esm-ts/jest.config.js
// Work around an issue where jest does not know that *.js files are actually
// .ts files in esm mode.
const importTsForJsInEsmResolver = (path, options) => {
  const mjsExtRegex = /\.js$/i
  const resolver = options.defaultResolver
  if (mjsExtRegex.test(path)) {
    try {
      return resolver(path.replace(mjsExtRegex, '.ts'), options)
    } catch {
      // use default resolver
    }
  }

  return resolver(path, options)
}

module.exports = importTsForJsInEsmResolver
