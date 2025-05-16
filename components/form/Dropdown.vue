<template>

    <!-- Profile dropdown -->
    <Menu as="div" class="relative">
        <MenuButton class="-m-1.5 flex items-center p-1.5">
            <span class="sr-only">Open action menu</span>
            <span class="hidden lg:flex lg:items-center">
                <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">...</span>

            </span>
        </MenuButton>
        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <slot />
            </MenuItems>
        </transition>
    </Menu>

</template>
<script setup>




import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/vue'

definePageMeta({
    layout: 'main'
})
</script>