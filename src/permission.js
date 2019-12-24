import router from './router'
import { getToken } from '@/utils/auth' // get token from cookie
import store from './store/index'
// 未登录不可进入路由
const whiteList = [
    'fun',
    'funPlay',
    'funWin',
    'funPlayJoin',
    'funPlayCustom',
    'funPlayCustomEdit',
    'funPlayAuto',
    'funPlayTrend',
    'funPlayTrendAll',
    'funAbout',
    'funMethods',
    'funAboutDetail',
    'forge'
]
// 黑名单不可进路由
const blackList = [

]
router.beforeEach((to, from, next) => {
    //   determine whether the user has logged in
    const userToken = getToken('ttz_token');
    if (userToken) {
        if (to.name !== 'login') {
            store.dispatch('user/getInfo')
        }
        next()
    } else {
        if (whiteList.indexOf(to.name) == -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            
            if (to.name != 'login') {
                store.commit('user/setRouterInfo', to)
            }
            next('/login')
        }
    }

})
