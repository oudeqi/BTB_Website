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
		js: {index: './app/pages/index/index.js'},
		html: {
			filename: 'index.html',
		    template: 'html-withimg-loader!./app/pages/index/index.html',
		    chunks: chunks.concat(['index']),
		    minify: minify,
		    chunksSortMode: 'dependency'
		}
	},
    {
        js: {newsDetails: './app/pages/news-details/news-details.js'},
        html: {
            filename: 'news-details.html',
            template: 'html-withimg-loader!./app/pages/news-details/news-details.html',
            chunks: chunks.concat(['newsDetails']),
            minify: minify,
            chunksSortMode: 'dependency'
        }
    },
    {
        js: {productDetails: './app/pages/product-details/product-details.js'},
        html: {
            filename: 'product-details.html',
            template: 'html-withimg-loader!./app/pages/product-details/product-details.html',
            chunks: chunks.concat(['productDetails']),
            minify: minify,
            chunksSortMode: 'dependency'
        }
    },
    {
        js: {dashboard: './app/pages/dashboard/dashboard.js'},
        html: {
            filename: 'dashboard.html',
            template: 'html-withimg-loader!./app/pages/dashboard/dashboard.html',
            chunks: chunks.concat(['dashboard']),
            minify: minify,
            chunksSortMode: 'dependency'
        }
    }
]