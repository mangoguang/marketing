<template>
  <div class="upload">
    <h1>附件图片</h1>
    <ul class="load_box">
      <div v-if="imgLen>=5 ? false : true" class="addFile">
        <input
          type="file"
          class="upload"
          @change="addImg"
          ref="inputer"
          multiple
          accept="image/png, image/jpeg, image/gif, image/jpg"
        >
        <div class="content">
          <img src="../../../assets/imgs/upload.png" alt="">
          <p>添加图片</p>
        </div>
      </div>
      <li v-for="(value, key) in imgs" :key="key">
        <img :src="getObjectURL(value)">
        <a class="close" @click="delImg(key)">
          <img src="../../../assets/imgs/egg_delete.png" alt="">
        </a>
      </li>
      <div class="count">
        <span>{{ imgLen }}</span>
        <span>/5</span>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: new FormData(),
      imgs: {},
      imgLen: 0,
      imgdata: "",
      fil: ''
    };
  },
  methods: {
    //添加图片
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 5) {
        alert("最多可上传5张，您还可以上传" + (5 - oldLen) + "张");
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 3 * 1024 * 1024) {
          alert("请选择3M以内的图片！");
          return false;
        }
        this.imgLen ++;
        this.$set(
          this.imgs,
          this.fil[i].name + "?" + new Date().getTime() + i,
          this.fil[i]
        );
        this.submit(this.fil[i])
        this.$nextTick(() => {
          console.log(111,this.imgdata)
        })
      }
    },
    //创建url预览图片
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    delImg(key) {
      this.$delete(this.imgs, key);
      this.imgLen--;
    },
    //图片转位base64
    submit(file) {
      if (file) {
        var reader = new FileReader();
        // 图片文件转换为base64
        reader.readAsDataURL(file);
        reader.onload = function(){
          this.imgdata = this.result
        };
      }
    },
    //base64转成formdata形式上传
    changeFormData(url) {
      let bytes = window.atob(url.split(",")[1]);
      let temp = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(temp);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      //Blob对象
      let blob = new Blob([temp], { type: "image/jpeg" }); //type为图片的格式
      //FormData对象
      let imgUrl = this.formData
      imgUrl.append("dataFile", blob, Date.now() + ".jpg");
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  box-sizing: border-box;
  padding: 4vw;
  h1 {
    font-size: 4vw;
    color: #363636;
    font-weight: normal;
  }
  .addFile {
    position: relative;
    width: 20vw;
    height: 20vw;
    margin-right: 25px;
    border: 1px dashed #e1e1e1;
    border-radius: 1.06vw;
    input {
      opacity: 0;
      width: 20vw;
      height: 20vw;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
    }
    .content {
      position: absolute;
      left: 20%;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 5.33vw;
        height: 5.33vw;
        margin-top: 5vw;
      }
      p {
        color: #909090;
        font-size: 2.4vw;
      }
    }
  }
  .load_box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li {
      width: 20vw;
      height: 20vw;
      display: flex;
      margin-right: 6vw;
      margin-bottom: 4vw;
      .close {
        margin-left: 1vw;
        img {
          width: 4vw;
          height: 4vw;
        }
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .count {
    color: #909090;
    font-size: 2.4vw;
    margin-top: 14vw;
  }
}
</style>

