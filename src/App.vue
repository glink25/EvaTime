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

  ::-webkit-scrollbar {
    width: 2px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #0003;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
  }
  ::-webkit-scrollbar-track {
    border-radius: 4px;
  }
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
