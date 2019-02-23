<template>
  <ul class="treeList" ref="ulul">
    <div class="wrapper">
      <li class="select" 
      v-for="(item, index) in list" :key="index" >
      <span @click="changeFlag(index)" 
        :class="isactive == index? addClass : ''">
        {{ item.name }}
      </span>
      <treeList v-show="scope[index]" :list='item.child' class="hasChildren"></treeList>
    </li> 
    </div>
  </ul>
</template>

<script>
export default {
  name: 'treeList',
  props: ['list'],
  data() {
    return {
      scope: {},
      isactive: -1,
      addClass: '',
      hasChildren: ''
    }
  },
  created() {
    this.getScope()
  },
  methods: {
    //点击切换css样式
    changeFlag(index) {
      this.getScope()
      if(this.list[index].child && this.list[index].child.length) {
        this.addClass = 'addclass'
      }else {
        this.addClass = 'childrenAddClass'
        this.list[index].father? this.addClass = 'addclass' : ''
      }
      this.isactive = index
      this.$set(this.scope,index,!this.scope[index])
    },
    //获取状态
    getScope() {
      if(this.list) {
        this.list.forEach((item,index) => {
          if(item.child && item.child.length) {
            this.$set(this.scope,index,false)
            this.isactive = -1
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.treeList {
  overflow-x: hidden;
  .wrapper {
    overflow-x: auto;
    display: flex;
    white-space: nowrap;
    .select {
      font-size: 3.73vw;
      color: #666;
      padding: 2vw 4vw;
      width: 12vw;
      .addclass {
        color: #363636;
        font-size: 4.5vw;
        border-bottom: 0.8vw solid #363636;
        border-radius: 0.4vw;
      }
    } 
    // .select:nth-child(1) {
    //   color: #363636;
    //   font-size: 4.5vw;
    //   border-bottom: 0.8vw solid #363636;
    //   border-radius: 0.4vw;
    // }
  }
}
.wrapper::-webkit-scrollbar {
  background-color:#fff;
}
.hasChildren {
  background: #e1e1e1;
  width: 100vw;
  position: absolute;  
  top: 12vw;
  left: 0;
  li {
    margin-right: 2vw;
  }
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
</style>
