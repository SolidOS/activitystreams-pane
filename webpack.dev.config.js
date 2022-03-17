const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = [
  {
    mode: "development",
    entry: ["./dev/index.ts"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "dev.bundle.js",
    },
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
    devtool: "source-map",
  },
];
