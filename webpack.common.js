const path = require("path");
// var HtmlWebpackPlugin = require("html-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        //exclude: /node_modules\/(?!(\@pnp)\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            //configFile : './es5.babel.config.json',
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  useBuiltIns: false,
                  targets: {
                    browsers: ["IE 11"],
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
