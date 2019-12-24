import article from '@/api/article'
const about = {
    state: {
        name: 'JACK',
        address: {}
    },
    mutations: {
        SET_NAME: (state, payload) => {
            state.name = payload
        },
        SET_ADDRESS: (state, payload) => {
            state.address = payload
        }
    },
    actions: {
        getName({ commit }) {
            console.log(11)
            commit('SET_NAME', 'RAJ')
        },
        getAddress({ commit }, payload) {
            article.articleList(payload).then(res => {
                // 执行某些操作
                if (res.Code == 200) {
                    commit('SET_ADDRESS', res.Data)
                }
            });
        }
    },
    namespaced: true

}
export default about