<template>
  <div id="microContainer">aaaa</div>
</template>

<script setup name="module">
import { onMounted } from 'vue';
import { start } from 'qiankun';

onMounted(() => {
  console.log("~~~~~~~", window)
  if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    start();
  }
})
</script>