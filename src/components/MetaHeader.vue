<template>
  <div class="micro-header">
    <el-row class="micro-header-row" justify="space-between" align="middle">
      <el-col :span="12" class="micro-header-col">
        <div class="logo">
          <MetaSvgIcon iconName="WEBlogo" />
        </div>
      </el-col>
      <el-col :span="12" class="micro-header-col">
        <div class="loginInfo">
          <div class="user">
            <p>{{ getUsername }}</p>
            <p>{{ getUserTenant }}</p>
          </div>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="transparent"
            :ellipsis="false"
            @select="handleSelect"
          >
            <el-sub-menu index="2" popper-class="sub-menu-poper">
              <template #title>
                <!-- 有头像 展示,反之截取姓名第一个字 -->
                <div class="avatar" v-if="hasHeadScilpture">
                  <el-avatar
                    :size="36"
                    :src="hasHeadScilpture" />
                </div>
                <!-- 无头像 截取第一个字展示 -->
                <div v-else class="avatar">
                  {{ getUsername.slice(0, 1) }}
                </div>
              </template>
              <el-menu-item index="uploadHeader">上传头像</el-menu-item>
              <el-menu-item index="changeSys">切换系统</el-menu-item>
              <el-menu-item index="exit">退出系统</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </el-col>
    </el-row>
    <!-- 上传头像 -->
    <metaUploadHeader ref="metaUploadHeaderRef"></metaUploadHeader>
  </div>
</template>

<script lang="js" setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { loginAccountInfo } from "@/api";
import { ElMessageBox } from "element-plus";
import { logout } from "@/api";

const store = useStore();

let loginAccountInfoData = ref({});
const metaUploadHeaderRef = ref();

const getLoginInfo = computed(() => JSON.parse(store.getters.getLoginInfo).loginUserInfo || {})
const getUsername = computed(() => getLoginInfo.value?.name || "");
const getUserTenant = computed(() => getLoginInfo.value?.tenantName || "");
const hasHeadScilpture = computed(() => loginAccountInfoData.value.headSculpture || "")

const getLoginAccountInfo = () => {
  loginAccountInfo().then(res => {
    loginAccountInfoData.value = res;
  })
}

const handleSelect = (e) => {
  if (e == "uploadHeader") uploadHeader()
  if (e == "changeSys") changeSys()
  if (e == "exit") exit()
}

const uploadHeader = () => {
  console.log("上传头像", metaUploadHeaderRef.value)
  metaUploadHeaderRef.value.onOpen();
}

const changeSys = () => {
  console.log("切换系统")
}

const exit = () => {
  ElMessageBox.confirm("确定要退出系统吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    cancelButtonClass: "btnFalses",
    type: "warning",
  })
    .then(() => {
      logout().then(() => {
        window.location = process.env.VUE_APP_SSO_LOGIN;
      });
    })
    .catch(() => {});
}


onMounted(() => {
  getLoginAccountInfo()
})
</script>
<style scoped lang="scss">
.micro-header {
  .micro-header-row {
    height: 64px;
    padding: 0 20px;
    box-sizing: border-box;

    .logo {
      width: 175px;
      height: 30px;
    }

    .loginInfo {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .user p {
        font-size: 16px;
        text-align: right;
      }

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 36px;
        text-align: center;
        line-height: 36px;
        font-size: 20px;
        font-weight: 400;
        color: #fff;
        background-color: #1d2088;
      }

      :deep(.el-menu) {
        border-bottom: none;
        margin-left: 16px;
        .el-sub-menu .el-sub-menu__title {
          padding: 0;
          padding-right: 10px;
          border-bottom: 0;
        }

        .el-sub-menu__icon-arrow {
          right: -12px;
        }
      }
    }
  }
}
</style>