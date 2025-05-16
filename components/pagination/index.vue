<template>
    <div class="w-full flex mt-4 justify-between items-center" v-if="props.data && props.data.links">
        <div>
            <button
                class="px-3 py-2 flex justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-900"
                :class="props.data.links && props.data.links.prev === null ? 'rounded-md border border-primary-600 text-primary-600 cursor-not-allowed' : 'rounded-md border border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white'"
                @click="!(props.data.links && props.data.links.prev === null) && $emit('previous')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-center">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

                Previous</button>
        </div>
        <div class="text-base px-4 py-2 text-center text-gray-500 text-xs">
            Showing {{ props.data.meta.current_page }} of {{ props.data.meta.last_page }}
        </div>
        <div>
            <button
                class="px-3 py-2 flex justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-900"
                :class="props.data.links && props.data.links.next === null ? 'rounded-md border border-primary-600 text-primary-600 cursor-not-allowed' : 'rounded-md border border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white'"
                @click="!(props.data.links && props.data.links.next === null) && $emit('next')">Next
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
})
</script>