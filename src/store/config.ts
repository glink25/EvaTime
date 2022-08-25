import { showMessage } from '@/components/Message';
import { MessageType } from '@/components/Message/useMessage';
import { RepeatType, Thing, ThingConfig } from '@/type/thing';
import { chain, isValid, ValidateResult } from '@/type/validate';
import { getCurrentTime } from '@/utils/time';
import JSONCrush from 'jsoncrush';
import { computed, nextTick, ref } from 'vue';
import { Router, useRoute, useRouter } from 'vue-router';

export enum ThingStatus {
  Passed = 'passed',
  Working = 'working',
  Unreach = 'unreach',
}

const initThing: Thing = {
  name: '',
  from: 0,
  duration: 0,
  repeat: {
    type: RepeatType.Day,
    value: 1,
  },
};

const trimThing = (thing: Thing) => {
  return Object.fromEntries(
    Object.keys(initThing).map((k) => [k, (thing as any)[k]])
  ) as Thing;
};

let router: Router;
const config = ref<ThingConfig>({ list: [] });

const resortConfigList = () => {
  config.value.list = config.value.list
    .sort((a, b) => a.from - b.from)
    .map(trimThing);
};

const things = computed(() => {
  const currentMinutes = getCurrentTime();
  return config.value.list.map((thing, index) => {
    const {
      workingStatus,
      workingPercent,
    }: { workingStatus: ThingStatus; workingPercent?: number } = (() => {
      if (currentMinutes < thing.from) {
        return {
          workingStatus: ThingStatus.Unreach,
        };
      }
      if (currentMinutes > thing.from + thing.duration) {
        return {
          workingStatus: ThingStatus.Passed,
        };
      }
      const workingPercent = (currentMinutes - thing.from) / thing.duration;
      return {
        workingStatus: ThingStatus.Working,
        workingPercent,
      };
    })();
    return {
      ...thing,
      originalIndex: index,
      workingStatus,
      workingPercent,
    };
  });
});

export const initConfig = () => {
  const route = useRoute();
  router = useRouter();
  const configString = route.params.config as string;
  if (configString) {
    try {
      const conf = JSON.parse(JSONCrush.uncrush(decodeURI(configString)));
      config.value = conf;
      console.log(conf, 'init conf');
    } catch {
      showMessage({
        type: MessageType.Error,
        content: 'config in url is not valid',
      });
    }
  }
};

const updateRoute = () => {
  resortConfigList();
  const param = encodeURI(JSONCrush.crush(JSON.stringify({ ...config.value })));
  router.replace({ params: { config: param } });
};

const validateFrom = (thing: Thing, originalIndex?: number): ValidateResult => {
  // TODO: 检查开始时间和时长是否合法
  // if (
  //   config.value.list.some(
  //     (t, i) =>
  //       (originalIndex || i !== originalIndex) &&
  //       thing.from >= t.from &&
  //       thing.from + thing.duration <= t.from + t.duration
  //   )
  // ) {
  //   return {
  //     valid: false,
  //     reason: 'from time or duration is overlapped',
  //   };
  // }
  return true;
};

const validateDuration = (thing: Thing): ValidateResult => {
  if (thing.duration > 480 || thing.duration < 0) {
    return {
      valid: false,
      reason: 'invalid duration time',
    };
  }
  return true;
};

const validateAddThing = (thing: Thing): ValidateResult => {
  const chainedValidator = chain(validateFrom, validateDuration);
  return chainedValidator(thing);
};
const validateEditThing = (
  originalIndex: number,
  thing: Thing
): ValidateResult => {
  const chainedValidator = chain(
    () => validateFrom(thing, originalIndex),
    validateDuration
  );
  return chainedValidator(thing, originalIndex);
};

export const useConfig = () => {
  const updateThing = (index: number, newThing: Thing) => {
    config.value.list[index] = newThing;
    updateRoute();
  };
  const addThing = (newThing: Thing) => {
    config.value.list.push(newThing);
    updateRoute();
  };
  const deleteThing = (index: number) => {
    config.value.list = config.value.list.filter((_, i) => i !== index);
    updateRoute();
  };
  return {
    config,
    things,
    updateThing,
    addThing,
    deleteThing,
    validateAddThing,
    validateEditThing,
  };
};
