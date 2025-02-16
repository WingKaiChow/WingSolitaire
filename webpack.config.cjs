const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: '> 0.25%, not dead',
                useBuiltIns: 'usage',
                corejs: 3,
                modules: 'auto'
              }]
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-export-namespace-from'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs'],
    mainFields: ['module', 'main']
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: __dirname + '/public', to: __dirname + '/dist' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
  devServer: {
    static: [
      {
        directory: __dirname + '/dist',
        publicPath: '/',
      },
      {
        directory: __dirname + '/public',
        publicPath: '/',
      }
    ],
    port: 8080,
    hot: true,
    devMiddleware: {
      publicPath: '/',
      writeToDisk: true
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use((req, res, next) => {
        console.log('Request:', req.method, req.url);
        next();
      });

      return middlewares;
    }
  },
};
