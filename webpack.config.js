const path = require('path');
const { NODE_ENV } = process.env; // Don't set a default value, leave it undefined to be filled by dotenv-webpack
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin;
const Dotenv = require('dotenv-webpack'); // Import dotenv-webpack

module.exports = {
  entry: './server.ts', // Assuming your server.ts is in the 'src' folder
  mode: NODE_ENV || 'development', // Set 'development' as default if NODE_ENV is not defined
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()], // Allows resolving paths from tsconfig.json
  },
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Faster builds in development mode
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Dotenv(), // Use dotenv-webpack to load environment variables from .env file
  ],
};
