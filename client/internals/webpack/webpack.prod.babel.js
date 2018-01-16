// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = require('./webpack.base.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'src/index.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    publicPath: './',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
  },

  babelQuery: {
    presets: [
      'es2015',
      'stage-0',
      'react',
      ['env', {
        debug: true,
        modules: false,
        useBuiltIns: true,
        targets: {
          browsers: [
            '> 15%',
            'last 2 versions',
          ],
        },
      }],
    ],
    plugins: [
      'styled-components',
      'syntax-dynamic-import',
      'transform-decorators-legacy',
      'transform-object-rest-spread',
      'transform-class-properties',
    ],
  },

  plugins: [
    new UglifyJSPlugin(),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
  ],

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
});
