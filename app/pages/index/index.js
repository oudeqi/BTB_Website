// __webpack_public_path__ = process.env.PUBLIC_PATH;
import { BASE_URL } from "../config";

console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

import accounting from 'accounting'
import '../../components/modal/modal.js'
import '../../components/header/header.js'

$('[data-target="index"]').addClass('active')

setTimeout(function(){
    let scrollTop = $(window).scrollTop()
    console.log(scrollTop)
    if (scrollTop <= 3) {
        $('.js_footer').removeClass('hide')
    } else {
        $('.js_footer').addClass('hide')
    }
}, 60)

// 推荐商品
$.get(BASE_URL + '/commodity/admin/list', {
    page_size: 20,
    page_index: 1,
    top: true
}).done(function(result){
    let res = JSON.parse(result)
    console.log(res)
    if (res.code === 200) {
        let arr = res.data.commodity.data
        console.log('prod', arr)
        if (arr.length === 0) {
            $('.best-choice__items').html('<li style="text-align: center;color: #ddd;">no data</li>')
        } else {
            $('.best-choice__items').html('')
            arr.forEach(item => {
                $('.best-choice__items').append(`
                    <li class="item">
                        <div class="inner">
                            <div class="pic">
                                <a href="./product-details.html?id=${item.id}">
                                    <img src="${item.picture}" alt="">
                                </a>
                            </div>
                            <div class="txt">
                                <h3>${item.name}</h3>
                                <p>
                                    <a href="${item.booking}">Booking Via Website</a>
                                </p>
                                <p><span>Rp. ${accounting.formatNumber(item.price)}</span></p>
                            </div>
                        </div>
                    </li>
                `)
            })
        }
        let scrollTop = $(window).scrollTop()
        let navHeight = $('.js_nav').height()
        let categoryOffsetTop = $('.js_category').offset().top
        let downloadOffsetTop = $('#download').offset().top
        if ((scrollTop + navHeight) >= categoryOffsetTop && (scrollTop + navHeight) < downloadOffsetTop) {
            $('.js_nav').addClass('dark')
        } else {
            $('.js_nav').removeClass('dark')
        }
    } else {
        alert(res.data.commodity.message)
    }
    if (location.href.indexOf('#download') !== -1) {
        setTimeout(() => {
            document.getElementById('download').scrollIntoView()
        }, 150)
    }
}).fail(function (error) {
    console.log(error)
})

// 置顶新闻
$.get(BASE_URL + '/news/list', {
    page_size: 20,
    page_index: 1,
    top: true
}).done(function(result){
    let res = JSON.parse(result)
    console.log(res)
    if (res.code === 200) {
        let arr = res.data.news_list.data
        console.log('news', arr)
        if (arr.length === 0) {
            $('.news-list__items').html('<li style="text-align: center;color: #ddd;">no data</li>')
        } else {
            $('.news-list__items').html('')
            arr.forEach(item => {
                $('.news-list__items').append(`
                    <li class="item">
                        <div class="pic">
                            <img src="${item.picture}" alt="">
                        </div>
                        <div class="body">
                            <h5>
                                <a href="./news-details.html?id=${item.id}">${item.name}</a>
                            </h5>
                            <p>${item.subtitle}</p>
                        </div>
                    </li>
                `)
            })
        }
        let scrollTop = $(window).scrollTop()
        let navHeight = $('.js_nav').height()
        let categoryOffsetTop = $('.js_category').offset().top
        let downloadOffsetTop = $('#download').offset().top
        if ((scrollTop + navHeight) >= categoryOffsetTop && (scrollTop + navHeight) < downloadOffsetTop) {
            $('.js_nav').addClass('dark')
        } else {
            $('.js_nav').removeClass('dark')
        }
    } else {
        alert(res.data.news_list.message)
    }
    if (location.href.indexOf('#download') !== -1) {
        setTimeout(() => {
            document.getElementById('download').scrollIntoView()
        }, 150)
    }
}).fail(function (error) {
    console.log(error)
})

$(window).bind('scroll', function () {
    let scrollTop = $(this).scrollTop()
    let navHeight = $('.js_nav').height()
    let categoryOffsetTop = $('.js_category').offset().top
    let downloadOffsetTop = $('#download').offset().top
    if ((scrollTop + navHeight) >= categoryOffsetTop && (scrollTop + navHeight) < downloadOffsetTop) {
        $('.js_nav').addClass('dark')
    } else {
        $('.js_nav').removeClass('dark')
    }
})

$(window).bind('scroll', function () {
    let scrollTop = $(this).scrollTop()
    let downloadOffsetTop = $('#download').offset().top
    if (scrollTop <= 3 || (scrollTop + 2) >= downloadOffsetTop) {
        $('.js_footer').removeClass('hide')
    } else {
        $('.js_footer').addClass('hide')
    }
})