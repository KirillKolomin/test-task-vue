<template>
  <q-card class="card">
    <q-card-section class="card__left-column left-column">
      <q-img
        class="left-column__image card__image"
        :src="props.images[0].path"
      ></q-img>

      <div class="left-column__gallery-icon">
        <q-icon class="text-white" size="21px" name="photo_camera"></q-icon>
      </div>
    </q-card-section>

    <q-card-section class="card__right-column right-column">
      <q-card-section class="card__header header">
        <div class="header__title">
          <div class="text-h6 text-primary">{{ props.name }}</div>
          <div class="text-subtitle1">{{ props.address }}</div>
        </div>
        <q-btn
          class="bg-primary text-white button header__location-btn"
          icon="location_pin"
        />
      </q-card-section>

      <q-img
        class="right-column__image card__image"
        :src="props.images[0].path"
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

      <div class="footer">
        <q-card-section class="footer__sum">
          {{ props.sum * DEFAULT_DAYS_COEFFICIENT }}р. за 41 день
        </q-card-section>

        <q-card-actions class="footer__actions">
          <q-btn class="bg-primary text-white button card__details" flat
            >Подробнее</q-btn
          >
        </q-card-actions>
      </div>
    </q-card-section>
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
  display: flex;
  padding: 16px;
  width: 382px;
  box-shadow: 0 4px 4px $box-shadow-color, 3px 4px 4px $box-shadow-color;

  @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max) {
    width: 736px;
  }

  @media (min-width: $breakpoint-lg-min) {
    width: 1052px;
  }

  &__left-column {
    display: none;

    @media (min-width: $breakpoint-sm-min) {
      display: flex;
    }
  }

  .card__image {
    border-radius: 8px;
  }

  &__details {
    padding: 16px 32px;
    width: 100%;
  }
}

.header {
  display: flex;
  justify-content: start;
  padding: 0;

  @media (min-width: $breakpoint-sm-min) {
    justify-content: space-between;
  }

  &__location-btn {
    display: none;

    @media (min-width: $breakpoint-sm-min) {
      display: flex;
    }
  }
}

.info {
  padding: 0;
  border-radius: 8px;

  @media (min-width: $breakpoint-sm-min) {
    background-color: $card-info-bg;
    padding: 16px;
  }

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

.left-column {
  padding: 0;
  position: relative;

  @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max) {
    flex-basis: 345px;
  }

  @media (min-width: $breakpoint-lg-min) {
    flex-basis: 413px;
  }

  &__gallery-icon {
    position: absolute;
    bottom: 16px;
    left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 48px;
    border: 2px solid white;
    border-radius: 8px;
  }

  &__image {
    display: none;
    width: 345px;
    height: 100%;
    @media (min-width: $breakpoint-sm-min) {
      display: initial;
    }
  }
}

.right-column {
  padding: 0;

  @media (min-width: $breakpoint-sm-min) {
    margin-left: 16px;
  }

  & > * + * {
    margin-top: 16px;
  }

  &__image {
    width: 350px;
    height: 128px;

    @media (min-width: $breakpoint-sm-min) {
      display: none;
    }
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: $breakpoint-sm-min) {
    flex-wrap: nowrap;
  }

  &__sum {
    padding: 0;
    font-size: 14px;
    font-weight: bold;
  }

  &__actions {
    flex-basis: 100%;
    padding: 0;
    margin-top: 16px;

    @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max) {
      flex-basis: 166px;
    }
    @media (min-width: $breakpoint-lg-min) {
      flex-basis: 204px;
    }
  }
}
</style>
