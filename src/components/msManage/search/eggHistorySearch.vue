<template>
  <div class="eggHistorySearch">
    <div class="title">
      <span>历史搜索</span>
      <button @click="emptyHisList">清除</button>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index" @click='clickTitle(index)'>
        {{ item }}
      </li>
    </ul>
    <div class="clearBtn" v-show="clearVal">
      <clearBtn class="btn" :text='text' :getVal='getVal'/>
    </div>
  </div>
</template>

<script>
import clearBtn from '../../Gallery/index/eggBtn'
import {setLocalStorage,getLocalStorage,skipNewPage} from '../../../utils/msManage'
export default {
  //historyTxt是搜索框内容，isEmpty是清空搜索框，clickHistoryTxt点击历史搜索中的内容
  props: ['historyTxt', 'isEmpty', 'clickHistoryTxt', 'searchType'],
  components: { clearBtn },
  data() {
    return {
      list: [],
      currentTime: [],
      text: '确定清空历史搜索？',
      clearVal: false,
      isClear: ''
    }
  },
  watch: {
    historyTxt() {
      if(!this.historyTxt) {
        return
      }
      this.addLocalStorage()
    },
    isClear() {
      if(this.isClear) {
        this.emptyWay()
        this.clearVal = false
      }else {
        this.clearVal = false
      }
      this.isClear = ''
    }
  },
  created() {
    this.getHistoryList(this.searchType)
  },
  methods: {
    //获取清空历史搜索弹框的值
    getVal(val) {
      this.isClear = val
    },
    //添加localStorage
    addLocalStorage() {
      let time = new Date().getTime()
      this.filterArr()
      this.list = [this.historyTxt, ...this.list]
      this.currentTime = [time, ...this.currentTime]
      this.sliceArr()
      let obj = {
        list: this.list,
        currentTime: this.currentTime
      }
      setLocalStorage(obj,this.searchType)
    },
    //去重
    filterArr() {
      if(this.list.length) {
        this.list.forEach((item, index) => {
          if(item == this.historyTxt) {
            let arrPre = this.list.slice(0,index)
            let arrAft = this.list.slice(index + 1)
            let timePre = this.currentTime.slice(0,index)
            let timeAft = this.currentTime.slice(index + 1)
            this.list = [...arrPre, ...arrAft]
            this.currentTime = [...timePre, ...timeAft]
          }
        })
      }
    },
    //截取数据
    sliceArr() {
      if(this.list.length >= 10) {
        this.list = this.list.slice(0, 10)
        this.currentTime = this.currentTime.slice(0, 10)
      }
    },
    //判断不同的来源的缓存
    getHistoryList(type) {
      if(getLocalStorage(type)) {
        let list  = getLocalStorage(type)['list']
        let currentTime = getLocalStorage(type)['currentTime']
        if(list) {
          this.list = list
          this.currentTime = currentTime
        }else {
          this.list = []
          this.currentTime = []
        }
      }
    },
    //清空历史搜索
    emptyHisList() {
      if(this.searchType == 'gallery') {
        this.clearVal = true
      }else {
        this.emptyWay()
      }
    },
    clickTitle(index) {
      this.clickHistoryTxt(this.list[index])
    },
    emptyWay() {
      this.list = []
      this.currentTime = []
      window.localStorage.removeItem(this.searchType)
      this.isEmpty(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.eggHistorySearch {
  position: relative;
  padding: 4.4vw;
  border-bottom: 1px solid #fff;
  box-shadow:0px 2px 6px 0px rgba(136,136,136,0.2);
  .title {
    display: flex;
    justify-content: space-between;
    color: #363636;
    font-size: 3.4vw;
    margin-bottom: 2.8vw;
    button {
      color: #007aff;
      font-size: 3.2vw;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      background: #f8f8f8;
      padding:0 4vw;
      color: #666;
      font-size: 3.46vw;
      line-height: 8vw;
      margin-right: 2vw;
      margin-bottom: 2vw;
      border-radius: 0.53vw;
    }
  }
  .clearBtn {
    background-color:rgba(0, 0, 0, 0.5) ;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    .btn {
      position: absolute;
      top: 54.13vw;
      left: 50%;
      margin-left: -37.33vw;
    }
  }
}
</style>

