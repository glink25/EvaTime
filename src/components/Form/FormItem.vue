<template>
  <component :is="comp" v-bind="binds" />
</template>
<script lang="ts" setup>
import type { FormItemProp } from './type';
const props = defineProps<FormItemProp>();

const result = props.creator(props.props as any);
const comp = result.component;
const binds = props.initValue;
</script>
