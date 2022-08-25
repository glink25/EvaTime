<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="visible"
        class="
          dialog-modal
          fixed
          w-screen
          h-screen
          top-0
          left-0
          bg-black bg-opacity-40
        "
        @click="() => modalClose && onModalClose()"
      ></div>
    </transition>
    <transition name="fade">
      <div
        v-if="visible"
        class="
          dialog-body
          fixed
          w-screen
          h-screen
          top-0
          left-0
          flex
          items-center
          justify-center
          pointer-events-none
        "
      >
        <div
          class="
            dialog-content
            pointer-events-auto
            bg-white
            shadow
            rounded
            overflow-auto
            w-[90%]
            min-w-[200px]
            md:w-[60%]
            max-w-[640px] max-h-[90%]
            min-h-[200px]
          "
        >
          <slot v-bind="{ close }"></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts" setup>
const props = defineProps<{
  visible: boolean;
  modalClose?: boolean;
}>();
const emit = defineEmits<{
  (name: 'update:visible', value: boolean): void;
  (name: 'clickModal'): void;
}>();

const close = () => {
  emit('update:visible', false);
};

const onModalClose = () => {
  emit('clickModal');
  emit('update:visible', false);
};
</script>
<style lang="scss" scoped>
@import '@/styles/transition.scss';
@include fade();
</style>
