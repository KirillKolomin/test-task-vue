<template>
  <q-header class="bg-white header">
    <q-toolbar class="header__toolbar">
      <img
        class="header__logo"
        src="../assets/logo.png"
        alt="logo"
        width="99"
        height="36"
      />
      <q-btn-group flat class="header__navigation">
        <q-btn
          class="text-dark header__navigation-item"
          stretch
          :icon="'language'"
        />
        <q-btn class="header__navigation-item" stretch
          ><img src="../assets/rent.svg"
        /></q-btn>
        <q-btn
          class="text-dark header__navigation-item"
          stretch
          :icon="'login'"
        />
      </q-btn-group>
    </q-toolbar>
  </q-header>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.header {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 0 4px 4px $box-shadow-color;

  &__navigation {
    margin-left: auto;
  }
}
</style>

<script setup></script>
