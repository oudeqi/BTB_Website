// __webpack_public_path__ = process.env.PUBLIC_PATH;
import {BASE_URL} from "../config";

console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './best-choice.css'
import 'bootstrap'
import accounting from 'accounting'
import '../../components/modal/modal.js'
import '../../components/header/header.js'

let pageIndex = 1
let pageTotal = 1
let pageSize = 20
let loading = false

function getList() {
    console.log(pageIndex, pageTotal)
    if (pageIndex > pageTotal) {
        $('.best-choice__loading').html('No More').show()
        return
    }
    loading = true
    setTimeout(function(){
        if (loading) {
            $('.best-choice__loading').html('Loading').show()
        }
    }, 300)
    $.get(BASE_URL + '/commodity/admin/list', {
        page_size: pageSize,
        page_index: pageIndex
    }).done(function(result){
        loading = false
        let res = JSON.parse(result)
        if (res.code === 200) {
            pageTotal = parseInt(res.data.commodity.page_total)
            if (pageIndex === pageTotal) {
                $('.best-choice__loading').html('No More').show()
            } else {
                $('.best-choice__loading').html('<a class="btn-more" href="javascript:void(0);">More</a>').show()
            }
            pageIndex = parseInt(res.data.commodity.page_index) + 1
            let arr = res.data.commodity.data
            if (arr.length === 0) {
                $('.best-choice__loading').html('No Data').show()
            } else {
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
            alert(res.data.commodity.message)
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