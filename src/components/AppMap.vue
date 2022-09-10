<template>
  <div class="map">
    <q-icon
      v-if="isMapLoaded"
      class="text-red map__marker"
      name="room"
      size="36px"
    />
    <q-img class="map__image" :src="mapSrc" @load="showMarker" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, defineProps } from "vue";

interface MapProps {
  width: number;
  height: number;
  l1: number;
  l2: number;
}

const props = defineProps<MapProps>();
const mapSrc = ref("");
const isMapLoaded = ref(false);

onBeforeMount(() => {
  updateMapSrc();
});

function showMarker(): void {
  isMapLoaded.value = true;
}

function updateMapSrc(): void {
  mapSrc.value = `https://static.maps.2gis.com/1.0?s=${props.width}x${props.height}&c=${props.l1},${props.l2}&z=16`;
}
</script>

<style lang="scss" scoped>
.map {
  position: relative;

  &__marker {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 1;
  }
}
</style>
