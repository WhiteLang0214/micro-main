<template>
  <el-menu-item
    :index="menuItem?.menuPath"
    :item="menuItem"
    @click="handleClickMenu(menuItem)">
    {{ menuItem?.name }}
  </el-menu-item>
</template>

<script lang="js" setup>
import { defineProps, shallowRef } from "vue"
import { useRouter } from 'vue-router'
const router = useRouter();

const VUE_APP_MICRO_UC = process.env.VUE_APP_MICRO_UC;
const VUE_APP_MICRO_BI = process.env.VUE_APP_MICRO_BI;
const VUE_APP_MICRO_EMBP = process.env.VUE_APP_MICRO_EMBP;

const props = defineProps({
  menuItemData: {
    type: Object
  }
})

const menuItem = shallowRef(props.menuItemData)

const handleClickMenu = (data) => {
  console.log("handleClickMenu---", data)
  const { menuPath, id } = data;
  const ucPath = VUE_APP_MICRO_UC + menuPath;
  const biPath = VUE_APP_MICRO_BI + '/' + menuPath;
  const embpPath = VUE_APP_MICRO_EMBP + menuPath;

  if (id.indexOf("UC") > -1) { // 用户中心
    router.push(ucPath)
  } else if (id.indexOf("bi") > -1 || id.indexOf("wkf") > -1 || id.indexOf("CI") > -1) {
    router.push(biPath)
  } else if (id.indexOf("M0") > -1) {
    router.push(embpPath)
  } else {
    router.push(menuPath)
  }
}

</script>
<style scoped>
</style>