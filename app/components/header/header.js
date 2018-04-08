import { BASE_URL } from "../../pages/config";
import { isEmail } from "../../pages/utils";
import 'bootstrap'

let regData = {
	regType: 'phone',
	avatar: null
}

let userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (userInfo) {
	showProfile(userInfo)
} else {
	showLogin()
}

$('#cancel').bind('click', function () {
    $('.dropdown-login').dropdown('toggle')
})

$('#forgetBtn').bind('click', function () {
    $('#forget-3').modal('show')
})

$('#regBtn').bind('click', function () {
    $('.dropdown-login').dropdown('toggle')
    $('#reg-1').modal('show')
})

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	let targetID = $(e.target).attr('href')
	let relatedID = $(e.relatedTarget).attr('href')
	//清空旧的
	$(relatedID).find('input[type="text"]').val('')
	//保存新的
	if (targetID.indexOf('phone') !== -1) {
		regData.regType = 'phone'
	} else {
		regData.regType = 'email'
	}
	regData.regID = $(targetID).find('input[type="text"]').val()
	console.log(regData)
})

$('.js_toRegStep2').click(function(e){
	e.preventDefault()
	let email = $('#reg-tab-email').find('input[type="text"]').val().trim()
	let phone = $('#reg-tab-phone').find('input[type="text"]').val().trim()
	function canStep2 (fn) {
		if (regData.regType === 'email') {
			if (isEmail(email)) {
				$('#reg-2-tips').text('Verification code has been sent to your email address.')
				regData.regID = email
				fn()
			} else {
				alert('Email is require')
			}
		} else {
			if (phone) {
				$('#reg-2-tips').text('Verification code has been sent to your phone number.')
				regData.regID = phone
				fn()
			} else {
				alert('Phone number is require')
			}
		}
	}
	canStep2(function(){
		$.get(BASE_URL + '/user/verificationcode', {
			verify_type: regData.regType,
			verify_value: regData.regID
		}).done(function(data){
			let res = JSON.parse(data)
			console.log(res)
			if (res.code === 200) {
				regData.regCode = res.data.verificationcode
				console.log(regData)
				$('#reg-1').modal('hide')
				$('#reg-2').modal('show')
			} else {
				alert('Verification code send fail')
			}
		}).fail(function(err){
			alert('Verification code send fail')
		})
	})
})

$('#ResendCode').click(function(e){
	e.preventDefault()
	$.get(BASE_URL + '/user/verificationcode', {
		verify_type: regData.regType,
		verify_value: regData.regID
	}).done(function(res){
		console.log(res)
		if (res.code === 200) {
			regData.regCode = res.data.verificationcode
			console.log(regData)
		} else {
			alert('Verification code send fail')
		}
	}).fail(function(err){
		alert('Verification code send fail')
	})
})

$('#regCode').bind('keyup', function(){
	if ($(this).val().trim() === regData.regCode) {
		$('#reg-2').modal('hide')
		$('#reg-3').modal('show')
	}
})

$(document).on('change', '#avatar' ,function(e){
	let file = this.files[0]
	console.log(file)
	regData.avatar = file
	let reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = function(e) {
		let Img = new Image()
        Img.src = e.target.result
		$('#avatarView').html('<a href="javascript:void(0);"></a>')
		$('#avatarView').find('a').html(Img)
		$('#avatarView').find('a').one('click', function(){
			regData.avatar = null
			$('#avatarView').html('<input type="file" id="avatar" name="avatar">')
		})
	}
})

$('#regModalBtn').click(function(e){
	e.preventDefault()
	if (!$('#SetPassword').val()) {
		alert('Password is require')
	}
	if (!$('#ConfirmPassword').val()) {
		alert('Input password again')
	}
	if ($('#ConfirmPassword').val() !== $('#SetPassword').val()) {
		alert('Two passwords input are not the same')
	}
	let postData = new FormData()
 	postData.append('merchant', false)
 	postData.append('password', $('#SetPassword').val())
 	postData.append('picture', regData.avatar)
 	postData.append('verificationcodeok', 'yes')
	if (regData.regType === 'email') {
		postData.append('email', regData.regID)
	} else {
		postData.append('phone', regData.regID)
	}
	 $.ajax({  
        url: BASE_URL + '/user/signup',  
        type: 'POST',  
        data: postData,  
        processData: false,    
        contentType: false,  
        success: function(data){
        	$('#reg-3').modal('hide')
        	setTimeout(function(){
        		let res = JSON.parse(data)
	        	console.log(res)
	        	if (res.code === 200) {
	        		alert('sign up success')
	        	} else {
	        		alert(res.message)
	        	}
        	},100)
        },
        error: function(error){
        	$('#reg-3').modal('hide')
        	alert('error')
        },
    })
})

$(document).on('click', '#Logout', function(){
	localStorage.removeItem('userInfo')
	location.reload()
})


$('#login').click(function(e){
	e.preventDefault()
	let postData = {
		password: $('#pwd').val()
	}
	let name = $('#name').val().trim()
	if (isEmail(name)) {
		postData.email = name
	} else {
		postData.phone = name
	}
	$.post(BASE_URL + '/user/signin', postData).done(function(data){
		let res = JSON.parse(data)
		console.log(res)
		if (res.code === 200) {
			let info = res.data.user
			$('#nav-item-login').remove()
			localStorage.setItem('userInfo', JSON.stringify(info))
			showProfile(info)
		} else {
			alert(res.message)
		}
	}).fail(function(err){
		alert('error')
	})
})

function showProfile (info) {
	$('#myProfile').html(`
		<div class="dropdown" data-target="myProfile">
            <a href="javascript:void(0);" class="link dropdown-profile" data-toggle="dropdown">My Profile</a>
            <form class="dropdown-menu dropdown-menu-right profile">
                <div class="profile-head">
                    <div class="profile-head-pic">
                        <img src="${info.picture}" alt="">
                    </div>
                    <div class="profile-head-info">
                    	${((info) => {
                    		if (info.signup_type === 'phone') {
                    			return `<p class="phone">${info.phone}</p>`
                    		} else {
                    			return `<p class="phone">${info.email}</p>`
                    		}
                    	})(info)}
                    </div>
                    <a class="profile-head__edit" href="javascript:void(0);"></a>
                </div>
                <a class="profile-item" href="javascript:void(0);">Change Password</a>
                <a class="profile-item" href="javascript:void(0);">Change Phone Number</a>
                <a class="profile-item" href="./terms-conditions.html">Terms of Service</a>
                <a class="profile-item" href="./privacy-policy.html">Privacy Policy</a>
                <a id="Logout" class="profile-item" href="javascript:void(0);">Log Out</a>
            </form>
        </div>
	`)
}

function showLogin () {
	$('#nav-item-login').html(`
		<div class="dropdown">
            <a href="javascript:void(0);" class="link dropdown-login" data-toggle="dropdown">Log In</a>
            <form class="dropdown-menu dropdown-menu-right form-login">
                <h4>Log In</h4>
                <div class="login-ipt-warpper">
                    <input id="name" type="text" placeholder="Email / Phone Number">
                </div>
                <div class="login-ipt-warpper">
                    <input id=pwd type="password" placeholder="Password">
                    <a href="javascript:void(0);" class="icon"></a>
                </div>
                <p>
                    <a href="javascript:void(0);" id="regBtn">Sign Up</a>
                    <a href="javascript:void(0);" id="forgetBtn">Forgot Password?</a>
                </p>
                <div class="login-btn-warpper">
                    <button id="login" type="button" class="btn-login">Log In</button>
                </div>
                <div class="login-btn-warpper">
                    <button id="cancel" type="button" class="btn-cancel">Cancel</button>
                </div>
            </form>
        </div>
	`)
}