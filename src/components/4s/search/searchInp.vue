<!--  -->
<template>
  <div class="search_wrapper" :style="{'margin-top':`${top}vw`}">
    <div class="back_icon" @click="handleBack">
      <img src="../../../assets/imgs/back.png" alt="">
    </div>
    <div class="search_inp">
      <img src="../../../assets/imgs/egg_search.png" alt="">
      <form action="" @submit.prevent>
        <input  type="search" ref="inpComp"
                placeholder="请输入经销商名称"
                @blur="viewDefault"
                @keypress="search"
                v-model.trim="value">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      top:'',
      value: ''
    };
  },
  mounted(){
    this.isIPhoneX()
    this.changfouce()
  },
  methods:{
     //输入框自动聚焦
    changfouce(){
      this.$nextTick((x) => {   //正确写法
        this.$refs.inpComp.focus();
      })
    },
     //输入框回弹的时候恢复页面
    viewDefault() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    //搜索
    search(event) {
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
        event.preventDefault(); //禁止默认事件（默认是换行） 
        this.$refs.inpComp.blur()
        this.value && this.$emit('getValue',this.value)
      }
    },
    handleBack() {
      this.$router.go(-1)
    },
    isIPhoneX() {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "-5.86";
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.search_wrapper {
  padding-top: 5vw;
  width: 100vw;
  height: 23.6vw;
  background: #fff;
  display: flex;
  align-items: center;
  .back_icon {
    padding: 0 4.26vw;
    display: flex;
    align-items: center;
    img {
      width: 2.66vw;
      height: 4.66vw;
    }
  }
  .search_inp {
    width: 78.66vw;
    height: 8vw;
    border-radius: 4vw;
    background: #f7f7f7;
    display: flex;
    align-items: center;
    img {
      width: 4.26vw;
      height: 4.26vw;
      margin-left: 4vw;
      margin-right: 1.2vw;
    }
    input {
      width: 65vw;
    }
    input::-webkit-input-placeholder{ 
      color: #999; 
      font-size: 3.46vw;
     } 
  }
}

</style>