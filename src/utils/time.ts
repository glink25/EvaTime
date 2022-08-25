import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

// define variable [time] as HH:mm ,exp: 00:08,14:29

export const minuteToTime = (num: number) => {
  return dayjs.duration(num, 'minutes').format('HH:mm');
};

export const timeToMinite = (time: string) => {
  const [hours, minutes] = time.split(':').map((n) => parseInt(n));
  return dayjs.duration({ hours, minutes }).asMinutes();
};

export const getCurrentTime = () => {
  return timeToMinite(dayjs().format('HH:mm'));
};
