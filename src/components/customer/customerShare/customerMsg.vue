<template>
  <div class="customerMsg">
    <ul>
      <li is="customerLi" :leftText="'客户生日'">
        <span v-if='list.birthday'>{{ turnDate(list.birthday) }}</span>
        <span class='unspan' v-else>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户年龄'">
        <span v-if='list.age'>{{ list.age }}</span>
        <span class='unspan' v-else>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户微信'">
        <span v-if='list.weChat'>{{ list.weChat }}</span>
        <span class='unspan' v-else>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户 QQ'">
        <span v-if='list.qq'>{{ list.qq }}</span>
        <span class='unspan' v-else>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户职业'">
        <span v-if='list.duty'>{{ list.duty }}</span>
        <span class='unspan' v-else>未收集</span>
      </li>
      <!-- <li is="customerLi" class="customerLi2" :leftText="'客户地址'">
        <span v-if='list.address'>{{ list.address }}</span>
        <span class='unspan' v-else>未收集</span>
      </li> -->
      <li is="customerLi" :leftText="'客户地区'"  :icon="true" @click.native="toAddress">
          <span>地址管理</span>
      </li>
      <li is="customerLi" class="customerLi2" :leftText="'客户描述'">
        <span v-if='list.remark'>{{ list.remark }}</span>
        <span class='unspan' v-else>未收集</span>
      </li>
      <li is="customerLi" :leftText="'所属门店'">
        <span v-if='list.orgId' class='shop'>{{ getShopId(list.orgId) }}</span>
        <span class='unspan' v-else>未收集</span>
      </li>
    </ul>
    <btn @click.native="edit()" :text="'编辑资料'" class="myBtn"></btn>
  </div>
</template>

<script>
import customerLi from '../customerLi'
import btn from "../../btn";
export default {
  props: ['list', 'editMsg'],
  components: {customerLi, btn},
  data() {
    return {
      shops: ''
    }
  },
  mounted() {
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
  },
  methods: {
   edit() {
     this.editMsg(true)
   },
   toAddress() {
      this.$router.push({path:`/address/${this.$route.query.id}`})
    },
    //获取门店
    getShopId(id) {
      let name
      if(this.shops && this.shops.length) {
        this.shops.forEach((item, index) => {
          if(item.crmId === id) {
             name = item.name
          }
      });
      }
      return name
    },
   //转化日期
  turnDate(date) {
    if (date) {
      let arr = date.split('-')
      if (arr.length > 1) {
        return `${arr[0]}年${arr[1]}月${arr[2]}日`
      } else {
        return date
      }
    }
  }
  }
}
</script>

<style lang="scss" scoped>
.customerMsg {
  ul {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    // padding-left:4vw;
    background: #fff;
    margin-top: 4vw;
    color: #363636;
    font-size: 4vw;
    li {
      line-height: 3em;
    }
    .shop {
      // margin-left:4vw;
      box-sizing:border-box;
    }
     span:first-child  {
        // border: 1px solid red
      }
    li:last-child{
      border-bottom: none;
      width: 100%;
     
    }
    .unspan{
      color: #999
    }
  }
  .myBtn {
    background:rgba(0,122,255,1);
    border: .13vw solid rgba(0,93,194,1);
    width: 80%;
    margin-left: 10%;
    // position: absolute;
    // bottom:10vw;
    // left:10vw;
  }
}
</style>
