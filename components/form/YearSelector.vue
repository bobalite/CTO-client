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
  options: { type: Array, required: true }, // can be [{value,label}] or richer objects with year/quarter
  modelValue: { type: [Number, String], required: true }, // year or id
  changeSelectedYear: { type: Function, required: false }
});

const emit = defineEmits(["update:modelValue"]);

/**
 * Formats an option label:
 * - If label already contains a 4-digit year, keep it.
 * - Else if it has quarter + year => "Q{quarter} {year}"
 * - Else if it has year => "{label or 'Year'} {year}"
 * - Else fallback to label/value.
 */
function formatOptionLabel(opt) {
  if (!opt) return "Select";

  const rawLabel = String(opt.label ?? "").trim();
  const year = opt.year != null ? String(opt.year).trim() : "";
  const quarter = opt.quarter != null ? String(opt.quarter).trim() : "";

  // If label already includes a year like 2025, trust it
  if (/\b(19|20)\d{2}\b/.test(rawLabel)) return rawLabel;

  // Quarter + year case
  if (quarter && year) return `Q${quarter} ${year}`;

  // Year present
  if (year) {
    // If label exists (e.g., "Annual"), show "Annual 2025", else "Year 2025"
    return `${rawLabel || "Year"} ${year}`;
  }

  // If label exists, use it
  if (rawLabel) return rawLabel;

  // Final fallback: show value
  return String(opt.value ?? "Select");
}

// Normalize options for display (does NOT mutate props)
const displayOptions = computed(() =>
  (props.options ?? []).map((o) => ({
    ...o,
    _displayLabel: formatOptionLabel(o),
  }))
);

const currentIndex = computed(() => {
  const idx = displayOptions.value.findIndex(
    (o) => String(o.value) === String(props.modelValue)
  );
  return idx; // -1 if not found
});

const currentLabel = computed(() => {
  const item = displayOptions.value.find(
    (o) => String(o.value) === String(props.modelValue)
  );
  return item?._displayLabel ?? "Select";
});

const isPrevDisabled = computed(
  () => displayOptions.value.length === 0 || currentIndex.value <= 0
);

const isNextDisabled = computed(
  () =>
    displayOptions.value.length === 0 ||
    currentIndex.value === -1 ||
    currentIndex.value >= displayOptions.value.length - 1
);

function handleClick(opt) {
  // Prefer parent handler if provided
  if (props.changeSelectedYear && typeof props.changeSelectedYear === "function") {
    props.changeSelectedYear(opt);
    return;
  }

  // Fallback: update v-model here using index navigation
  const idx = currentIndex.value;
  if (idx === -1) return;

  if (opt === 1 && idx < displayOptions.value.length - 1) {
    emit("update:modelValue", displayOptions.value[idx + 1].value);
  } else if (opt === 2 && idx > 0) {
    emit("update:modelValue", displayOptions.value[idx - 1].value);
  }
}
</script>
