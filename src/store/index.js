import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import state from './globalState'
import mutations from './globalMutations'
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
import tabStatus from './modules/components/tabStatus'
import orderList from './modules/components/orderList'
import customerScroll from './modules/customer/scroll'
import personMsg from './modules/login/index'
import searchBox from './modules/msManage/searchBox'
import collectArt from './modules/msManage/collectArt'
import collect from './modules/msManage/collect'
import treeList from './modules/msManage/treeList'
import leftNavList from './modules/gallery/index/index'
import productNavList from './modules/gallery/productList/index'
import share from './modules/gallery/share/index'
import loadmore from './modules/msManage/loadmore'
import filterParmas from './modules/gallery/productList/filterParmas'
import searchParmas from './modules/gallery/productList/searchParmas'
import searchScroll from './modules/gallery/search/scroll'
import productScroll from './modules/gallery/productList/scroll'
import productLoadMore from './modules/gallery/productList/loadmore'
import collectLoadMore from './modules/gallery/collect'
import chooseShop from './modules/customer/chooseShop'
import feedback from './modules/personal/feedback'
import preview from './modules/components/preview'
import address from './modules/address/address'
import addAddress from './modules/address/addAddress'
import selectAddress from './modules/address/selectAddress'
import intentionProduct from './modules/intention/intentionProduct'
import searchProduct from './modules/intention/searchProduct'
import followRecord from './modules/intention/followRecord'
import addIntention from './modules/intention/addIntention'
import intention from './modules/intention/intention'
import loadImgUrl from './modules/picture/index'
import work from './modules/work/index'
export default new Vuex.Store({
  state,
  mutations,
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
    customerScroll,
    personMsg,
    select,
    searchBox,
    collectArt,
    collect,
    treeList,
    leftNavList,
    productNavList,
    share,
    loadmore,
    filterParmas,
    searchParmas,
    searchScroll,
    productScroll,
    productLoadMore,
    collectLoadMore,
    chooseShop,
    feedback,
    preview,
    address,
    addAddress,
    selectAddress,
    intentionProduct,
    searchProduct,
    followRecord,
    addIntention,
    loadImgUrl,
    work,
    intention
  }
})