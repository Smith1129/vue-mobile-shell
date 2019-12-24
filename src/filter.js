export default (Vue) => {
    Vue.filter('forTime',
        function (value) {
            let date = new Date(value * 1000);
            let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();;
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();;
            return h + ':' + m + ':' + s + ''
        }
    )
    Vue.filter('NumFormat',
        function (value) {
            if (!value) return '0'
            var intPart = Number(value) // 获取整数部分
            var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
            return intPartFormat
        }
    )
    // 北京时间
    Vue.filter('beijingTime', function (value) {
        let date = new Date(value * 1000);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    })
}
