var path = require('path');

module.exports = {
  entry: {
    path: ['./app/scripts/main.js']
  },
  output: {
    path: path.join(__dirname, 'dist/scripts/'),
    publicPath: 'scripts/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  }
};
