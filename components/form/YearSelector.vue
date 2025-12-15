<template>
  <div class="flex justify-between items-center mt-1 z-0">
    <div class="inline-block w-1/4">
      <div class="flex items-center gap-1 text-sm">
        <!-- Previous -->
        <button
          @click="handleClick(2)"
          :class="[
            'flex items-center justify-center bg-green-700 rounded hover:bg-green-900 transition h-full px-2 py-1',
            isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''
          ]"
          :disabled="isPrevDisabled"
        >
          <ChevronLeftIcon class="h-6 w-3 text-white" aria-hidden="true" />
        </button>

        <!-- Current -->
        <div
          class="min-w-[12rem] px-4 py-1 bg-white shadow border text-center font-semibold flex items-center justify-center whitespace-nowrap text-md"
        >
          {{ currentLabel }}
        </div>

        <!-- Next -->
        <button
          @click="handleClick(1)"
          :class="[
            'flex items-center justify-center bg-green-700 rounded hover:bg-green-900 transition h-full px-2 py-1',
            isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
          ]"
          :disabled="isNextDisabled"
        >
          <ChevronRightIcon class="h-6 w-3 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  options: { type: Array, required: true }, // [{value,label}]
  modelValue: { type: [Number, String], required: true }, // YEAR like 2025
  changeSelectedYear: { type: Function, required: false }
});

const emit = defineEmits(["update:modelValue"]);

const currentIndex = computed(() => {
  const idx = props.options.findIndex(o => String(o.value) === String(props.modelValue));
  return idx; // -1 if not found
});

const currentLabel = computed(() => {
  const item = props.options.find(o => String(o.value) === String(props.modelValue));
  return item?.label ?? "Select Year";
});

const isPrevDisabled = computed(() => props.options.length === 0 || currentIndex.value <= 0);
const isNextDisabled = computed(() => props.options.length === 0 || currentIndex.value === -1 || currentIndex.value >= props.options.length - 1);

function handleClick(opt) {
  // Prefer parent handler if provided
  if (props.changeSelectedYear && typeof props.changeSelectedYear === "function") {
    props.changeSelectedYear(opt);
    return;
  }

  // Fallback: update v-model here using index navigation
  const idx = currentIndex.value;
  if (idx === -1) return;

  if (opt === 1 && idx < props.options.length - 1) {
    emit("update:modelValue", props.options[idx + 1].value);
  } else if (opt === 2 && idx > 0) {
    emit("update:modelValue", props.options[idx - 1].value);
  }
}
</script>
