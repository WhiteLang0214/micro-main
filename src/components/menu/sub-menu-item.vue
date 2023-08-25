<template>
    <template v-if="menuItem.children && menuItem.children.length > 0">
      <template v-for="el in menuItem.children" :key="el.id">
        <SubMenu :item="el"></SubMenu>
      </template>
    </template>
    <template v-else>
      <MenuItem :menuItemData="menuItem"></MenuItem>
    </template>
</template>

<script lang="js" setup>

import { defineProps, shallowRef } from "vue"
import SubMenu from "@/components/menu/sub-menu.vue"
import MenuItem from "@/components/menu/menu-item.vue"

const props = defineProps({
  menuItemData: {
    type: Object
  }
})

const menuItem = shallowRef(props.menuItemData)

</script>
<style scoped>
</style>