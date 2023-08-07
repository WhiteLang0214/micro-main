<template>
  <el-sub-menu :index="subMenuItem.id">
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{ subMenuItem.name }}</span>
    </template>
    <MenuItem :menuItemData="subMenuItem"></MenuItem>
  </el-sub-menu>
</template>

<script lang="js" setup>

import { defineProps, shallowRef } from "vue"
import MenuItem from "./menu-item.vue"

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const subMenuItem = shallowRef(props.item)

</script>

<style scoped>
</style>