import Vue from 'vue'
import Vuex from 'vuex'
// store getters
import getters from './getters'
// store modules
import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    permission,
    user,
    errorLog,
    tagsView
  },
  getters
})
