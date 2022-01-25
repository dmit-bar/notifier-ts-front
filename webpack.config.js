const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
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
    path: path.resolve(__dirname, "public"),
  },
  devtool: "source-map",
};
