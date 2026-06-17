export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./test/jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['node']
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(?:@uvdsl/solid-oidc-client-browser)/)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^SolidLogic$': 'solid-logic',
    '^solid-logic$': '<rootDir>/../solid-logic/dist/index.js',
    '^\\$rdf$': 'rdflib'
  },
}
