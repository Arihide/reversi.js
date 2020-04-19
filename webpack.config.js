const webpack = require('webpack');
const path = require('path');
const srcPath = __dirname;
const distPath = path.join(__dirname, 'build');
const exclude = [/node_modules/];

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