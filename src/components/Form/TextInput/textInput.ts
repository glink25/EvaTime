import { FormItemType, TextCreator } from '@/components/Form/type';
import TextInput from './TextInput.vue';

export const createTextFormItem: TextCreator = (prop, initValue) => {
  return {
    ...prop,
    type: FormItemType.Text,
    component: TextInput,
    initValue,
  };
};
