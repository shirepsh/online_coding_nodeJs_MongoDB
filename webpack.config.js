// webpack.config.js
const path = require('path');

module.exports = {
  entry: './index.js', // adjust this based on your project structure
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};
