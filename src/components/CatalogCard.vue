<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6 text-primary">{{ props.name }}</div>
      <div class="text-subtitle2">{{ props.address }}</div>
    </q-card-section>

    <img :src="props.image" />

    <q-card-section>
      <div class="text-h6">
        <span>Занято номеров:</span
        ><span
          >{{ props.allRooms - props.freeRooms }}/{{ props.allRooms }}</span
        >
      </div>
      <div class="text-h6">
        <span>Класс:</span><span>{{ props.roomClass }}</span>
      </div>
      <div class="text-subtitle2">
        <span>Расположение:</span><span>{{ props.apartmentLocation }}</span>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ props.sum * DEFAULT_DAYS_COEFFICIENT }}р. за 41 день
    </q-card-section>

    <q-card-actions>
      <q-btn flat>Подробнее</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
interface CatalogCardProps {
  address: string;
  allRooms: number;
  apartmentLocation: string;
  coords: string;
  freeRooms: number;
  image: { path: string };
  name: string;
  roomClass: string;
  sum: number;
}

import { defineProps } from "vue";

const DEFAULT_DAYS_COEFFICIENT = 41;
const props = defineProps<CatalogCardProps>();
</script>

<style scoped></style>
