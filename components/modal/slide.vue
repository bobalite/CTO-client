<template>
    <TransitionRoot as="template" :show="props.show">
        <Dialog class="relative z-10" @click="props.close" @close="props.close">
            <div class="fixed inset-0" />
            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template"
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div :class= props.dialogClass>
                                    <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                                        <div class="px-4 sm:px-6">
                                            <div class="flex items-start justify-between mt-14">
                                                <h3
                                                    :class=props.tittleClass>
                                                    {{ props.title }}
                                                </h3>
                                                <div class="ml-3 flex h-7 items-center">
                                                    <button type="button"
                                                        :class=props.buttonClass
                                                        @click="props.close">
                                                        <span class="absolute -inset-2.5" />
                                                        <span class="sr-only">Close panel</span>
                                                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <slot />
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    close: {
        type: [Function, Object],
        required: false,
    },
    title: {
        type: String,
        required: true
    },
    dialogClass: {
        type: String,
        required: false,
        default: 'flex h-full flex-col divide-y divide-gray-200 bg-opacity-90 bg-green-800 rounded-2xl shadow-xl'
    },
    buttonClass: {
        type: String,
        required: false,
        default: 'relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
    },
    tittleClass: {
        type: String,
        required: false,
        default: 'text-2xl text-right font-bold leading-tight tracking-tight text-white'
    },
})

</script>