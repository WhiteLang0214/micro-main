<template>
    <template v-if="menuItem.children && menuItem.children.length > 0">
      <template v-for="el in menuItem.children" :key="el.id">
        <MetaSubMenu :item="el" />
      </template>
    </template>
    <template v-else>
      <MetaMenuItem :menuItemData="menuItem" />
    </template>
</template>

<script lang="js" setup>

import { defineProps, shallowRef } from "vue"

const props = defineProps({
  menuItemData: {
    type: Object
  }
})

const menuItem = shallowRef(props.menuItemData)

</script>
<style scoped>
</style>