import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './modules/home'
import child from './modules/child'
import bar from './modules/components/bar'

export default new Vuex.Store({
  modules: {
    home,
    child,
    bar
  }
})