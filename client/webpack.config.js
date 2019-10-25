const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const dotenv = require('dotenv');

const envPath = `${process.env.NODE_ENV.toLowerCase() || 'production'}.env`
const env = dotenv.config({ path: envPath }).parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});


const config = {

    entry : ["@babel/polyfill", "./src/index.js"],
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module : {
        rules : [
            {
                test : /\.(js)$/,
                exclude: /node_modules/,
                use:'babel-loader'
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader?modules=true'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
              },
        ]
    },
    mode: process.env.NODE_ENV || 'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.DefinePlugin(envKeys)
    ],
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true
    }
}

config.devtool = config.mode ==='development' ? 'source-map' : false;

module.exports = config;