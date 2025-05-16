<template>
    <Loader v-if="state.isPageLoading" />

    
    <div v-else>
        <div class="lg:flex lg:items-center lg:justify-between">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <div class="sm:flex sm:items-center">
                        <div class="sm:flex-auto">
                            <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Edit Indicator
                            </h1>
                        </div>
                    </div>
                    <p class="mt-2 text-sm text-gray-700">Edit an existing indicator .</p>
                </div>
            </div>
            <div  class="mt-5 flex lg:ml-4 lg:mt-0">
                <FormButton @click="openModal">
                    <template #icon-left>
                        <UserGroupIcon class="mr-1 h-5 w-5" />
                    </template>
                    Edit Indicator
                </FormButton>
            </div>
        </div>
        
        
        <!-- <ModulesAgencyMemberMemberList :datas="state.members" @isLoading="state.isPageLoading" :update="update" /> -->
        
        
        <!-- <ModalAgencyMember :show="state.isOpen" :close="closeModal">
            <div class="bg-white flex flex-1 flex-col justify-center px-4 ">
                <div class="mx-auto w-full sm:p-6 justify-center">
                    <ModulesApplicationMembersForm @submit="storeMember" />
                </div>
            </div>
        </ModalAgencyMember> -->
        
        
        <ModalSaveform :show="state.isOpen" :close="closeModal">
            <form @submit.prevent="updateMember">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                    <div>
                        <FormLabel for="Rights of Children" label="Rights of Children" :required="true" />
                        <FormSelect :canClear="true" :searchable="true" :options="state.options.rights" :placeholder="'Select Right'"
                            v-model="state.indicators.right_id" />
                        <FormError :error="v$?.indicators.right_id?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.gender?.[0]" />
                    </div>
                    <div>
                        <FormLabel for="sequence_header" label="Sequence Header" :required="true" />
                        <FormText name="sequence_header" placeholder="Sequence Header"
                            v-model="state.indicators.sequence_header" />
                        <FormError :error="v$?.indicators.sequence_header?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.sequence_header?.[0]" />
                    </div>
                    <div>
                        <FormLabel for="description" label="Description" :required="true" />
                        <FormText name="description" placeholder="Description"
                            v-model="state.indicators.description" />
                        <FormError :error="v$?.indicators.description?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.description?.[0]" />
                    </div>

                    <div>
                        <FormLabel for="entry_type" label="Entry Type" :required="true" />
                        <FormSelect :canClear="true" :searchable="true" :options="state.options.is_disabled" :placeholder="'Select Entry Type'"
                        v-model="state.indicators.entry_type" />
                        <FormError :error="v$?.indicators.description?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.description?.[0]" />
                    </div>
                    <div>
                        <FormLabel for="Actual Male" label="Actual Male" :required="true" />
                        <FormSelect :canClear="true" :searchable="true" :options="state.options.is_disabled" :placeholder="'Select Option'"
                            v-model="state.indicators.actual_male" />
                        <FormError :error="v$?.indicators.actual_male?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.actual_male?.[0]" />
                    </div>

                    <div>
                        <FormLabel for="Actual Female" label="Actual Female" :required="true" />
                        <FormSelect :canClear="true" :searchable="true" :options="state.options.is_disabled" :placeholder="'Select Option'"
                            v-model="state.indicators.actual_female" />
                        <FormError :error="v$?.indicators.actual_female?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.actual_female?.[0]" />
                    </div>
                    <div>
                        <FormLabel for="Projected Male" label="Projected Male" :required="true" />
                        <FormSelect :canClear="true" :searchable="true" :options="state.options.entry_type" :placeholder="'Select Option'"
                            v-model="state.indicators.projected_male" />
                        <FormError :error="v$?.indicators.projected_male?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.projected_male?.[0]" />
                    </div>

                    <div>
                        <FormLabel for="Projected Female" label="Projected Female" :required="true" />
                        <FormSelect :canClear="true" :searchable="true" :options="state.options.is_disabled" :placeholder="'Select Option'"
                            v-model="state.indicators.projected_female" />
                        <FormError :error="v$?.indicators.projected_female?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.projected_female?.[0]" />
                    </div>

                    <div>
                        <FormLabel for="Remarks" label="Remarks" :required="true" />
                        <FormSelect :canClear="true" :searchable="true" :options="state.options.is_disabled" :placeholder="'Select Option'"
                            v-model="state.indicators.remarks" />
                        <FormError :error="v$?.indicators.remarks?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.remarks?.[0]" />
                    </div>
                    <div class="col-span-2">
                        <FormSubmit />
                    </div>
                </div>
            </form>
        </ModalSaveform>
    </div>
</template>

<script setup>
import {
    UserGroupIcon,
} from '@heroicons/vue/20/solid'
//import { agencyMemberService } from '@/components/api/AgencyMemberService';
//import { applicantService } from '~/components/api/ApplicantService';
import { required, helpers } from "@vuelidate/validators";
import { notify } from "@kyvg/vue3-notification";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from '@/store/user';
import moment from 'moment';

const userStore = useUserStore();
const userData = userStore.getUser;



const state = reactive({
    associationMember: {
        firstname: '',
        middlename: '',
        lastname: '',
        address: '',
        birthdate: '',
        gender: '',
        phone_number: '',
    },
    indicators: {
        right_id: '',
        description: '',
        actual_male: '',
        actual_female: '',
        projected_male: '',
        projected_female: '',
        total: '',
        grand_total: '',
        remarks: '',
        sequence_header: '',
 
    },
    options: {
        gender: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
        ],
        rights: [
            { value: '1', label: 'Rights to Survival' },
            { value: '2', label: 'Rights to Development' },
            { value: '3', label: 'Rights to Protection' },
            { value: '4', label: 'Rights to Participation' },
            { value: '5', label: 'Governance' },
            { value: '6', label: 'General Information' },
        ],
        entry_type: [
            { value: '1', label: 'Totaled Value' },
            { value: '2', label: 'Raw Data' },
        ],
        is_disabled: [
            { value: '1', label: 'Not Applicable' },
            { value: '2', label: 'Enabled' },
        ],
    },
    members: [],
    isOpen: false,
    Open: false,
    isPageLoading: false,
    error: '',
    agency_name: '',
    uuid: userData.agency?.uuid,
    member_uuid: '',
    isOpens: false
})

// onMounted(() => {
//     fetchAgency();
    
// })

const rules = computed(() => {
    return {
        indicators: {
            right_id: {
                required: helpers.withMessage("The firstname field is required", required),
            },
            description: {
                required: helpers.withMessage("The middlename field is required", required),
            },
            actual_male: {
                required: helpers.withMessage("Select entry type for actual male", required),
            },
            actual_female: {
                required: helpers.withMessage("Select entry type for actual female", required),
            },
            projected_male: {
                required: helpers.withMessage("Select entry type for projected male", required),
            },
            projected_female: {
                required: helpers.withMessage("Select entry type for projected female", required),
            },
            remarks: {
                required: helpers.withMessage("Select entry type for remarks", required),
            },
            sequence_header: {
                required: helpers.withMessage("Sequence Header is required", required),
            },
        }
    }
});

const v$ = useVuelidate(rules, state);

// async function fetchAgency() {
//     state.isPageLoading = true
//     try {
//         const response = await applicantService.getApplicantByUuid(userData.uuid)
//         if(response.data){
//             state.agency_name = response.data?.agency?.name
//         }
//     } catch (error) {
//         state.error = error
//     }
//     state.isPageLoading = false
// }

// async function fetchMember() {
//     try {
//         state.isPageLoading = true;
//         let params = {
//             agency_uuid: userData?.agency?.uuid
//         }
//         const response = await agencyMemberService.getAgencyMembers(params)
//         if (response.data) {
//             state.members = response.data
//         }
//     } catch (error) {
//         state.error = error
//     }
//     state.isPageLoading = false;
// }

// async function storeMember(agencyMemberDetail) {
//     state.isPageLoading = true;
//     try {
//         let params = {
//             agency_uuid: userData?.agency?.uuid,
//             firstname: agencyMemberDetail.firstname,
//             middlename: agencyMemberDetail.middlename,
//             lastname: agencyMemberDetail.lastname,
//             address: agencyMemberDetail.address,
//             birthdate: moment(agencyMemberDetail.birthdate).format('YYYY-MM-DD'),
//             gender: agencyMemberDetail.gender,
//             phone_number: agencyMemberDetail.phone_number,
//         }
//         const response = await agencyMemberService.saveAgencyMember(params)
//         if (response.data) {
//             successAlert('Success', 'Account statement successfully updated!')
//             fetchMember()
//             closeModal()
//         }
//     } catch (error) {
//         navigateTo('/housing-application')
//         state.error = error
//     }
//     state.isPageLoading = false;
// }

// async function updateMember() {
//     v$.value.$validate();
//     if (!v$.value.$error) {
//         state.isPageLoading = true;
//         try {
//             let params = {
//                 firstname: state.associationMember.firstname,
//                 middlename: state.associationMember.middlename,
//                 lastname: state.associationMember.lastname,
//                 address: state.associationMember.address,
//                 birthdate: moment(state.associationMember.birthdate).format('YYYY-MM-DD'),
//                 gender: state.associationMember.gender,
//                 phone_number: state.associationMember.phone_number,
//             }
//             const response = await agencyMemberService.updateMember(state.member_uuid, params)
//             if (response.data) {
//                 successAlert('Success', 'Association member successfully updated!')
//                 closeModal()
//                 fetchMember()
//             }
//         } catch (error) {
//             navigateTo('/housing-application')
//             state.error = error
//         }
//         state.isPageLoading = false;
//     }
// }

function openModal() {
    state.isOpen = true;
    
}

function closeModal() {
    state.isOpen = false
   
}

// function update(value) {
//     state.Open = true
//     state.member_uuid = value.uuid
//     state.associationMember.firstname = value.firstname
//     state.associationMember.middlename = value.middlename
//     state.associationMember.lastname = value.lastname
//     state.associationMember.birthdate = value.birthdate
//     state.associationMember.phone_number = value.phone_number
//     state.associationMember.gender = value.gender
//     state.associationMember.address = value.address
// }

function successAlert(title, message) {
    notify({
        title: title,
        text: message,
        type: 'success'
    })
}

definePageMeta({
    layout: 'main'
})
</script>