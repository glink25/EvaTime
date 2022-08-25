<script setup lang="ts">
import { initConfig } from '@/store/config';

initConfig();
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
body {
  width: 100vw;
  height: 100vh;
  min-width: 200px;
  min-height: 200px;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
