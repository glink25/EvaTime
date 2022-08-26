import { onBeforeUnmount } from 'vue';
import { throttle } from 'lodash-es';

export const getWindowSize = () => {
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  };
};

export const useWindowResize = (
  fn: (size: { width: number; height: number }) => void,
  { immediate, timeout } = { immediate: false, timeout: 200 }
) => {
  const callback = throttle(() => {
    fn(getWindowSize());
  }, timeout);
  if (immediate) {
    callback();
  }
  window.addEventListener('resize', callback);
  onBeforeUnmount(() => {
    window.removeEventListener('resize', callback);
  });
};
