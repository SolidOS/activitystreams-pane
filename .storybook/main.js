module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-postcss"],
  webpackFinal: async (config) => {
    config.externals = {
      fs: "null",
    };
    return config;
  },
  core: {
    builder: 'webpack5',
  },
};
