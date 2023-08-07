<template>
    <!-- <template v-if="menuItem?.children?.length">
      <el-sub-menu :index="el.menuid"
        v-for="el in menuItem.children"
        :key="el.menuid">
        <template #title>{{ el.text }}</template>
        <MenuItem :menuItemData="el"></MenuItem>
      </el-sub-menu>
    </template>
    <template v-else> -->
      <el-menu-item
        :index="'/microCibp/' + el.path"
        v-for="el in menuItem?.children"
        :key="el.menuid"
        >{{ el.text }}</el-menu-item>
    <!-- </template> -->
</template>

<script lang="js" setup>

import { defineProps, shallowRef } from "vue"
// import { useRouter } from "vue-router";

const props = defineProps({
  menuItemData: {
    type: Object
  }
})

// const router = useRouter();


const menuItem = shallowRef(props.menuItemData)
console.log("menuItem---", props)

// const handleClick = (el, data) => {
//   console.log("click---", el, data, "path:", "/microCibp/" + data.path);
//   router.push("/microCibp/" + data.path)
// }
</script>
<style scoped>
</style>