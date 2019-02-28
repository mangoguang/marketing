<template>
  <div class="wrapper" v-if="list.length">
    <ul class="treeList">
      <li v-for="(item, index) in newList" :key="index" class="select">
        <span  
          @click="changeNewStatus(index)" 
          :class="item.status? 'addClass' : ''">
          {{ item.name }}
        </span>
        <div class="child_wrapper" >
          <ul class="child_treeList " v-show="item.status" >
            <li v-for="(el, i) in childList" :key='i' class="select">
              <span 
                @click="changChildStatus(i, index)"
                :class="el.status? 'childrenAddClass' : ''">
                {{ el.name }}
              </span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mango from '../../../js' 
export default {
  name: 'treeList',
  props: ['list', 'getParmas', 'getStatus'],
  data() {
    return {
      isactive: -1,
      addClass: '',
      newList: [],
      childList: []
    }
  },
  created() {
    this.init(this.list)
  },
  methods: {
    //初始进来的时候默认传第一个值
    init(list) {
      if(list.length) {
        this.newList = this.getNewList(list, 0)
        this.childList = this.getChildList(this.list, 0, -1)
        let parmas = {
          name1: list[0].name,
          status: 0}
        this.getParmas(parmas)
      }
    },
    //获取父级循环列表
    getNewList(list, index, type) {
      if(!list) {
        return
      }
      let arrName = this.getListName(list)
      let listName = mango.btnList(arrName, index)
      return listName
    },
    getListName (list) {
      let arr = []
        list.forEach(el => {
          arr.push(el.name)
      })
      return arr
    },
    getChildList(list, index, i) {
      if(!list) {
        return
      }
      let arr = []
      if(list[index].child) {
        list[index].child.forEach(el => {
          arr.push(el.name)
        });
      }
      let listName = mango.btnList(arr, i)
      return listName
    },
    //获取列表名称
    // getListName (list, type, index) {
    //   let arr = []
    //   if(type == 'father') {
    //     list.forEach(el => {
    //       arr.push(el.name)
    //     });
    //   }else if(type == 'child') {
    //      list[index].forEach(el => {
    //       arr.push(el.child)
    //     });
    //   }
    //   return arr
    // },
    //点击切换父级css样式并获取参数
    changeNewStatus(index) {
      if(this.newList[index].status) {
        return
      }
      this.newList = this.getNewList(this.list, index)
      //传递参数
      let parmas = {
        name1: this.newList[index].name,
        status: index}
      this.getParmas(parmas)
      //父级下的子级出现
      this.childList = this.getChildList(this.list, index, -1)
      //初始化获取有没有子级
      this.getStatus(this.list[index].child)
    },
    //点击切换子级css样式并获取参数
    changChildStatus(i, index) {
       if(this.childList[i].status) {
        return
      }
      this.childList = this.getChildList(this.list, index, i)
      this.getChildParmas(i,index)
    },
    //子级获取参数
    getChildParmas(i,index) {
      if(this.list[index].child.length) {
        let parmas = {
          name1: this.newList[index].name,
          name2: this.childList[i].name,
          childstatus: i,
          status: index
          }
        this.getParmas(parmas)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.treeList::-webkit-scrollbar {
  background-color:#fff;
}
.child_treeList::-webkit-scrollbar {
  background-color:#fff;
}
.wrapper {
  overflow-x: hidden;
  position: relative;
  height: 25vw;
  .treeList{
    overflow-x: auto;
    display: flex;
    white-space: nowrap;
    .select {
      font-size: 3.73vw;
      color: #666;
      padding: 2vw 4vw;
      width: 12vw;
      .child_wrapper {
        overflow-x: hidden;
        display: flex;
        white-space: nowrap;
        background: #e1e1e1;
        width: 100vw;
        position: absolute;
        top: 12vw;
        left: 0;
        // z-index: 99;
        .child_treeList {
          overflow-x: auto;
          display: flex;
          white-space: nowrap;
          width: 100vw;
          span {
            padding: 1.23vw 4.26vw;
            background: #f8f8f8;
            box-shadow:0px 0.26vw 0.8vw 0px rgba(136,136,136,0.2);
            border-radius: 3.86vw;
            text-align: center;
            font-size: 3.46vw;
            margin-right: 4vw;
          }
          .childrenAddClass {
            color:#fff;
            font-size: 3.46vw;
            background: #007aff;
            box-shadow:0px 2px 6px 0px rgba(136,136,136,0.2);
            border-radius:3.86vw;
            padding: 1.23vw 4.26vw;
          }
        }
      }
    } 
  }
}
.addClass {
  color: #363636;
  font-size: 4.5vw;
  border-bottom: 0.8vw solid #363636;
  border-radius: 0.4vw;
}
</style>
