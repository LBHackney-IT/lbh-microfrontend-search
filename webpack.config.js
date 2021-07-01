const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config();

module.exports = (webpackConfigEnv, argv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: 'mtfh',
        projectName: 'search',
        webpackConfigEnv,
        argv,
    });

    return merge(defaultConfig, {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: 'file-loader',
                },
                {
                    test: /\.scss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        },
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, 'src/components'),
                '@services': path.resolve(__dirname, 'src/services'),
                '@types': path.resolve(__dirname, 'src/types'),
                '@utilities': path.resolve(__dirname, 'src/utils'),
            },
            extensions: ['.ts', '.tsx', '.js'],
        },
        externals: ['react-router-dom'],
        plugins: [
            new webpack.EnvironmentPlugin({
                SEARCH_API_URL: dotenv.SEARCH_API_URL || '',
                SEARCH_API_KEY: dotenv.SEARCH_API_KEY || '',
            }),
        ],
    });
};
