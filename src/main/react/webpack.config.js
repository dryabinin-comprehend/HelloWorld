const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const fs = require('fs');
process.env.NODE_ENV = 'production';
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    })
  ],
  entry: ["babel-polyfill",  __dirname + '/src/index.js'],
  output: {
    publicPath: './',
    path: resolveApp('../resources/static'),
    filename: 'bundle.js'
  },
  node: {
    net: 'empty',
  },
  devtool: '#sourcemap',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
      }
    ]
  }
}
