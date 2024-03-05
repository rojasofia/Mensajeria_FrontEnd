const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const sassLoader = require("sass-loader");

module.exports = {
    mode: "none",
    entry: {
      app: ["@babel/polyfill", "./src/app/scripts/index.js"],
      home: ["@babel/polyfill", "./src/app/scripts/home.js"],
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "js/[name].bundle.js",
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
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        hash: true,
        filename : "index.html",
        template: "./src/index.html",
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
        chunks: ["app"],
      }),
      new HTMLWebpackPlugin({
        hash: true,
        filename : "home.html",
        template: "./src/home.html",
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
        chunks: ["home"],
      }),
      new MiniCssExtractPlugin({
        filename: "css/app.bundle.css",
      })
    ],
  };