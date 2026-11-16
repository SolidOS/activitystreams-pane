export default {
  testEnvironment: 'jsdom',
  setupFiles: ['./test/helpers/globals.js'],
  setupFilesAfterEnv: ['./test/jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['node']
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
  transformIgnorePatterns: ['/node_modules/(?!@dokieli/web-access-control|@rdfjs|n3|lit-html|lit|@lit|@uvdsl/solid-oidc-client-browser|uuid|@noble|solid-logic|solid-ui|@awesome.me|@shoelace-style)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^SolidLogic$': 'solid-logic',
    '^\\$rdf$': 'rdflib',
    // @dokieli/web-access-control@1.1.0 is ESM-only: "type": "module" and an "exports"
    // map with only types/import, no require. solid-logic's CJS build therefore does
    // require('@dokieli/web-access-control'), which jest's CJS resolver cannot resolve
    // (ERR_PACKAGE_PATH_NOT_EXPORTED). Point at the ESM file directly and let babel
    // transform it (see transformIgnorePatterns).
    // Temporary: drop this once activitystreams-pane moves to vitest, which is ESM native.
    '^@dokieli/web-access-control$': '<rootDir>/node_modules/@dokieli/web-access-control/dist/index.js'
  },
}
