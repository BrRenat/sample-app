const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const analyze = process.env.ANALYZE === 'true'
  ? [new BundleAnalyzerPlugin()]
  : []

module.exports = options => ({
  entry: {
    bundle: options.entry,
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
    ],
  },

  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
  }, options.output),

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.join(process.cwd(), 'src'),
      ],
      exclude: path.resolve('./node_modules'),
      query: options.babelQuery,
    }, {
      test: /\.css$/,
      include: [
        path.join(process.cwd(), 'src', 'styles'),
        path.join(process.cwd(), 'node_modules'),
      ],
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            context: '/',
          },
        },
        'postcss-loader',
      ],
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.svg$/,
      oneOf: [
        // svg, imported in 'styles.js' file
        // will be processed by file-loader
        {
          issuer: /styles\.js/,
          use: 'file-loader',
        },
        // overwise,
        // it will be processed by svg-sprite-loader
        {
          use: [{
            loader: 'svg-sprite-loader',
            options: {
              name: '[name]_[hash]',
              prefixize: true,
            },
          }],
        },
      ],
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 0,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      ],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
      },
    }],
  },
  plugins: options.plugins.concat([
    // ModuleConcatenationPlugin removes function-wrapper for each module
    // and decreases bundle size
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /us/
    ),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        ANALYZE: JSON.stringify(process.env.ANALYZE),
      },
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    ...analyze,
  ]),
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
    alias: {
      components: path.resolve(process.cwd(), 'src/components/'),
      containers: path.resolve(process.cwd(), 'src/containers/'),
      query: path.resolve(process.cwd(), 'src/query.js'),
      utils: path.resolve(process.cwd(), 'src/utils/'),
      'redux/': path.resolve(process.cwd(), 'src/redux/'),
    },
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
})
