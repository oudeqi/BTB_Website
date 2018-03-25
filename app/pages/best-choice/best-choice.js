// __webpack_public_path__ = process.env.PUBLIC_PATH;
import {BASE_URL} from "../config";

console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './best-choice.css'
import 'bootstrap'
import accounting from 'accounting'
import '../../components/modal/modal.js'

let pageIndex = 1
let pageTotal = null
let loading = false //false 未加载或者加载完成显示more，true加载中显示loading

function getList() {
    console.log('init')
    console.log(pageIndex, pageTotal)
    if (pageIndex === pageTotal) {
        $('.best-choice__loading').html('no more').show()
        return
    }
    console.log('load')
    loading = true
    $('.best-choice__loading').html('Loading')
    setTimeout(function () {
        if (loading) {
            $('.best-choice__loading').show()
        } else {
            $('.best-choice__loading').html('<a class="btn-more" href="javascript:void(0);">More</a>').show()
        }
    }, 300)
    $.get(BASE_URL + '/commodity/admin/list', {
        page_size: 20,
        page_index: pageIndex
    }).done(function(result){
        loading = false
        let res = JSON.parse(result)
        console.log(res)
        if (res.code === 200) {
            let arr = res.data.commodity.data
            pageTotal = parseInt(res.data.commodity.page_total)
            if (pageIndex < pageTotal ) {
                pageIndex = parseInt(res.data.news_list.page_index) + 1
            }
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
        } else {
            $('.best-choice__items').html('<li style="text-align: center;color: #ddd;">no data</li>')
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

$('body').on('click', '.btn-more', function () {
    getList()
})