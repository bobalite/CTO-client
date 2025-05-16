
<template>
    <div>
        <!-- <Loader v-if="state.isPageLoading" /> -->
        <!-- <ModulesDashboardCard :complainants="totalComplainants" @isPageLoading="pageLoads" /> -->
        
       

        <div class=" mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12 bg-green-100 border-solid  rounded-xl border-blue-900 border-t border-b border-l border-r pb-4">

            <div  class="sm:col-span-12 text-xl font-bold  text-center  border-1 border-solid border-blue-900 pb-4">
                <h3 class="text-lg font-bold"> AREA OF CHILD RIGHTS/LIFE STAGE: SURVIVAL</h3>
            </div>
           
            <div class="sm:col-span-6 text-xl font-bold  text-center  border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Accomplishments vs Projected</h2>
               
                <ApexCharts type="bar" height="500" width="80%" :options="state.populationHoriOptions"
                    :series="state.survivalOptions.series" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Percentage</h2>
               
                <ApexCharts type="area" height="500" width="80%" :options="state.survivalOptions"
                    :series="state.survivalOptions.series_percentage" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Total Services Given</h2>
               
                <ApexCharts  height="400" width="80%" :options="state.survivalOptionsPie"
                    :series="state.survivalOptionsPie.series" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Datasources</h2>
               
                <ApexCharts  height="400" width="80%" :options="state.survivalOptionsPieDatasource"
                    :series="state.survivalOptionsPieDatasource.series" />
            </div>

        </div>
    </div>

    <div>
       
        <div class=" mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12 bg-green-100 border-solid  rounded-xl border-blue-900 border-t border-b border-l border-r pb-4">

            <div  class="sm:col-span-12 text-xl font-bold  text-center  border-1 border-solid border-blue-900 pb-4">
                <h3 class="text-lg font-bold"> AREA OF CHILD RIGHTS/LIFE STAGE: DEVELOPMENT</h3>
            </div>
           
            <div class="sm:col-span-6 text-xl font-bold  text-center  border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Accomplishments vs Projected</h2>
               
                <ApexCharts type="bar" height="500" width="80%" :options="state.populationHoriOptions"
                    :series="state.survivalOptions.series" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Percentage</h2>
               
                <ApexCharts type="area" height="500" width="80%" :options="state.survivalOptions"
                    :series="state.survivalOptions.series_percentage" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Total Services Given</h2>
               
                <ApexCharts  height="400" width="80%" :options="state.survivalOptionsPie"
                    :series="state.survivalOptionsPie.series" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Datasources</h2>
               
                <ApexCharts  height="400" width="80%" :options="state.survivalOptionsPieDatasource"
                    :series="state.survivalOptionsPieDatasource.series" />
            </div>

        </div>

       


    </div>

    <div>
        <div class=" mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12 bg-green-100 border-solid  rounded-xl border-blue-900 border-t border-b border-l border-r pb-4">

            <div  class="sm:col-span-12 text-xl font-bold  text-center  border-1 border-solid border-blue-900 pb-4">
                <h3 class="text-lg font-bold">AREA OF CHILD RIGHTS/LIFE STAGE: PROTECTION</h3>
            </div>

           
            <div class="sm:col-span-6 text-xl font-bold  text-center  border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Accomplishments vs Projected</h2>
               
                <ApexCharts type="bar" height="500" width="80%" :options="state.populationHoriOptions"
                    :series="state.survivalOptions.series" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Percentage</h2>
               
                <ApexCharts type="area" height="500" width="80%" :options="state.survivalOptions"
                    :series="state.survivalOptions.series_percentage" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Total Services Given</h2>
               
                <ApexCharts  height="400" width="80%" :options="state.survivalOptionsPie"
                    :series="state.survivalOptionsPie.series" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Datasources</h2>
               
                <ApexCharts  height="400" width="80%" :options="state.survivalOptionsPieDatasource"
                    :series="state.survivalOptionsPieDatasource.series" />
            </div>

        </div>

       


    </div>

    <div>
        <div class=" mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12 bg-green-100 border-solid  rounded-xl border-blue-900 border-t border-b border-l border-r pb-4">

            <div  class="sm:col-span-12 text-xl font-bold  text-center  border-1 border-solid border-blue-900 pb-4">
                <h3 class="text-lg font-bold">AREA OF CHILD RIGHTS/LIFE STAGE: PARTICIPATION</h3>
            </div>
           
            <div class="sm:col-span-6 text-xl font-bold  text-center  border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Accomplishments vs Projected</h2>
               
                <ApexCharts type="bar" height="500" width="80%" :options="state.populationHoriOptions"
                    :series="state.survivalOptions.series" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Percentage</h2>
               
                <ApexCharts type="area" height="500" width="80%" :options="state.survivalOptions"
                    :series="state.survivalOptions.series_percentage" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Total Services Given</h2>
               
                <ApexCharts  height="400" width="80%" :options="state.survivalOptionsPie"
                    :series="state.survivalOptionsPie.series" />
            </div>

            <div class="sm:col-span-6 text-xl font-bold  text-center border-1 border-solid border-blue-900 pb-4">
                <h2 class="text-lg font-bold">Datasources</h2>
               
                <ApexCharts  height="400" width="80%" :options="state.survivalOptionsPieDatasource"
                    :series="state.survivalOptionsPieDatasource.series" />
            </div>

        </div>

       


    </div>
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts';
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

const dummyActualSurvival =[212,305,920,640,150,1456]
const dummyProjectedSurvival =[250,345,1010,748,200,1500]
const dummyProjNationalSurvival =[240,305,950,700,120,1400]

const dummyPercentageActualvsLocal =[84.8,88.4,91.1,85.6,75,97]
const dummyPercentageActualvsNAtional =[88.3,100,96.8,91.4,125,104]



const fakedata4 =[100,90,70,80,95,100]
const fakedata5 =[70,100,100,50,60,100]

const fakedata6 =[70,100,100,50,60,100,70,100,100,50,60,100,70,100,100,50,60,100, 10]

const fakedata7 =[70,100,100,50,60,100, 55]
                 



const state = reactive({
    isPageLoading: false,

    survivalOptions: {
        
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

        series: [ {
            name: 'Accomplishment',
            data: dummyActualSurvival
        },{
            name: 'Projected (Local) ',
            data: dummyProjectedSurvival
        },{
            name: 'Projected (National) ',
            data: dummyProjNationalSurvival
        }
        ],
        series_percentage: [ {
            name: 'Accomplishment Vs Local',
            data: dummyPercentageActualvsLocal
            
        },{
            name: 'Accomplishment Vs National',
            data: dummyPercentageActualvsNAtional
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

   
    survivalOptionsPie: {
        
        chart: {
            width: 380,
            type: 'pie',
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
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5,
            },
          },
        },
        grid: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          },
        },
        legend: {
          show: false,
        },

        series: [212,305,920,640,150,1456],
        labels: [
            '1.1 Maternal Care and Services',
            '1.2 Child Care and Services',
            '1.3 Maternal and Child Mortality',
            '1.4 Nutrition Services for Pre-school children',
            '1.5 Nutrition Services for School Children',
            '1.6 Access to Services and Facilities'
        ],



        // xaxis: {
        //     categories: [
        //     '1.1 Maternal Care and Services',
        //         '1.2 Child Care and Services',
        //         '1.3 Maternal and Child Mortality',
        //         '1.4 Nutrition Services for Pre-school children',
        //         '1.5 Nutrition Services for School Children',
        //         '1.6 Access to Services and Facilities'
        //     ],
        // },
    },


    survivalOptionsPieDatasource: {
        
        chart: {
            width: 380,
            type: 'pie',
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
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5,
            },
          },
        },
        grid: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        },
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          },
        },
        legend: {
          show: false,
        },

        series: [212],
        labels: [
            'City Health Office (CHO)',
            
        ],

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
            stacked: false,
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