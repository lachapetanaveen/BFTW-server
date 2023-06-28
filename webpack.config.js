const path = require('path');
const { NODE_ENV = 'development' } = process.env;
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  }
};
