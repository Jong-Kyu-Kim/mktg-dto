const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const config = {
  entry: {
    dto: './src/dto.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              // '@babel/preset-typescript'
            ],
            plugins: ['babel-plugin-smart-webpack-import'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          //MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true
          //   }
          // },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
    },
  },

  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    //filename: '[name].[chunkhash].js'
    filename: '[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/dto.html',
      filename: 'dto.html',
    }),
    //new MiniCssExtractPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    //new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    //config.devtool = 'eval-cheap-source-map';
    //config.devtool = 'eval-source-map';
  }

  if (argv.mode === 'production') {
    config.plugins.push(
      //new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin()
    );
  }

  return config;
};
