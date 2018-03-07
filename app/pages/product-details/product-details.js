// __webpack_public_path__ = process.env.PUBLIC_PATH;
console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './product-details.css';

// 测试模拟数据
$.get('http://localhost:3005/employee/123', function(res){
    console.log(res);
})