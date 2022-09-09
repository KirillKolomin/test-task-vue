<template>
  <q-layout view="hHh lpR fFf" class="layout">
    <TopHeader class="layout__header" />
    <q-page-container class="layout__page-container">
      <q-page class="layout__page catalog">
        <q-spinner
          class="catalog__loader"
          v-if="state.isLoading"
          color="primary"
          size="3em"
        />

        <div
          v-if="!state.isLoading && state.errorMessage"
          class="catalog__error-message"
        >
          {{ state.errorMessage }}
        </div>

        <template v-if="!state.isLoading && state.apartments.length">
          <CatalogCard
            v-for="apartment in state.apartments"
            :key="apartment.id"
            v-bind="apartment"
            class="catalog__card"
          />
        </template>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
// Сама БЭМ методология говорит о том, что под каждый блок структура должна содержать свой собственный файл.
// Но я пожалуй, отступлю от этого правила на время тестового задания.
.layout {
  &__page {
    padding: 16px;
  }
}

.catalog {
  position: relative;
  &__loader,
  &__error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__card {
    margin: 0 auto;

    & + & {
      margin-top: 16px;
    }
  }
}
</style>

<script lang="ts" setup>
import TopHeader from "./components/TopHeader";
import CatalogCard from "./components/CatalogCard";
import { inject, onMounted, reactive } from "vue";
import { Axios, AxiosResponse } from "axios";

interface AppState {
  apartments: {
    address: string;
    allRooms: number;
    apartmentLocation: string;
    coords: string;
    freeRooms: number;
    images: { path: string }[];
    name: string;
    roomClass: string;
    sum: number;
  }[];
  isLoading: boolean;
  errorMessage: string;
}

const axios: Axios = inject("axios");
const state = reactive<AppState>({
  apartments: [],
  isLoading: true,
  errorMessage: "",
});

onMounted(requestApartments);

function requestApartments() {
  axios
    .get("apartments")
    .then((apartments: AxiosResponse) => {
      state.apartments = apartments.data;
      state.isLoading = false;
    })
    .catch((error) => {
      state.apartments = [];
      state.isLoading = false;
      state.errorMessage = error.response.data.errorMessage;
    });
}
</script>
