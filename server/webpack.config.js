const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const dotenv = require('dotenv');
const NodemonPlugin = require('nodemon-webpack-plugin')

const envPath = `${process.env.NODE_ENV.toLowerCase()}.env`
const env = dotenv.config({ path: envPath }).parsed;
  
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: ["@babel/polyfill", "./src/app.js"],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()], // to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new NodemonPlugin()
  ]
}