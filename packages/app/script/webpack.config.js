const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    index: [
      path.join(__dirname, '../src/index.js'),
      // path.join(__dirname, '../src/asset/image/favicon/favicon.ico'),
      path.join(__dirname, '../src/index.html'),
    ],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: production ? '[name]-[hash:8].js' : '[name].js',
    publicPath: process.env.BUCKET
      ? `https://storage.googleapis.com/${process.env.BUCKET || 'bucket'}/`
      : '/',
  },

  resolve: {
    alias: {
      'react-redux': 'preact-redux',
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: [/\.html?$/, /\.ico/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },

      {
        test: [/\.bmp/, /\.gif/, /\.jpe?g/, /\.png/, /\.otf/, /\.svg/],
        loader: 'file-loader',
        options: {
          name: production ? '[hash:8].[ext]' : '[name].[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: [
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, '../dist', 'assetManifest.json'),
    }),
  ].filter(Boolean),

  devtool: production ? 'source-map' : false,

  devServer: {
    port: 8083,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}
