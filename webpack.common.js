const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/application.tsx',
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
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
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
                }, {
                    test: /\.tsx?$/, 
                    loader: "awesome-typescript-loader"
                }, {
                    enforce: "pre", 
                    test: /\.js$/, 
                    loader: "source-map-loader"
                }],
        loaders: [{
            test: /\.(json|geojson)$/,
            loader: 'json-loader'
        }]
    }
};