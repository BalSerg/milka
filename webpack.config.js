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

const ENV_URLS = {
  register: process.env.NODE_ENV === "production" ? "/register" : "index.html",
  login: process.env.NODE_ENV === "production" ? "/login" : "login.html",
  room: process.env.NODE_ENV === "production" ? "{{.RoomLink}}" : "room.html",
  rooms: process.env.NODE_ENV === "production" ? "/personal" : "rooms.html",
  reset:
    process.env.NODE_ENV === "production" ? "/personal/reset" : "reset.html",
  logout: "/logout",
};

let ENV_EMAIL = "example@mail.ru";
let ENV_DATA = `
window.giftsInModal = [
        { src: "gift1", class: "is-can-get" },
        { src: "gift2", class: "is-can-get" },
        { src: "gift3", class: "is-can-get" },
        { src: "gift4", class: "is-can-get" },
        { src: "gift5", class: "is-can-get" },
        { src: "gift6", class: "is-can-get" },
        { src: "gift7", class: "is-can-get" },
        { src: "gift8", class: "is-can-get" },
        { src: "gift9", class: "is-can-get" },
        { src: "gift10", class: "is-can-get" },
        { src: "gift11", class: "is-can-get" },
        { src: "gift12", class: "is-can-get" },
        { src: "gift13", class: "is-can-get" },
        { src: "gift14", class: "is-can-get" },
        { src: "gift15", class: "is-can-get" },
        { src: "gift16", class: "is-can-get" },
        { src: "gift17", class: "is-can-get" },
        { src: "gift18", class: "is-can-get" },
        { src: "gift19", class: "is-can-get" },
        { src: "gift20", class: "is-can-get" },
        { src: "gift21", class: "is-can-get" },
        { src: "gift22", class: "is-can-get" },
        { src: "gift23", class: "is-can-get" },
        { src: "gift24", class: "is-can-get" },
        { src: "gift25", class: "is-can-get" },
        { src: "gift26", class: "is-can-get" },
      ];
      window.giftsInModalMobile = [
        { src: "gift1_m", class: "is-can-get" },
        { src: "gift2_m", class: "is-can-get" },
        { src: "gift3_m", class: "is-can-get" },
        { src: "gift4_m", class: "is-can-get" },
        { src: "gift5_m", class: "is-can-get" },
        { src: "gift6_m", class: "is-can-get" },
        { src: "gift7_m", class: "is-can-get" },
        { src: "gift8_m", class: "is-can-get" },
        { src: "gift9_m", class: "is-can-get" },
        { src: "gift10_m", class: "is-can-get" },
        { src: "gift11_m", class: "is-can-get" },
        { src: "gift12_m", class: "is-can-get" },
        { src: "gift13_m", class: "is-can-get" },
        { src: "gift14_m", class: "is-can-get" },
        { src: "gift15_m", class: "is-can-get" },
        { src: "gift16_m", class: "is-can-get" },
        { src: "gift17_m", class: "is-can-get" },
        { src: "gift18_m", class: "is-can-get" },
        { src: "gift19_m", class: "is-can-get" },
        { src: "gift20_m", class: "is-can-get" },
        { src: "gift21_m", class: "is-can-get" },
        { src: "gift22_m", class: "is-can-get" },
        { src: "gift23_m", class: "is-can-get" },
        { src: "gift24_m", class: "is-can-get" },
        { src: "gift25_m", class: "is-can-get" },
        { src: "gift26_m", class: "is-can-get" },
      ];
`;

if (process.env.NODE_ENV === "production") {
  ENV_EMAIL = `{{.User.Email}}`;
  // ENV_DATA = `{{.Room}}`;
}

// Список HTML-ок, к каждой отдельный JS
const listOfHTML = ["index", "rooms", "reset", "room", "login"];

const HtmlPluginList = [];
const entry = {};
listOfHTML.forEach((html) => {
  entry[html] = path.join(__dirname, `src/${html}.js`);

  HtmlPluginList.push(
    new HtmlWebpackPlugin({
      templateParameters: {
        metrikaHTML,

        ENV_EMAIL,
        ENV_DATA,
        ENV_URLS,
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
    publicPath: "/",
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
