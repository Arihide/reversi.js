const webpack = require('webpack');
const path = require('path');
const srcPath = __dirname;
const distPath = path.join(__dirname, 'build');
const exclude = [/node_modules/];
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    context: srcPath,
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: distPath,
        filename: 'reversi.js',
        library: 'Reversi'
    },
    plugins: [

        new CleanPlugin(['dist']),

        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: true,
        //     compress: {
        //         sequences: true,
        //         dead_code: true,
        //         conditionals: true,
        //         booleans: true,
        //         unused: true,
        //         if_return: true,
        //         join_vars: true,
        //     }
        // })

    ],
    module: {
        noParse: [/app\/bin/],
        rules: [
            {
                test: /.js$/,
                exclude: exclude,
                loader: 'babel-loader',
                query: {
                    comments: false,
                    compact: false,
                    presets: [
                        "env"
                    ]
                }
            }
        ]
    },
    resolve: {
        modules: [
            srcPath,
            "node_modules"
        ]
    }
};