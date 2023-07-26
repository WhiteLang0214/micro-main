<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const beforeunload = () => {
  window.addEventListener('beforeunload', resetSessionData)
}

// 存储 vuex 数据，防止刷新丢失
const resetSessionData = () => {
  const sessionStoreData = JSON.parse(sessionStorage.getItem("store") || "{}");
    if (!Object.keys(sessionStoreData).length) {
      clearSession();
      router.replace("/microMain/login");
    } else {
      sessionStorage.getItem("store") && store.replaceState(Object.assign({}, store.state, sessionStoreData))
    }
}

// 清空sesstion
const clearSession = () => {
  sessionStorage.clear();
}

onMounted(() => {
  beforeunload()
})
</script>

<style>
#MainApp {
  height: 100vh;
}
</style>
