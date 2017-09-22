const path = require('path');

module.exports = {
  entry: './templates/application.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
};