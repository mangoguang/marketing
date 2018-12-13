import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import common from './modules/common'
import customer from './modules/customer'
import select from './modules/components/select'
import rightContainer from './modules/components/rightContainer'
import dealCustomerList from './modules/components/dealCustomerList'
import dealOrderInfoDetails from './modules/components/dealOrderInfoDetails'
import orderInfoDetails from './modules/components/orderInfoDetails'
import followTrackDetails from './modules/components/followTrackDetails'
import customerHeader from './modules/customer/header'
import serachResult from './modules/customer/serachResult'
import tabStatus from './modules/components/detailsHeaderStatus'
import orderList from './modules/components/orderList'
import customerScroll from './modules/customer/scroll'


export default new Vuex.Store({
  modules: {
    common,
    customer,
    select,
    rightContainer,
    dealCustomerList,
    dealOrderInfoDetails,
    orderInfoDetails,
    customerHeader,
    followTrackDetails,
    tabStatus,
    orderList,
    serachResult,
    customerScroll
  }
})