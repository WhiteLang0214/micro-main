<template>
  <template v-if="subMenuItem.children && subMenuItem.children.length > 0">
    <el-sub-menu :index="subMenuItem.id">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ subMenuItem.name }}</span>
      </template>
      <MetaSubMenuItem :menuItemData="subMenuItem" />
    </el-sub-menu>
  </template>
  <template v-else>
    <MetaMenuItem :menuItemData="subMenuItem" />
  </template>
</template>

<script lang="js" setup>

import { defineProps, shallowRef } from "vue"

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