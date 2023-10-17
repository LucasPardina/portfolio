const path = require('path');

module.exports = {
    mode: 'production', // Set the mode to "production"
    entry: {
        index: './public/js/index.js',
        reviews: './public/js/reviews.js',
        common: './public/js/common.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].bundle.js'
    },
    // Other Webpack configuration options...
};
