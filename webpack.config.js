const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', //Output bundle
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
    ],
  },
  mode: 'development', //Mode can be 'development' or 'production'
};