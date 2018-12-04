import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './modules/home'
import customer from './modules/customer'
import select from './modules/components/select'
import rightContainer from './modules/components/rightContainer'
import dealCustomerList from './modules/components/dealCustomerList'
import dealOrderInfoDetails from './modules/components/dealOrderInfoDetails'
import orderInfoDetails from './modules/components/orderInfoDetails'


export default new Vuex.Store({
  modules: {
    home,
    customer,
    select,
    rightContainer,
    dealCustomerList,
    dealOrderInfoDetails,
    orderInfoDetails
  }
})