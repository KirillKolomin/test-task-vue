<template>
  <q-layout view="hHh lpR fFf" class="layout">
    <TopHeader class="layout__header" />
    <q-page-container class="layout__page-container">
      <q-page class="layout__page catalog">
        <CatalogCard
          v-for="apartment in state.apartments"
          :key="apartment.id"
          v-bind="apartment"
          class="catalog__card"
        />
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
}

const axios: Axios = inject("axios");
const state = reactive<AppState>({ apartments: [], isLoading: true });

onMounted(requestApartments);

function requestApartments() {
  axios
    .get("apartments")
    .then((apartments: AxiosResponse) => {
      state.apartments = apartments.data;
      state.isLoading = false;
    })
    .catch(() => {
      state.apartments = [];
      state.isLoading = false;
    });
}
</script>
