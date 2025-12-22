<template>
  <div class="mt-0 grid grid-cols-1 gap-x-0 gap-y-0 table-header-4 sm:grid-cols-20">
    <GridCell
      class="sm:col-span-20 category-label text-center border-gray-200 border-t border-l border-r border-b pb-3"
      :displaytext="description"
    />
  </div>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<style scoped>
.category-label {
  font-size: 1.05rem;   /* slightly bigger than subcategory (0.95rem) */
  font-weight: 800;     /* same boldness */
  line-height: 1.4;
  color: #111827;       /* gray-900 */
}
</style>
