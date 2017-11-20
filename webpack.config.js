const path = require("path");
const webpack = require("webpack");
const ShakePlugin = require("webpack-common-shake").Plugin;
const MinifyPlugin = require("babel-minify-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";
const isProd = !isDev;

const filter = a => a.filter(Boolean);

module.exports = {
  devtool: isDev ? "source-map" : undefined,
  entry: {
    app: "./src/app.js",
    // XXX: comment the next line to see shaking working
    lib: "./src/lib.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [require.resolve("babel-preset-env")]
          }
        }
      }
    ]
  },
  plugins: filter([new ShakePlugin(), isProd && new MinifyPlugin()])
};
