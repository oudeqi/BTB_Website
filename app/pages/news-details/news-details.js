// __webpack_public_path__ = process.env.PUBLIC_PATH;
import {BASE_URL} from "../config";

console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './news-details.css'
import 'bootstrap'
import '../../components/modal/modal.js'
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
        }
    }).fail(function (error) {
        $('.news-details').html(`
             <p style="text-align: center;padding: 20px 10px;color: #ccc;width: 100%;">does not exist</p>
         `)
    })
}