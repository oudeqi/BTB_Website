const { NODE_ENV } = require('../config')

let chunks = []
let minify = false

if (NODE_ENV === 'production') {
	chunks = ['manifest', 'vendor']
	minify = {
	    removeComments: true,
	    collapseWhitespace: true,
	    removeAttributeQuotes: true
	}
}

module.exports = [
	{
		js: {index: './pages/index/index.js'},
		html: {
			filename: 'index.html',
		    template: 'html-withimg-loader!./app/pages/index/index.html',
		    chunks: chunks.concat(['index']),
		    minify: minify,
		    chunksSortMode: 'dependency'
		}
	}
	
]