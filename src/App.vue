<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

// 存储 vuex 数据，防止刷新丢失
const resetSessionData = () => {
  const sessionLoginInfo = sessionStorage.getItem("microMain_login_info");

  if (sessionLoginInfo) {
    store.replaceState(
      Object.assign({}, store.state, {
        microMain_login_info: JSON.parse(sessionLoginInfo),
      })
    );
  }

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("microMain_login_info", JSON.stringify(store.state.loginInfo));
  });
};

onMounted(() => {
  resetSessionData();
});
</script>

<style>
#MainApp {
  height: 100vh;
}
</style>
