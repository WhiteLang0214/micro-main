<template>
  <div class="meta-uploadHeader">
    <el-dialog
      :close-on-click-modal="$store.state.closeOnClickModal"
      v-model="show"
      :title="'上传头像'"
      class="common-dialog-w480_hAuto"
      destroy-on-close
    >
      <!--      <div v-if="formValidate.mainImage !== ''">-->
      <!--        <img :src="formValidate.mainImage" class="headerImg" alt="头像">-->
      <!--        <div>-->
      <!--          <el-button class="meta-button common-cancel-button-small" @click="uploadPicture('flagImg')">更换头像</el-button>-->
      <!--          <div class="el-upload__text">请将图片大小控制在2MB以内，支持JPG、PNG等图片格式。图片尺寸建议为100x100px,</div>-->
      <!--        </div>-->

      <!--      </div>-->
      <div class="uploadWrap">
        <div
          class="border"
          @click="uploadPicture('flagImg')"
          v-if="formValidate.mainImage == ''"
        >
          <MetaSvgIcon iconName="新增" class="download-icon" />
          <div class="text">上传图片</div>
        </div>
        <div class="border" v-else>
          <img :src="formValidate.mainImage" class="headerImg" alt="头像" />
          <div class="hoverWrap" @click="uploadPicture('flagImg')">
            <MetaSvgIcon iconName="新增" class="download-icon" />
            <div class="text">上传图片</div>
          </div>
        </div>
        <div class="el-upload__text">
          请将图片大小控制在2MB以内，支持JPG、PNG等图片格式。图片尺寸建议为100x100px,
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="meta-button common-cancel-button-small"
            @click="onClose"
            >取消</el-button
          >
          <el-button
            :loading="saveLoading"
            class="meta-button common-button-small"
            type="primary"
            @click="submit"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-if="cropperModel"
      title="裁切头像"
      v-model="cropperModel"
      width="950px"
      center
    >
      <meta-crop
        class="cropWrap"
        :Name="cropperName"
        @uploadImgSuccess="handleUploadSuccess"
        @onCancel="onCancel"
        ref="child"
      >
      </meta-crop>
    </el-dialog>
  </div>
</template>

<script>
import { uploadHeader, getHeaderId } from "@/api";

export default {
  name: "metaUploadHeader",
  data() {
    return {
      show: false,
      formValidate: {
        mainImage: "",
        id: "",
      },
      cropperModel: false,
      cropperName: "",
      saveLoading: false,
    };
  },
  methods: {
    onOpen() {
      this.show = true;
      getHeaderId().then((res) => {
        console.log("meta-uploadheader--", res)
        if (res && res.headSculpture) {
          this.formValidate.id = res.headSculpture;
          this.formValidate.mainImage = res.headSculpture;
        }
      });
    },
    onClose() {
      this.show = false;
    },
    submit() {
      uploadHeader({ headSculpture: this.formValidate.id }).then((res) => {
        if (res.err == "0") {
          this.$message({
            message: "上传成功",
            type: "success",
          });
          this.show = false;
          this.$emit("submit");
        }
      });
    },
    //封面设置
    uploadPicture(name) {
      this.cropperName = name;
      this.cropperModel = true;
    },
    //图片上传成功后
    handleUploadSuccess(data) {
      this.formValidate.id = data.docId;
      this.formValidate.mainImage = data.url;
      this.cropperModel = false;
    },
    onCancel() {
      this.cropperModel = false;
    },
  },
};
</script>

<style scoped lang="scss">
.meta-uploadHeader {
  .headerImg {
    width: 150px;
    height: 150px;
    display: block;
    margin: auto;
  }
  .uploadWrap {
    width: 100%;
    height: auto;
    margin: auto;

    .border {
      width: 150px;
      height: 150px;
      border: 1px solid #ccc;
      text-align: center;
      margin: auto;
      position: relative;

      .download-icon {
        width: 30px;
        height: 30px;
        margin-top: 45px;
        color: #b8b8b8;
      }

      .text {
        line-height: 24px;
        margin-top: 16px;
      }

      .hoverWrap {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        text-align: center;
        margin: auto;
        background: rgba(0, 0, 0, 0.3);
        cursor: pointer;
        .download-icon {
          color: #fff;
        }
        .text {
          color: #fff;
        }
      }
      &:hover .hoverWrap {
        display: block;
      }
    }

    .el-upload__text {
      margin-top: 16px;
    }
  }

  .cropWrap {
    width: 100%;
    height: 350px;
  }
}
</style>