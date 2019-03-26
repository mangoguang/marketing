<template>
  <div class="eggSearchInp">
    <div class="search_icon"></div>
    <form action='' @submit.prevent>
    <input class="eggInp" ref="inpComp"
      type="search" 
      placeholder="请输入搜索内容"
      @click="toSearch"
      :value='value'
      v-on:input="$emit('input',$event.target.value)"
      maxlength="20"
      @blur="viewDefault"
      @keypress="search"
      />
      </form>
      <button class="deleteVal" 
        v-show="showDeleteIcon && !origin"
        @touchend="deleteBtn"></button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: [ 'origin', 'value', 'deleteVal', 'type' ],
  data() {
    return {
      showDeleteIcon: false
    }
  },
  computed: {
    ...mapState({
      searchParmas: state => state.searchParmas.searchParmas
    })
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
  created() {
    if(this.$route.path === '/search' || this.$route.path === '/gSearch') {
      if(this.searchParmas && this.searchParmas.key) {
        return
      }
      this.changfouce()
    }
  },
  methods: {
    //输入框回弹的时候恢复页面
    viewDefault() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    search(event) {
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
        event.preventDefault(); //禁止默认事件（默认是换行） 
        this.$refs.inpComp.blur()
      }
    },
    //输入框自动聚焦
    changfouce(){
      this.$nextTick((x) => {   //正确写法
        this.$refs.inpComp.focus();
      })
    },
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
    margin: 5vw auto;
    width: 91.46vw;
    position: relative;
    box-sizing: border-box;
    input{
      caret-color:#000;
    }
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
    height: 8vw;
    line-height: 8vw;
    background: #f7f7f7;
    border-radius:  4vw;
    font-size: 3.46vw;
    padding: 0 9.33vw;
    box-sizing: border-box
  }
  .deleteVal {
    background: url(../../../assets/imgs/egg_delete.png) no-repeat center;
    background-size: contain;
    width: 4.26vw;
    height: 4.26vw;
    position: absolute;
    right: 2vw;
    top: 2vw;
    z-index: 10;
  }
}
</style>
