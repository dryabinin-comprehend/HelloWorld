const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/bundle.css",
    }),
  ],
  entry: [
    'webpack-dev-server/client/?http://localhost:8080',
    "babel-polyfill",
    __dirname + '/index.js'
  ],
  output: {
    publicPath: 'static/',
    path: __dirname + '/static/',
    filename: 'bundle.js'
  },
  node: {
    net: 'empty',
  },
  devtool: '#sourcemap',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
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
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  }
}
