<template>
  <q-card class="card">
    <q-card-section class="card__header">
      <div class="text-h6 text-primary">{{ props.name }}</div>
      <div class="text-subtitle1">{{ props.address }}</div>
    </q-card-section>

    <q-img
      class="card__image"
      :src="props.images[0].path"
      width="350"
      height="128"
    />

    <q-card-section class="card__info info">
      <div class="info__item">
        <span>Занято номеров:</span
        ><span
          >{{ props.allRooms - props.freeRooms }}/{{ props.allRooms }}</span
        >
      </div>
      <div class="info__item">
        <span>Класс:</span><span>{{ props.roomClass }}</span>
      </div>
      <div class="info__item">
        <span>Расположение:</span><span>{{ props.apartmentLocation }}</span>
      </div>
    </q-card-section>

    <q-card-section class="card__sum">
      {{ props.sum * DEFAULT_DAYS_COEFFICIENT }}р. за 41 день
    </q-card-section>

    <q-card-actions class="card__actions">
      <q-btn class="bg-primary text-white button card__details" flat
        >Подробнее</q-btn
      >
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
  images: { path: string }[];
  name: string;
  roomClass: string;
  sum: number;
}

import { defineProps } from "vue";

const DEFAULT_DAYS_COEFFICIENT = 41;
const props = defineProps<CatalogCardProps>();
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.card {
  padding: 16px;
  box-shadow: 0 4px 4px $box-shadow-color, 3px 4px 4px $box-shadow-color;

  & > * {
    padding: 0;
  }

  & > * + * {
    margin-top: 16px;
  }

  .card__image {
    border-radius: 8px;
  }

  &__sum {
    font-size: 14px;
    font-weight: bold;
  }

  &__details {
    padding: 16px 32px;
    width: 100%;
  }
}

.info {
  &__item {
    display: flex;

    & + & {
      margin-top: 16px;
    }

    & > * {
      text-align: center;
      flex-basis: 50%;
    }
  }
}
</style>
