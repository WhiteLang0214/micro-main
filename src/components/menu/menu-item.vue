<template>
  <el-menu-item
    :index="setMenuIndex(menuItem)"
    :item="menuItem"
    @click="handleClickMenu(menuItem)">
    {{ menuItem?.name }}
  </el-menu-item>
</template>

<script lang="js" setup>
import { defineProps, shallowRef } from "vue"
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter();
const store = useStore();

const VUE_APP_MICRO_UC = process.env.VUE_APP_MICRO_UC;
const VUE_APP_MICRO_BI = process.env.VUE_APP_MICRO_BI;
const VUE_APP_MICRO_EMBP = process.env.VUE_APP_MICRO_EMBP;

const props = defineProps({
  menuItemData: {
    type: Object
  }
})

const menuItem = shallowRef(props.menuItemData)

const createRouterPath = ({ menuPath, id }) => {
  let routerPath = "";
  const ucPath = VUE_APP_MICRO_UC + menuPath;
  const biPath = VUE_APP_MICRO_BI + '/' + menuPath;
  const embpPath = VUE_APP_MICRO_EMBP + menuPath;
  if (id.indexOf("UC") > -1) { // 用户中心
    routerPath = ucPath;
  } else if (id.indexOf("bi") > -1 || id.indexOf("wkf") > -1 || id.indexOf("CI") > -1) {
    routerPath = biPath;
  } else if (id.indexOf("M0") > -1) {
    routerPath = embpPath;
  } else {
    routerPath = menuPath;
  } 
  return routerPath
}

const setMenuIndex = (data) => {
  return createRouterPath(data);
}

const handleClickMenu = (data) => {
  const routerPath = createRouterPath(data);
  router.push(routerPath)
  store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify({ ...data, currentActivePath: routerPath }))
}

</script>
<style scoped>
</style>