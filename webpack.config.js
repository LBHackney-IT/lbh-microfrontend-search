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
        externals: ['react-router-dom', 'formik', 'yup'],
        plugins: [
            new webpack.EnvironmentPlugin({
                SEARCH_API_URL: dotenv.SEARCH_API_URL || '',
                SEARCH_API_KEY: dotenv.SEARCH_API_KEY || '',
            }),
        ],
    });
};
