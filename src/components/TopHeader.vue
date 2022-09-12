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

      <q-btn-group flat class="header__navigation text-body2">
        <q-btn class="header__navigation-item" stretch>
          <div class="text-dark navigation-item">
            <q-icon class="navigation-item__icon" size="18px" name="language" />
            <span class="navigation-item__label">Язык (RU)</span>
          </div>
        </q-btn>

        <q-btn class="header__navigation-item" stretch>
          <div class="text-dark navigation-item">
            <img
              class="navigation-item__icon"
              src="../assets/rent.svg"
              width="16"
              height="16"
            />
            <span class="navigation-item__label">Сдать жилье</span>
          </div>
        </q-btn>

        <q-btn class="text-dark header__navigation-item" stretch>
          <div class="text-dark navigation-item">
            <q-icon class="navigation-item__icon" size="20px" name="login" />
            <span class="navigation-item__label">Войти</span>
          </div>
        </q-btn>
      </q-btn-group>
    </q-toolbar>
  </q-header>
</template>

<style scoped lang="scss">
@import "src/styles/colors";

.header {
  display: flex;
  justify-content: center;
  padding: 0 4px;
  height: 72px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 0 4px 4px $box-shadow-color;

  @media (min-width: $breakpoint-sm-min) {
    height: 80px;
  }

  &__navigation {
    margin-left: auto;
    margin-right: 15px;

    @media (min-width: $breakpoint-sm-min) {
      margin-right: 0;
      margin-top: 12px;
    }
  }

  &__navigation-item {
    font-size: 14px;
    line-height: 19px;
  }
}

.navigation-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__label {
    display: none;
    margin-top: 8px;
    text-transform: none;

    @media (min-width: $breakpoint-sm-min) {
      display: initial;
    }
  }
}
</style>

<script setup></script>
