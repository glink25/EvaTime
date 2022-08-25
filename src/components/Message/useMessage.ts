import { uuid } from '@/utils/uuid';
import { ref } from 'vue';

export enum MessageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

type Message = {
  type: MessageType;
  timeout?: number;
  content: string;
};

const messageList = ref<(Message & { id: number })[]>([]);

const DEFAULT_TIMEOUT = 2000;

export const useMessage = () => {
  return {
    messageList,
  };
};

export const showMessage = (message: Message | string) => {
  const curId = uuid();
  const _message = (() => {
    if (typeof message === 'string') {
      return {
        type: MessageType.Success,
        content: message,
        timeout: DEFAULT_TIMEOUT,
      };
    }
    return message;
  })();
  messageList.value.push({ ..._message, id: curId });
  setTimeout(() => {
    messageList.value = messageList.value.filter(({ id }) => id !== curId);
  }, _message.timeout ?? DEFAULT_TIMEOUT);
};
