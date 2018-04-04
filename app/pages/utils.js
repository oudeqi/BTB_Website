export function getQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
        r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

export function isEmail (str) {
	return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str)
}