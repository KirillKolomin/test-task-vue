<template>
  <q-layout view="hHh lpR fFf" class="layout">
    <TopHeader class="layout__header" />
    <q-page-container class="layout__page-container">
      <q-page class="layout__page catalog">
        <CatalogCard
          v-for="appartment in appartments"
          :key="appartment.id"
          v-bind="appartment"
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

<script setup>
import TopHeader from "./components/TopHeader";
import CatalogCard from "./components/CatalogCard";
import appartments from "./models/apartments.json";
</script>
