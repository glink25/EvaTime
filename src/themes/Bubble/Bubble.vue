<template>
  <RenderCanvas :render="render" />
</template>
<script lang="ts" setup>
import RenderCanvas from '../RenderCanvas.vue';
import { render } from './render.ts';
</script>
