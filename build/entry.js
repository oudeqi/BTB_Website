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
    js: {share: './app/pages/share/share.js'},
    html: {
      filename: 'share.html',
      template: 'html-withimg-loader!./app/pages/share/share.html',
      chunks: chunks.concat(['share']),
      minify: minify,
      chunksSortMode: 'dependency'
    }
  },
  {
    js: {privacyPolicy: './app/pages/privacy-policy/privacy-policy.js'},
    html: {
      filename: 'privacy-policy.html',
      template: 'html-withimg-loader!./app/pages/privacy-policy/privacy-policy.html',
      chunks: chunks.concat(['privacyPolicy']),
      minify: minify,
      chunksSortMode: 'dependency'
    }
  },
  {
    js: {termsConditions: './app/pages/terms-conditions/terms-conditions.js'},
    html: {
      filename: 'terms-conditions.html',
      template: 'html-withimg-loader!./app/pages/terms-conditions/terms-conditions.html',
      chunks: chunks.concat(['termsConditions']),
      minify: minify,
      chunksSortMode: 'dependency'
    }
  },
  {
    js: {aboutBali: './app/pages/about-bali/about-bali.js'},
    html: {
      filename: 'about-bali.html',
      template: 'html-withimg-loader!./app/pages/about-bali/about-bali.html',
      chunks: chunks.concat(['aboutBali']),
      minify: minify,
      chunksSortMode: 'dependency'
    }
  },
  {
    js: {aboutUs: './app/pages/about-us/about-us.js'},
    html: {
      filename: 'about-us.html',
      template: 'html-withimg-loader!./app/pages/about-us/about-us.html',
      chunks: chunks.concat(['aboutUs']),
      minify: minify,
      chunksSortMode: 'dependency'
    }
  },
  {
    js: {bestChoice: './app/pages/best-choice/best-choice.js'},
    html: {
      filename: 'best-choice.html',
      template: 'html-withimg-loader!./app/pages/best-choice/best-choice.html',
      chunks: chunks.concat(['bestChoice']),
      minify: minify,
      chunksSortMode: 'dependency'
    }
  },
  {
    js: {news: './app/pages/news/news.js'},
    html: {
      filename: 'news.html',
      template: 'html-withimg-loader!./app/pages/news/news.html',
      chunks: chunks.concat(['news']),
      minify: minify,
      chunksSortMode: 'dependency'
    }
  }
]