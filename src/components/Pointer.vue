<script setup lang="ts">
interface Props {
  top?: number;
  left: number;
  color: string;
}

withDefaults(defineProps<Props>(), { top: 0.5 });
</script>

<template>
  <div
    class="vue-colorfull__pointer"
    :style="{
      top: `${top * 100}%`,
      left: `${left * 100}%`,
    }"
  >
    <div
      class="vue-colorfull__pointer-fill"
      :style="{ backgroundColor: color }"
    />
  </div>
</template>

<style scoped>
</style>
