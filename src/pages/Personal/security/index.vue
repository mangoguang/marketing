<template>
  <div class="index">
    <banner title='账户安全'/>
    <ul class="container" >
      <li is="personalLi" 
          class="personalLi" 
          v-for="(item,index) in list" 
          :key="index"
          :lefttext="item.name"
          :icon='item.icon'
          @click.native="routeTo(index)">
      </li>
    </ul>
    <btn text="退出登录" class="unlogin" @click.native='unlogin'/>
    <messageBox :type='false' :btnNum='2' v-show="control">
      <div>确定退出账号？</div>
      <div slot='btn-group' class="btn-group">
        <button @click="comfirm">确定</button>
        <button @click="cancle">取消</button>
      </div>
    </messageBox>
  </div>
</template>

<script>
import banner from '../../../components/banner'
import personalLi from '../../../components/personal/personalLi'
import btn from '../../../components/personal/Btn'
import messageBox from '../../../components/msManage/yanMessageBox'
export default {
  components: {
    banner,
    personalLi,
    btn,
    messageBox
  },
  data () {
    return {
      list: [{
        name: '修改密码',
        icon: true,
        routePath: 'resetMyPwd'
      },{
        name: '修改手机绑定',
        icon: true,
        routePath: 'resetMyPwd'
      }],
      control: false
    };
  },
  methods: {
    routeTo(index) {
      const routePath = this.list[index].routePath
      this.$router.push({path: routePath})
    },
    unlogin() {
      this.control = true
    },
    comfirm() {
      localStorage.clear()
      this.$router.push({path: '/login'})
    },
    cancle() {
      this.control = false
    }
  }
}
</script>
<style lang='scss' scoped>
.index {
  .container {
    width: 100vw;
    margin-top: 16.4vw;
    padding-left: 4.26vw;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    .personalLi {
      border-bottom: 1px solid #e1e1e1;
    }
    .personalLi:last-child{
      border-bottom: none;
    }
  }
  .unlogin {
    margin-top: 13.33vw;
  }
  .btn-group {
    width: 74.66vw;
    button {
      width: 74.66vw;
      height: 13.33vw;
    }
  }
}
</style>