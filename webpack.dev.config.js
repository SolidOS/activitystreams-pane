const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: ["./dev/index.ts"],
    plugins: [new HtmlWebpackPlugin({ template: "./dev/index.html" })],
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
      fallback: { "path": false }
    },
    externals: {
      fs: "null",
      "node-fetch": "fetch",
      "isomorphic-fetch": "fetch",
      xmldom: "window",
      "text-encoding": "TextEncoder",
      "whatwg-url": "window",
      "@trust/webcrypto": "crypto",
    },
    devServer: {
      static: "./dist",
    },
    devtool: "source-map"
  },
];
