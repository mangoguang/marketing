<template>
  <div class="footer" :style="{'padding-bottom':`${padding}vw`}">
    <ul>
      <li id="1">
        <router-link to="/" @click.native="changeActive" replace>
          <div class="iconHome"></div>
          <p class="iconCharP">首页</p>
        </router-link>
      </li>
      <li id="2" v-if="status">
         <router-link to="/ReportForms" replace>
          <div class="iconChar"></div>
          <p class="iconCharP">报表</p>
         </router-link>
        <!-- <div v-show="!chartActive">
          <div class="charActive"></div>
          <p class="charPActive">报表</p>
        </div> -->
      </li>
      <li id="3" v-else>
        <router-link to="/Customer" @click.native="changeActive" replace>
          <div class="iconSalary"></div>
          <p class="iconCharP">客户</p>
        </router-link>
      </li>
      <li id="4" >
        <router-link to="/work" @click.native="changeActive" replace>
          <div class="iconMsg"></div>
          <p class="iconCharP">工作</p>
        </router-link>
      </li>
      <li id="5">
        <router-link to="/personalCenter" @click.native="changeActive" replace>
          <div class="iconPerson"></div>
          <p class="iconCharP">个人</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      padding: "",
      status: false
    };
  },
  computed: {
    ...mapState({
      chartActive: state => state.personMsg.chartActive
    })
  },
  mounted() {
    this.isIPhoneX();
  },
  created() {
    this.isDeal()
  },
  methods: {
    ...mapMutations(["setChartActive"]),
    changeActive() {
      this.setChartActive(true);
    },
    isDeal() {
      if(this._localAjax() && this._localAjax().typename) {
        this.status = this._localAjax().typename === 'boss'? 'true' : 'false'
      }
    },
    touchend(e) {
      // console.log(e.path[1].id)
      // if(e.path[1].id){
      //   alert('该模块尚未开发')
      // }
      alert('该模块尚未开发')
      // this.$router.push({path: '/'})
      // this.setChartActive(false)
    },
    isIPhoneX() {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.padding = "4.53";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100vw;
  position: fixed;
  background: #f8f8f8;
  bottom: 0;
  .charActive {
    width: 6.6vw;
    height: 6.6vw;
    margin-bottom: 1.33vw;
    background: url(../../static/images/icon.png);
    background-size: 2100%;
    background-position: -14.2vw -20.8vw;
  }
  .charPActive {
    color: #007aff;
    font-size: 2.4vw;
    text-align: center;
  }
  ul {
    display: flex;
    justify-content: space-around;
    padding-bottom: 1vw;
    li {
      margin-top: 2vw;
      .iconHome {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../../static/images/icon.png);
        background-size: 2100%;
        background-position: -7.6vw -20.8vw;
      }
      .iconChar {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../../static/images/icon.png);
        background-size: 2100%;
        background-position: -21.4vw -20.8vw;
      }
      .iconSalary {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/customer.png)no-repeat center;
        background-size: 100% 100%;
      }
      .iconMsg {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/unwork.png) no-repeat center;
        background-size: 100% 100%;
        // background-position: -63.7vw -20.8vw;
      }
      .iconPerson {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../../static/images/icon.png);
        background-size: 2100%;
        background-position: -49.7vw -20.8vw;
      }
      p {
        color: #8e8e93;
        font-size: 2.4vw;
        text-align: center;
      }
      //路由生效时候样式图片改变
      .router-link-exact-active .iconHome {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../../static/images/icon.png);
        background-size: 2100%;
        background-position: -0.4vw -20.8vw;
      }
      .router-link-exact-active .iconChar {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../../static/images/icon.png);
        background-size: 2100%;
        background-position: -14.2vw -20.8vw;
      }
      .router-link-exact-active .iconCharP {
        color: #007aff;
        font-size: 2.4vw;
        text-align: center;
      }
      .router-link-exact-active .iconSalary {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/customer1.png)no-repeat center;
        background-size: 100% 100%;
      }
      .router-link-exact-active .iconMsg {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/work.png) no-repeat center;
        background-size: 100% 100%;
      }
      .router-link-exact-active .iconPerson {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../../static/images/icon.png);
        background-size: 2100%;
        background-position: -42.6vw -20.8vw;
      }
    }
  }
}
</style>
