// __webpack_public_path__ = process.env.PUBLIC_PATH;
import {BASE_URL} from "../config";

console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './news.css'
import 'bootstrap'
import '../../components/modal/modal.js'

let pageIndex = 1
let pageTotal = null
let loading = false

function getList() {
    console.log('init')
    if (pageIndex === pageTotal) {
        $('.news-list__loading').html('no more').show()
        return
    }
    console.log('load')
    loading = true
    $('.news-list__loading').text('Loading')
    setTimeout(function () {
        if (loading) {
            $('.news-list__loading').show()
        } else {
            $('.news-list__loading').html('<a class="btn-more" href="javascript:void(0);">More</a>').show()
        }
    }, 300)
    $.get(BASE_URL + '/news/list', {
        page_size: 20,
        page_index: pageIndex
    }).done(function(result){
        loading = false
        let res = JSON.parse(result)
        console.log(res)
        if (res.code === 200) {
            let arr = res.data.news_list.data
            pageTotal = parseInt(res.data.news_list.page_total)
            if (pageIndex < pageTotal ) {
                pageIndex = parseInt(res.data.news_list.page_index) + 1
            }
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
        } else {
            $('.news-list__items').html('<li style="text-align: center;color: #ddd;">no data</li>')
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


