<template>
  <q-btn type="button" class="button">
    <q-icon
      v-if="props.iconName"
      :name="props.iconName"
      :size="props.iconSize"
    />
    <slot></slot>
  </q-btn>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

interface ButtonProps {
  iconName?: string;
  iconSize?: string;
}

const props = defineProps<ButtonProps>();
</script>

<style lang="scss" scoped>
@import "src/styles/quasar.variables";

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  background-color: $primary;
  border-radius: 8px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 700;
  text-transform: initial;
}
</style>
