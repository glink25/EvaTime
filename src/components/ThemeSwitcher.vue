<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Dialog from '@/components/Dialog.vue';
import { themes } from '@/themes';
const props = defineProps<{
  visible: boolean;
}>();
const emit = defineEmits<{
  (name: 'update:visible', value: boolean): void;
}>();

const router = useRouter();
const route = useRoute();
const go = (theme: any) => {
  console.log(theme, `/theme${theme.path}`);
  router.push({ name: theme.name, params: route.params });
};

const close = () => {
  emit('update:visible', false);
};
</script>
<template>
  <Dialog :visible="visible" modal-close @click-modal="() => close()">
    <div class="p-2 w-full h-auto flex flex-col flex-1">
      <div class="flex justify-between items-center">
        <div class="font-bold text-lg">Choose a theme</div>
      </div>

      <div class="flex-1 flex flex-col py-2">
        <div class="flex-1 overflow-x-auto flex justify-center">
          <div class="overflow-x auto w-[98%] flex h-[300px] p-4">
            <div
              v-for="(theme, index) in themes"
              :key="index"
              class="flex-shrink-0 flex flex-col mx-2 w-[90%] flex items-center"
              @click="() => go(theme)"
            >
              <div class="theme-card shadow-lg rounded-lg flex-1 w-full"></div>
              <div>
                {{ theme.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end pt-2">
          <button class="btn-plain mx-2" @click="() => close()">Cancel</button>
        </div>
      </div>
    </div>
  </Dialog>
</template>
