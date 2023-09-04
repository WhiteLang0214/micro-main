<template>
  <svg :class="['svg-icon', svgClass]">
    <use :xlink:href="iconName" fill />
  </svg>
</template>

<script lang="js" setup>

import { defineProps, computed } from "vue"

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  svgClass: {
    type: String,
    default: ''
  }
})

const iconName = computed(() => `#icon-${props.iconName}`)
const svgClass = computed(() => props.svgClass)


</script>
<style lang="scss" scoped>
.svg-icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
}
</style>