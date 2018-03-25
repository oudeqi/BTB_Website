// __webpack_public_path__ = process.env.PUBLIC_PATH;
import {BASE_URL} from "../config";

console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import 'bootstrap'
import accounting from 'accounting'
import '../../components/modal/modal.js'

$('[data-target="index"]').addClass('active')

$('#cancel').bind('click', function () {
    $('.dropdown-login').dropdown('toggle');
})

$('#forgetBtn').bind('click', function () {
    $('#forget-3').modal('show')
})

$('#regBtn').bind('click', function () {
    $('#reg-3').modal('show')
})

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
    } else {
        $('.best-choice__items').html('<li style="text-align: center;color: #ddd;">no data</li>')
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
    } else {
        $('.news-list__items').html('<li style="text-align: center;color: #ddd;">no data</li>')
    }
}).fail(function (error) {
    console.log(error)
})
