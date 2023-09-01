<template>
  <div class="micro-tab-menu">
    <el-button
      text
      :type="route.fullPath === i.currentActivePath ? 'primary' : 'info'"
      v-for="i in routeMatched"
      :key="i.fullPath"
      @click="changeRoute(i)"
      >{{ i.name || i.meta?.title }}</el-button
    >
  </div>
</template>

<script lang="js" setup>

import { watch, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

let routeMatched = ref(route.matched);

const changeRoute = (i) => {
  if (i.path !== route.fullPath) {
    router.push(i.currentActivePath)
    store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify({ ...i, currentActivePath: i.currentActivePath }))
  }
}

watch(
  route,
  () => {
    routeMatched.value = store.getters.getActiveRouteMatched;
  },
  {
    immediate: true
  }
)
</script>
<style scoped>
</style>