const CopyWebpackPlugin = require('copy-webpack-plugin'); // Add this in top

const webpack = require('webpack');
const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

module.exports = env => {
  const { PLATFORM, VERSION } = env;
  return merge([
      {
        module: {

          rules: [
            {
              test: /\.(png|jpg)$/,
              use:['file-loader']
            },

            {
              test:/\.css$/,
              use:['style-loader','css-loader']
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            },
            {
              test: /\.scss$/,
              use: [
                PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                'sass-loader'
              ]
            },
            {
              test: /\.svg$/,
              use: [
                  {
                      loader: "svg-sprite-loader",
                      options: {
                          esModule: false,
                          extract: true,
                          spriteFilename: "sprite.svg"
                      }
                  }
              ]
          },
            

          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
          }),
          new webpack.DefinePlugin({ 
            'process.env.VERSION': JSON.stringify(env.VERSION),
            'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
          }),
          new CopyWebpackPlugin([ { from: 'src/static' } ]), // Add this in the plugins section
          new SpriteLoaderPlugin(),
        ],
    }
  ])
};