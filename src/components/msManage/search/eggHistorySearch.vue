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
  </div>
</template>

<script>
import {setLocalStorage,getLocalStorage,skipNewPage} from '../../../utils/msManage'
export default {
  //historyTxt是搜索框内容，isEmpty是清空搜索框，clickHistoryTxt点击历史搜索中的内容
  props: ['historyTxt', 'isEmpty', 'clickHistoryTxt'],
  data() {
    return {
      list: []
    }
  },
  watch: {
    historyTxt() {
      if(!this.historyTxt) {
        return
      }
      this.addLocalStorage()
    }
  },
  created() {
    this.getHistoryList()
  },
  methods: {
    //添加localStorage
    addLocalStorage() {
      this.filterArr()
      this.list = [this.historyTxt, ...this.list]
      this.sliceArr()
      setLocalStorage(this.list,'title')
    },
    //去重
    filterArr() {
      if(this.list.length) {
        this.list.forEach((item, index) => {
          if(item == this.historyTxt) {
            let arrPre = this.list.slice(0,index)
            let arrAft = this.list.slice(index + 1)
            this.list = [...arrPre, ...arrAft]
          }
        })
      }
    },
    //截取数据
    sliceArr() {
      if(this.list.length > 10) {
        this.list = this.list.slice(0,10)
      }
    },
    //获取历史搜索列表
    getHistoryList() {
      let list  = getLocalStorage('title')
      if(list) {
        this.list = list
      }else {
        this.list = []
      }
    },
    //清空历史搜索
    emptyHisList() {
      this.list = []
      window.localStorage.removeItem('title')
      this.isEmpty(false)
    },
    clickTitle(index) {
      this.clickHistoryTxt(this.list[index])
    }
  }
}
</script>

<style lang="scss" scoped>
.eggHistorySearch {
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
}
</style>

