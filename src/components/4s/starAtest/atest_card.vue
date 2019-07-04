<!--  -->
<template>
  <div class="atest_card">
    <div class="header">
      <div class="left_text">
        <p class="name">广东广州何秋明</p>
        <p claas='star'>认证星级：三星</p>
      </div>
      <div class="right_text">
        <img src="../../../assets/imgs/4s/via.png" alt="">
      </div>
    </div>
    <div class="time">
      <p>检查周期：36周</p>
      <p>累计周期：37周</p>
      <p>开始时间：2018.07.15</p>
    </div>
    <div class="buttMan">
      <div class="head_line"></div>
      <div class="head">
        <span>对接人信息</span>
        <div class="edit_btn" @click="handleEdit" v-if="isEdit">
          <img src="../../../assets/imgs/4s/edit.png" alt="">
        </div>
        <div class="edit" v-else>
          <div class="closeBtn" @click="handleCloseBtn">
            <img src="../../../assets/imgs/4s/error.png" alt="">
          </div>
          <div class="comfirmBtn" @click="handleComfirmBtn">
            <img src="../../../assets/imgs/4s/correct.png" alt="">
          </div>
        </div>
      </div>
      <div class="content">
        <div class="name">
          <label for="name">姓名:</label>
          <input type="text" id="name" v-model="nameVal" :readonly="isReadOnly" ref="inputName">
        </div>
        <div class="tel">
          <label for="tel">电话:</label>
          <input type="number" id="tel" v-model="telVal" :readonly="isReadOnly">
        </div>
      </div>
      <div class="footer"></div>
    </div>
    <div class="atest">
      <button>发起申请</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEdit: true,
      isReadOnly: true,
      nameVal: '',
      telVal: ''
    };
  },
  methods: {
    handleEdit() {
      this.isEdit = !this.isEdit
      this.isReadOnly = !this.isReadOnly
      this.$refs.inputName.focus()
    },
    handleCloseBtn() {
      this.isEdit = !this.isEdit
      this.isReadOnly = !this.isReadOnly
      // this.nameVal = ''
      // this.telVal = ''
    },
    handleComfirmBtn() {
      this.isEdit = !this.isEdit
      this.isReadOnly = !this.isReadOnly
      const val = {
        name: this.nameVal,
        tel: this.telVal
      }
      this.$emit('getMeg',val)
    }
  }
}
</script>
<style lang='scss' scoped>
.atest_card {
  width: 94.66vw;
  // height: 72.53vw;
  margin: 0 auto;
  margin-top: 2.4vw;
  background: #fff;
  border-radius: 2.4vw;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding:0 1.6vw;
    padding-top: 4vw;
    box-sizing: border-box; 
    .left_text {
      .name {
        color: #363636;
        font-size: 5.06vw;
        font-weight: bold;
      }
      .star {
        color-adjust: #363636;
        font-size: 4vw;
        font-weight: 500;
      }
    }
    .right_text {
      img {
        width: 12.2vw;
        height: 12.2vw;
      }
    }
  }
  .time {
    color: #666;
    font-size: 3.73vw;
    padding-left: 1.6vw;
  }
  .buttMan {
    width: 100%;
    height: 23.86vw;
    margin-top: 2.4vw;
    // border-top:1px solid #ff964c; 
    // border-bottom:1px solid #ff964c; 
    .head_line {
      position: relative;
        &::after {
        content: '';
        position: absolute;
        top:0;
        left:0;
        box-sizing:border-box;
        border-top:1px solid #ff964c;
        width:200%;
        height:200%;
        transform-origin:0 0 ;
        transform:scale(0.5)
      }
    }
    .head {
      color: #ff964c;
      font-size: 3.73vw;
      display: flex;
      justify-content: space-between;
      padding: 1.4vw 2.4vw 0 1.6vw;
      box-sizing: border-box;
      height: 8vw;
      .edit_btn {
        img {
          width: 5.06vw;
          height: 5.06vw;
        }
      }
      .edit {
        display: flex;
      }
      .comfirmBtn,.closeBtn {
        padding: 0 3vw;
        img {
          width: 5.86vw;
          height: auto;
        }
      }
      .comfirmBtn {
        padding-right: 0;
      }
    }
    .content {
      padding: 0 2.4vw 0 1.6vw;
      box-sizing: border-box;
     
      .name,.tel {
        color: #ff964c;
        font-size: 3.73vw;
        line-height: 7vw;
      }
      #name,#tel {
        border-bottom: 1px solid #ff964c;
        color: #ff964c;
        width: 40vw;
        padding-left: 4vw;
        box-sizing: border-box;
      }
    }
    .footer {
      margin-top: 1.4vw;
      position: relative;
        &::after {
        content: '';
        position: absolute;
        top:0;
        left:0;
        box-sizing:border-box;
        border-bottom:1px solid #ff964c;
        width:200%;
        height:200%;
        transform-origin:0 0 ;
        transform:scale(0.5)
      }
    }
  }
  .atest {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 2.26vw 1.6vw 1.6vw 1.6vw;
    box-sizing: border-box;
    button {
      width: 21.33vw;
      height: 8vw;
      border-radius: 4vw;
      background: rgba($color: #007aff, $alpha: 0.2);
      color: #007aff;
      font-size: 4vw;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>