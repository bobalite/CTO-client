<template>
  <div>
      <TransitionRoot appear :show="props.show" as="template">
         
        <Dialog as="div" @close="props.close" class="relative z-10">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                  enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="fixed inset-0 bg-black/25" />
              </TransitionChild>

              <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12">
                  <div class="flex min-h-full items-center justify-center p-1 text-center">
                      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                          enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                          leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                          <DialogPanel
                              class="w-full max-w-md transform  rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                              <slot/>
                          </DialogPanel>
                      </TransitionChild>
                  </div>
              </div>
          </Dialog>

      </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/vue'

const props = defineProps({
  show: {
      type: Boolean,
      required: true,
  },
  close: {
      type: Object,
      required: false,
  },
})

</script>