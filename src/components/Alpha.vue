<script setup lang="ts">
import { computed } from "vue";
import { hsvaToHslaString } from "../utils/convert";
import { clamp } from "../utils/clamp";
import { round } from "../utils/round";
import Interactive from "./Interactive.vue";
import Pointer from "./Pointer.vue";
import type { HsvaColor } from "../types";

interface Interaction {
  left: number;
  top: number;
}

const props = defineProps<{
  hsva: HsvaColor;
}>();

const emits = defineEmits<{
  (e: "onChange", newAlpha: { a: number }): void;
}>();

const handleMove = (interaction: Interaction) => {
  emits("onChange", {
    a: interaction.left,
  });
};

const handleKey = (offset: Interaction) => {
  // Alpha always fit into [0, 1] range
  emits("onChange", {
    a: clamp(props.hsva.a + offset.left),
  });
};

const gradientStyle = computed(() => {
  return {
    backgroundImage: `linear-gradient(90deg, ${hsvaToHslaString(
      Object.assign({}, props.hsva, { a: 0 })
    )}, ${hsvaToHslaString(Object.assign({}, props.hsva, { a: 1 }))})`,
  };
});

const ariaValue = computed(() => round(props.hsva.a * 100));
</script>

<template>
  <div class="vue-colorful__alpha">
    <div className="vue-colorful__alpha-gradient" :style="gradientStyle" />
    <Interactive
      aria-label="Alpha"
      :aria-valuetext="`${ariaValue}%`"
      :aria-valuenow="ariaValue"
      aria-valuemin="0"
      aria-valuemax="100"
      @move="handleMove"
      @key="handleKey"
    >
      <Pointer
        class="vue-colorful__alpha-pointer"
        :left="hsva.a"
        :color="hsvaToHslaString(hsva)"
      />
    </Interactive>
  </div>
</template>

<style scoped></style>
