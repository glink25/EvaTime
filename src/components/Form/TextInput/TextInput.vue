<template>
  <input
    class="input"
    :value="value"
    :autofocus="autofocus"
    :disabled="disabled"
    @input="onInput"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
<script lang="ts" setup>
defineProps<{
  value: string;
  disabled: boolean;
  autofocus: boolean;
}>();
const emit = defineEmits<{
  (name: 'update:value', value: string): void;
  (name: 'change', value: string): void;
  (name: 'input', value: string): void;
  (name: 'focus'): void;
  (name: 'blur'): void;
}>();

const onInput = (e: InputEvent) => {
  emit('update:value', e.target.value);
  emit('input', e.target.value);
};
const onChange = (e: InputEvent) => {
  emit('update:value', e.target.value);
  emit('input', e.target.value);
};
const onFocus = (e: InputEvent) => {
  emit('focus');
};
const onBlur = (e: InputEvent) => {
  emit('blur');
};
</script>
