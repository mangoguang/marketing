<template>
  <div class="cell-list">
    <div class="cell-img cell-hot">
      <img src="https://op.derucci.com/web/marketingTest/static/img/login_icon.221d2f1.png"
           alt="">
    </div>
    <div class="cell-text">
      <div class="cell-top">
        <h2>V6 时尚 BFB1-019</h2>
        <div class="cell-pos">广东 东莞</div>
        <div class="cell-view">3662</div>
      </div>
      <div class="cell-bot">
        <span class="cell-date"
              v-if="isDate">2018.12.17</span>
        <div class="cell-info"
             v-else>
          <div class="cell-face">
            <img src="https://op.derucci.com/web/marketingTest/static/img/login_icon.221d2f1.png"
                 alt="">
          </div>
          <h3>张三</h3>
        </div>
        <span class="cell-love">16235</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isDate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
@mixin com-img {
  img {
    width: 100%;
    height: 100%;
  }
}

.cell-list {
  display: flex;
  margin-bottom: 10px;

  .cell-img {
    width: 135px;
    height: 135px;
    border-radius: 5px;
    margin-right: 10px;
    display: flex;
    @include com-img;
  }
  .cell-best {
    background: url(~@/assets/imgs/case/精品@2x.png) right top / 40px 40px
      no-repeat;
  }
  .cell-hot {
    background: url(~@/assets/imgs/case/置顶@2x.png) right top / 40px 40px
      no-repeat;
  }
  .cell-text {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 0;
  }
  %com-font {
    font-size: 12px;
    font-weight: 400;
    color: rgba(144, 144, 144, 1);
  }
  .cell-top {
    h2 {
      font-size: 12px;
      font-weight: 400;
      color: rgba(54, 54, 54, 1);
      line-height: 21px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .cell-pos {
      @extend %com-font;
      line-height: 1;
      min-height: 12px;
      margin-bottom: 8px;
      padding-left: 15px;
      background: url(~@/assets/imgs/case/marker@2x@2x.png) left center / 12px
        12px no-repeat;
    }
    .cell-view {
      @extend %com-font;
      padding-left: 15px;
      background: url(~@/assets/imgs/case/visible@2x@2x.png) left center / 12px
        12px no-repeat;
    }
  }
  .cell-bot {
    display: flex;
    justify-content: space-between;
    .cell-date,
    .cell-love {
      @extend %com-font;
    }
    .cell-love {
      display: block;
      min-height: 20px;
      padding-left: 17px;
      background: url(~@/assets/imgs/case/实心桃心@2x.png) left center / 14px
        14px no-repeat;
      line-height: 20px;
    }
    .cell-info {
      display: flex;
      height: 20px;
      line-height: 20px;
      .cell-face {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        @include com-img;
      }
      h3 {
        max-width: 120px;
        color: #363636;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>