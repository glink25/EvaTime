import { RepeatType, Thing } from '@/type/thing';
import { ValidateResult } from '@/type/validate';
import { ref } from 'vue';
import { showMessage, MessageType } from '../Message';

export enum ThingEditorEvents {
  Confirm = 'cancel',
  Close = 'close',
}

const visible = ref(false);
const isCreate = ref(true);
const initThing = ref<Thing>();
const evt = new EventTarget();
const emptyThing: Thing = {
  name: '',
  from: 0,
  duration: 0,
  repeat: {
    type: RepeatType.Day,
    value: 1,
  },
};

type ShowParams = {
  isCreate?: boolean;
  initThing?: Thing;
  validator?: (thing: Thing) => ValidateResult;
};

export const useThingEditor = () => {
  const emit = (name: ThingEditorEvents, value?: any) => {
    evt.dispatchEvent(new CustomEvent(name, { detail: value }));
  };
  const show = (param?: ShowParams) =>
    new Promise<Thing>((res, rej) => {
      isCreate.value = param?.isCreate ?? true;
      initThing.value = param?.initThing ?? { ...emptyThing };
      visible.value = true;
      const validator = param?.validator ?? (() => true);
      const onConfirm = (e: Event) => {
        const thin = (e as CustomEvent).detail;
        const result = validator(thin);
        console.log(result, 'res');
        if (result === true) {
          initThing.value = undefined;
          evt.removeEventListener(ThingEditorEvents.Confirm, onConfirm);
          res((e as CustomEvent).detail);
          visible.value = false;
        } else {
          showMessage({ type: MessageType.Error, content: result.reason });
        }
      };
      const onClose = () => {
        initThing.value = undefined;
        evt.removeEventListener(ThingEditorEvents.Confirm, onClose);
        rej();
      };
      evt.addEventListener(ThingEditorEvents.Confirm, onConfirm);
      evt.addEventListener(ThingEditorEvents.Close, onClose);
    });
  return {
    visible,
    initThing,
    isCreate,
    show,
    emit,
  };
};
