const nps = require('path')

const base = ({ name, filename, mode }) => {
  return {
    name,
    context: nps.join(__dirname),
    entry: nps.join(__dirname, 'src'),
    mode: mode || 'production',
    devtool: mode === 'development' ? 'source-map' : false,
    output: {
      path: nps.join(__dirname, 'dist'),
      filename,
      libraryTarget: 'umd',
      library: name
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json']
    }
  }
}

module.exports = [
  base({
    name: 'WatermarkObserver',
    mode: 'development',
    filename: 'index.development.js'
  }),
  base({
    name: 'WatermarkObserver',
    mode: 'production',
    filename: 'index.production.js'
  })
]
