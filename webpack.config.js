const path = require("path");
const { EnvironmentPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const metrikaHTML = `
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(95730968, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/95730968" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
`;

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
window.firstVisit = true;
window.room = 1;
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
`;

if (process.env.NODE_ENV === "production") {
  ENV_EMAIL = `{{.User.Email}}`;
  ENV_DATA = `
window.firstVisit = {{.RoomData.FirstVisit}};
window.room = {{.RoomData.RoomNum}};
window.giftsInModal = {{.RoomData.Gifts}};
window.giftsPosions = {{.RoomData.Gifts}};
window.csrfToken = {{.CsrfToken}};
`;
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
        caseSensitive: true,
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
