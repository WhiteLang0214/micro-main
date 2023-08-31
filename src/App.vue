<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { addEventListener, removeEventListener } from "@/utils/event";

const store = useStore();
const route = useRoute();

let startDate = ref(new Date());
let endDate = ref(new Date());

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

  addEventListener("beforeunload", () => {
    sessionStorage.setItem("microMain_login_info", JSON.stringify(store.state.loginInfo));
  })
};

const globalActiveMenu = () => {}

 // 页面浏览时间 - 发送埋点
const getPageRangeTime = () => {
  // const diffTime = this.endDate.valueOf() - this.startDate.valueOf();
  // const pageName = this.$route.name;
  // const parmas = {
  //   ai: process.env.VUE_APP_API_APPID,
  //   ek: "browsePage",
  //   pk: pageName,
  //   pt: Math.floor(diffTime / 1000), // 单位秒
  //   at: enumPageAt["6"],
  //   r: process.env.VUE_APP_API_FLAG,
  // };
  // this.sendUserPoint(process.env.VUE_APP_API_burypoint, parmas);
}

const handlePageHide = () => {
  sessionStorage.setItem("store", JSON.stringify(this.$store.state));
}

const handlePopstate = (ele) => {
  console.log("popstate---", ele)
  if (ele.state && ele.state.current && ele.state.current != "/") {
    globalActiveMenu({ path: ele.state.current });
  } else {
    window.history.forward();
  }
  return;
}

const handleVisibilitychange = () => {
  const visibilityState = document.visibilityState;
  const routePathName = route.name || route.fullPath;
  if (routePathName.indexOf("login") == -1) {
    if (visibilityState === "visible") {
      // 页面显示
      startDate.value = new Date();
    } else {
      // 页面隐藏
      endDate.value = new Date();
      getPageRangeTime();
    }
  }
}

const handlePageShow = () => {
  startDate.value = new Date();
}

const addEvent = () => {
  addEventListener("pagehide", handlePageHide)
  addEventListener("popstate", handlePopstate)
  addEventListener("visibilitychange", handleVisibilitychange)
  addEventListener("pageshow", handlePageShow)
}

const removeEvent = () => {
  removeEventListener("beforeunload")
  removeEventListener("pagehide")
  removeEventListener("popstate")
  removeEventListener("visibilitychange")
  removeEventListener("pageshow")
}

onMounted(() => {
  resetSessionData();
  addEvent()
});

onBeforeUnmount(() => {
  removeEvent()
})

</script>

<style>
#MainApp {
  height: 100vh;
}
</style>
