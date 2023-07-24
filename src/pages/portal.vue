<template>
  <div id="microContainer">子应用渲染容器</div>
</template>

<script setup>

import { onMounted } from '@vue/runtime-core';
import startQiankun from "../startQiankun";

onMounted(() => {
  console.log("portal----", document.getElementById("microContainer"), '----start---', startQiankun)
  // if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    startQiankun()
  // }
})
</script>