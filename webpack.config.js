var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: ['./app/scripts/main.js'],
    sw: ['./app/scripts/sw.js']
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/main.css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {
        from: './app/index.html',
        to: 'index.html'
      },
      {
        from: './app/public',
        to: 'public'
      }
    ])
  ]
};
