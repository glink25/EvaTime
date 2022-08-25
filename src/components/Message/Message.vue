<template>
  <teleport to="body">
    <transition-group name="fall" tag="div">
      <template v-for="message in messageList" :key="message.id">
        <div class="message-box fixed top-0 left-0 w-full flex justify-center">
          <div
            class="
              message
              fixed
              rounded-md
              text-white
              p-1
              mt-3
              min-w-[300px]
              max-w-[90%]
              text-center
              shadow
            "
            :class="{
              'bg-green-600': message.type === MessageType.Success,
              'bg-yellow-600': message.type === MessageType.Warning,
              'bg-red-600': message.type === MessageType.Error,
            }"
          >
            {{ message.content }}
          </div>
        </div>
      </template>
    </transition-group>
  </teleport>
</template>
<script lang="ts" setup>
import { useMessage, MessageType } from './useMessage';
const { messageList } = useMessage();
</script>
<style lang="scss" scoped>
@import '@/styles/transition.scss';
@include fall();
</style>
