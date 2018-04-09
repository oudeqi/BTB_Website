// __webpack_public_path__ = process.env.PUBLIC_PATH;
import {BASE_URL} from "../config";

console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './news.css'
import 'bootstrap'
import '../../components/modal/modal.js'
import '../../components/header/header.js'

let pageIndex = 1
let pageTotal = 1
let pageSize = 20
let loading = false

function getList() {
    console.log(pageIndex, pageTotal)
    if (pageIndex > pageTotal) {
        $('.news-list__loading').html('No More').show()
        return
    }
    loading = true
    setTimeout(function(){
        if (loading) {
            $('.news-list__loading').text('Loading').show()
        }
    }, 300)
    $.get(BASE_URL + '/news/list', {
        page_size: pageSize,
        page_index: pageIndex
    }).done(function(result){
        loading = false
        let res = JSON.parse(result)
        if (res.code === 200) {
            pageTotal = parseInt(res.data.news_list.page_total)
            if (pageIndex === pageTotal) {
                $('.news-list__loading').html('No More').show()
            } else {
                $('.news-list__loading').html('<a class="btn-more" href="javascript:void(0);">More</a>').show()
            }
            pageIndex = parseInt(res.data.news_list.page_index) + 1
            let arr = res.data.news_list.data
            if (arr.length === 0) {
                $('.news-list__loading').html('No Data').show()
            } else {
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
        loading = false
        console.log(error)
    })
}

// 获取第一页
getList()

$(window).bind('scroll', function () {
    let scrollTop = $(this).scrollTop()
    let scrollHeight = $(document).height()
    let windowHeight = $(this).height()
    if (scrollTop + windowHeight == scrollHeight) {
        getList()
    }
})

$(document).on('click', '.btn-more', function () {
    getList()
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


