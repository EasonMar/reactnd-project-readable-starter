export function timestampToTime(timestamp) {
	if(!timestamp) return '';

    let date = new Date(timestamp), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
        D = date.getDate() + ' ',
        h = date.getHours() + ':',
        m = date.getMinutes() + ':',
        s = date.getSeconds();
    return Y + M + D + h + m + s;
}


// export function getQueryString(name) {
//     const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//     const r = window.location.search.substr(1).match(reg);
//     if (r != null) return unescape(r[2]);
//     return null;
// }

export function getUuid() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = new Array(36),
        rnd = 0,
        r;
    for (var i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid[i] = '-';
        } else if (i === 14) {
            uuid[i] = '4';
        } else {
            if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    return uuid.join('');
};