<template>
  <div class="w-full h-full overflow-hidden flex flex-col">
    <div class="p-2 flex justify-between">
      <div class="font-bold text-lg">Eva's Time</div>
      <button class="btn-primary" @click="toCreate">create new thing</button>
    </div>
    <div class="flex-1 overflow-hidden flex">
      <div class="flex-1 m-2 overflow-y-auto rounded">
        <div
          v-for="(thing, index) in things"
          :key="index"
          class="
            p-2
            text-white
            rounded
            shadow-md
            mb-2
            flex flex-col
            justify-between
            cursor-pointer
            relative
          "
          :style="{
            height: `${60 + thing.duration}px`,
            background: generateWorkingBackground(thing),
          }"
          @click="() => toEdit(thing, thing.originalIndex)"
        >
          <div class="font-semibold sticky top-1 rounded">
            {{ thing.name }}
          </div>
          <div class="text-end text-sm sticky bottom-1 rounded">
            {{ minuteToTime(thing.from) }} -
            {{ minuteToTime(thing.from + thing.duration) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <ThingEditor />
  <Message />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConfig, ThingStatus } from '@/store/config';
import { ThingEditor, useThingEditor } from '@/components/ThingEditor';
import { Message } from '@/components/Message';
import { minuteToTime } from '@/utils/time';

const route = useRoute();
const router = useRouter();
const { things, addThing, updateThing, validateAddThing, validateEditThing } =
  useConfig();

const { show: showThingEditor } = useThingEditor();

const toCreate = async () => {
  const thing = await showThingEditor({ validator: validateAddThing });
  addThing(thing);
};

const toEdit = async (thing: Thing, originalIndex: number) => {
  const newThing = await showThingEditor({
    isCreate: false,
    initThing: thing,
    validator: (t) => validateEditThing(originalIndex, t),
  });
  updateThing(originalIndex, newThing);
};

// const PASSED_COLOR = '#9ca3af';
// const UNREACH_COLOR = '#60a5fa';
const PASSED_COLOR = '#292423';
const UNREACH_COLOR = '#f87f73';
const generateWorkingBackground = (thing: Thing) => {
  if (thing.workingStatus === ThingStatus.Working) {
    const percent = `${(thing.workingPercent * 100).toFixed(2)}%`;
    return `linear-gradient(${PASSED_COLOR} 0%, ${PASSED_COLOR} ${percent}, ${UNREACH_COLOR} ${percent}, ${UNREACH_COLOR} ${percent} ${percent})`;
    // return `linear-gradient(${PASSED_COLOR} 0%,${UNREACH_COLOR} 100%)`;
  }
  if (thing.workingStatus === ThingStatus.Unreach) return UNREACH_COLOR;
  if (thing.workingStatus === ThingStatus.Passed) return PASSED_COLOR;
};
</script>
