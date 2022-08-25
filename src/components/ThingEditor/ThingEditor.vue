<script setup lang="ts">
import { computed } from 'vue';

import Dialog from '@/components/Dialog.vue';
import { RepeatType, WeekDay } from '@/type/thing';

import { useThingEditor, ThingEditorEvents } from './useThingEditor';
import { enumToArray } from '@/utils/enum';
import { minuteToTime, timeToMinite } from '@/utils/time';

const { visible, initThing, isCreate, emit } = useThingEditor();

const getFromTime = () => {
  return minuteToTime(initThing.value.from);
};
const setFromTime = (e: InputEvent) => {
  initThing.value.from = timeToMinite(e.target.value);
};

const changeRepeatType = () => {
  if (initThing.value.repeat.type === RepeatType.Week) {
    initThing.value.repeat.value = [];
  } else {
    initThing.value.repeat.value = 0;
  }
};

const weekDayStrings = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekDays = enumToArray(WeekDay).map((_, i) => weekDayStrings[i]);
const toggleWeekDay = (index: number) => {
  const oldWeekDays = initThing.value.repeat.value;
  if (oldWeekDays.includes(index)) {
    initThing.value.repeat.value = oldWeekDays.filter((d) => d !== index);
  } else {
    initThing.value.repeat.value.push(index);
  }
};

const close = () => {
  visible.value = false;
  emit(ThingEditorEvents.Close);
};

const validate = (v: Thing) => {
  if (v.name === '') {
    return {
      key: 'name',
      msg: 'name cannot be empty.',
    };
  }
  return true;
};

const submit = () => {
  if (validate(initThing.value) === true) {
    emit(ThingEditorEvents.Confirm, initThing.value);
  }
};
</script>
<template>
  <Dialog v-model:visible="visible">
    <template #default="{ close }">
      <div class="p-2 w-full h-full flex flex-col">
        <div class="flex justify-between items-center">
          <div class="font-bold text-lg">
            {{ isCreate ? 'Create a new Thing' : 'Edit Thing' }}
          </div>
        </div>
        <div class="flex-1 flex flex-col py-2">
          <div class="flex-1 pl-2 pb-2">
            <div class="flex items-center py-2">
              <div class="font-semibold w-[100px]">name:</div>
              <div class="">
                <input v-model="initThing.name" class="input" />
              </div>
            </div>
            <div class="flex items-center py-2">
              <div class="font-semibold w-[100px]">from:</div>
              <div class="">
                <input
                  :value="getFromTime(initThing.from)"
                  type="time"
                  class="input"
                  @input="setFromTime"
                />
              </div>
            </div>
            <div class="flex items-center py-2">
              <div class="font-semibold w-[100px]">duration:</div>
              <div class="">
                <input
                  v-model="initThing.duration"
                  type="number"
                  class="input"
                  :max="480"
                />
              </div>
            </div>
            <div class="flex items-center py-2">
              <div class="font-semibold w-[100px]">repeat:</div>
              <div class="flex">
                <select
                  v-model="initThing.repeat.type"
                  class="input"
                  @change="() => changeRepeatType()"
                >
                  <option :value="RepeatType.Week">Week</option>
                  <option :value="RepeatType.Day">Day</option>
                  <option :value="RepeatType.Month">Month</option>
                </select>
                <div
                  v-if="initThing.repeat.type === RepeatType.Week"
                  class="flex px-2"
                >
                  <div v-for="(day, i) in weekDays" :key="i" class="flex px-1">
                    <input
                      :value="initThing.repeat.value[i]"
                      type="checkbox"
                      :id="`week-${i}`"
                      @change="() => toggleWeekDay(i)"
                    />
                    <label :for="`week-${i}`">{{ day }}</label>
                  </div>
                </div>
                <div v-else class="px-2">
                  <input
                    v-model="initThing.repeat.value"
                    type="number"
                    class="input w-[100px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button class="btn-plain mx-2" @click="() => close()">
              Cancel
            </button>
            <button class="btn-primary" @click="() => submit()">Confirm</button>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<style lang="scss" scoped></style>
