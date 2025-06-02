<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-green-600 px-6 pb-4">
                                <div class="flex h-16 shrink-0 items-center">
                                    <img class="h-8 w-auto" src="/assets/images/file.png"
                                        alt="SPECIAL OFFICE FOR CHILDREN'S CONCERN" />
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <NuxtLink :to="item.link"
                                                        :class="[item.current ? 'bg-green-700 text-white' : 'text-green-200 hover:text-white hover:bg-green-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                        <component :is="item.icon"
                                                            :class="[item.current ? 'text-white' : 'text-green-200 group-hover:text-white', 'h-6 w-6 shrink-0']"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </NuxtLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div class="text-xs font-semibold leading-6 text-green-200">Data Encoding
                                            </div>
                                            <!-- <ul role="list" class="-mx-2 mt-2 space-y-1">
                                                <li v-for="team in admin_pages" :key="team.name">
                                                   <NuxtLink :to="team.link"
                                                        :class="[team.current ? 'bg-green-700 text-white' : 'text-green-200 hover:text-white hover:bg-green-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                        <span
                                                            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-green-400 bg-green-500 text-[0.625rem] font-medium text-white">{{
                                                                team.initial }}</span>
                                                        <span class="truncate">{{ team.name }}</span>
                                                    </NuxtLink>
                                                </li>
                                            </ul> -->

                                                <li v-for="data_encoding in encoding_forms" :key="data_encoding.name">
                                                    <NuxtLink :to="data_encoding.link"
                                                        :class="[data_encoding.current ? 'bg-green-700 text-white' : 'text-green-200 hover:text-white hover:bg-green-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                        <span
                                                            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-green-400 bg-green-500 text-[0.625rem] font-medium text-white">
                                                            {{ data_encoding.initial }}
                                                        </span>
                                                        <span class="truncate">{{ data_encoding.name }}</span>
                                                    </NuxtLink>
                                                </li>
                                        </li>
                                        <li class="mt-auto">
                                            <a href="#"
                                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-green-200 hover:bg-green-700 hover:text-white">
                                                <Cog6ToothIcon
                                                    class="h-6 w-6 shrink-0 text-green-200 group-hover:text-white"
                                                    aria-hidden="true" />
                                                Settings
                                            </a>

                                            <ul role="list" class="-mx-2 mt-2 space-y-1">
                                                <li v-for="team in admin_pages" :key="team.name">
                                                    <NuxtLink :to="team.link"
                                                        :class="[team.current ? 'bg-green-700 text-white' : 'text-green-200 hover:text-white hover:bg-green-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                        <span
                                                            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-green-400 bg-green-500 text-[0.625rem] font-medium text-white">{{
                                                            team.initial }}</span>
                                                        <span class="truncate">{{ team.name }}</span>
                                                    </NuxtLink>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-green-900 px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center">
                    <img class="h-8 w-auto" src="/assets/images/file.png" alt="SPECIAL OFFICE FOR CHILDREN'S CONCERN" />
                    <div class='text-white'> SPECIAL OFFICE FOR CHILDREN'S CONCERNS </div>
                </div>
                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <NuxtLink :to="item.link"
                                        :class="[item.current ? 'bg-green-700 text-white' : 'text-green-200 hover:text-white hover:bg-green-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                        <component :is="item.icon"
                                            :class="[item.current ? 'text-white' : 'text-green-200 group-hover:text-white', 'h-6 w-6 shrink-0']"
                                            aria-hidden="true" />
                                        {{ item.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div class="text-xs font-semibold leading-6 text-green-200">Data Encoding</div>
                            <ul role="list" class="-mx-2 mt-2 space-y-1">
                                <li v-for="data_encoding in encoding_forms" :key="data_encoding.name">
                                    <NuxtLink :to="data_encoding.link"
                                        :class="[data_encoding.current ? 'bg-green-700 text-white' : 'text-green-200 hover:text-white hover:bg-green-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                        <span
                                            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-green-400 bg-green-500 text-[0.625rem] font-medium text-white">
                                            {{ data_encoding.initial }}
                                        </span>
                                        <span class="truncate">{{ data_encoding.name }}</span>
                                    </NuxtLink>
                                </li>
                            </ul>


                            <div class="text-xs font-semibold leading-6 text-green-200">Administration</div>
                            <template v-if="userStore.getUser.user_roles.roles_id == 1 ">
                                <ul role="list" class="-mx-2 mt-2 space-y-1">
                                    <li v-for="admin_encoding in admin_pages" :key="admin_encoding.name"
                                        class="mt-auto">
                                        <NuxtLink @Click="admin_encoding.current = true" :to="admin_encoding.link"
                                            class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-green-200 hover:bg-green-700 hover:text-white">
                                            <Cog6ToothIcon
                                                class="h-6 w-6 shrink-0 text-green-200 group-hover:text-white"
                                                aria-hidden="true" />
                                            <span class="truncate">{{ admin_encoding.name }}</span>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </template>


                        </li>

                    </ul>
                </nav>
            </div>
        </div>

        <div class="lg:pl-72">
            <div
                class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Separator -->
                <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    <form class="relative flex flex-1" action="#" method="GET">
                        <label for="search-field" class="sr-only"></label>

                    </form>
                    <div class="flex items-center gap-x-4 lg:gap-x-6">
                        <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="h-6 w-6" aria-hidden="true" />
                        </button>

                        <!-- Separator -->
                        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative">
                            <MenuButton class="-m-1.5 flex items-center p-1.5">
                                <span class="sr-only">Open user menu</span>
                                <template v-if="userStore.getUser.email == 'test@email.com'">
                                    <img class="h-8 w-8 rounded-full bg-gray-50" src="/assets/images/bryan_ronin.jpg"
                                        alt="" />

                                </template>
                                <template v-else-if="userStore.getUser.email == 'cath@email.com'">
                                    <img class="h-8 w-8 rounded-full bg-gray-50" src="/assets/images/cat.jpg" alt="" />
                                </template>
                                <template v-else>
                                    <img class="h-8 w-8 rounded-full bg-gray-50" src="/assets/images/default_pic.png"
                                        alt="" />
                                </template>

                                <span class="hidden lg:flex lg:items-center">
                                    <span class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                        aria-hidden="true">{{ userStore.getUser.fname }} {{ userStore.getUser.lname
                                        }}</span>
                                    <ChevronDownIcon
                                        class="hover:bg-green-700 hover:text-white ml-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true" />
                                </span>
                            </MenuButton>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <MenuItem>
                                    <NuxtLink @click="logout"
                                        class="cursor-pointer  hover:bg-green-700 hover:text-white block px-3 py-1 text-sm leading-6 text-gray-900 mouse-pointer">
                                        <div class="mouse-pointer">Help</div>
                                    </NuxtLink>
                                    </MenuItem>
                                    <MenuItem>
                                    <NuxtLink @click="openProfile"
                                        class="cursor-pointer  hover:bg-green-700 hover:text-white block px-3 py-1 text-sm leading-6 text-gray-900 mouse-pointer">
                                        <div class="mouse-pointer">Change Password</div>
                                    </NuxtLink>
                                    </MenuItem>
                                    <MenuItem>
                                    <NuxtLink @click="logout"
                                        class="cursor-pointer  hover:bg-green-700 hover:text-white block px-3 py-1 text-sm leading-6 text-gray-900 mouse-pointer">
                                        <div class="mouse-pointer">Logout</div>
                                    </NuxtLink>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>

            <ModalSlide :show="state.isSlideModalOpen" :close="closeSlideModal" :title="'Change Password'">


                <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-8">
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <div class="sm:col-span-7  ">
                        <template v-if="userStore.getUser.email == 'test@email.com'">
                            <img class="h-13 w-13 rounded-full bg-gray-50" src="/assets/images/bryan_ronin.jpg"
                                alt="" />
                        </template>
                        <template v-else-if="userStore.getUser.email == 'cath@email.com'">
                            <img class="h-13 w-13 rounded-full bg-gray-50" src="/assets/images/cat.jpg" alt="" />
                        </template>
                        <template v-else>
                            <img class="h-13 w-13 rounded-full bg-gray-50" src="/assets/images/default_pic.png"
                                alt="" />
                        </template>

                        <button
                            class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                            @click="closeSlideModal"> Change Profile Picture </button>
                    </div>
                    <GridCell class="sm:col-span-8 " :displaytext="''" />


                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 text-white pb-4" :displaytext="'Username: '" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 text-white pb-4 " :displaytext="userStore.getUser.username" />
                    <GridCell class="sm:col-span-8 " :displaytext="''" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 pb-4 text-white" :displaytext="'Email    : '" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 text-white" :displaytext="userStore.getUser.email" />
                    <GridCell class="sm:col-span-8 " :displaytext="''" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 pb-4 text-white" :displaytext="'Last Name: '" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 text-white" :displaytext="userStore.getUser.lname" />
                    <GridCell class="sm:col-span-8 " :displaytext="''" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 pb-4 text-white" :displaytext="'First Name: '" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 text-white" :displaytext="userStore.getUser.fname" />
                    <GridCell class="sm:col-span-8 " :displaytext="''" />


                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-3 pb-4 text-white" :displaytext="'Current Password: '" />
                    <GridText2 type="password" class="sm:col-span-3 pb-4" :displaytext="''" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-3 pb-4 text-white" :displaytext="'New Password: '" />
                    <GridText2 type="password" class="sm:col-span-3 pb-4" :displaytext="''" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-3 pb-4 text-white" :displaytext="'Re-Type New Password: '" />
                    <GridText2 type="password" class="sm:col-span-3 pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-8 " :displaytext="''" />

                    <GridCell class="sm:col-span-8 pb-4 " :displaytext="' '" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeSlideModal"> Cancel </button>
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeSlideModal"> Save </button>

                </div>


            </ModalSlide>

            <main class="py-10">
                <div class="px-4 sm:px-6 lg:px-8">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/store/user'
import { authService } from '~/components/api/AuthService'
import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    
} from '@headlessui/vue'


import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    HomeIcon,
    XMarkIcon,
    TrophyIcon
} from '@heroicons/vue/24/outline/index.js'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid/index.js'

//@heroicons/vue/24/outline/



const state = reactive({
    isSlideModalOpen: false,
    
})


function openSlideModal() {
  state.isSlideModalOpen = true;
}

function closeSlideModal() {
  state.isSlideModalOpen = false;
}


const userStore = useUserStore()

const navigation = [
    { name: 'Dashboard', link: '/dashboard', icon: HomeIcon, current: false },
    { name: 'Datasource Tracker', link: '/tracker', icon: ChartPieIcon, current: false },
    { name: 'Calendar and Schedules', link: '/calendar', icon: CalendarIcon, current: false },
    { name: 'Accomplishments', link: '/accomplishments', icon: TrophyIcon, current: false },
    // { name: 'Reports', link: '/reports', icon: FolderIcon, current: false },
]
const encoding_forms = [
    { id: 8, name: 'Sectioned Rights Encoding', link: '/dataencoding/rights', initial: 'R', current: false },
    // { id: 1, name: 'Rights to Survival', link: '/dataencoding/survival_encoding', initial: 'S', current: false },
    // { id: 2, name: 'Rights to Development', link: '/dataencoding/development_encoding', initial: 'Dev', current: false },
    // { id: 3, name: 'Rights to Protection', link: '/dataencoding/protection_encoding', initial: 'Pro', current: false },
    // { id: 4, name: 'Rights to Participation', link: '/dataencoding/participation_encoding', initial: 'Part', current: false },
    // { id: 5, name: 'Other Areas', link: '/dataencoding/other_areas_encoding', initial: 'O', current: false },
    // { id: 6, name: 'General Information', link: '/dataencoding/general_information_encoding', initial: 'GI', current: false },
    // { id: 7, name: 'Survival V1', link: '/dataencoding/development', initial: 'DV', current: false },

]

const admin_pages = [
    { id: 1, name: 'Rights Entry Configuration', link: '/admin', initial: 'R', current: false },
    { id: 2, name: 'User Management', link: '/admin/usermanagement', initial: 'R', current: false },
    //{ id: 3, name: 'Manage Datasources ', link: '/admin/usermanagement', initial: 'R', current: false },
    { id: 3, name: 'Manage Report Schedules ', link: '/admin/managereportschedules', initial: 'R', current: false },

]

const userNavigation = [
    { name: 'Your profile', link: '/', },
    { name: 'Help', link: '/', },
    { name: 'Change password', link: '/', },
    { name: 'Sign out', link: '/', },
]

const sidebarOpen = ref(false)

async function logout() {
    try {
        const response = await authService.logout()
        if (response) {
            userStore.resetUser()
            localStorage.removeItem("_token");
            navigateTo('/')
        }
    } catch (error) {
        console.log(error)
    }



}

async function SaveNewPasswordUser(){

try {
    let params = {
        username: state.current_user.username,
        password: state.current_user.password,
        fname: state.current_user.fname,
        lname: state.current_user.lname,
        mname: state.current_user.mname,
        email: state.current_user.email,
        roles_id: state.selected_user_role,
        agency_id: state.current_user_agency.id,
        is_active: 1,
    }

    console.log(params);

    const response = await userService.updateUser(params);
    if (response.data) {
        state.successcount = state.successcount + 1;
    }
} catch (error) {
    state.errorcount = state.errorcount + 1;
}


if (state.successcount > 0){
    state.successcount = state.successcount;
    state.errorcount = state.errorcount;
    fetchUsers();
    state.isAddModalOpen = false;
    openAlertModal(state.group, 'Successfully Added to the database.', state.group_header, state.errorcount, state.successcount)
}else{

    openAlertModal(state.group, 'Errors were encountered ', state.group_header, state.errorcount, state.successcount)
    
    //state.isAddModalOpen = false;
}

}


function openProfile(){
    openSlideModal()
}
</script>