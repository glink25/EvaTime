<template>
  <canvas
    ref="canvasRef"
    class="origin-top-left scale-50"
    :width="size.width"
    :height="size.height"
  />
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useConfig, ThingStatus } from '@/store/config';
import { useWindowResize, getWindowSize } from '@/hooks/useResize';

const props = defineProps<{
  render: any;
}>();

const { config } = useConfig();
const canvasRef = ref<HTMLCanvasElement>();
const size = ref({
  width: 0,
  height: 0,
});
onMounted(() => {
  useWindowResize(
    (sz) => {
      size.value = { width: sz.width * 2, height: sz.height * 2 };
    },
    { immediate: true, timeout: 200 }
  );
  const ctx = canvasRef.value?.getContext('2d');

  const draw = () => {
    props.render(ctx, { ...size.value, config: config.value });
    window.requestAnimationFrame(draw);
  };
  draw();
});
</script>
