<script setup lang="ts">
import { ref, watch } from "vue";
import type { AnyColor, HsvaColor, ColorModelType } from "../types";
import { getColorModel, isAlphaType } from "../utils/models";
import Saturation from "./Saturation.vue";
import Hue from "./Hue.vue";
import Alpha from "./Alpha.vue";

const props = withDefaults(defineProps<{
  modelValue: AnyColor;
  // colorModel: ColorModel<any>;
  // alpha: boolean;
  type: ColorModelType;
}>(), {
  type: "hsva",
  modelValue: '',
});

const colorModel = getColorModel(props.type);
const alpha = isAlphaType(props.type);

let hasChange = false;
let cache: HsvaColor = colorModel.toHsva(
  props.modelValue || colorModel.defaultColor
);

const emits = defineEmits<{
  (e: "update:modelValue", value: AnyColor): void;
}>();

const hsva = ref<HsvaColor>(cache);

const updateHsva = (newColor: any) => {
  cache = Object.assign({}, cache, newColor);
  hsva.value = cache;
  hasChange = true;
  emits("update:modelValue", colorModel.fromHsva(cache));
};

watch(
  () => props.modelValue,
  (newValue: any) => {
    if (hasChange) {
      return (hasChange = false);
    }
    cache = colorModel.toHsva(newValue);
    hsva.value = cache;
  }
);
</script>
<template>
  <div class="vue-colorfull">
    <Saturation :hsva="hsva" @on-change="updateHsva" />
    <Hue
      :hue="hsva.h"
      @on-change="updateHsva"
      :class="alpha ? '' : 'vue-colorfull__last-control'"
    />
    <Alpha
      v-if="alpha"
      :hsva="hsva"
      @on-change="updateHsva"
      :class="alpha ? 'vue-colorfull__last-control' : ''"
    />
  </div>
</template>
<style>
@import "../style.css";
</style>
