import play28Http from '@/api/play28'
import { Toast } from 'vant'
const play = {
    state: {
        modules: 1,  //1默认模式 2自定义模式 3专家模式
        g28: 'luck', //急速28 PC28 开心16
        indexList: [],//28首页接口
        onRefresh: false,
        systemTime: 0,//服务器时间
        model28: [], //自定义模式
        autoPlay: [],//自动参与信息
        multiply: 1, //当前倍数
        tabModel: [],//28参与底数
        tabModel16: [],//16参与底数
        trend: [],   //走势
        lotteryInfo: [], //即将开奖详情
        modelIndex: [],  //参与首页信息
        winList: [], //获奖列表
        myList: [],  //我的参与
        myListZx: [],    //按期查看
        myListDay: [],   //按日查看
        detail: [],//    投注详情
        getPig:false    //获取银猪弹框
    },
    mutations: {
        SET_GETPIG(state,payload){  //获取银猪弹框
            state.getPig = payload
        },
        SET_MODULES(state, payload) {   //默认模式
            state.modules = payload
        },
        SET_G28(state, payload) {   //28模式
            let type = 'luck'
            let lx = Number(payload)
            switch (lx) {
                case 0:
                    type = 'luck';
                    break;
                case 1:
                    type = 'bj';
                    break;
                case 2:
                    type = 'luck16';
                    break;
                default:
                    type = 'luck';
                    break;
            }
            return state.g28 = type
        },
        SET_INDEXLIST(state, payload) {   //28首页接口
            state.indexList = payload
        },
        SET_ONFEFRESH(state, payload) {   //刷新状态
            state.onRefresh = payload
        },
        SET_SYSTEMTIME(state, payload) {  //服务器时间
            state.systemTime = payload
        },
        SET_MODEL28(state, payload) { //自定义模式
            state.model28 = payload
        },
        SET_AUTOPLAY(state, payload) {  //自动参与
            state.autoPlay = payload
        },
        SET_MULTIPLY(state, payload) {    //当前倍数
            state.multiply = payload
        },
        SET_TABMODEL(state, payload) {  //28参与底数
            state.tabModel = payload
        },
        SET_TABMODEL16(state, payload) {  //28参与底数
            state.tabModel16 = payload
        },
        SET_TREND(state, payload) {   //走势
            state.trend = payload
        },
        SET_LOTTERYINFO(state, payload) { //即将开奖详情
            state.lotteryInfo = payload
        },
        SET_MODELINDEX(state, payload) {  //参与首页信息
            state.modelIndex = payload
        },
        SET_WINLIST(state, payload) { //获奖列表
            state.winList = payload
        },
        SET_MYLIST(state, payload) {  //我的参与
            state.myList = payload
        },
        SET_MYLISTZX(state, payload) {// 区分出来
            state.myListZx.push(...payload)
        },
        SET_MYLISTDAY(state, payload) {   //按日查看
            state.myListDay.push(...payload)
        },
        SET_DETAIL(state, payload) {  //我的投注详情
            state.detail = payload
        },
        CLEAR_MYLIST(state, payload) {    //清空mylist
            state.myListZx = [];
            state.myListDay = [];
        }
    },
    actions: {
        getModules({ commit }, payload) {   //默认模式
            commit('SET_MODULES', payload)
        },
        getIndexList({ commit }, payload) { //28首页接口
            this.commit('common/setLoading', true);
            play28Http.indexList(payload).then((res) => {
                if (res.Code === 200) {
                    this.commit('common/setLoading', false);
                    commit('SET_ONFEFRESH', false)
                    commit('SET_INDEXLIST', res.Data)
                } else {
                    commit('SET_ONFEFRESH', true)
                    Toast.fail(res.Msg);
                }
            })
        },
        getSystemTime({ commit }, payload) {    //服务器时间
            play28Http.systemTime(payload).then((res) => {
                if (res.Code === 200) {
                    commit('SET_SYSTEMTIME', res.Data)
                } else {
                    Toast.fail(res.Msg);
                }
            })
        },
        getModel28({ commit }, payload) {   //自定义模式
            this.commit('common/setLoading', true);
            play28Http.model(payload).then((res) => {
                if (res.Code === 200) {
                    commit('SET_MODEL28', res.Data)
                    this.commit('common/setLoading', false);
                } else {
                    Toast.fail(res.Msg);
                }
            })
        },
        getAutoPlay({ commit }, payload) {  //自动参与
            this.commit('common/setLoading', true);
            play28Http.autoPlayIndex(payload).then((res) => {
                if (res.Code === 200) {
                    commit('SET_AUTOPLAY', res.Data)
                    this.commit('common/setLoading', false);
                } else {
                    Toast.fail(res.Msg);
                }
            })
        },
        getTabModel({ commit }, payload) { //28参与底数
            commit('SET_TABMODEL', payload)
        },
        getTabModel16({ commit }, payload) { //28参与底数
            commit('SET_TABMODEL16', payload)
        },
        getFuncModel({ commit }, payload) { //上期参与
            this.commit('common/setLoading', true);
            play28Http.funcModel(payload).then((res) => {
                if (res.Code === 200) {
                    if (payload.g28 === 'luck16') {
                        commit('SET_TABMODEL16', res.Data)
                    } else {
                        commit('SET_TABMODEL', res.Data)
                    }
                    this.commit('common/setLoading', false);
                } else {
                    Toast.fail(res.Msg);
                }
            })
        },
        getTrend({ commit }, payload) {
            this.commit('common/setLoading', true);
            play28Http.trend(payload).then((res) => {
                if (res.Code === 200) {
                    commit('SET_TREND', res.Data)
                    this.commit('common/setLoading', false);
                } else {
                    Toast.fail(res.Msg);
                }
            })
        },
        getLotteryInfo({ commit, dispatch, state }, payload) {
            this.commit('common/setLoading', true);
            play28Http.lotteryInfo(payload).then((res) => {
                if (res.Code === 200) {
                    commit('SET_LOTTERYINFO', res.Data)
                    this.commit('common/setLoading', false);
                    /* let params = {
                        g28:state.g28,
                        Luck28Id:state.lotteryInfo.LotteryIssue
                    }
                    dispatch('getModelIndex',params) */
                } else {
                    Toast.fail(res.Msg);
                }
            })
        },
        getModelIndex({ commit }, payload) {    //参与首页信息
            play28Http.modelIndex(payload).then((res) => {
                if (res.Code === 200) {
                    this.commit('common/setLoading', false);
                    commit('SET_MODELINDEX', res.Data)
                } else {
                    Toast.fail(res.Msg);
                }
            })
        },
        getWinList({ commit }, payload) {
            this.commit('common/setLoading', true);
            play28Http.winList(payload).then((res) => {
                if (res.Code === 200) {
                    commit('SET_WINLIST', res.Data)
                    this.commit('common/setLoading', false);
                } else {
                    Toast.fail(res.Msg);

                }
            })
        },
        getMyList({ commit }, payload) {
            this.commit('common/setLoading', true);
            play28Http.myList(payload).then((res) => {
                if (res.Code === 200) {
                    commit('SET_MYLIST', res.Data)
                    let array = [];
                    array.push(...res.Data.List.Rows)
                    commit('SET_MYLISTZX', array)
                    this.commit('common/setLoading', false);
                } else {
                    Toast.fail(res.Msg);

                }
            })
        },
        getDetail({ commit }, payload) {    //我的投注详情
            this.commit('common/setLoading', true);
            play28Http.detail(payload).then((res) => {
                if (res.Code === 200) {
                    commit('SET_DETAIL', res.Data)
                    this.commit('common/setLoading', false);
                } else {
                    Toast.fail(res.Msg);

                }
            })
        },
    },
    namespaced: true

}
export default play