export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./test/jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['node']
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(@uvdsl/solid-oidc-client-browser|uuid|@noble|@lit|@lit-labs|lit|lit-html|lit-element)(/|$))'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^SolidLogic$': 'solid-logic',
    '^solid-logic$': 'solid-logic',
    '^\\$rdf$': 'rdflib'
  },
}
