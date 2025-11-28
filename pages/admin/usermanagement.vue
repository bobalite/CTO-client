<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">MANAGE USERS</h1>
        <div class="flex items-center space-x-4">
            <button class="btn btn-primary">Export</button>
            <button class="btn btn-primary">Print</button>
        </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
                <p class="mt-2 text-sm text-gray-700">A list of all the users of the system. You can view, edit, disable
                    and add users. You can also view the user's access role, agency, first name, last name, middle name,
                    title, email and Access Level.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

                <template v-if="state.logged_user_role.allow_manage_users == 1">
                    <button type="button"
                        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        @click="openAddUserModal">Add
                        user</button>
                </template>

            </div>

            <ModalDisplayform :show="state.isViewModalOpen" :close="state.closeViewModal" :title="'View User Access'">

                <div class="mt-1 grid grid-cols-1 bg-green-400 gap-x-0 gap-y-0 sm:grid-cols-12">


                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-t border-b border-r border-green-600 pb-4"
                        :displaytext="'First Name:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-t border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.fname" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Username:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md  border-t border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.username" />


                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Middle Name:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.mname" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />


                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Email Address:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.email" />


                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Last Name:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.lname" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Agency:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user_agency.long_name" />

                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />

                    <GridCell class="sm:col-span-2  font-bold text-center text-md   pb-4"
                        :displaytext="'Access Level:'" />
                    <GridCell class="sm:col-span-3 font-bold text-center text-md   pb-4"
                        :displaytext="state.current_user_role.name" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell class="sm:col-span-2  text-center text-md  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-3  text-center text-md pb-4" :displaytext="''" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm border-t border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow View Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_view" :value="state.allow_view" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Allow View Other Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_view_other_entries" :value="state.allow_view_other_entries"
                        aria-readonly="true" />
                    <GridCell class="sm:col-span-1   " :displaytext="''" />


                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Allow Manage Users:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_manage_users" :value="state.allow_manage_users" aria-readonly="true" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Add Entry:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_add" :value="state.allow_add" aria-readonly="true" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />



                    <GridCell
                        class="block sm:col-span-2  text-center text-sm  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Add Other Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_add_other_entries" :value="state.allow_add_other_entries"
                        aria-readonly="true" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />


                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Manage Roles:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_manage_roles" :value="state.allow_manage_roles" aria-readonly="true" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />


                    <GridCell
                        class="sm:col-span-2  text-center text-sm border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Edit Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_edit" :value="state.allow_edit" aria-readonly="true" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />




                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Edit Other Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_edit_other_entries" :value="state.allow_edit_other_entries"
                        aria-readonly="true" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />





                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-10 " :displaytext="''" />
                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeViewModal"> Close </button>

                </div>

            </ModalDisplayform>


            <ModalDisplayform :show="state.isEditModalOpen" :close="state.closeEditModal" :title="'Edit User Access'">

                <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12">

                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />
                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-t border-b border-r border-green-600 pb-4"
                        :displaytext="'First Name:'" />
                    <GridText2
                        class="sm:col-span-3  bg-white text-center text-md   border-t border-b border-r border-green-600 pb-4"
                        v-model="state.current_user.fname" :displaytext="state.current_user.fname"
                        :modelValue="state.current_user.fname" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Username:'" />
                    <GridText2
                        class="sm:col-span-3  bg-white text-center text-md  border-t border-b border-r border-green-600 pb-4"
                        v-model="state.current_user.username" :displaytext="state.current_user.username" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Middle Name:'" />
                    <GridText2
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        v-model="state.current_user.mname" :displaytext="state.current_user.mname" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Email Address:'" />
                    <GridText2
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        v-model="state.current_user.email" :displaytext="state.current_user.email" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Last Name:'" />
                    <GridText2
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        v-model="state.current_user.lname" :displaytext="state.current_user.lname" />

                    <GridCell class="sm:col-span-6 " :displaytext="''" />


                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Agency:'" />
                    <GridSelect
                        class="sm:col-span-8 h-1 bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        v-model="state.current_user_agency.id" :placeholder="state.current_user_agency.long_name"
                        :options="state.options.agencies" />

                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />

                    <GridCell :class="'sm:col-span-2  font-bold text-center text-md   pb-4'"
                        :displaytext="'Access Level:'" />

                    <GridSelect class="sm:col-span-5 h-1 text-center text-sm   pb-4" v-model="state.selected_user_role"
                        :placeholder="state.selected_user_role.name" :options="state.options.roles"
                        @click="change_selected_role()" />

                    <GridCell class="sm:col-span-5  text-center text-md  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-12  text-center text-md  pb-4" :displaytext="''" />


                    <GridCell
                        class="sm:col-span-2  text-center text-sm border-t border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow View Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_view" :value="state.allow_view" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Allow View Other Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_view_other_entries" :value="state.allow_view_other_entries" />
                    <GridCell class="sm:col-span-1   " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Allow Manage Users:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_manage_users" :value="state.allow_manage_users" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Add Entry:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_add" :value="state.allow_add" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="block sm:col-span-2  text-center text-sm  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Add Other Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_add_other_entries" :value="state.allow_add_other_entries" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Manage Roles:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_manage_roles" :value="state.allow_manage_roles" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Edit Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_edit" :value="state.allow_edit" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Edit Other Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_edit_other_entries" :value="state.allow_edit_other_entries" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />

                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-7 " :displaytext="''" />

                    <button class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold 
                                text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeEditModal"> Cancel </button>
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <button class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold 
                                text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="SaveEditModal"> Save Changes </button>
                </div>

            </ModalDisplayform>

            <ModalAlertformsmall :show="state.isDisableModalOpen" :close="state.closeDisableModal"
                :title="'Are you sure you want to disable this user ?'">

                <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-6">

                    <GridCell class="sm:col-span-2 " :displaytext="'Username: '" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 " :displaytext="state.current_user.username" />
                    <GridCell class="sm:col-span-7 " :displaytext="''" />

                    <GridCell class="sm:col-span-2 " :displaytext="'Email    : '" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 " :displaytext="state.current_user.email" />
                    <GridCell class="sm:col-span-7 " :displaytext="''" />

                    <GridCell class="sm:col-span-2 " :displaytext="'Last Name: '" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 " :displaytext="state.current_user.lname" />
                    <GridCell class="sm:col-span-7 " :displaytext="''" />

                    <GridCell class="sm:col-span-2 " :displaytext="'First Name: '" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-2 " :displaytext="state.current_user.fname" />
                    <GridCell class="sm:col-span-7 " :displaytext="''" />

                    <GridCell class="sm:col-span-3 " :displaytext="'New Status:'" />
                    <GridSelect class="sm:col-span-2 " :displaytext="''" 
                    v-model="state.current_user.user_role.is_active" :placeholder="state.current_user.user_role.is_active" 
                    :options="state.options.user_enable"/>
                    <GridCell class="sm:col-span-7 " :displaytext="''" />



                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="saveDisableModal"> Yes </button>
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeDisableModal"> Cancel </button>

                </div>

            </ModalAlertformsmall>


            <ModalDisplayform :show="state.isAddModalOpen" :close="state.closeAddModal" :title="'Add New User'">
                <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12">

                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />



                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Username:'" />
                    <GridText2
                        class="sm:col-span-3  bg-white text-center text-md  border-t  border-r border-green-600 pb-4"
                        v-model="state.current_user.username" :displaytext="state.current_user.username"
                        :function="check_errors" />
                    <!-- <GridCellError v-model="state.username_error" class="sm:col-span-1 " :error="state.username_error" /> -->
                    <!-- <GridTextInput v-model = "state.username_error" :function ="check_errors" :class = "'sm:col-span-1 '" /> -->
                    <GridErrorIcon class="sm:col-span-1 " :error="state.username_error" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-t border-r border-green-600   pb-4"
                        :displaytext="'Password:'" />
                    <GridText2
                        class="sm:col-span-3  bg-white text-center text-md  border-t  border-r border-green-600 pb-4"
                        v-model="state.current_user.password" :displaytext="state.current_user.password" />
                    <GridErrorIcon class="sm:col-span-1 " :error="state.password_error" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Email Address:'" />
                    <GridText2 class="sm:col-span-3  bg-white text-center text-md    border-r border-green-600 pb-4"
                        v-model="state.current_user.email" :displaytext="state.current_user.email" />
                    <GridErrorIcon class="sm:col-span-1 " :error="state.email_error" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-t border-b border-r border-green-600 pb-4"
                        :displaytext="'First Name:'" />
                    <GridText2 class="sm:col-span-3  bg-white text-center text-md    border-r border-green-600 pb-4"
                        v-model="state.current_user.fname" :displaytext="state.current_user.fname" />
                    <GridErrorIcon class="sm:col-span-1 " :error="state.fname_error" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Middle Name:'" />
                    <GridText2
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        v-model="state.current_user.mname" :displaytext="state.current_user.mname" />
                    <GridErrorIcon class="sm:col-span-1 " :error="state.mname_error" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Last Name:'" />
                    <GridText2
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        v-model="state.current_user.lname" :displaytext="state.current_user.lname" />
                    <GridErrorIcon class="sm:col-span-1 " :error="state.lname_error" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Agency:'" />

                    <GridSelect
                        class="sm:col-span-8 h-1 bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        v-model="state.current_user_agency.id" :placeholder="state.current_user_agency.long_name"
                        :options="state.options.agencies" />
                    <GridErrorIcon class="sm:col-span-1 " :error="state.agency_error" />

                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />

                    <GridCell :class="'sm:col-span-2  font-bold text-center text-md   pb-4'"
                        :displaytext="'Access Role:'" />

                    <GridSelect class="sm:col-span-5 h-1 text-center text-sm   pb-4" v-model="state.selected_user_role"
                        :options="state.options.roles" @click="change_selected_role()" />
                    <GridErrorIcon class="sm:col-span-1 " :error="state.role_error" />

                    <GridCell class="sm:col-span-5  text-center text-md  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-12  text-center text-md  pb-4" :displaytext="''" />


                    <GridCell
                        class="sm:col-span-2  text-center text-sm border-t border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow View Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_view" :value="state.allow_view" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Allow View Other Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_view_other_entries" :value="state.allow_view_other_entries" />
                    <GridCell class="sm:col-span-1   " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Allow Manage Users:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_manage_users" :value="state.allow_manage_users" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Add Entry:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_add" :value="state.allow_add" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="block sm:col-span-2  text-center text-sm  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Add Other Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_add_other_entries" :value="state.allow_add_other_entries" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Manage Roles:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_manage_roles" :value="state.allow_manage_roles" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Edit Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_edit" :value="state.allow_edit" />
                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-sm  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Allow Edit Other Entries:'" />
                    <GridCheckbox
                        class="sm:col-span-1 bg-white  text-center text-md  border-b border-r border-green-600 pb-4"
                        :model="state.allow_edit_other_entries" :value="state.allow_edit_other_entries" />
                    <GridCell class="sm:col-span-1  " :displaytext="''" />

                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-7 " :displaytext="''" />

                    <button class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold 
                     text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 
                     focus-visible:outline-offset-2 focus-visible:outline-greeen-600" @click="cancelAddModal"> Cancel
                    </button>
                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <button class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold 
                     text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 
                     focus-visible:outline-offset-2 focus-visible:outline-greeen-600" @click="closeAddModal"> Save New
                        User
                    </button>
                </div>

            </ModalDisplayform>

            <ModalAlert :show="state.isAlertModalOpen" :close="state.closeAlertModal" :title=state.alertmessage>
                <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12">
                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-t border-b border-r border-green-600 pb-4"
                        :displaytext="'First Name:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-t border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.fname" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b border-t border-r border-green-600   pb-4"
                        :displaytext="'Username:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md  border-t border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.username" />


                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Middle Name:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.mname" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />


                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Email Address:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.email" />


                    <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Last Name:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user.lname" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />

                    <!-- <GridCell
                        class="sm:col-span-2  text-center text-md  border-l border-b  border-r border-green-600   pb-4"
                        :displaytext="'Agency:'" />
                    <GridCell
                        class="sm:col-span-3  bg-white text-center text-md   border-b border-r border-green-600 pb-4"
                        :displaytext="state.current_user_agency.long_name" />

                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" />
                    <GridCell class="sm:col-span-12  pb-4" :displaytext="''" /> -->

                    <GridCell class="sm:col-span-2  font-bold text-center text-md   pb-4"
                        :displaytext="'Access Role:'" />
                    <GridCell class="sm:col-span-3 font-bold text-center text-md   pb-4"
                        :displaytext="state.current_user_role.name" />

                    <GridCell class="sm:col-span-1 " :displaytext="''" />
                    <GridCell class="sm:col-span-10 " :displaytext="''" />
                    <button
                        class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greeen-600"
                        @click="closeAlertModal"> Close </button>
                </div>
            </ModalAlert>


        </div>

        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Full Name</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Email</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Access Level</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Agency</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Action</th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="user in state.users.data" v-bind:key="user.id"
                                    @click="table_row_getclicked(user)">
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ user.fname + ' ' + user.mname + ' ' + user.lname }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.email }}
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{
                                        getrole(user.user_role.role_id) }}
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{
                                        getagency(user.user_role.agency_id) }}
                                    </td>

                                    <td v-if="user.user_role.is_active == 1"
                                        class="whitespace-nowrap px-3 py-4 text-sm text-green-500">Active
                                    </td>
                                    <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-red-500">Access Blocked
                                    </td>


                                    <template v-if="state.logged_user_role.allow_manage_users == 1">
                                        <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-8">
                                            <FormDropdown>

                                                <MenuItem :key="'view'">
                                                <NuxtLink @click="openViewModal" class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 bg-white-100 dark:bg-white-900
                                                           dark:text-black hover:text-white hover:bg-blue-700">
                                                    View Access
                                                </NuxtLink>
                                                </MenuItem>

                                                <MenuItem :key="'edit'">
                                                <NuxtLink @click="openEditModal" class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 bg-white-100 dark:bg-white-900
                                                         dark:text-black hover:text-white hover:bg-blue-700">
                                                    Edit Access
                                                </NuxtLink>
                                                </MenuItem>

                                                <MenuItem :key="'disable'">
                                                <NuxtLink @click="openDisableModal" class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 bg-white-100 dark:bg-white-900
                                                     dark:text-black hover:text-white hover:bg-blue-700">
                                                    Disable/Enable
                                                </NuxtLink>
                                                </MenuItem>

                                            </FormDropdown>
                                        </td>
                                    </template>
                                    <template v-else>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hover:">...
                                        </td>
                                    </template>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- <Pagination :data="state.users" @previous="previous" @next="next" /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {userService } from '~/components/api/UserService';
import {useUserStore} from '~/store/user'
import {rolesService } from '~/components/api/Roles';
import {agenciesService } from '~/components/api/Agencies'; 


import {
       MenuItem
} from '@headlessui/vue'


let currentPage = 1;

definePageMeta({
    layout: 'main'
})

const userStore = useUserStore()
console.log(userStore.getUser.userRole.role_id)

const state = reactive({
    users: [],
    text: null,
    roles: [],

    agencies: [],
    current_user:{},
    current_user_role:{},
    current_user_agency:{},

    alertmessage: '',
    display_error: false,

    logged_user_role:{},

    isViewModalOpen: false,
    isEditModalOpen: false,
    isDisableModalOpen: false,
    isAlertModalOpen: false,
    isAddModalOpen: false,

    selected_user: [],
    selected_user_role: 0,

    allow_view: false,
    allow_add: false,
    allow_edit: false,
    allow_delete: false,
    allow_view_other_entries: false,
    allow_edit_other_entries: false,
    allow_add_other_entries: false,
    allow_manage_users: false,
    allow_manage_roles: false,

    successcount: 0,
    errorcount: 0,

    username_error: 2, 
    password_error: 2, 
    lname_error: 2, 
    mname_error: 2, 
    fname_error: 2, 
    agency_error: 2, 
    role_error: 2, 
    

    options:{
        agencies:[],
        user_enable: [{
            value: 1,
            label: 'Active'
        }, {
            value: 0,
            label: 'Disabled'
        }],
    }
   
})

onMounted(() => {



    fetchUsers()
    fetchroles()
    fetchagencies()
    fetchrole()
    fetch_logged_user_role()
  
})

async function logout() {
    try {
        const response = await authService.logout()
        if (response) {
            userStore.resetUser()
            localStorage.removeItem("_token");
            navigateTo('/login')
            console.log('logged out')
        }
    } catch (error) {
        console.log(error)
    }

    console.log('logged out')
    navigateTo('/login')
}


const check_errors = computed(() => {

    try {
        if (state.current_user.username === '') {
            state.username_error = 2
        } else if (state.current_user.username.length <= 5) {
            state.username_error = 1
        }
        else if (state.current_user.username.length > 5) {
            state.username_error = 3
        } else {
            state.username_error = 0
        }

    } catch (error) {
        state.username_error = 2
    }

    try {
        if (state.current_user.password === '') {
            state.password_error = 2
        } else if (state.current_user.password.length <= 5) {
            state.password_error = 1
        }
        else if (state.current_user.password.length > 5) {
            state.password_error = 3
        } else {
            state.password_error = 0
        }
    } catch (error) {
        state.password_error = 2
    }


    try {
        if (state.current_user.lname === '') {
            state.lname_error = 2
        } else if (state.current_user.lname.length <= 5) {
            state.lname_error = 1
        }
        else if (state.current_user.lname.length > 5) {
            state.lname_error = 3
        } else {
            state.lname_error = 0
        }
    } catch (error) {
        state.lname_error = 2
    }



    try {
        if (state.current_user.mname === '') {
            state.mname_error = 2
        } else if (state.current_user.mname.length <= 5) {
            state.mname_error = 1
        }
        else if (state.current_user.mname.length > 5) {
            state.mname_error = 3
        } else {
            state.mname_error = 0
        }
    } catch (error) {
        state.mname_error = 2
    }


    try {
        if (state.current_user.fname === '') {
            state.fname_error = 2
        } else if (state.current_user.fname.length <= 5) {
            state.fname_error = 1
        }
        else if (state.current_user.fname.length > 5) {
            state.fname_error = 3
        } else {
            state.fname_error = 0
        }
    } catch (error) {
        state.fname_error = 2
    }


    try {
        if (state.current_user.email === '') {
            state.email_error = 2
        } else if (state.current_user.email.length <= 5) {
            state.email_error = 1
        }
        else if (state.current_user.email.length > 5) {
            state.email_error = 3
        } else {
            state.email_error = 0
        }
    } catch (error) {
        state.email_error = 2
    }


    try {
        if (state.current_user_agency.id > 0) {
            state.agency_error = 3

        } else if(state.current_user_agency.id == null) {
            state.agency_error = 2
        }
    } catch (error) {
        state.agency_error = 2

    }
    //console.log(state.selected_user_role) state.role_error

    try {
        if (state.selected_user_role > 0) {
            state.role_error = 3
            console.log(state.selected_user_role) 

        } else if (state.selected_user_role == null){
            state.role_error = 2
            console.log(state.selected_user_role) 
        }else{
            state.agency_error = 0
            console.log(state.selected_user_role) 
        }
    } catch (error) {
        state.role_error = 2
        //console.log(state.selected_user_role) 
    }


})

async function fetch_logged_user_role() {
    try {
       
        const response = await rolesService.getRole(userStore.getUser.userRole.role_id)
        //console.log(response)
        if (response.data) {
            state.logged_user_role = response.data
         
            //console.log(state.current_user_role)
        }
    } catch (error) { 
        console.log(error)
    }
}

async function fetchrole() {
    try {
       
        const response = await rolesService.getRole(userStore.getUser.userRole.role_id)
        //console.log(response)
        if (response.data) {
            state.current_user_role = response.data
            state.selected_user_role = state.current_user_role.id
            console.log(state.current_user_role)
        }
    } catch (error) { 
        console.log(error)
    }
}

async function fetchroles() {
    try {
       
        const response = await rolesService.getRoles()
        //console.log(response)
        if (response.data) {
            state.roles.data = response.data

            if (state.roles.data != null) {
                var data = [];
                var datasources = [];
                datasources = state.roles.data

                for (const i in datasources) {
                    const value = datasources[i].id;
                    if (!datasources.includes(value)) {
                        if(datasources[i].id != 1 ){
                            data[i] = { "value": datasources[i].id, "label": datasources[i].name };
                        }
                       
                    }
                }
                state.options.roles = data;
                console.log(data)

            }
         
            
        }
    } catch (error) { 
       // console.log(error)
    }
}

async function fetchagencies() {
    try {
       
        const response = await agenciesService.getAgencies()
        //console.log(response)
        if (response.data) {
            state.agencies.data = response.data

            if (state.agencies.data != null) {
                var data = [];
                var datasources = [];
                datasources = state.agencies.data

                for (const i in datasources) {
                    const value = datasources[i].id;
                    if (!datasources.includes(value)) {
                        data[i] = { "value": datasources[i].id, "label": datasources[i].long_name };
                    }
                }
                state.options.agencies = data;
                //console.log(data)

            }
        }
    } catch (error) { 
        console.log(error)
    }
}

async function fetchUsers() {

    if (userStore.getUser.userRole.role_id == 1){
        
    }else{
        logout()
    }

    //console.log(userStore.getUser.userRole.role_id)


    // try {
    //     let params = {
    //         page: currentPage
    //     }
    //     const response = await userService.getUsers(params)
    //     if (response.data) {
    //         state.users = response
    //         console.log(state.users.data)
    //     }
    // } catch (error) { 
    //     console.log(error)
    // }

    try {
        
        const response = await userService.getUsers()
        if (response.data) {
            state.users = response
            //console.log(state.users.data)
        }
    } catch (error) { 
        //console.log(error)
    }


}

function getrole(id){
    try {
        return (state.roles.data[id-1].name)
    } catch (error) {
        
    }
    //
}

function change_selected_role(){

    try {
    state.current_user_role = state.roles.data[ state.selected_user_role -1]
    state.allow_view = state.current_user_role.allow_view
    state.allow_add = state.current_user_role.allow_add
    state.allow_edit = state.current_user_role.allow_edit
    state.allow_delete = state.current_user_role.allow_delete
    state.allow_view_other_entries = state.current_user_role.allow_view_other_entries
    state.allow_edit_other_entries = state.current_user_role.allow_edit_other_entries
    state.allow_add_other_entries = state.current_user_role.allow_add_other_entries
    state.allow_manage_users = state.current_user_role.allow_manage_users
    state.allow_manage_roles = state.current_user_role.allow_manage_roles
    } catch (error) {
        state.role_error = 3;
    }
   
}

function getagency(id){
     try{
        return (state.agencies.data[id-1].name)
     }catch(error){

     }

    
}

function openViewModal() {
    state.isViewModalOpen = true;
}

function openEditModal() {
  
    state.selected_user_role = 0;
    state.isEditModalOpen = true;
   
}

function openDisableModal() {
      state.isDisableModalOpen = true;
}

function openAddUserModal() {
      state.current_user = [];
      state.isAddModalOpen = true;
}

function closeAddModal() {
      SaveNewUser();
      state.isAddModalOpen = false;
    
}

function cancelAddModal() {
      state.current_user = [];
      state.isAddModalOpen = false;
}


function closeViewModal() { 
    state.isViewModalOpen = false
} 

function closeEditModal() { 
    state.isEditModalOpen = false
} 

function closeDisableModal() { 
    fetchUsers();
    state.isDisableModalOpen = false
} 

function saveDisableModal() { 

    state.selected_user_role = 6;
    SaveEditModal();
    state.isDisableModalOpen = false
} 


function OpenAlertModal(){
    state.isAlertModalOpen = true
}

function closeAlertModal(){
    state.isAlertModalOpen = false
}


function table_row_getclicked(user) {

    state.current_user = user
    state.current_user_role = state.roles.data[state.current_user.user_role.role_id - 1]
    state.current_user_agency = state.agencies.data[user.user_role.agency_id - 1]
    state.allow_view = state.current_user_role.allow_view
    state.allow_add = state.current_user_role.allow_add
    state.allow_edit = state.current_user_role.allow_edit
    state.allow_delete = state.current_user_role.allow_delete
    state.allow_view_other_entries = state.current_user_role.allow_view_other_entries
    state.allow_edit_other_entries = state.current_user_role.allow_edit_other_entries
    state.allow_add_other_entries = state.current_user_role.allow_add_other_entries
    state.allow_manage_users = state.current_user_role.allow_manage_users
    state.allow_manage_roles = state.current_user_role.allow_manage_roles

}


async function SaveEditModal(){

    if (state.current_user.user_role.role_id == 1) {
        alert("You Are Not Allowed to edit an Administrator's Access")
    } 
    else {

        try {
            let params = {

                username: state.current_user.username,
                fname: state.current_user.fname,
                lname: state.current_user.lname,
                mname: state.current_user.mname,
                email: state.current_user.email,
                role_id: state.selected_user_role,
                agency_id: state.current_user_agency.id,
                is_active: state.current_user.user_role.is_active,

            }

            //console.log(params)
            // console.log(state.current_user.id)
            const response = await userService.updateUser(state.current_user.id, params);
            if (response.data) {
                state.successcount = state.successcount + 1;
                //ModalAlert
                //successAlert("Success!", 'Successfully Added to database.')
            }

        } catch (error) {
            console.log(error)
            state.errorcount = state.errorcount + 1;
        }

        if (state.successcount > 0) {
            openAlertModal('Successfully Edited the User.')
            state.isEditModalOpen = false
        } else {
            openAlertModal('Errors were encountered ')
            state.isEditModalOpen = false

        }

    }

    fetchUsers();
    //state.isEditModalOpen = false
}

function openAlertModal(alertmessage) { 
    state.isAlertModalOpen = true;
    state.alertmessage = alertmessage;
    
}

async function SaveNewUser(){

    try {
        let params = {
            username: state.current_user.username,
            password: state.current_user.password,
            fname: state.current_user.fname,
            lname: state.current_user.lname,
            mname: state.current_user.mname,
            email: state.current_user.email,
            role_id: state.selected_user_role,
            agency_id: state.current_user_agency.id,
            is_active: 1,
        }

        console.log(params);

        const response = await userService.createUser(params);
        if (response.data) {
            state.successcount = state.successcount + 1;
        }
    } catch (error) {
        state.errorcount = state.errorcount + 1;
    }


    if (state.successcount > 0){
        state.successcount = state.successcount;
        state.errorcount = state.errorcount;
        openAlertModal(state.group, 'Successfully Added to the database.', state.group_header, state.errorcount, state.successcount)
        fetchUsers();
        state.isAddModalOpen = false;
        
    }else{

        openAlertModal(state.group, 'Errors were encountered ', state.group_header, state.errorcount, state.successcount)
        
        //state.isAddModalOpen = false;
    }
   
}

 state.current_user = [];

// function previous() {
//     currentPage--
//     fetchUsers()
// }

// function next() {
//     currentPage++
//     fetchUsers()
// }
</script>