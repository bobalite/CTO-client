
<template>

    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">DATASOURCE TRACKER</h1>
        <div class="flex items-center space-x-4">
            <button class="btn btn-primary">Export</button>
            <button class="btn btn-primary">Print</button>
        </div>
    </div>

    <div class="sm:flex sm:items-center">
    <div class="mt-8 flow-root">
                <p class="mb-1 text-lg font-normal text-gray-500 lg:text-xl sm:px-10 xl:px-1 dark:text-black">Children's
                    Rights Situational Analysis (CRSA)</p>
                <div class="sm:flex-auto">
                    <p class="pb-2 pt-4">Select Report Year:</p>
                    <div>
                        <FormSelect name="selected_year" v-model="state.selected_year_id" :options="state.options.years"/>
                    </div>
                </div>

                <div class="sm:flex-auto">
                    <p class="pb-2 pt-4">Select Right:</p>
                    <div>
                        <FormSelect name="selectedRight" :options="state.options.rights "
                            v-model="state.selected_rights_id" @click="changeData" />
                    </div>
                </div>
            </div>
        </div>
    <div>

        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm ">
            <h2 class="text-lg font-bold pt-4 " >Report Data Completion by Percentage</h2>
            <div class="ml-4 mt-4">
                
                <h3 v-if="state.selected_rights_id === '1'"  class="text-lg font-bold"> SURVIVAL</h3>
                <h3 v-else-if="state.selected_rights_id === '2'"  class="text-lg font-bold"> DEVELOPMENT</h3>
                <h3 v-else-if="state.selected_rights_id === '3'"  class="text-lg font-bold"> PROTECTION</h3>
                <h3 v-else-if="state.selected_rights_id === '4'"  class="text-lg font-bold"> PARTICIPATION</h3>
                <h3 v-else-if="state.selected_rights_id === '5'"  class="text-lg font-bold"> GOVERNANCE</h3>
                <h3 v-else-if="state.selected_rights_id === '6'"  class="text-lg font-bold"> GENERAL INFORMATION</h3>

            </div>
            <ApexCharts type="bar" height="300" width="50%" :options="state.populationHoriOptions"
                :series="state.survivalOptions.series" />
        </div>

        <!-- <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">

                <h3 class="text-lg font-bold"> DEVELOPMENT</h3>
            </div>
            <ApexCharts type="bar" height="800" width="50%" :options="state.developmentOptions"
                :series="state.developmentOptions.series" />
        </div>

        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">

                <h3 class="text-lg font-bold"> PROTECTION</h3>
            </div>
            <ApexCharts type="bar" height="300" width="50%" :options="state.ProtectionOptions"
                :series="state.ProtectionOptions.series" />
        </div>

        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">

                <h3 class="text-lg font-bold"> PARTICIPATION</h3>
            </div>
            <ApexCharts type="bar" height="300" width="50%" :options="state.populationHoriOptions"
                :series="state.developmentOptions.series" />
        </div>

        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">

                <h3 class="text-lg font-bold"> OTHER AREAS: GOVERNANCE</h3>
            </div>
            <ApexCharts type="bar" height="300" width="50%" :options="state.populationHoriOptions"
                :series="state.developmentOptions.series" />
        </div>

        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">

                <h3 class="text-lg font-bold"> OTHER AREAS: GENERAL INFORMATION</h3>
            </div>
            <ApexCharts type="bar" height="300" width="50%" :options="state.populationHoriOptions"
                :series="state.developmentOptions.series" />
        </div> -->


        <!--         
        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">
                <h3 class="text-lg font-bold">Report Data Completion by Percentage</h3>
            </div>
            <ApexCharts type="bar" height="1000" width="50%" :options="state.populationHoriOptions"
            :series="state.populationOptions.series" />
        </div> -->

        <!-- <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">
                <h3 class="text-lg font-bold">Children's Population: District 1</h3>
            </div>
            <ApexCharts type="area" height="375" width="100%" :options="state.populationAreaOptions"
            :series="state.populationAreaOptions.series" />
        </div> -->
        <!-- 
        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">
                <h3 class="text-lg font-bold">Children's Population: District 1</h3>
            </div>
            <ApexCharts type="bar" height="1000" width="100%" :options="state.populationHoriOptions"
            :series="state.populationHoriOptions.series" />
        </div> -->


        <!-- <div class="grid grid-cols-1 sm:grid-cols-2 mt-8 gap-y-4 sm:gap-x-4">
            <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
                <div class="ml-4 mt-4">
                    <h3 class="text-lg font-bold">Children's Population: District 1</h3>
                </div>
                <div class="mt-4">
                    <ApexCharts type="bar" height="2000" width="25%" :options="state.populationHoriOptions"
                    :series="state.populationHoriOptions.series" />
                </div>
            </div>
        </div> -->


    </div>
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
import {Childrens_rightsService } from '~/components/api/Rights'; 
import {Rights_entry_configServices } from '~/components/api/Rights_entry_configService'; 
import {reportDetailsService } from '~/components/api/ReportDetailsService'; 


onMounted(() => {
    fetchRights_entry_config()
    fetchRights()
    fetchReports_Details_Actuals()
    fetchReports_Details_Projected()
    
})

function changeData(){
    switch (state.selected_rights_id){
        case(0):
        state.Selected_Rights_entry_config  = state.Rights_entry_config
        break;
        case(1):
        state.Selected_Rights_entry_config  = state.Rights_entry_config1
        break;
        case(2):
        state.Selected_Rights_entry_config  = state.Rights_entry_config2
        break;
        case(3):
        state.Selected_Rights_entry_config  = state.Rights_entry_config3
        break;
        case(4):
        state.Selected_Rights_entry_config  = state.Rights_entry_config4
        break;
        case(5):
        state.Selected_Rights_entry_config  = state.Rights_entry_config5
        break;
        case(6):
        state.Selected_Rights_entry_config  = state.Rights_entry_config6
        break;
        default:
        state.Selected_Rights_entry_config  = state.Rights_entry_config
        //console.log(state.Selected_Rights_entry_config)

    }
}



async function fetchReports_Details_Actuals() {
    try {
        let params = {
            group_id: state.selected_group,
            report_year_id: state.selected_year_id,
            is_active: 1,
            entry_type: 'Actual',//state.selected_view_entry_type,
            group_agency_datasource_id: state.view_selected_datasource
        }


        const response = await reportDetailsService.getReportDetails(params)
        //console.log(response)
        //console.log(params)
        if (response.data) {
            state.report_details.data = response.data
          
            if (response.data.length > 0) {
                for (const c in state.report_details.data) {
                    state.view_female[state.report_details.data[c].sequence_header] = state.report_details.data[c].female;
                    state.view_male[state.report_details.data[c].sequence_header] = state.report_details.data[c].male;
                    state.view_total[state.report_details.data[c].sequence_header] = state.report_details.data[c].total;
                    state.view_grand_total[state.report_details.data[c].sequence_header] = state.report_details.data[c].grand_total;
                    state.view_remarks[state.report_details.data[c].sequence_header] = state.report_details.data[c].remarks;

                    // for actual
                }
            } else {
                alert('No data found for ACTUAL Entries. ')  
            }
            

        }
    } catch (error) {
        console.log(error)
    }
}




async function fetchReports_Details_Projected() {
    try {
        let params = {
            group_id: state.selected_group,
            report_year_id: state.selected_year_id,
            is_active: 1,
            entry_type: state.selected_view_entry_type,
            group_agency_datasource_id: state.view_selected_datasource
        }


        const response = await reportDetailsService.getReportDetails(params)
        //console.log(response)
        console.log(params)
        if (response.data) {
            state.report_details.data = response.data
          
            if (response.data.length > 0){

                for (const c in state.report_details.data) {
                    state.view_female_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].female;
                    state.view_male_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].male;
                    state.view_total_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].total;
                    state.view_grand_total_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].grand_total;
                    state.view_remarks_projected[state.report_details.data[c].sequence_header] = state.report_details.data[c].remarks;

                    // for actual
                }
               
            } else {
                alert('No data found for this Projected Entry. ')
            }

            
            

        }
    } catch (error) {
        console.log(error)
    }
}



async function fetchRights(){
    try {
        let params = {
            page: currentPage
        }
        const response = await Childrens_rightsService.getRights(params)
       
        if (response.data) {
            state.Rights.data = response.data
            console.log(state.Rights.data[0].description)
        }

       var data = [];
       for (const i in state.Rights.data){

        data[i] =  { "value":  state.Rights.data[i].id, "label": state.Rights.data[i].description };
        
        }

        state.options.rights = data;
        console.log( state.options.rights)

    } catch (error) {
        console.log(error)
    }
}
 
async function fetchRights_entry_config() {
    try {
       
        const response = await Rights_entry_configServices.getRights_entry_config(params)
        //console.log(response)
        if (response.data) {
            state.Rights_entry_config.data = response.data.filter(rights_id1 => rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config1.data = response.data.filter(rights_id1 => rights_id1.rights_id === 1 && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config2.data = response.data.filter(rights_id1 => rights_id1.rights_id === 2  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config3.data = response.data.filter(rights_id1 => rights_id1.rights_id === 3  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config4.data = response.data.filter(rights_id1 => rights_id1.rights_id === 4  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config5.data = response.data.filter(rights_id1 => rights_id1.rights_id === 5  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            state.Rights_entry_config6.data = response.data.filter(rights_id1 => rights_id1.rights_id === 6  && rights_id1.sequence_header !== '0' && rights_id1.parent_entry !== 0)
            console.log(response.data)
        }
    } catch (error) { 
        console.log(error)
    }
}


// import { dashboardService } from '@/components/api/DashboardService';


definePageMeta({
    layout: 'main'
})

// onMounted(() => {
//     fetchMonthlyComplainantCount()
//     fetchMonthlyRespondentCount()
//     fetchCaseTypes()
// }) horizontal: true

const fakedata = [21,45,70,46,31,31,37,13,32,33,
                  99,80,21,45,70,46,31,31,43,13,
                  32,33,99,80,21,45,70,46,31,31,
                  13,13,32,33,99,80,32,33,99,80,
                  70,46,31,31,39,13,32,33,99,80,
                  32,33,99,80]
const fakedata2 =[80,21,45,70,46,31,31,73,13,32,
                  33,99,80,21,45,70,46,31,31,43,
                  13,32,53,21,45,70,46,31,31,13,
                  13,32,33,99,80,32,33,99,80,70,
                  46,31,31,33,13,32,33,99,80,32,
                  33,99,80,20]

const fakedata3 =[20,20,50,40,10,100]
const fakedata4 =[0,10,30,40,80,100]
const fakedata5 =[70,100,100,50,60,100]

const fakedata6 =[70,100,100,50,60,100,70,100,100,50,60,100,70,100,100,50,60,100, 10]

const fakedata7 =[70,100,100,50,60,100, 55]
                 



const state = reactive({
    isPageLoading: false,
    selected_year_id: 1,
    selected_rights_id: 1,

    options: {
    years:[
            {value: '1', label: 'Jan - Dec 2024' },
            {value: '2', label: 'Jan - Dec 2025' },

        ],
    // rights: [ 
    //     {value: '1', label: 'Survival' },
    //     {value: '2', label: 'Development'},
    //     {value: '3', label: 'Protection'},   
    //     {value: '4', label: 'Participation'},  
    //     {value: '5', label: 'Governance'},
    //     {value: '6', label: 'General Information'},    

    //  ]    
    },

    survivalOptions: {
        
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#818cf8', '#f472b6'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },

        series: [ {
            name: 'Department of Education (DepEd)',
            data: fakedata4
        },{
            name: ' City Social Welfare and Development Office (CSWDO)',
            data: fakedata5
        }
        ],



        xaxis: {
            categories: [
            '1.1 Maternal Care and Services',
                '1.2 Child Care and Services',
                '1.3 Maternal and Child Mortality',
                '1.4 Nutrition Services for Pre-school children',
                '1.5 Nutrition Services for School Children',
                '1.6 Access to Services and Facilities'
            ],
        },
    },






    developmentOptions: {
        
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },

        plotOptions: {
            bar: {
                horizontal: true
            }
        },

        colors: ['#818cf8', '#f472b6'],
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'smooth'
        },

        series: [{
            name: ' City Health Office (CHO)',
            data: fakedata6
        }, {
            name: 'Department of Education (DepEd)',
            data: fakedata6
        },{
            name: ' City Social Welfare and Development Office (CSWDO)',
            data: fakedata6
        }
        ],
        xaxis: {
            categories: [
                '2.1 Early Childhood Care and Development',
                '2.2 School Enrolment (kindergarten, primary, secondary)',
                '2.3 Net Enrolment rate',
                '2.4 Completion rate',
                '2.5  School Leaver (Drop-outs) (5-17 years old)',
                '2.6 School leaver rate (drop-out rate)',
                '2.7 No. of IP children enrolled',
                '2.8 Number of Muslim Children enrolled',
                '2.9 No. of children with disabilities enrolled',
                '2.10 Total number of children enrolled/passers in ALS',
                '2.11 Total number of Out- of- school children and youth (OSCY)',
                '2.12 Total number of OSCY enrolled in Elementary/Secondary School',
                '2.13 Total number of OSCY enrolled in Alternative Learning System (ALS)',
                '2.14. Total number of 5-17 years old OSCY assissted for enrollment',
                '2.15 Total number of school dropouts reintegrated in formal school',
                '2.16 Total number of school dropouts aged 5-17 years old',
                '2.17 Total number of children aged 5-17 years old',
                '2.18 Total number of barangays with play, recreational area',
                '2.19 Total number of barangays with library, reading centers'
            ],
        },
    },


    ProtectionOptions: {
        
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },

        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        colors: ['#0891b2',
            '#164e63',
            '#4f46e5',
            '#312e81',
            '#c026d3',
            '#701a75',
            '#db2777',
            '#9d174d'],
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'smooth'
        },

        series: [ {
            name: 'Department of Education (DepEd)',
            data: fakedata7
        },{
            name: ' City Social Welfare and Development Office (CSWDO)',
            data: fakedata7
        },{
            name: 'Davao City Police Office (DCPO) - Women and Children Protection Unit (WCPU)',
            data: fakedata7

        },{
            name: 'Special Office for Childrens Concerns (SOCC) - Integrated Gender and Development Division (IGDD)',
            data: fakedata7

        }
         
         
         
        ],



        xaxis: {
            categories: [
            '3.1 Violence Against Children',
                '3.2 Total number of NGOs or SWADIS providing services',
                '3.3 As available, total number of children affected by HIV/AIDS, MRRS-GCRV, emergencies and disasters, etc',
                '3.4 Number of Barangays with institutionalized Barangay Council for the Protection of Children (BCPC)',
                '3.5 Number of Barangays with Child Protection Policy',
                '3.6 Number of functional BVAWC Desks',
                '3.7 Number of Child Protection Working Groups established'
            ],
        },
    },






    populationAreaOptions: {
        chart: {
            type: 'area',
            toolbar: {
            show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#818cf8', '#f472b6'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
            name: 'Male',
            data: fakedata
        }, {
            name: 'Female',
            data: fakedata2
        }],


        xaxis: {
            categories: [
                '1.1 Maternal Care and Services',
                '1.2 Child Care and Services',
                '1.3 Maternal and Child Mortality',
                '1.4 Nutrition Services for Pre-school children',
                '1.5 Nutrition Services for School Children',
                '1.6 Access to Services and Facilities'
                
            ],
        },
    },

    populationHoriOptions: {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },

        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        colors: ['#0891b2',
            '#164e63',
            '#4f46e5',
            '#312e81',
            '#c026d3',
            '#701a75',
            '#db2777',
            '#9d174d'],
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'smooth'
        },
        
        group: {
            style: {
              fontSize: '10px',
              fontWeight: 700
            },
            groups: [
              { title: 'NON IP/MORO', cols: 2 },
              { title: 'MORO', cols: 2 },
              { title: 'IP', cols: 2 },
              { title: 'BADJAO', cols: 2 },
            ]
          },    


        series: [
            {
            name: 'Male NON IP/MORO',
            data: fakedata
            }, 
            {
            name: 'Female NON IP/MORO',
            data: fakedata2
            },
            {
            name: 'Male MORO',
            data: fakedata
            }, 
            {
            name: 'Female MORO',
            data: fakedata2
            },
            {
            name: 'Male IP',
            data: fakedata
            }, 
            {
            name: 'Female IP',
            data: fakedata2
            },
            {
            name: 'Male BADJAO',
            data: fakedata
            }, 
            {
            name: 'Female BADJAO',
            data: fakedata2
            },

           
    
    
        ],
        xaxis: {
            categories: [
                '1.1 Maternal Care and Services',
                '1.2 Child Care and Services',
                '1.3 Maternal and Child Mortality',
                '1.4 Nutrition Services for Pre-school children',
                '1.5 Nutrition Services for School Children',
                '1.6 Access to Services and Facilities'
                
            ],
        },
    },



    casesBarOptions: {
        chart: {
            type: 'bar',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        series: [{
            name: 'Male',
            data: []
        },{
            name: 'Female',
            data: []
        }
           
        ],
        colors: [
            '#fb7185',
            '#f472b6',
            '#e879f9',
            '#c084fc',
            '#a78bfa',
            '#818cf8',
            '#60a5fa',
            '#38bdf8',
            '#22d3ee',
            '#34d399',
            '#4ade80',
            '#a3e635',
            '#facc15',
            '#fbbf24',
            '#fb923c',
            '#f87171',
            '#a8a29e',
            '#a3a3a3',
            '#a1a1aa',
            '#9ca3af',
            '#94a3b8'
        ],
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff']
            },
            formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
            },
            offsetX: 0,
            dropShadow: {
                enabled: true
            }
        },
        stroke: {
            width: 1,


colors: ['#fff']
        },
        xaxis: {
            categories: [],
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            }
        }
    },


    respondentOptions: {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#FF0000'],
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
            name: 'respondent',
            data: []
        }],
        xaxis: {
            categories: [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec',
            ],
        },
    },
    error: null
})


// state.populationOptions.series[0].data = fakedata
// state.casesBarOptions.series[0].data = fakedata2
// state.respondentOptions.series[0].data = fakedata

// async function fetchMonthlyComplainantCount() {
//     state.isPageLoading = true
//     try {
//         const response = await dashboardService.getComplainantMonthlyCount()
//         if (response.data) {
//             state.complainantOptions.series[0].data = response.data
//         }
//     } catch (error) {
//         state.error = error
//     }
//     state.isPageLoading = false
// }

// async function fetchMonthlyRespondentCount() {
//     state.isPageLoading = true
//     try {
//         const response = await dashboardService.getRespondentMonthlyCount()
//         if (response.data) {
//             state.respondentOptions.series[0].data = response.data
//         }
//     } catch (error) {
//         state.error = error
//     }
//     state.isPageLoading = false
// }

// async function fetchCaseTypes() {
//     state.isPageLoading = true
//     try {
//         const response = await dashboardService.getCaseTypes()
//         if (response.data) {
//             response.data.cases.forEach(item => {
//                 state.casesBarOptions.xaxis.categories.push(item)
//             })
//             state.casesBarOptions.series[0].data = response.data.count
//         }
//     } catch (error) {
//         state.error = error
//     }
//     state.isPageLoading = false
// }

function pageLoads(value) {
    state.isPageLoading = value
}
</script>