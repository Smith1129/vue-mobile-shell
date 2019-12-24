import Vue from 'vue'
import Vuex from 'vuex'
import about from './modules/about'
import login from './modules/login'
import common from './modules/common'
import play from './modules/play'
import user from './modules/user'
import forge from './modules/forge'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    about,
    common,
    play,
    user,
    forge
  }
})
