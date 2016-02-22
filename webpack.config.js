var path = require('path');

module.exports = {
  entry: {
    main: ['./app/scripts/main.js'],
    sw: ['./app/scripts/sw.js']
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js'
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
