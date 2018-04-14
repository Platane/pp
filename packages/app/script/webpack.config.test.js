const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    index: [
      path.join(__dirname, '../src/__tests__/index.js'),
      // path.join(__dirname, '../src/asset/image/favicon/favicon.ico'),
      path.join(__dirname, '../src/index.html'),
    ],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: production ? '[name]-[hash:8].js' : '[name].js',
    publicPath: '/',
  },

  resolve: {
    alias: {
      tape: 'browser-tap',
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
          name: production
            ? 'static/[hash:8].[ext]'
            : 'static/[name].[hash:8].[ext]',
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
}
