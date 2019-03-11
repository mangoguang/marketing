<template>
  <div class="eggSearchInp">
    <div class="search_icon"></div>
    <input class="eggInp" ref="inpComp"
      type="text" 
      placeholder="请输入搜索内容"
      @click="toSearch"
      :value='value'
      v-on:input="$emit('input',$event.target.value)"
      maxlength="20"
      />
      <button class="deleteVal" 
        v-show="showDeleteIcon && !origin"
        @click="deleteBtn"></button>
  </div>
</template>

<script>
export default {
  props: [ 'origin', 'value', 'deleteVal', 'type' ],
  data() {
    return {
      showDeleteIcon: false
    }
  },
  watch: {
    //清空按钮出现/隐藏
    value() {
      if(this.value.length)  {
        this.showDeleteIcon = true
      }else {
        this.showDeleteIcon = false
      }
    }
  },
  methods: {
    //清空输入框
    deleteBtn() {
      this.deleteVal('')
      this.$refs.inpComp.focus()
    },
    //如果是首页点击进入搜索页面
    toSearch() {
      if(this.origin) {
        if(this.type === 'gallery') {
          this.$router.push({
            path: '/gSearch',query: {type: this.type}
          })
        }else {
          this.$router.push({
            path: '/search',query: {type: this.type}
          }) //type判断是首页还是常见问题
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.eggSearchInp {
    margin: 3vw auto;
    width: 91.46vw;
    position: relative;
  .search_icon {
    background: url(../../../assets/imgs/egg_search.png) no-repeat center;
    background-size: 100% 100%;
    width: 4.26vw;
    height: 4.26vw;
    position: absolute;
    left: 3vw;
    top: 2.13vw;
  }
  .eggInp {
    width: 100%;
    line-height: 8vw;
    background: #f7f7f7;
    border-radius:  4vw;
    font-size: 3.46vw;
    padding: 0 9.33vw;
    box-sizing: border-box
  }
  .deleteVal {
    background: url(../../../assets/imgs/egg_delete.png) no-repeat center;
    background-size: 100% 100%;
    width: 4.26vw;
    height: 4.26vw;
    position: absolute;
    right: 2vw;
    top: 2vw
  }
}
</style>
