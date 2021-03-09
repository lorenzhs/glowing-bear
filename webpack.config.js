
"use strict";

const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build')
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                "index.html",
                "**/*.css",
                "**/*.svg",
                "**/*.png",
                "directives/*.html",
                "serviceworker.js",
                "electron-*.js",
                "../package.json",
                "manifest.json",
                "manifest.webapp",
                "webapp.manifest.json"
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
};
