const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/application.js',
    plugins: [
              new CleanWebpackPlugin(['dist']),
              new HtmlWebpackPlugin({
                  title: 'Production',
                  template: './src/index.html'
              })
              ],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        noParse: /(mapbox-gl)\.js$/,
        rules: [{
            test: /\.css$/,
            use: [
                  'style-loader',
                  'css-loader'
                 ]
            }, {
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader"
        }],
        loaders: [{
            test: /\.(json|geojson)$/,
            loader: 'json-loader'
        }]
    }
};