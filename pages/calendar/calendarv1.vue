<template>
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">REPORT SCHEDULES</h1>
        <div class="flex items-center space-x-4">
            <button class="btn btn-primary">Export</button>
            <button class="btn btn-primary">Print</button>
        </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8">

        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <!-- <GraphsTimeline :displaytext="'Quarterly Report Schedules for 2025'"
                            class="sm:col-span-9 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r" /> -->


                    </div>

                </div>
            </div>
        </div>

        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class=" bg-gray-200 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <h2 class="  text-base font-semibold leading-6 text-gray-900">Status:</h2>
                        <div
                            class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-10  border-solid border-grey border-t pb-4 pt-4">
                            <GraphsGrp02 v-if="true" :key="state.refresh_graphs_toggle"
                                class="sm:col-span-3 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
                                :displaytext="'CURRENT QUARTER STATUS'" :report_year="state.report_year">
                            </GraphsGrp02>
                            <GraphsGrp02 v-if="true" :key="state.refresh_graphs_toggle"
                                class="sm:col-span-3 text-xl font-bold  text-left m-1  pl-2 border-1 border-solid border-blue-black bg-green-100  rounded-xl border-blue-900 border-t border-b border-l border-r"
                                :displaytext="'ANNUAL COMPLETION STATUS'" :report_year="state.report_year">
                            </GraphsGrp02>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>

const state = reactive({
    report_year: 2025,
    refresh_graphs_toggle: 0,
})

definePageMeta({
    layout: 'main'
})

</script>