<template>
  <q-card class="card">
    <q-card-section class="card__left-column left-column">
      <q-img
        class="br-8 left-column__image"
        :src="props.images[0].path"
      ></q-img>

      <AppButton
        class="br-8 text-white bg-transparent left-column__gallery-icon"
        size="14px"
        icon="photo_camera"
        @click="showGallery"
      />
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
          <div class="">
            <h6 class="text-h6 text-primary header__title">{{ props.name }}</h6>
            <span class="text-subtitle1">{{ props.address }}</span>
          </div>
          <AppButton
            v-if="!data.isMapOpen"
            class="bg-primary text-white right-column__open-map"
            icon="location_pin"
            @click="toggleMap"
          />
        </q-card-section>

        <q-img class="br-8 right-column__image" :src="props.images[0].path" />

        <q-card-section class="br-8 info">
          <dl class="info__item">
            <dt>Занято номеров:</dt>
            <dd>{{ props.allRooms - props.freeRooms }}/{{ props.allRooms }}</dd>
          </dl>
          <dl class="info__item">
            <dt>Класс:</dt>
            <dd>{{ props.roomClass }}</dd>
          </dl>
          <dl class="info__item">
            <dt>Расположение:</dt>
            <dd>{{ props.apartmentLocation }}</dd>
          </dl>
        </q-card-section>

        <div class="card__footer footer">
          <q-card-section class="footer__sum">
            от {{ props.sum * DEFAULT_DAYS_COEFFICIENT }}р. за 41 день
          </q-card-section>

          <q-card-actions class="footer__actions">
            <AppButton class="bg-primary text-white card__details">
              <span>Подробнее</span>
            </AppButton>
          </q-card-actions>
        </div>
      </div>

      <template v-if="data.isMapOpen">
        <AppButton
          class="bg-white text-primary right-column__close-map"
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
import AppCarousel from "./AppCarousel";
import AppButton from "./AppButton";
import { useQuasar } from "quasar";

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

const $q = useQuasar();

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

function showGallery() {
  $q.dialog({
    component: AppCarousel,
    componentProps: { images: props.images.map(({ path }) => path) },
  });
}

function toggleMap(): void {
  data.isMapOpen = !data.isMapOpen;
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";
@import "src/styles/quasar.variables";

$gap: 16px;
$tablet-left-column-width: 345px;

.card {
  display: flex;
  padding: $gap;
  width: 382px;
  box-shadow: 0 4px 4px $box-shadow-color, 3px 4px 4px $box-shadow-color;

  @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max) {
    width: 736px;
    min-height: 272px;
  }

  @media (min-width: $breakpoint-lg-min) {
    width: 1052px;
  }

  &__left-column {
    display: none;

    @media (min-width: $breakpoint-sm-min) {
      display: block;
    }

    @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max) {
      flex-basis: $tablet-left-column-width;
    }

    @media (min-width: $breakpoint-lg-min) {
      flex-basis: 413px;
    }
  }

  &__middle-column {
    display: none;
    margin-left: $gap;

    @media (min-width: $breakpoint-lg-min) {
      display: flex;
      flex-basis: 162px;
    }
  }

  &__right-column {
    flex-basis: calc(100% - #{$tablet-left-column-width} - #{$gap});
  }

  &__details {
    padding: $gap 32px;
    width: 100%;
  }

  &__footer {
    margin-top: -4px;

    @media (min-width: $breakpoint-sm-min) {
      margin-top: 21px;
    }
  }
}

.header {
  display: flex;
  justify-content: start;
  padding: 0;

  @media (min-width: $breakpoint-sm-min) {
    justify-content: space-between;
  }

  &__title {
    display: flex;
    flex-direction: column;
  }
}

.info {
  padding: $gap 0;
  font-size: 12px;
  line-height: $gap;

  @media (min-width: $breakpoint-sm-min) {
    margin-top: 20px;
    background-color: $card-info-bg;
  }

  &__item {
    display: flex;

    & + & {
      margin-top: 11px;
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
    bottom: $gap;
    left: $gap;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    border: 2px solid white;
  }

  &__image {
    display: none;
    width: 100%;
    height: 100%;

    @media (min-width: $breakpoint-sm-min) {
      display: block;
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
      margin-top: $gap;
    }
  }
}

.right-column {
  position: relative;
  padding: 0;

  @media (max-width: $breakpoint-xs-max) {
    & > * + * {
      margin-top: $gap;
    }
  }

  @media (min-width: $breakpoint-sm-min) {
    margin-left: $gap;
  }

  &__image {
    margin-top: 14px;
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
    margin-left: $gap;
    width: 45px;

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
    line-height: 19px;
    font-weight: bold;
    letter-spacing: -0.1px;
  }

  &__actions {
    flex-basis: 100%;
    padding: 0;
    margin-top: $gap;

    @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-max) {
      flex-basis: 166px;
      margin-top: 0;
      margin-left: $gap;
    }
    @media (min-width: $breakpoint-lg-min) {
      flex-basis: 204px;
      margin-left: $gap;
    }
  }
}
</style>
