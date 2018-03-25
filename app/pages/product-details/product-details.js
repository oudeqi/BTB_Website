// __webpack_public_path__ = process.env.PUBLIC_PATH;
import {BASE_URL} from "../config";

console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './product-details.css'
import 'bootstrap'
import '../../components/modal/modal.js'
import accounting from 'accounting'
import { getQueryString } from '../utils'

let id = getQueryString('id')

if (!id) {
    $('.product-container').html(`
        <p style="text-align: center;padding: 20px 10px;color: #ccc;">does not exist</p>
    `)
} else {
    $('.product-container').html(`
        <p style="text-align: center;padding: 20px 10px;color: #ccc;">Loading...</p>
    `)
    $.get(BASE_URL + '/commodity', {
        id: id
    }).done(function(result){
        let res = JSON.parse(result)
        if (res.code === 200) {
            let pageData = JSON.parse(result).data.commodity
            console.log(pageData)
            $('.product-container').html(`
                <div class="product__video">
                    <video class="video" controls src="${pageData.video.indexOf('http://') === 1 ? pageData.video : ('http://' + pageData.video)}" poster="${pageData.picture}">
                        Your browser does not support the video tag.
                    </video>
                    <a href="javascript:void(0);" class="play"></a>
                </div>
                <div class="product__head">
                    <div class="l">
                        <h3>${pageData.name}</h3>
                        <p>
                            <strong>Rp. ${accounting.formatNumber(pageData.price)}</strong>
                            <span>/</span>
                            <span>average price</span>
                        </p>
                    </div>
                    <div class="r">
                        <a target="_blank" href="${pageData.booking.indexOf('http://') === 1 ? pageData.booking : ('http://' + pageData.booking)}">Visit Website</a>
                    </div>
                </div>
                <div class="product__body">${pageData.description}</div>
            `)

            $('.video')[0].addEventListener('pause', function () {
                $('.play').show(300)
            })
            $('.video')[0].addEventListener('abort', function () {
                $('.play').show(300)
            })
            $('.video')[0].addEventListener('play', function () {
                $('.play').hide(300)
            })
            $('.play').bind('click', function () {
                $('.video')[0].play()
            })
        }
    }).fail(function (error) {
        $('.product-container').html(`
             <p style="text-align: center;padding: 20px 10px;color: #ccc;">does not exist</p>
         `)
    })
}