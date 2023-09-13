<template>
    <el-menu-item index="icon" v-show="menuItem.id === getHomeMenuId && getIsCollapse" >
      <el-icon @click.stop="toggleMenu(false)"><Expand /></el-icon>
    </el-menu-item>
    <el-menu-item
      :index="menuItem.microFullPath"
      :item="menuItem"
      @click="handleClickMenu(menuItem)">
      {{ menuItem?.name }}
      <el-icon class="menu_toggle" @click.stop="toggleMenu(true)" v-if="menuItem.id === getHomeMenuId && !getIsCollapse"><Fold /></el-icon>
    </el-menu-item>
</template>

<script lang="js" setup>
import { defineProps, shallowRef, computed, defineEmits } from "vue"
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter();
const store = useStore();

const props = defineProps({
  menuItemData: {
    type: Object
  },
  isCollapse: {
    type: Boolean
  }
})

const emit = defineEmits(["toggleCollapse"])

const menuItem = shallowRef(props.menuItemData)

const handleClickMenu = (data) => {
  router.push(data.microFullPath)
  store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify(data))
}

const getHomeMenuId = computed(() => process.env.VUE_APP_HOME_MENU_ID)

const getIsCollapse = computed(() => props.isCollapse)

const toggleMenu = (val) => {
  emit("toggleCollapse", val)
}

</script>
<style scoped>
.menu_toggle {
  margin-left: auto;
}
</style>