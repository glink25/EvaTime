import { FormItemType, NumberCreator } from '@/components/Form/type';
import TextInput from './NumberInput.vue';

export const createNumberFormItem: NumberCreator = (prop, initValue) => {
  return {
    ...prop,
    type: FormItemType.Number,
    component: TextInput,
    initValue,
  };
};
