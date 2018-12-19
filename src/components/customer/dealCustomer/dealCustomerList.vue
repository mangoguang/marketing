<template>
  <div class="dealCustomer" ref="deal">
    <ul>
      <li
        v-for="(item, index) in dealCustomerList"
        :key="`customerList${index}`"
        @click="getDetails(index)"
      >
        <span>{{index + 1}}</span>
        <span>{{item.username}}</span>
        <span>{{item.sex == 0 ? '未知' : item.sex == 1? '男' : '女'}}</span>
        <span>{{item.phone}}</span>
        <span>{{getLevel(item.level)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../../js";

export default {
  name: "dealCustomerList",
  props: ["changeResultTit"],
  data() {
    return {
      account: "",
      pullOptions: {
        isBottomRefresh: true,
        isTopRefresh: false
      },
      dealCusList: [],
      addPullData: [],
      allPage: "",
      key: true
    };
  },
  computed: {
    ...mapState({
      dealCustomerList: state => state.dealCustomerList.dealCustomerList,
      headerStatus: state => state.customerHeader.headerStatus,
      dealScroll: state => state.customerScroll.dealScroll,
      dealLength: state => state.dealCustomerList.dealLength
    })
  },
  watch: {
    //根据头部状态获取数据
    headerStatus() {
      if (this.headerStatus[2].status) {
        this.setHeader(this.dealLength)
        this.$refs.deal.addEventListener('scroll', this.handleScroll,true)
        this.$refs.deal.scrollTop = this.dealScroll
        if(this.dealScroll === 0) {
          this.getData();
        }
      }
    }
  },
  mounted() {
  this.$refs.deal.addEventListener('scroll', this.handleScroll,true)
  this.$refs.deal.scrollTop = this.dealScroll
  if (this.headerStatus[2].status) {
    if(!this.dealCustomerList) {
      this.getData();
    }else {
      this.setHeader(this.dealLength)
    }
  }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
    let account = localStorage.getItem("accountMsg");
    this.account = JSON.parse(account).name.trim();
    // this.account = this.ajaxData.account
  },
  methods: {
    ...mapMutations([
      "setDealCustomerList",
       "setDealOrderInfoDetails",
       "setTabStatus",
       'setDealScroll',
       'setDealLength'
       ]),
    //获取滚动条高度
    handleScroll(e) {
      let top = e.target.scrollTop
      this.setDealScroll(top)
    },
    getData() {
      this.key = false;
      mango.getAjax(this,"order",{
            account: this.account,
            page: 1,
            limit: 466,
            key: ""},"v2")
        .then(res => {
          //初始进来
          this.allPage = Math.ceil(res.data.total / 10);
          this.key = true;
          let result  = mango.getUniqueData(res.data.records)
          this.setDealCustomerList(result);
          this.dealCusList = this.dealCustomerList;
          this.setDealLength(result.length)
          this.setHeader(this.dealLength)
        });
    },
    setHeader(length) {
      this.$emit("changeResultTit",`全部客户 (${length == 0? "0": length})`);
    },
    //获得个人评价等级
    getLevel(level) {
      if (level == 1) {
        return "高";
      } else if (level == 2) {
        return "中";
      } else if (level == 3) {
        return "低";
      } else {
        return null;
      }
    },
    //详细订单信息
    getDetails(index) {
      let id = this.dealCustomerList[index].customerId
      this.setTabStatus(mango.btnList(['订单信息', '跟踪记录', '个人评级'], 0))
      mango.getAjax(this,"customerinfo",{customerId: id},"v2")
        .then(res => {
          if (res) {
            this.setDealOrderInfoDetails(res.data);
          }
        });
      this.$router.push({ path: "/dealDetails" ,
        query: {
          username: this.dealCustomerList[index].username,
          sex:this.dealCustomerList[index].sex,
          phone:this.dealCustomerList[index].phone
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.dealCustomer {
  width: 100vw;
  height: 100vh;
  overflow: scroll; 
  box-sizing: border-box;
  padding-top: 23vw;
  background: #f8f8f8;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;

  ul {
    border-top: 1px solid #e1e1e1;
    // border-bottom: 1px solid #e1e1e1;
    padding-left: 4.266vw;
    color: #999;
    font-size: 4.26vw;
    line-height: 11.73vw;
    padding-bottom: 21vw;
    li {
      display: flex;
      justify-content: space-between;
      padding-right: 3.86vw;
      border-top: 1px solid #e1e1e1;
      span:nth-child(2) {
        color: #363636;
        flex: 0.3;
      }
      span:nth-child(5) {
        color: #363636;
        flex: 0.05;
      }
      span:nth-child(3) {
        flex: 0.2;
      }
      span:nth-child(4) {
        flex: 0.5;
      }
      span:nth-child(1) {
        flex: 0.15;
      }
    }
    li:nth-child(1) {
      border-top: none;
    }
    li:last-child {
      border-bottom: 1px solid #e1e1e1;
      // margin-bottom: 3vw;
    }
  }
}
</style>

