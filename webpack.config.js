const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        index: './public/js/index.js',
        reviews: './public/js/reviews.js',
        common: './public/js/common.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/js'), // From this file's directory, go to 'public'
        filename: '[name].bundle.js' //
    },
    watch: true // Update every change to the bundle
}