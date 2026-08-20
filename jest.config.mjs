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
  transformIgnorePatterns: ['/node_modules/(?!lit-html|lit|@lit|@uvdsl/solid-oidc-client-browser|uuid|@noble|solid-logic|solid-ui|@awesome.me|@shoelace-style)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^SolidLogic$': 'solid-logic',
    '^\\$rdf$': 'rdflib'
  },
}
