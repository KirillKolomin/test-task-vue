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

    <q-card-section
      v-if="props.images[1]"
      class="card__middle-column middle-column"
    >
      <q-img
        class="middle-column__image card__image"
        v-if="props.images[1]"
        :src="props.images[1].path"
      ></q-img>
      <q-img
        class="middle-column__image card__image"
        v-if="props.images[2]"
        :src="props.images[2].path"
      ></q-img>
    </q-card-section>

    <q-card-section class="card__right-column right-column">
      <div v-if="!data.isMapOpen">
        <q-card-section class="card__header header">
          <div class="header__title">
            <div class="text-h6 text-primary">{{ props.name }}</div>
            <div class="text-subtitle1">{{ props.address }}</div>
          </div>
          <q-btn
            v-if="!data.isMapOpen"
            class="bg-primary text-white button right-column__open-map"
            icon="location_pin"
            @click="toggleMap"
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
      </div>

      <template v-if="data.isMapOpen">
        <q-btn
          class="bg-white text-primary button right-column__close-map"
          icon="cancel"
          @click="toggleMap"
        />
        <AppMap class="right-column__map" v-bind="data.mapOptions" />
      </template>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { defineProps, onBeforeMount, reactive } from "vue";
import AppMap from "./AppMap";

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
  l1: number;
  l2: number;
}

const MAP_HEIGHT = 450;
const MAP_WIDTH = 450;
const DEFAULT_DAYS_COEFFICIENT = 41;

const props = defineProps<CatalogCardProps>();
const data = reactive({
  isMapOpen: false,
  mapOptions: { l1: 0, l2: 0, width: MAP_WIDTH, height: MAP_HEIGHT },
});

onBeforeMount(() => {
  data.mapOptions.l1 = props.l1;
  data.mapOptions.l2 = props.l2;
});

function toggleMap(): void {
  data.isMapOpen = !data.isMapOpen;
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";
@import "src/styles/quasar.variables";

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

    @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max) {
      flex-basis: 345px;
    }

    @media (min-width: $breakpoint-lg-min) {
      flex-basis: 413px;
    }
  }

  &__middle-column {
    display: none;
    margin-left: 16px;

    @media (min-width: $breakpoint-lg-min) {
      display: flex;
      flex-basis: 162px;
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
    width: 100%;
    height: 100%;
    @media (min-width: $breakpoint-sm-min) {
      display: initial;
    }
  }
}

.middle-column {
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  width: 162px;

  &__image {
    flex-grow: 1;
    height: 112px;

    & + & {
      margin-top: 16px;
    }
  }
}

.right-column {
  position: relative;
  padding: 0;

  @media (max-width: $breakpoint-xs-max) {
    & > * + * {
      margin-top: 16px;
    }
  }

  @media (min-width: $breakpoint-sm-min) {
    margin-left: 16px;
  }

  &__image {
    width: 350px;
    height: 128px;

    @media (min-width: $breakpoint-sm-min) {
      display: none;
    }
  }

  &__map {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 345px;
    height: 240px;
    overflow: hidden;

    @media (min-width: $breakpoint-lg-min) {
      width: 407px;
    }
  }

  &__open-map {
    display: none;
    margin-left: 16px;

    @media (min-width: $breakpoint-sm-min) {
      display: flex;
    }
  }

  &__close-map {
    position: absolute;
    right: 0;
    border: 2px $primary solid;
    z-index: 1;
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
      margin-left: 16px;
    }
    @media (min-width: $breakpoint-lg-min) {
      flex-basis: 204px;
      margin-left: 16px;
    }
  }
}
</style>
