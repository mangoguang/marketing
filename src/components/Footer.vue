<template>
  <div class="footer" :style="{'padding-bottom':`${padding}vw`}">
    <ul>
      <li id="1">
        <router-link to="/home" @click.native="changeActive">
          <div class="iconHome"></div>
          <p class="iconCharP">首页</p>
        </router-link>
      </li>
      <li id="2" @click="isDeal">
        <!-- <router-link to="/ReportForms" > -->
        <div v-show="chartActive">
          <div class="iconChar"></div>
          <p class="iconCharP">报表</p>
        </div>
        <div v-show="!chartActive">
          <div class="charActive"></div>
          <p class="charPActive">报表</p>
        </div>
        <!-- </router-link> -->
      </li>
      <li id="3">
        <router-link to="/Customer" @click.native="changeActive">
          <div class="iconSalary"></div>
          <p class="iconCharP">客户</p>
        </router-link>
      </li>
      <li id="4" @touchend='touchend'>
        <!-- <router-link to="/msManage" @click.native="changeActive"> -->
          <div class="iconMsg"></div>
          <p class="iconCharP">消息</p>
        <!-- </router-link> -->
      </li>
      <li id="5">
        <router-link to="/personalCenter" @click.native="changeActive">
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
      ajaxData: [],
      shops: []
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
    //获取本地缓存信息
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
  },
  methods: {
    ...mapMutations(["setChartActive"]),
    changeActive() {
      this.setChartActive(true);
    },
    isDeal() {
      if(this.ajaxData.type === 'dealer') {
        this.setChartActive(false)
        this.$router.push({path: "/ReportForms"})
      }else {
        alert('暂无权限')
        this.setChartActive(true)
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
    background: url(../assets/imgs/icon1.png);
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
        background: url(../assets/imgs/icon1.png);
        background-size: 2100%;
        background-position: -7.6vw -20.8vw;
      }
      .iconChar {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/icon1.png);
        background-size: 2100%;
        background-position: -21.4vw -20.8vw;
      }
      .iconSalary {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/icon1.png);
        background-size: 2100%;
        background-position: -77.8vw -20.8vw;
      }
      .iconMsg {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/icon1.png);
        background-size: 2100%;
        background-position: -63.7vw -20.8vw;
      }
      .iconPerson {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/icon1.png);
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
        background: url(../assets/imgs/icon1.png);
        background-size: 2100%;
        background-position: -0.4vw -20.8vw;
      }
      .router-link-exact-active .iconChar {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/icon1.png);
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
        background: url(../assets/imgs/icon1.png);
        background-size: 2100%;
        background-position: -71vw -20.8vw;
      }
      .router-link-exact-active .iconMsg {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/icon1.png);
        background-size: 2100%;
        background-position: -56.2vw -20.8vw;
      }
      .router-link-exact-active .iconPerson {
        width: 6.6vw;
        height: 6.6vw;
        margin-bottom: 1.33vw;
        background: url(../assets/imgs/icon1.png);
        background-size: 2100%;
        background-position: -42.6vw -20.8vw;
      }
    }
  }
}
</style>
