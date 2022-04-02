const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "notifier",
      template: "./public/index.html",
    }),
  ],
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.[s]css$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.[ot]tf$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    alias: {
      fonts: path.resolve(__dirname, "public/assets/fonts"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "app/index.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
};
