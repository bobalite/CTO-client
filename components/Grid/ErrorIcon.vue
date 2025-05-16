<template>
    <div v-if="props.error == 1" :class=props.class class="mr-2 h-5 w-5 text-green-800 text-center py-px">
        <!-- small check icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>

    </div>

    <div v-if="props.error == 2" :class=props.class
        class="mr-2 h-5 w-5 text-red-500 text-center py-px ">
        <!-- Exclamation icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>


    </div>

    <div v-if="props.error == 0" :class=props.class class="mr-2 h-5 w-5 text-black text-center py-px">
        <!-- question icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>

    </div>

    <div v-if="props.error == 3" :class=props.class class="mr-2 h-5 w-5 text-green-800 text-center py-px">
        <!-- large check icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>

    </div>


</template>
<script setup lang="ts">
const props = defineProps({
    class: 
    { 
        type: String,
        required: false,
         //default:'block w-full border-0 px-3 text-violet-900 shadow-sm ring-0 ring-inset ring-violet-600 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-yellow-100'
    },
    error:
    {
        type: Number,
        required: true,
        default: 0
    }

})
</script>

