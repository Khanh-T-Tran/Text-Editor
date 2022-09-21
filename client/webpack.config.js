const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.


module.exports = () => {
  return {
    mode: 'development',
    // entry is where should webpack look first to start building and bundling all of our code
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // once webpack is finished bundling and building our code,
    // what should be the name of the file of our bundled code
    // and where should that file go once it's all finished bundling
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Adding Webpack plugin to generate HTML and inject our bundles
      new HtmlWebpackPlugin({ template: './index.html', title: 'JATE' }),
      // TODO: Add and configure workbox plugins for a service worker and manifest file.
      // service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({

      })
    ],

    // TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        },

      ],
    },
  };
};
