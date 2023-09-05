<template>
  <div class="micro-header">
    <el-row class="micro-header-row" justify="space-between" align="middle">
      <el-col :span="12" class="micro-header-col">
        <div class="logo">
          <svg-icon iconName="WEBlogo" />
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
            </el-sub-menu>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="js" setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { loginAccountInfo } from "@/api/login.js";

const store = useStore();

let loginAccountInfoData = ref({});

const getLoginInfo = computed(() => JSON.parse(store.getters.getLoginInfo).loginUserInfo)
const getUsername = computed(() => getLoginInfo.value?.name);
const getUserTenant = computed(() => getLoginInfo.value?.tenantName);

const getLoginAccountInfo = () => {
  loginAccountInfo().then(res => {
    loginAccountInfoData.value = res;
  })
}

const hasHeadScilpture = computed(() => loginAccountInfoData.value.headSculpture)

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
        }
      }
    }
  }
}
</style>