// __webpack_public_path__ = process.env.PUBLIC_PATH;
console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './share.css';

// 测试模拟数据
$.get('http://localhost:3005/employee/123', function(res){
    console.log(res);
})

const getQueryString = function (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
        r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

let id = getQueryString('id')
if (!id) {
    $('#page-warpper').html(`
        <p style="text-align: center;padding: 20px 10px;color: #ccc;">does not exist</p>
    `)
} else {
    /* $('#page-warpper').html(`
        <p style="text-align: center;padding: 20px 10px;color: #ccc;">Loading...</p>
    `) */
}