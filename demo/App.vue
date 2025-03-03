<script setup lang="ts">
import { ref, type Ref } from "vue";
import ColorPicker from "../src/components/ColorPicker.vue";
import { useBodyBackground } from "./hooks/useBodyBackground";
import { useFaviconColor } from "./hooks/useFaviconColor";

const rgbaColor: Ref = ref("rgba(255, 153, 0, 1)");

useBodyBackground(rgbaColor);
useFaviconColor(rgbaColor);
</script>

<template>
  <div class="app-box">
    <ColorPicker style="width: 200px" v-model="rgbaColor" type="rgbaString" />
    <div class="box-left">
      <h2>Vue-colorfull 🎨</h2>
      <div>A tiny color picker component for Vue apps</div>
    </div>
  </div>
</template>

<style scoped>
.app-box {
  font: normal 20px / 1.4 "Recursive", Arial, Helvetica, sans-serif;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 120px 32px;
  transition: color 0.15s;
  box-sizing: border-box;
}
.box-left {
  flex-grow: 1;
  margin-left: 40px;
}
.box-left h2 {
  font-size: 32px;
}
@media screen and (max-width: 768px) {
  .app-box {
    max-width: 360px;
    padding: 40px 20px;
    flex-direction: column;
  }
  .box-left {
    margin-left: 0;
    margin-top: 40px;
    text-align: center;
  }
}
</style>
