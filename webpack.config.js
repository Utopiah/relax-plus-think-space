const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    https: true,
    port: 3000,
    contentBase: './dist'
  },
  devtool: 'source-map',
  plugins: [
  ],
  optimization: {
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ['babel-loader', 'aframe-super-hot-loader']
      },
      {
        test: /\.json/,
        exclude: /(node_modules)/,
        type: 'javascript/auto',
        loader: ['json-loader']
      },
      {
        test: /\.html/,
        exclude: /(node_modules)/,
        use: [
          'aframe-super-hot-html-loader',
          {
            loader: 'html-require-loader',
            options: {
              root: path.resolve(__dirname, 'src')
            }
          }
        ]
      },
      {
        test: /\.glsl/,
        exclude: /(node_modules)/,
        loader: 'webpack-glsl-loader'
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg)/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'node_modules')]
  }
}
