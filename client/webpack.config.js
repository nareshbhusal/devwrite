const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

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
        })
    ],
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true
    }
}

config.devtool = config.mode ==='development' ? 'source-map' : false;

module.exports = config;