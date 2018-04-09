// __webpack_public_path__ = process.env.PUBLIC_PATH;
import {BASE_URL} from "../config";

console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './news-details.css'
import 'bootstrap'
import accounting from 'accounting'
import '../../components/modal/modal.js'
import '../../components/header/header.js'
import { getQueryString } from '../utils'

let id = getQueryString('id')

if (!id) {
    $('.news-details').html(`
        <p style="text-align: center;padding: 20px 10px;color: #ccc;width: 100%;">does not exist</p>
    `)
} else {
    $('.news-details').html(`
        <p style="text-align: center;padding: 20px 10px;color: #ccc;width: 100%;">Loading...</p>
    `)
    $.get(BASE_URL + '/news', {
        id: id
    }).done(function(result){
        let res = JSON.parse(result)
        if (res.code === 200) {
            let pageData = JSON.parse(result).data.news
            console.log(pageData)
            $('.news-details').html(`
                <div class="news-details__pic">
                    <img src="${pageData.picture}" alt="">
                </div>
                <div class="news-details__body">
                    <h3 class="tit">${pageData.name}</h3>
                    <h5 class="subtit">${pageData.subtitle}</h5>
                    <p class="date">
                        ${new Date(parseInt(pageData.create_time) * 1000).toLocaleDateString()}
                    </p>
                    <div>
                        ${pageData.body}
                    </div>
                </div>
            `)
            let scrollTop = $(window).scrollTop()
            let navHeight = $('.js_nav').height()
            let categoryOffsetTop = $('.js_category').offset().top
            if ((scrollTop + navHeight) >= categoryOffsetTop) {
                $('.js_nav').addClass('dark')
            } else {
                $('.js_nav').removeClass('dark')
            }
        }
    }).fail(function (error) {
        $('.news-details').html(`
             <p style="text-align: center;padding: 20px 10px;color: #ccc;width: 100%;">does not exist</p>
         `)
    })
}

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
            let scrollTop = $(window).scrollTop()
            let navHeight = $('.js_nav').height()
            let categoryOffsetTop = $('.js_category').offset().top
            if ((scrollTop + navHeight) >= categoryOffsetTop) {
                $('.js_nav').addClass('dark')
            } else {
                $('.js_nav').removeClass('dark')
            }
        }
    } else {
        alert(res.data.news_list.message)
    }
}).fail(function (error) {
    console.log(error)
})

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