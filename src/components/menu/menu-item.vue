<template>
    <template v-if="menuItem.children && menuItem.children.length > 0">
      <template v-for="el in menuItem.children" :key="el.id">
        <SubMenu :item="el"></SubMenu>
      </template>
    </template>
    <template v-else>
      <el-menu-item :index="menuItem.menuPath">{{ menuItem.name }}</el-menu-item>
    </template>
</template>

<script lang="js" setup>

import { defineProps, shallowRef } from "vue"
import SubMenu from "@/components/menu/sub-menu.vue"

const props = defineProps({
  menuItemData: {
    type: Object
  }
})

const menuItem = shallowRef(props.menuItemData)

</script>
<style scoped>
</style>