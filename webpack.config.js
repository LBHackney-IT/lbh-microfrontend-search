const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: 'mtfh',
        projectName: 'search',
        webpackConfigEnv,
        argv,
    });

    return merge(defaultConfig, {
        // modify the webpack config however you'd like to by adding to this object
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
                '@search/components': path.resolve(__dirname, 'src/components'),
                '@search/services': path.resolve(__dirname, 'src/services'),
                '@search/utils': path.resolve(__dirname, 'src/utils'),
            },
            extensions: ['.ts', '.tsx', '.js'],
        },
    });
};
