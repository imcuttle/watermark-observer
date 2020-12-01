const nps = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: nps.join(__dirname, '..'),
  entry: nps.join(__dirname, 'src'),
  mode: 'development',
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.png?$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: nps.join(__dirname, 'src/index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  }
}
