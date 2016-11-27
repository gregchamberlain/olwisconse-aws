var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/client/index',
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url?limit=10000!img?progressive=true'
    }]
  }
};
