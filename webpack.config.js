const path = require('path');

module.exports = {
  entry: './templates/application.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
      rules: [{
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
      }],
      loaders: [{
          test: /\.(json|geojson)$/,
          loader: 'json-loader'
      }]
    }
};