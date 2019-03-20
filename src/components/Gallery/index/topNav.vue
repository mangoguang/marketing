<template>
  <ul class="nav-bar">
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="{active : item.status}"
      @touchend="changeStatus(index)"
    >
      {{item.name}}
      <hr v-show="item.status">
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        name:'详情',
        status: true
      },{
        name: '案例',
        status: false
      }]
    }
  },
  methods: {
     //改变导航
    changeStatus(index) {
      if(this.list[index].status) {
        return
      }
      this.list.map((item,index) => {
        item.status = !item.status
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-around;
  width: 50vw;
  margin: 0 auto;
  li {
    font-size: 4.26vw;
    font-weight: 500;
    color: #999;
    letter-spacing: 0.5vw;
    hr {
      border: none;
      border-top: 0.8vw solid #363636;
      border-radius: 0.4vw;
      margin: 0;
    }
  }
  .active {
    font-size: 4.8vw;
    color: #363636;
  }
}
</style>


