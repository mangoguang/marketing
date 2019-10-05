<template>
  <div class="fil-box"
       @click="$emit('onCloseFilter')">
    <div class="fil-main"
         @click.stop>
      <div class="list">
        <h2>品牌</h2>
        <div class="ul">
          <div class="li"
               :class="{active:item.status}"
               v-for="(item,index) in brandList"
               :key="index"
               @click="bindBrandSelect(index)">{{item.brand}}</div>
        </div>
      </div>
      <div class="list">
        <h2>品类</h2>
        <div class="ul">
          <div class="li"
               :class="{active:item.status}"
               v-for="(item,index) in categoryList"
               :key="index"
               @click="bindCategoryIndexSelect(index)">{{item.category}}</div>
        </div>
      </div>
    </div>
    <div class="button">
      <div class="btn light-blue"
           @click="bindReset">重置</div>
      <div class="btn blue"
           @click="bindDoneSelect">完成</div>
    </div>
  </div>
</template>
<script>
import { brandList, categoryList } from '@/api/case'
import Bus from '@/utils/Bus'
export default {
  components: {},
  data() {
    return {
      brandIndex: 0,
      categoryIndex: 0,
      brandList: [],
      categoryList: []
    }
  },
  created() {
    this._getBrand()
    this._getCategory()
  },
  methods: {
    bindBrandSelect(index) {
      if (this.brandIndex != index) {
        this.brandList.map(item => (item.status = false))
      }
      this.brandList[index].status = !this.brandList[index].status
      this.brandIndex = index
    },
    bindCategoryIndexSelect(index) {
      if (this.brandIndex != index) {
        this.categoryList.map(item => (item.status = false))
      }
      this.categoryList[index].status = !this.categoryList[index].status
      this.brandIndex = index
    },
    bindReset() {
      this.brandList.map(item => (item.status = false))
      this.categoryList.map(item => (item.status = false))
      Bus.$emit('onDoneSelect', { brand: '', category: '' })
    },
    async _getBrand() {
      let { data } = await brandList()
      data.map(item => {
        item.status = false
      })
      this.brandList = data
    },
    async _getCategory() {
      let { data } = await categoryList()
      data.map(item => {
        item.status = false
      })
      this.categoryList = data
    },
    bindDoneSelect() {
      let { brandList, brandIndex, categoryList, categoryIndex } = this
      Bus.$emit('onDoneSelect', {
        brand: brandList[brandIndex].brand,
        category: categoryList[categoryIndex].category
      })
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.fil-box {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  .fil-main {
    width: 300px;
    height: calc(100vh-52px);
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    padding: 21px 17px;
    overflow: auto;
    .list > h2 {
      color: #999999;
      font-size: 14px;
      line-height: 1;
      padding-bottom: 10px;
    }
    .ul {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 20px;
      .li {
        min-width: 75px;
        padding: 8px 10px;
        background: #f8f8f8;
        border-radius: 6px;
        text-align: center;
        border: 1px solid transparent;
        margin-right: 13px;
        margin-bottom: 10px;
        // &:nth-child(3n) {
        //   margin-right: 0;
        // }
      }
      .active {
        background: rgba(178, 215, 255, 1);
        color: #007aff;
      }
    }
  }
  .button {
    display: flex;
    height: 52px;
    text-align: center;
    line-height: 52px;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 300px;
    .btn {
      flex: 1;
    }
    .light-blue {
      background-color: #b2d7ff;
      color: #007aff;
    }
    .blue {
      background-color: #007aff;
      color: #fff;
    }
  }
}
</style>