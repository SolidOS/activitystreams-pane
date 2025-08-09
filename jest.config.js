module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["./jest.setup.ts"],
    testEnvironmentOptions: {
      customExportConditions: ['node']
    }
};
