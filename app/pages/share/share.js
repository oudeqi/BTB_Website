// __webpack_public_path__ = process.env.PUBLIC_PATH;
console.log(process.env.NODE_ENV)
import 'bootstrap/dist/css/bootstrap.css'
import './share.css'
import accounting from 'accounting'
import { BASE_URL } from '../config'
import { getQueryString } from '../utils'

let id = getQueryString('id')
let pageData = null
if (!id) {
    $('#page-warpper').html(`
        <p style="text-align: center;padding: 20px 10px;color: #ccc;">does not exist</p>
    `)
} else {
    $('#page-warpper').html(`
        <p style="text-align: center;padding: 20px 10px;color: #ccc;">Loading...</p>
    `)
    $.get(BASE_URL + '/commodity?id=' + id).done(function(result){
        let res = JSON.parse(result)
        if (res.code === 200) {
            pageData = JSON.parse(result).data.commodity
            console.log(pageData)
            $('#page-warpper').html(`
                <div class="product__video">
                    <div class="product__video--warpper">
                        <video class="video" controls src="${pageData.video.indexOf('http://') === 1 ? pageData.video : ('http://' + pageData.video)}" poster="${pageData.picture}">
                            Your browser does not support the video tag.
                        </video>
                    </div>
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
                        <a href="${pageData.booking}" target="_blank">Visit Website</a>
                    </div>
                </div>
                <div class="product__body">
                    ${pageData.description}
                </div>
            `)
        }

    }).fail(function (error) {
        console.log(error)
        $('#page-warpper').html(`
             <p style="text-align: center;padding: 20px 10px;color: #ccc;">does not exist</p>
         `)
    })
}

