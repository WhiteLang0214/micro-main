<template>
  <el-menu-item
    :index="menuItem.microFullPath"
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

const props = defineProps({
  menuItemData: {
    type: Object
  }
})

const menuItem = shallowRef(props.menuItemData)

const handleClickMenu = (data) => {
  router.push(data.microFullPath)
  store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify(data))
}


</script>
<style scoped>
</style>