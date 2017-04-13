const path = require('path')
const webpack = require('webpack')
require('bootstrap-loader');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './src/index',
    'bootstrap-loader'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        exclude: path.join(__dirname, 'node_modules') },
      { test: /\.(scss)?$/,
        loader: 'style!sass',
        include: path.join(__dirname, 'src', 'styles') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'},
        {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
    ]
  }
}