<script setup lang="ts">
import { hsvaToHslString } from "../utils/convert";
import { clamp } from "../utils/clamp";
import { round } from "../utils/round";
import Interactive from "./Interactive.vue";
import Pointer from "./Pointer.vue";

interface Interaction {
  left: number;
  top: number;
}

const props = defineProps<{
  hue: number;
}>();

const emits = defineEmits<{
  (e: "onChange", newColor: { h: number }): void;
}>();

const handleMove = (interaction: Interaction) => {
  emits("onChange", {
    h: interaction.left * 360,
  });
};

const handleKey = (offset: Interaction) => {
  // Hue measured in degrees of the color circle ranging from 0 to 360
  emits("onChange", {
    h: clamp(props.hue + offset.left * 360, 0, 360),
  });
};
</script>

<template>
  <div class="vue-colorful__hue">
    <Interactive
      aria-label="Hue"
      aria-valuemin="0"
      aria-valuemax="360"
      :aria-valuenow="round(hue)"
      @move="handleMove"
      @key="handleKey"
    >
      <Pointer
        class="vue-colorful__hue-pointer"
        :left="hue / 360"
        :color="hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })"
      />
    </Interactive>
  </div>
</template>

<style scoped></style>
