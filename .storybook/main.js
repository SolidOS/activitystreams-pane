module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],

  webpackFinal: async (config) => {
    config.externals = {
      fs: 'null',
    }
    config.resolve = {
      ...config.resolve,
      extensions: [...config.resolve.extensions, '.ts', '.tsx'],
      fallback: {
        ...config.resolve.fallback,
        path: false
      }
    }
    return config
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}
