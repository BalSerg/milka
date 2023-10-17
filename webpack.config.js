const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Если вставить сюда код метрики, она автоматом
// окажется во всех HTML-файлах
const metrikaHTML = ``;

// Список HTML-ок, к каждой отдельный JS
const listOfHTML = ["index", "rooms", "reset"];

const HtmlPluginList = [];
const entry = {};
listOfHTML.forEach((html) => {
  entry[html] = path.join(__dirname, `src/${html}.js`);

  HtmlPluginList.push(
    new HtmlWebpackPlugin({
      templateParameters: {
        metrikaHTML,
      },
      minify: {
        collapseWhitespace: process.env.NODE_ENV === "production",
        removeComments: process.env.NODE_ENV === "production",
        minifyCSS: process.env.NODE_ENV === "production",
      },
      hash: true,
      chunks: [html],
      filename: `${html}.html`,
      template: `./src/${html}.html`,
    }),
  );
});

module.exports = {
  entry,
  // entry: path.resolve(__dirname, "src/index.js"),
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    assetFilter(assetFilename) {
      return assetFilename.endsWith(".js");
    },
  },
  devtool:
    process.env.NODE_ENV === "production" ? false : "eval-cheap-source-map",
  devServer: {
    allowedHosts: "all",
    client: {
      logging: "info",
      progress: true,
    },
    compress: true,
    https: true,
    host: "0.0.0.0",
    hot: true,
    port: 8080,
    open: true,

    static: {
      directory: path.join(__dirname, "src"),
    },
    // publicPath: "https://localhost:8080/",
    // watchContentBase: true,
    //
    // index: "index.html",
    // openPage: "https://localhost:8080/",
  },
  optimization: {
    // splitChunks: {
    //   chunks: "all",
    //   minSize: 100000,
    //   maxSize: 800000,
    // },
    // runtimeChunk: "single",
    minimize: process.env.NODE_ENV === "production",
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        // cache: false,
        // parallel: true,
        // sourceMap: false,
        terserOptions: {
          format: {
            comments: false,
          },
          //   compress: {},
          //   mangle: true,
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...HtmlPluginList,
    // new EnvironmentPlugin(),
    new CopyPlugin({ patterns: [{ from: "src/assets", to: "assets" }] }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    // filename: "main.js",
    path: path.resolve(__dirname, `build`),
  },
  module: {
    rules: [
      // { test: /\.ts?$/, loader: "ts-loader" },
      // {
      //   test: /\.svg/,
      //   type: "asset/source",
      //   // type: "asset/inline",
      // },
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        // use: {
        // loader: "babel-loader",
        // },
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: process.env.NODE_ENV === "production",
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
              sourceMap: process.env.NODE_ENV === "production",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      three: path.resolve("./node_modules/three"),
    },
    fallback: {
      fs: false,
    },
    extensions: [".js", ".ts", ".wasm"],
  },
};
