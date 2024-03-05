const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const generateHTMLConfig = (filename, chunks) => ({
  hash: true,
  filename: `${filename}.html`,
  template: `./src/${filename}.html`,
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  },
  chunks: [chunks],
});

module.exports = {
  mode: "none",
  entry: {
    app: ["@babel/polyfill", "./src/app/scripts/index.js", "./src/app/styles/style.scss"],
    home: ["@babel/polyfill", "./src/app/scripts/home.js", "./src/app/styles/home.scss"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[contenthash].js",
  },
  devServer: {
    port: 5050,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin(generateHTMLConfig("index", "app")),
    new HTMLWebpackPlugin(generateHTMLConfig("home", "home")),
    new MiniCssExtractPlugin({
      filename: "css/app.bundle.[contenthash].css",
    }),
  ],
};
