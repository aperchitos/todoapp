let webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: 'production',
  output: {
      filename: "js/todo-app.js"
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: ["node_modules"]
  },
  module: {
      rules: [
          {
            test: /\.(sass|scss)$/,
            use: [
              process.env.NODE_ENV !== 'production'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
              'resolve-url-loader'
            ],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
                }
              }
            ]
          },
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: { allowTsInNodeModules: true }
          }
      ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: 'style.css',
    }),
    new CopyPlugin([
      { from: 'src/assets/images', to: 'assets/images' }
    ]),
  ],
  devServer: {
    contentBase: './src',
    port: 8080,
  } 
};
