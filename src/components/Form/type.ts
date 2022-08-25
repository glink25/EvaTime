export enum FormItemType {
  Text,
  Number,
  Time,
  Select,
  Checkbox,
  Switch,
  Combined,
}

type BaseFormItemProp<T = any> = {
  disabled?: boolean;
  label?: string;
  customClass?: string;
};

type TrimProp<T extends BaseFormItemProp> = Omit<T, 'label' | 'customClass'>;

type BaseCreatorResult<
  P extends BaseFormItemProp,
  T extends FormItemType
> = P & {
  type: T;
  component: any;
};

type FormItemCreator<
  P extends BaseFormItemProp,
  R extends BaseCreatorResult<P, FormItemType>
> = (prop: TrimProp<P>) => R;

// TextInputFormItem config
type TextProp = BaseFormItemProp<string> & {
  autofocus?: boolean;
};

type TextCreatorResult = BaseCreatorResult<TextProp, FormItemType.Text>;

export type TextCreator = FormItemCreator<TextProp, TextCreatorResult>;

// NumberInputFormItem config
type NumberProp = BaseFormItemProp<number> & {
  autofocus?: boolean;
  max?: number;
  min?: number;
};

type NumberCreatorResult = BaseCreatorResult<NumberProp, FormItemType.Number>;

export type NumberCreator = FormItemCreator<NumberProp, NumberCreatorResult>;

// SelectInputFormItem config
type SingleSelectProp = BaseFormItemProp & {
  multiple: false;
};

type MultipleSelectProp = BaseFormItemProp<any[]> & {
  multiple: true;
};

type SelectProp = SingleSelectProp | MultipleSelectProp;

type SelectCreatorResult = BaseCreatorResult<SelectProp, FormItemType.Select>;

export type SelectCreator = FormItemCreator<SelectProp, SelectCreatorResult>;

// CheckboxFormItem config
type CheckboxtProp = BaseFormItemProp<number[]>;

type CheckboxCreatorResult = BaseCreatorResult<
  CheckboxtProp,
  FormItemType.Checkbox
>;

export type CheckboxCreator = FormItemCreator<
  CheckboxtProp,
  CheckboxCreatorResult
>;

// TimeFormItem config
type TimeProp = BaseFormItemProp<number>;

type TimeCreatorResult = BaseCreatorResult<TimeProp, FormItemType.Time>;

export type TimeCreator = FormItemCreator<TimeProp, TimeCreatorResult>;

// TimeFormItem config
type SwitcheProp = BaseFormItemProp<boolean>;

type SwicthCreatorResult = BaseCreatorResult<SwitcheProp, FormItemType.Switch>;

export type SwitchCreator = FormItemCreator<SwitcheProp, SwicthCreatorResult>;

export type BaseCreator =
  | TextCreator
  | NumberCreator
  | SelectCreator
  | CheckboxCreator
  | TimeCreator
  | SwitchCreator;

export type BaseFormItemResult =
  | TextCreatorResult
  | NumberCreatorResult
  | SelectCreatorResult
  | CheckboxCreatorResult
  | TimeCreatorResult
  | SwicthCreatorResult;

// TimeFormItem config
type CombinedProp = BaseFormItemProp & {
  children: Parameters<BaseCreator>[0];
};

type CombinedCreatorResult = BaseCreatorResult<
  CombinedProp,
  FormItemType.Combined
>;

export type CombinedCreator = FormItemCreator<
  CombinedProp,
  CombinedCreatorResult
>;

type GetFormItemProp<T extends BaseCreator> = {
  creator: T;
  props: Parameters<T>[0];
};

export type FormItemProp =
  | GetFormItemProp<TextCreator>
  | GetFormItemProp<NumberCreator>
  | GetFormItemProp<SelectCreator>
  | GetFormItemProp<CheckboxCreator>
  | GetFormItemProp<TimeCreator>
  | GetFormItemProp<SwitchCreator>;
// export type FormItemProp = GetFormItemProp<Creator>;

export type FormBuilder = (
  formValue: any
) => (BaseFormItemResult | CombinedCreatorResult)[];
