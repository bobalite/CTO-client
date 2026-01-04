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
        <p class="mt-2 text-sm text-gray-700">
          A list of all the users of the system. You can view, edit, disable and add users. You can also view the user's
          access role, agency, name, email, and status.
        </p>
      </div>

      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <template v-if="state.logged_user_role?.allow_manage_users == 1">
          <button
            type="button"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="openAddUserModal"
          >
            Add user
          </button>
        </template>
      </div>
    </div>

    <!-- VIEW MODAL -->
    <ModalDisplayform :show="state.isViewModalOpen" :close="closeViewModal" :title="'View User Access'">
      <div class="mt-1 grid grid-cols-1 bg-green-400 gap-x-0 gap-y-0 sm:grid-cols-12">
        <GridCell class="sm:col-span-12 pb-4" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-t border-b border-r border-green-600 pb-4" :displaytext="'First Name:'" />
        <GridCell class="sm:col-span-3 bg-white text-center text-md border-t border-b border-r border-green-600 pb-4" :displaytext="state.current_user?.fname" />

        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-t border-r border-green-600 pb-4" :displaytext="'Username:'" />
        <GridCell class="sm:col-span-3 bg-white text-center text-md border-t border-b border-r border-green-600 pb-4" :displaytext="state.current_user?.username" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-r border-green-600 pb-4" :displaytext="'Middle Name:'" />
        <GridCell class="sm:col-span-3 bg-white text-center text-md border-b border-r border-green-600 pb-4" :displaytext="state.current_user?.mname" />

        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-r border-green-600 pb-4" :displaytext="'Email Address:'" />
        <GridCell class="sm:col-span-3 bg-white text-center text-md border-b border-r border-green-600 pb-4" :displaytext="state.current_user?.email" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-r border-green-600 pb-4" :displaytext="'Last Name:'" />
        <GridCell class="sm:col-span-3 bg-white text-center text-md border-b border-r border-green-600 pb-4" :displaytext="state.current_user?.lname" />

        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-r border-green-600 pb-4" :displaytext="'Agency:'" />
        <GridCell class="sm:col-span-3 bg-white text-center text-md border-b border-r border-green-600 pb-4" :displaytext="state.current_user_agency?.long_name ?? '—'" />

        <GridCell class="sm:col-span-12 pb-4" :displaytext="''" />
        <GridCell class="sm:col-span-12 pb-4" :displaytext="''" />

        <GridCell class="sm:col-span-2 font-bold text-center text-md pb-4" :displaytext="'Access Level:'" />
        <GridCell class="sm:col-span-3 font-bold text-center text-md pb-4" :displaytext="state.current_user_role?.name ?? '—'" />

        <GridCell class="sm:col-span-7" :displaytext="''" />

        <!-- Permissions (read-only display) -->
        <GridCell class="sm:col-span-2 text-center text-sm border-t border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow View Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_view" :value="state.allow_view" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-t border-r border-green-600 pb-4" :displaytext="'Allow View Other Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_view_other_entries" :value="state.allow_view_other_entries" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-t border-r border-green-600 pb-4" :displaytext="'Allow Manage Users:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_manage_users" :value="state.allow_manage_users" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Add Entry:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_add" :value="state.allow_add" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Add Other Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_add_other_entries" :value="state.allow_add_other_entries" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Manage Roles:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_manage_roles" :value="state.allow_manage_roles" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Edit Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_edit" :value="state.allow_edit" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Edit Other Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_edit_other_entries" :value="state.allow_edit_other_entries" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-12 pb-4" :displaytext="''" />
        <GridCell class="sm:col-span-10" :displaytext="''" />
        <button
          class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500"
          @click="closeViewModal"
        >
          Close
        </button>
      </div>
    </ModalDisplayform>

    <!-- EDIT MODAL -->
    <ModalDisplayform :show="state.isEditModalOpen" :close="closeEditModal" :title="'Edit User Access'">
      <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12">
        <GridCell class="sm:col-span-12 pb-4" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-t border-b border-r border-green-600 pb-4" :displaytext="'First Name:'" />
        <GridText2 class="sm:col-span-3 bg-white text-center text-md border-t border-b border-r border-green-600 pb-4" v-model="state.current_user.fname" />

        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-t border-r border-green-600 pb-4" :displaytext="'Username:'" />
        <GridText2 class="sm:col-span-3 bg-white text-center text-md border-t border-b border-r border-green-600 pb-4" v-model="state.current_user.username" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-r border-green-600 pb-4" :displaytext="'Middle Name:'" />
        <GridText2 class="sm:col-span-3 bg-white text-center text-md border-b border-r border-green-600 pb-4" v-model="state.current_user.mname" />

        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-r border-green-600 pb-4" :displaytext="'Email Address:'" />
        <GridText2 class="sm:col-span-3 bg-white text-center text-md border-b border-r border-green-600 pb-4" v-model="state.current_user.email" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-r border-green-600 pb-4" :displaytext="'Last Name:'" />
        <GridText2 class="sm:col-span-3 bg-white text-center text-md border-b border-r border-green-600 pb-4" v-model="state.current_user.lname" />

        <GridCell class="sm:col-span-6" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-md border-l border-b border-r border-green-600 pb-4" :displaytext="'Agency:'" />
        <GridSelect
          class="sm:col-span-8 h-1 bg-white text-center text-md border-b border-r border-green-600 pb-4"
          v-model="state.current_user_agency.id"
          :placeholder="state.current_user_agency.long_name ?? 'Select agency'"
          :options="state.options.agencies"
        />

        <GridCell class="sm:col-span-12 pb-4" :displaytext="''" />
        <GridCell class="sm:col-span-12 pb-4" :displaytext="''" />

        <GridCell class="sm:col-span-2 font-bold text-center text-md pb-4" :displaytext="'Access Level:'" />
        <GridSelect
          class="sm:col-span-5 h-1 text-center text-sm pb-4"
          v-model="state.selected_user_role"
          :placeholder="state.current_user_role?.name ?? 'Select role'"
          :options="state.options.roles"
          @click="change_selected_role()"
        />

        <GridCell class="sm:col-span-5" :displaytext="''" />
        <GridCell class="sm:col-span-12" :displaytext="''" />

        <!-- toggles reflect selected role -->
        <GridCell class="sm:col-span-2 text-center text-sm border-t border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow View Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_view" :value="state.allow_view" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-t border-r border-green-600 pb-4" :displaytext="'Allow View Other Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_view_other_entries" :value="state.allow_view_other_entries" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-t border-r border-green-600 pb-4" :displaytext="'Allow Manage Users:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_manage_users" :value="state.allow_manage_users" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Add Entry:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_add" :value="state.allow_add" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Add Other Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_add_other_entries" :value="state.allow_add_other_entries" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Manage Roles:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_manage_roles" :value="state.allow_manage_roles" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Edit Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_edit" :value="state.allow_edit" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-center text-sm border-l border-b border-r border-green-600 pb-4" :displaytext="'Allow Edit Other Entries:'" />
        <GridCheckbox class="sm:col-span-1 bg-white text-center text-md border-b border-r border-green-600 pb-4" :model="state.allow_edit_other_entries" :value="state.allow_edit_other_entries" />
        <GridCell class="sm:col-span-1" :displaytext="''" />

        <GridCell class="sm:col-span-12 pb-4" :displaytext="''" />
        <GridCell class="sm:col-span-7" :displaytext="''" />

        <button class="sm:col-span-2 block rounded-md bg-gray-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-gray-500" @click="closeEditModal">
          Cancel
        </button>

        <GridCell class="sm:col-span-1" :displaytext="''" />

        <button class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500" @click="SaveEditModal">
          Save Changes
        </button>
      </div>
    </ModalDisplayform>

    <!-- DISABLE MODAL -->
    <ModalAlertformsmall :show="state.isDisableModalOpen" :close="closeDisableModal" :title="'Are you sure you want to disable/enable this user ?'">
      <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-6">
        <GridCell class="sm:col-span-2" :displaytext="'Username: '" />
        <GridCell class="sm:col-span-1" :displaytext="''" />
        <GridCell class="sm:col-span-3" :displaytext="state.current_user?.username" />

        <GridCell class="sm:col-span-2" :displaytext="'Email: '" />
        <GridCell class="sm:col-span-1" :displaytext="''" />
        <GridCell class="sm:col-span-3" :displaytext="state.current_user?.email" />

        <GridCell class="sm:col-span-2" :displaytext="'Last Name: '" />
        <GridCell class="sm:col-span-1" :displaytext="''" />
        <GridCell class="sm:col-span-3" :displaytext="state.current_user?.lname" />

        <GridCell class="sm:col-span-2" :displaytext="'First Name: '" />
        <GridCell class="sm:col-span-1" :displaytext="''" />
        <GridCell class="sm:col-span-3" :displaytext="state.current_user?.fname" />

        <GridCell class="sm:col-span-3" :displaytext="'New Status:'" />
        <GridSelect class="sm:col-span-3" v-model="state.disable_is_active" :placeholder="'Select status'" :options="state.options.user_enable" />

        <GridCell class="sm:col-span-6 pb-2" :displaytext="''" />

        <button class="sm:col-span-3 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500" @click="saveDisableModal">
          Yes
        </button>

        <button class="sm:col-span-3 block rounded-md bg-gray-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-gray-500" @click="closeDisableModal">
          Cancel
        </button>
      </div>
    </ModalAlertformsmall>

    <!-- ADD MODAL (COMPLETE + WIRED TO SaveNewUser) -->
    <ModalDisplayform :show="state.isAddModalOpen" :close="closeAddModal" :title="'Add New User'">
      <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-2 sm:grid-cols-12">
        <GridCell class="sm:col-span-12 pb-2" :displaytext="''" />

        <GridCell class="sm:col-span-2 text-sm" :displaytext="'Username'" />
        <GridText2 class="sm:col-span-4" v-model="state.new_user.username" />
        <GridCell class="sm:col-span-6 text-xs text-red-600" :displaytext="state.new_user_errors.username" />

        <GridCell class="sm:col-span-2 text-sm" :displaytext="'First Name'" />
        <GridText2 class="sm:col-span-4" v-model="state.new_user.fname" />
        <GridCell class="sm:col-span-6 text-xs text-red-600" :displaytext="state.new_user_errors.fname" />

        <GridCell class="sm:col-span-2 text-sm" :displaytext="'Middle Name'" />
        <GridText2 class="sm:col-span-4" v-model="state.new_user.mname" />
        <GridCell class="sm:col-span-6 text-xs text-red-600" :displaytext="state.new_user_errors.mname" />

        <GridCell class="sm:col-span-2 text-sm" :displaytext="'Last Name'" />
        <GridText2 class="sm:col-span-4" v-model="state.new_user.lname" />
        <GridCell class="sm:col-span-6 text-xs text-red-600" :displaytext="state.new_user_errors.lname" />

        <GridCell class="sm:col-span-2 text-sm" :displaytext="'Email'" />
        <GridText2 class="sm:col-span-4" v-model="state.new_user.email" />
        <GridCell class="sm:col-span-6 text-xs text-red-600" :displaytext="state.new_user_errors.email" />

        <GridCell class="sm:col-span-2 text-sm" :displaytext="'Password'" />
        <!-- If GridText2 can't do password type, replace this with your password input component -->
        <GridText2 class="sm:col-span-4" v-model="state.new_user.password" />
        <GridCell class="sm:col-span-6 text-xs text-red-600" :displaytext="state.new_user_errors.password" />

        <GridCell class="sm:col-span-2 text-sm" :displaytext="'Confirm Password'" />
        <GridText2 class="sm:col-span-4" v-model="state.new_user.confirm_password" />
        <GridCell class="sm:col-span-6 text-xs text-red-600" :displaytext="state.new_user_errors.confirm_password" />

        <GridCell class="sm:col-span-2 text-sm" :displaytext="'Role'" />
        <GridSelect class="sm:col-span-4" v-model="state.new_user_selected_role_id" :placeholder="'Select role'" :options="state.options.roles" />
        <GridCell class="sm:col-span-6 text-xs text-red-600" :displaytext="state.new_user_errors.role_id" />

        <GridCell class="sm:col-span-2 text-sm" :displaytext="'Agency'" />
        <GridSelect class="sm:col-span-4" v-model="state.new_user_selected_agency_id" :placeholder="'Select agency'" :options="state.options.agencies" />
        <GridCell class="sm:col-span-6 text-xs text-red-600" :displaytext="state.new_user_errors.agency_id" />

        <GridCell class="sm:col-span-12 pb-2" :displaytext="''" />
        <GridCell class="sm:col-span-7" :displaytext="''" />

        <button class="sm:col-span-2 block rounded-md bg-gray-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-gray-500" @click="closeAddModal">
          Cancel
        </button>

        <GridCell class="sm:col-span-1" :displaytext="''" />

        <button class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500" @click="SaveNewUser">
          Save
        </button>
      </div>
    </ModalDisplayform>

    <!-- ALERT MODAL -->
    <ModalAlert :show="state.isAlertModalOpen" :close="closeAlertModal" :title="state.alertmessage">
      <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12">
        <GridCell class="sm:col-span-12 pb-4" :displaytext="''" />
        <GridCell class="sm:col-span-10" :displaytext="''" />
        <button class="sm:col-span-2 block rounded-md bg-green-600 px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-green-500" @click="closeAlertModal">
          Close
        </button>
      </div>
    </ModalAlert>

    <!-- TABLE -->
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Full Name</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Access Level</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Agency</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="user in (state.users?.data ?? [])" :key="user.id" @click="table_row_getclicked(user)" class="cursor-pointer hover:bg-gray-50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ `${user.fname ?? ''} ${user.mname ?? ''} ${user.lname ?? ''}`.trim() }}
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.email ?? '—' }}
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ getrole(getUserRole(user)?.role_id) }}
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ getagency(getUserRole(user)?.agency_id) }}
                  </td>

                  <td v-if="getUserRole(user)?.is_active == 1" class="whitespace-nowrap px-3 py-4 text-sm text-green-600">
                    Active
                  </td>
                  <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-red-600">
                    Access Blocked
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <template v-if="state.logged_user_role?.allow_manage_users == 1">
                      <FormDropdown>
                        <MenuItem :key="'view'">
                          <NuxtLink
                            @click="openViewModal"
                            class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-white hover:bg-blue-700"
                          >
                            View Access
                          </NuxtLink>
                        </MenuItem>

                        <MenuItem :key="'edit'">
                          <NuxtLink
                            @click="openEditModal"
                            class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-white hover:bg-blue-700"
                          >
                            Edit Access
                          </NuxtLink>
                        </MenuItem>

                        <MenuItem :key="'disable'">
                          <NuxtLink
                            @click="openDisableModal"
                            class="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-white hover:bg-blue-700"
                          >
                            Disable/Enable
                          </NuxtLink>
                        </MenuItem>
                      </FormDropdown>
                    </template>
                    <template v-else>—</template>
                  </td>
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
import { reactive, onMounted } from 'vue'
import { MenuItem } from '@headlessui/vue'

import { userService } from '~/components/api/UserService'
import { rolesService } from '~/components/api/Roles'
import { agenciesService } from '~/components/api/Agencies'
import { authService } from '~/components/api/AuthService' // adjust if your path differs
import { useUserStore } from '~/store/user'

definePageMeta({ layout: 'main' })

const userStore = useUserStore()

const state = reactive({
  users: { data: [] },
  roles: { data: [] },
  agencies: { data: [] },

  current_user: {},
  current_user_role: {},
  current_user_agency: {},

  alertmessage: '',
  logged_user_role: {},

  isViewModalOpen: false,
  isEditModalOpen: false,
  isDisableModalOpen: false,
  isAlertModalOpen: false,
  isAddModalOpen: false,

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

  disable_is_active: 1,

  // Add User
  new_user: {
    username: '',
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
    confirm_password: '',
  },
  new_user_selected_role_id: 0,
  new_user_selected_agency_id: null,
  new_user_errors: {
    username: '',
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
    confirm_password: '',
    role_id: '',
    agency_id: '',
  },

  options: {
    agencies: [],
    roles: [],
    user_enable: [
      { value: 1, label: 'Active' },
      { value: 0, label: 'Disabled' },
    ],
  },
})

function getUserRole(user) {
  // normalize backend naming
  return user?.user_role ?? user?.userRole ?? null
}

function openAlertModal(msg) {
  state.alertmessage = msg
  state.isAlertModalOpen = true
}
function closeAlertModal() {
  state.isAlertModalOpen = false
}

function applyRolePermissions(role) {
  state.allow_view = !!role?.allow_view
  state.allow_add = !!role?.allow_add
  state.allow_edit = !!role?.allow_edit
  state.allow_delete = !!role?.allow_delete
  state.allow_view_other_entries = !!role?.allow_view_other_entries
  state.allow_edit_other_entries = !!role?.allow_edit_other_entries
  state.allow_add_other_entries = !!role?.allow_add_other_entries
  state.allow_manage_users = !!role?.allow_manage_users
  state.allow_manage_roles = !!role?.allow_manage_roles
}

function getrole(id) {
  if (!id) return '—'
  const r = state.roles?.data?.find((x) => Number(x.id) === Number(id))
  return r?.name ?? '—'
}

function getagency(id) {
  if (!id) return '—'
  const a = state.agencies?.data?.find((x) => Number(x.id) === Number(id))
  return a?.long_name ?? a?.name ?? '—'
}

function table_row_getclicked(user) {
  state.current_user = user

  const ur = getUserRole(user)
  if (!ur) {
    state.current_user_role = {}
    state.current_user_agency = {}
    state.selected_user_role = 0
    state.disable_is_active = 1
    applyRolePermissions(null)
    return
  }

  state.current_user_role = state.roles?.data?.find((r) => Number(r.id) === Number(ur.role_id)) ?? {}
  state.current_user_agency = state.agencies?.data?.find((a) => Number(a.id) === Number(ur.agency_id)) ?? {}
  state.selected_user_role = state.current_user_role?.id ?? 0
  state.disable_is_active = ur?.is_active ?? 1

  applyRolePermissions(state.current_user_role)
}

function change_selected_role() {
  const roleId = Number(state.selected_user_role)
  const role = state.roles?.data?.find((r) => Number(r.id) === roleId)
  state.current_user_role = role ?? {}
  applyRolePermissions(state.current_user_role)
}

function openViewModal() {
  state.isViewModalOpen = true
}
function closeViewModal() {
  state.isViewModalOpen = false
}

function openEditModal() {
  state.isEditModalOpen = true
}
function closeEditModal() {
  state.isEditModalOpen = false
}

function openDisableModal() {
  const ur = getUserRole(state.current_user)
  state.disable_is_active = ur?.is_active ?? 1
  state.isDisableModalOpen = true
}
function closeDisableModal() {
  state.isDisableModalOpen = false
}

function saveDisableModal() {
  SaveEditModal()
  state.isDisableModalOpen = false
}

function resetNewUserForm() {
  state.new_user = {
    username: '',
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
    confirm_password: '',
  }
  state.new_user_selected_role_id = 0
  state.new_user_selected_agency_id = null
  state.new_user_errors = {
    username: '',
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
    confirm_password: '',
    role_id: '',
    agency_id: '',
  }
}

function validateNewUser() {
  Object.keys(state.new_user_errors).forEach((k) => (state.new_user_errors[k] = ''))

  const u = state.new_user
  if (!u.username?.trim()) state.new_user_errors.username = 'Username is required'
  if (!u.fname?.trim()) state.new_user_errors.fname = 'First name is required'
  if (!u.lname?.trim()) state.new_user_errors.lname = 'Last name is required'
  if (!u.email?.trim()) state.new_user_errors.email = 'Email is required'
  if (u.email && !/^\S+@\S+\.\S+$/.test(u.email)) state.new_user_errors.email = 'Invalid email format'

  if (!u.password) state.new_user_errors.password = 'Password is required'
  if (u.password && u.password.length < 6) state.new_user_errors.password = 'Password must be at least 6 characters'
  if (u.confirm_password !== u.password) state.new_user_errors.confirm_password = 'Passwords do not match'

  if (!state.new_user_selected_role_id) state.new_user_errors.role_id = 'Role is required'
  if (!state.new_user_selected_agency_id) state.new_user_errors.agency_id = 'Agency is required'

  return !Object.values(state.new_user_errors).some(Boolean)
}

function openAddUserModal() {
  resetNewUserForm()
  state.isAddModalOpen = true
}
function closeAddModal() {
  state.isAddModalOpen = false
}

async function logout() {
  try {
    const response = await authService.logout()
    if (response) {
      userStore.resetUser()
      localStorage.removeItem('_token')
      navigateTo('/login')
      return
    }
  } catch (e) {
    console.log(e)
  }
  navigateTo('/login')
}

async function fetch_logged_user_role() {
  try {
    const roleId = userStore?.getUser?.userRole?.role_id
    if (!roleId) return
    const response = await rolesService.getRole(roleId)
    if (response?.data) state.logged_user_role = response.data
  } catch (e) {
    console.log('fetch_logged_user_role', e)
  }
}

async function fetchroles() {
  try {
    const response = await rolesService.getRoles()
    if (response?.data) {
      state.roles.data = response.data

      // Build select options (skip admin id=1 like your original)
      state.options.roles = (state.roles.data || [])
        .filter((r) => Number(r.id) !== 1)
        .map((r) => ({ value: r.id, label: r.name }))
    }
  } catch (e) {
    console.log(e)
  }
}

async function fetchagencies() {
  try {
    const response = await agenciesService.getAgencies()
    if (response?.data) {
      state.agencies.data = response.data
      state.options.agencies = (state.agencies.data || []).map((a) => ({
        value: a.id,
        label: a.long_name ?? a.name,
      }))
    }
  } catch (e) {
    console.log(e)
  }
}

async function fetchUsers() {
  // Admin-only guard, but do NOT crash if userRole is null
  const roleId = userStore?.getUser?.userRole?.role_id
  if (Number(roleId) !== 1) {
    await logout()
    return
  }

  try {
    // your service signature has params but doesn't use it; just call
    const response = await userService.getUsers({})
    if (response?.data) state.users = response
  } catch (e) {
    console.log(e)
  }
}

async function SaveEditModal() {
  const ur = getUserRole(state.current_user)
  if (!ur) {
    openAlertModal('Selected user has no role assigned.')
    return
  }

  if (Number(ur.role_id) === 1) {
    alert("You are not allowed to edit an Administrator's access.")
    return
  }

  try {
    const params = {
      username: state.current_user.username,
      fname: state.current_user.fname,
      lname: state.current_user.lname,
      mname: state.current_user.mname,
      email: state.current_user.email,

      role_id: state.selected_user_role,
      agency_id: state.current_user_agency?.id,
      is_active: state.disable_is_active,
    }

    const response = await userService.updateUser(state.current_user.id, params)
    if (response?.data) {
      openAlertModal('Successfully edited the user.')
    } else {
      openAlertModal('Errors were encountered.')
    }
  } catch (e) {
    console.log(e)
    openAlertModal('Errors were encountered.')
  } finally {
    await fetchUsers()
    state.isEditModalOpen = false
  }
}

async function SaveNewUser() {
  // Admin-only guard
  const roleId = userStore?.getUser?.userRole?.role_id
  if (Number(roleId) !== 1) {
    await logout()
    return
  }

  if (!validateNewUser()) {
    openAlertModal('Please fix the highlighted errors.')
    return
  }

  try {
    const payload = {
      username: state.new_user.username.trim(),
      fname: state.new_user.fname.trim(),
      mname: state.new_user.mname?.trim() ?? '',
      lname: state.new_user.lname.trim(),
      email: state.new_user.email.trim(),
      password: state.new_user.password,

      role_id: state.new_user_selected_role_id,
      agency_id: state.new_user_selected_agency_id,

      is_active: 1,
    }

    const response = await userService.createUser(payload)
    if (response?.data) {
      openAlertModal('User created successfully.')
      state.isAddModalOpen = false
      resetNewUserForm()
      await fetchUsers()
      return
    }

    openAlertModal('Errors were encountered while creating the user.')
  } catch (e) {
    console.log(e)
    openAlertModal('Errors were encountered while creating the user.')
  }
}

onMounted(async () => {
  await fetchroles()
  await fetchagencies()
  await fetch_logged_user_role()
  await fetchUsers()
})
</script>
