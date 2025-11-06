<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg w-full max-w-lg shadow-lg p-6 relative">
        <h2 class="text-lg font-semibold mb-4">{{ modalTitle }}</h2>

        <div v-if="group">
          <p class="text-sm text-gray-600 mb-3">
            <strong>Group:</strong> {{ group.group_no }}
          </p>

          <ul class="border rounded-lg divide-y divide-gray-200 mb-4">
            <li
              v-for="el in group.indicator_group_elements"
              :key="el.id"
              class="px-3 py-2 flex justify-between items-center hover:bg-gray-50"
            >
              <div>
                <span class="font-semibold">{{ el.indicator_no }}</span> - {{ el.description }}
                <span class="text-xs text-gray-400 ml-1">({{ el.value_type }})</span>
              </div>

              <!-- Edit button visible only in edit mode -->
              <button
                v-if="mode === 'edit'"
                class="text-xs bg-blue-600 text-white px-2 py-0.5 rounded hover:bg-blue-400"
              >
                Edit
              </button>
            </li>
          </ul>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button
            class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            @click="$emit('close')"
          >
            Close
          </button>

          <!-- Add Entry button -->
          <button
            v-if="mode === 'add'"
            class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-500"
          >
            Add New Element
          </button>

          <!-- View mode: no editing, just display -->
          <button
            v-if="mode === 'view'"
            disabled
            class="px-3 py-1 text-sm bg-blue-500 text-white rounded opacity-70 cursor-default"
          >
            Viewing Entries
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: Boolean,
  mode: String,
  group: Object
})

const emit = defineEmits(['close'])

const modalTitle = 'Edit Group'
 
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
