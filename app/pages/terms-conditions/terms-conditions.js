// __webpack_public_path__ = process.env.PUBLIC_PATH;
console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './terms-conditions.css'
import 'bootstrap'
import '../../components/modal/modal.js'
import '../../components/header/header.js'

$(window).bind('scroll', function () {
    let scrollTop = $(window).scrollTop()
    let navHeight = $('.js_nav').height()
    let categoryOffsetTop = $('.js_category').offset().top
    if ((scrollTop + navHeight) >= categoryOffsetTop) {
        $('.js_nav').addClass('dark')
    } else {
        $('.js_nav').removeClass('dark')
    }
})