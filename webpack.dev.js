const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
//const WebpackShellPlugin = require('webpack-shell-plugin');


module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.es6.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: 'https://localhost:3000/',
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'test.aspx',
    //   template: './src/templateasp.html'
    // }),
    //new WebpackShellPlugin({onBuildStart:['node "./prov/lists.build.node.mjs"'], onBuildEnd:['echo "Webpack End"']})
  ],
  devServer: {
    // after: async function(app, server, compiler) {
    //   await import('./prov/pages.serve.node.mjs')
    // },
    //disableHostCheck: true,
    // headers: {
    //   "Access-Control-Allow-Origin": "http://localhost:8080",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Credentials" : "true",
    //   "Access-Control-Allow-Headers" : "X-Requested-With, content-type, Authorization, Origin, Content-Type, Accept"
    // },
    // proxy: {
    //   '/api': {
    //     // '/api': 'https://demo.spreecommerce.org/api/v2/storefront',
    //     // target: 'https://demo.spreecommerce.org/api/v2/storefront',
    //     target: 'http://localhost:3000',
    //     secure: false,
    //   }
      
    // }
  },
});

