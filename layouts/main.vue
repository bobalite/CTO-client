<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog class="relative  lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex print:hidden">
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
                                        alt="SPECIAL OFFICE FOR CHILDREN'S CONCERN Analytical and Reporting System" />
                                    <div class='text-white'> S.O.A.R System -- hidden</div>
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


        <!--------------------------Static sidebar for desktop---------------------------------------------------------------------------------------------- -->


        <div class="relative print:hidden z-50 hidden md:block" 
            @mouseenter="expanded = true" 
            @mouseleave="expanded = false">
            <!-- Side Menu -->

            <transition name="slide">
                <aside
                    class="fixed left-0 top-[64px] h-screen bg-green-900 text-white shadow-lg transition-all duration-300 overflow-hidden pt-[0.15in] rounded-r-lg"
                    :class="expanded ? 'w-48' : 'w-16'">

                    <!-- 🔹 Logo Section -->
                    <div class="flex flex-col items-center justify-center pt-2 pb-3 border-b border-green-800 transition-all duration-200">
                        <img :class="expanded ? 'h-20 w-auto transition-all duration-200' : 'h-10 w-auto transition-all duration-200'" src="/assets/images/file.png"
                            alt="SPECIAL OFFICE FOR CHILDREN'S CONCERN" />
                        <span v-if="expanded" class="mt-1 font-bold text-lg">S.O.A.R.</span>
                    </div>

                    <ul>
                       
                        <template v-if="userStore.getUser.user_roles.roles_id == 1"></template>

                        <li class="flex items-center py-3 px-2 hover:bg-green-900 rounded">
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <NuxtLink :to="item.link" :class="[
                                        item.current
                                            ? 'bg-green-700 text-white'
                                            : 'text-green-200 hover:text-white hover:bg-green-700',
                                        'group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    ]">
                                        <!-- Dot placeholder -->
                                        <span :class="[
                                            'h-2 w-2 rounded-full',
                                            item.link === route.path ? 'bg-white' : 'bg-transparent'
                                        ]"></span>

                                        <!-- Icon -->
                                        <component :is="item.icon" :class="[
                                            item.current ? 'text-white' : 'text-green-200 group-hover:text-white',
                                            'h-6 w-6 shrink-0'
                                        ]" aria-hidden="true" />

                                        <!-- Label -->
                                        <span v-if="expanded" class="ml-3">{{ item.name }}</span>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </aside>

            </transition>
        </div>


        <!-- --------------------- static side menu end --------------------------------------- -->

        <div class="lg:pl-32 ">
            <div
                class="print:hidden sticky top-0 z-50 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />

                </button>

                <!-- Separator -->
                <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

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
                        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" ></div>

                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative">
                            <MenuButton class="-m-1.5 flex items-center p-1.5">
                                <span class="sr-only">Open user menu</span>
                                <template v-if="userStore.getUser.email == 'admin@davaocity.citc'">
                                    <img class="h-8 w-8 rounded-full bg-gray-50" src="/assets/images/bryan_ronin.jpg"
                                        alt="" />

                                </template>
                                <template v-else-if="userStore.getUser.email == 'cath@davaocity.citc'">
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
                                    <NuxtLink
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
                        <template v-if="userStore.getUser.email == 'admin@davaocity.citc'">
                            <img class="h-13 w-13 rounded-full bg-gray-50" src="/assets/images/bryan_ronin.jpg"
                                alt="" />
                        </template>
                        <template v-else-if="userStore.getUser.email == 'cath@davaocity.citc'">
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
                    <GridCell class="sm:col-span-3 pb-4 text-white" :displaytext="'New Password: '" />
                    <GridText2 v-model="state.password1" type="password" class="sm:col-span-3 pb-4"
                        :displaytext="state.password1" />
                    <GridErrorIcon class="sm:col-span-1 " :error="state.password_error" />


                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-3 pb-4 text-white" :displaytext="'Re-Type New Password: '" />
                    <GridText2 v-model="state.password2" type="password" class="sm:col-span-3 pb-4"
                        :displaytext="state.password2" />
                    <GridErrorIcon class="sm:col-span-1 " :error="state.password_error" />
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
                        @click="SaveNewPasswordUser"> Save </button>

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

import { useRoute } from 'vue-router'
const route = useRoute()

import {authService } from '~/components/api/AuthService'
import {userService } from '~/components/api/UserService';
import {useUserStore} from '~/store/user'
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

import { ChevronDownIcon, 
        MagnifyingGlassIcon, 
        PencilSquareIcon, 
        UsersIcon, 
        CalendarDaysIcon } from '@heroicons/vue/20/solid/index.js'

//import Alert from '~/components/modal/alert.vue'
import { PrinterIcon } from '@heroicons/vue/16/solid';
const userStore = useUserStore()
//@heroicons/vue/24/outline/

//console.log(userStore.getUser.user_roles.roles_id)
const expanded = ref(false)

const state = reactive({
    isSlideModalOpen: false,
    username: '',
    password: '',
    fname: '',
    lname: '',
    mname: '',
    email: '',
    roles_id: '',
    agency_id: '',
    is_active: 1,
    user_id: '',

    password1: '',
    password2: '',
    password1_error: 0,    
    
})


function openSlideModal() {
  state.isSlideModalOpen = true;
}

function closeSlideModal() {
  state.isSlideModalOpen = false;
}



const navigation = [
    { name: 'Dashboard', link: '/dashboard', icon: HomeIcon, current: false },
    { name: 'Tracker', link: '/tracker', icon: MagnifyingGlassIcon, current: false },
    { name: 'Calendar', link: '/calendar', icon: CalendarIcon, current: false },
    { name: 'Accomplishments', link: '/accomplishments', icon: TrophyIcon, current: false },
    { name: 'Reports', link: '/reports', icon: PrinterIcon, current: false },
    { name: 'Encoding', link: '/dataencoding/rights', icon: PencilSquareIcon, current: false },
    { name: 'Configurations', link: '/admin', icon: Cog6ToothIcon, current: false },
    { name: 'Users', link: '/admin/usermanagement', icon: UsersIcon, current: false },
    { name: 'Schedules ', link: '/admin/managereportschedules', icon: CalendarDaysIcon, current: false },
]
const encoding_forms = [
   

        
    
]

const admin_pages = [



   

]

const userNavigation = [
    { name: 'Your profile', link: '/', },
    { name: 'Help', link: '/', },
    { name: 'Change password', link: '/', },
    { name: 'Sign out', link: '/', },
]

const sidebarOpen = ref(true)



const check_errors = computed(() => {

    try {
        if (state.password1 === '') {
            state.password1_error = 2
        } else if (state.password1.length <= 5) {
            state.password1_error = 1
        }
        else if (state.password1 > 5) {
            state.password1_error = 3
        } else {
            state.password1_error = 0
        }

    } catch (error) {
        state.password1_error = 2
    }

  
})

async function logout() {
    try {
        const response = await authService.logout()
        if (response) {
            userStore.resetUser()
            localStorage.removeItem("_token");
            navigateTo('/login')
        }
    } catch (error) {
        console.log(error)
    }



}

async function SaveNewPasswordUser(){

//console.log('userStore.getUser',userStore.getUser)

state.username = userStore.getUser.username
state.password  = userStore.getUser.password
state.user_id = userStore.getUser.id
state.fname = userStore.getUser.fname
state.lname = userStore.getUser.lname
state.mname = userStore.getUser.mname
state.email = userStore.getUser.email
state.roles_id = userStore.getUser.user_roles.roles_id
state.agency_id = userStore.getUser.user_roles.agency_id


if (state.password1 !== state.password2) {
    alert('Passwords do not match. Please try again.');
    return;
}
 if (state.password1.length < 8) {
    alert('Must be at least 8 characters.')
     return;
  }
 if (!/[A-Z]/.test(state.password1)) {
    alert('Must include at least one uppercase letter.')
     return;
  }
 if (!/[0-9]/.test(state.password1)) {
     alert('Must include at least one number.')
     return;
 }
 if (!/[!@#$%^&*(),.?":{}|<>]/.test(state.password1)) {
     alert('Must include at least one special character.')
      return;
 }


state.password = state.password1; // Set the new password to the state


 try {

    let params = {
        username: state.username,
        password: state.password,
        email: state.email,
        roles_id: state.roles_id,
        agency_id: state.agency_id,
        fname: state.fname,
        lname: state.lname,
        mname: state.mname,
        email: state.email,
        is_active: 1,
    }

    //console.log('params' , params)
    //console.log('state.user_id' , state.user_id)

    const response = await userService.updateUser(state.user_id, params);
     if (response.data) {
         state.successcount = state.successcount + 1;
        //  console.log('User updated successfully:', response.data);
         alert('Successfully Changed Password ')
        closeSlideModal()
     }
} catch (error) {

    //console.error('Error updating password:', error);
    alert('Error updating password : ' + error.message);
    state.errorcount = state.errorcount + 1;
}

// console.log('state.successcount', state.successcount)
// if (state.successcount > 0){
//     state.successcount = state.successcount;
//     state.errorcount = state.errorcount;
   
//     state.isAddModalOpen = false;
//       alert('Successfully Changed Password ')

//     //openAlertModal(state.group, 'Successfully Changed Password', state.group_header, state.errorcount, state.successcount)
// }else{
//         alert('Error in Changing Password ')
      
//     //openAlertModal(state.group, 'Errors were encountered ', state.group_header, state.errorcount, state.successcount)
    
//     //state.isAddModalOpen = false;
// }

}


function openProfile(){
    console.log(userStore.getUser)
    openSlideModal()
}
</script>


<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0.8;
}
</style>