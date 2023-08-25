<template>
  <template v-if="subMenuItem.children && subMenuItem.children.length > 0">
    <el-sub-menu :index="subMenuItem.id">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ subMenuItem.name }}</span>
      </template>
      <SubMenuItem :menuItemData="subMenuItem"></SubMenuItem>
    </el-sub-menu>
  </template>
  <template v-else>
    <MenuItem :menuItemData="subMenuItem"></MenuItem>
  </template>
</template>

<script lang="js" setup>

import { defineProps, shallowRef } from "vue"
import SubMenuItem from "./sub-menu-item.vue"
import MenuItem from "@/components/menu/menu-item.vue"

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