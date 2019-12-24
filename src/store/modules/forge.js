import forgeHttp from '@/api/forge'
import { Toast } from 'vant'

const forge = {
    state: {
        rule: false,
        pop: false,
        popState: 1, //1水晶锻造，2抽奖成功
        recordState: false,
        lose: false,
        record: [],
        popMsg: '',
        loseList: [],   //失败记录
        countState: false,   //锻造数量弹窗状态
        countType: {},    //选择锻造类型
    },
    mutations: {
        SET_COUNTTYPE(state, payload) {   //选择锻造数量
            let params = {
                type: payload.type,
                max: payload.max
            }
            state.countType = params
        },
        SET_COUNTSTATE(state, payload) {  //锻造数量弹窗状态
            state.countState = payload
        },
        SET_LOSELIST(state, payload) {    //失败记录
            state.loseList = payload
        },
        SET_POPMSG(state, payload) {  //锻造失败信息
            state.popMsg = payload
        },
        SET_POPSTATE(state, payload) {  //水晶锻造弹窗状态 1水晶锻造 2抽奖成功
            state.popState = payload
        },
        SET_RULE: (state, payload) => { //锻造规则
            state.rule = payload
        },
        SET_POP: (state, payload) => {  //水晶锻造弹框
            state.pop = payload
        },
        SET_RECORD: (state, payload) => {   //锻造记录
            state.record.push(...payload)
        },
        CLEAR_RECORD: (state, payload) => { //清空锻造记录
            state.record = []
        },
        SET_RECORDSTATE: (state, payload) => {  //锻造记录弹窗
            state.recordState = payload
        },
        SET_LOSE: (state, payload) => {    //锻造失败
            state.lose = payload
        }
    },
    actions: {
        getRecord({ commit }, payload) {  //获取锻造记录
            this.commit('common/setLoading', true);
            forgeHttp.forgeLog(payload).then(res => {
                if (res.Code == 200) {
                    let array = []
                    array.push(...res.Data.List)
                    commit('SET_RECORDSTATE', true)
                    commit('SET_RECORD', array)
                    this.commit('common/setLoading', false);
                } else {
                    Toast.fail(res.Msg);
                }
            })
        }
        /* getName({ commit }, payload) {
            article.articleList(payload).then(res => {
                // 执行某些操作
                if (res.Code == 200) {
                    commit('SET_NAME', res.Data)
                }
            });
        } */
    },
    namespaced: true
}
export default forge