<template>
  <q-dialog v-model="data.isDialogOpen">
    <q-carousel
      v-model="data.slide"
      class="apartment-gallery"
      animated
      arrows
      navigation
      infinite
    >
      <q-carousel-slide
        v-for="(item, index) in props.images"
        :key="item"
        :name="index"
        :img-src="item"
        class="apartment-gallery__item"
      />
    </q-carousel>
  </q-dialog>
</template>

<script lang="ts" setup>
import { defineProps, reactive } from "vue";

interface CarouselProps {
  images: string[];
}

const props = defineProps<CarouselProps>();
const data = reactive({
  slide: 0,
  isDialogOpen: false,
});
</script>

<style scoped>
.apartment-gallery {
  width: 40vw;
}
</style>
