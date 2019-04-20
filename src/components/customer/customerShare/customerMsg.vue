<template>
  <div class="customerMsg">
    <ul>
      <li is="customerLi" :leftText="'客户生日'">
        <span>{{ turnDate(list.birthday) }}</span>
        <span class='unspan' v-show='!list.birthday'>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户年龄'">
        <span>{{ list.age }}</span>
        <span class='unspan' v-show='!list.age'>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户微信'">
        <span>{{ list.weChat }}</span>
        <span class='unspan' v-show='!list.weChat'>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户 QQ'">
        <span>{{ list.qq }}</span>
        <span class='unspan' v-show='!list.qq'>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户职业'">
        <span>{{ list.duty }}</span>
        <span class='unspan' v-show='!list.duty'>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户地址'">
        <span>{{ list.address }}</span>
        <span class='unspan' v-show='!list.address'>未收集</span>
      </li>
      <li is="customerLi" :leftText="'客户描述'">
        <span>{{ list.remark }}</span>
        <span class='unspan' v-show='!list.remark'>未收集</span>
      </li>
      <li is="customerLi" :leftText="'所属门店'">
        <span>{{ getShopId(list.orgId) }}</span>
        <span class='unspan' v-show='!list.orgId'>未收集</span>
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
    padding-left:4vw;
    background: #fff;
    margin-top: 4vw;
    color: #363636;
    font-size: 4vw;
    li:last-child{
      border-bottom: none
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
