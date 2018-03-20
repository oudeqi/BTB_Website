// __webpack_public_path__ = process.env.PUBLIC_PATH;
console.log(process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import 'bootstrap'
import '../../components/modal/modal.js'

$('[data-target="index"]').addClass('active')



$('#cancel').bind('click', function () {
    $('.dropdown-login').dropdown('toggle');
})

$('#forgetBtn').bind('click', function () {
    $('#forget-1').modal('show')
})

$('#regBtn').bind('click', function () {
    $('#reg-3').modal('show')
})