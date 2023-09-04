<template>
  <div class="micro-header">
    <el-row class="micro-header-row" justify="space-between" align="middle">
      <!-- <el-header>Header {{ getUsername }}</el-header> -->
      <el-col :span="12" class="micro-header-col">
        <div class="logo">
          <svg-icon iconName="WEBlogo"  />
        </div>
      </el-col>
      <el-col :span="12" class="micro-header-col">
        <div>right{{ getUsername }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="js" setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const getUsername = computed(() => JSON.parse(store.getters.getLoginInfo).loginUserInfo?.name);

</script>
<style scoped lang="scss">
.micro-header {
  .micro-header-row {
    height: 64px;
    background-color: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    .micro-header-col:nth-child(2) {
      text-align: right;
    }

    .logo {
      width: 175px;
      height: 30px;
    }
  }
}
</style>