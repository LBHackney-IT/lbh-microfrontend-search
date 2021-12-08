const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
const {
  ImportMapWebpackPlugin,
} = require("@hackney/webpack-import-map-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mtfh",
    projectName: "search",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: {
      search: defaultConfig.entry,
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: "file-loader",
        },
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    externals: ["react-router-dom", "formik", "yup"],
    plugins: [
      new webpack.EnvironmentPlugin({
        SEARCH_API_URL: dotenv.SEARCH_API_URL || "",
      }),
      new ImportMapWebpackPlugin({
        namespace: "@mtfh",
        basePath: process.env.APP_CDN || "http://localhost:8070",
      }),
    ],
  });
};
