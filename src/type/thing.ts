export enum WeekDay {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}

export enum RepeatType {
  Week,
  Day,
  Month,
}

type WeekRepeat = {
  type: RepeatType.Week;
  value: WeekDay[];
};
type DayRepeat = {
  type: RepeatType.Day;
  value: number;
};
type MonthRepeat = {
  type: RepeatType.Month;
  value: number;
};

export type Repeat = WeekRepeat | DayRepeat | MonthRepeat;

export type Thing = {
  from: number;
  duration: number;
  name: string;
  repeat: Repeat;
};

export type ThingConfig = {
  list: Thing[];
};
