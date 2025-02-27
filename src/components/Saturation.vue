<script setup lang="ts">
import type { HsvaColor } from "../types";
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
  hsva: HsvaColor;
}>();

const emits = defineEmits<{
  (e: "onChange", newColor: { s: number; v: number }): void;
}>();

const handleMove = (interaction: Interaction) => {
  console.log(props.hsva, interaction, "handleMove");
  emits("onChange", {
    s: interaction.left * 100,
    v: 100 - interaction.top * 100,
  });
};

const handleKey = (offset: Interaction) => {
  console.log(props.hsva, offset, "handleKey");
  // Saturation and brightness always fit into [0, 100] range
  emits("onChange", {
    s: clamp(props.hsva.s + offset.left * 100, 0, 100),
    v: clamp(props.hsva.v - offset.top * 100, 0, 100),
  });
};
</script>

<template>
  <div
    class="vue-colorful__saturation"
    :style="{
      backgroundColor: hsvaToHslString({ h: hsva.h, s: 100, v: 100, a: 1 }),
    }"
  >
    <Interactive
      aria-label="Color"
      :aria-valuetext="`Saturation ${round(hsva.s)}%, Brightness ${round(
        hsva.v
      )}%`"
      @move="handleMove"
      @key="handleKey"
    >
      <Pointer
        class="vue-colorful__saturation-pointer"
        :top="1 - hsva.v / 100"
        :left="hsva.s / 100"
        :color="hsvaToHslString(hsva)"
      />
    </Interactive>
  </div>
</template>
