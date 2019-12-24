import articleHttp from '@/api/article'
import { Toast } from 'vant'

const common = {
    state: {
        loading: false,
        downloadInfo: ""
    },
    mutations: {
        setDownloadInfo(state, payload) {
            state.downloadInfo = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        }
    },
    actions: {
        getDownloadInfo({ commit }, payload) {  //获取锻造记录
            this.commit('common/setLoading', true);
            articleHttp.downloadInfo(payload).then(res => {
                if (res.Code == 200) {
                    commit('setDownloadInfo', res.Data)
                    this.commit('common/setLoading', false);
                } else {
                    Toast.fail(res.Msg);
                }
            })
        }
    },
    namespaced: true
}
export default common