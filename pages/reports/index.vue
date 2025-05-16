
<template>
    <div>
        <!-- <Loader v-if="state.isPageLoading" /> -->
        <!-- <ModulesDashboardCard :complainants="totalComplainants" @isPageLoading="pageLoads" /> -->
        
        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">
                <h3 class="text-lg font-bold">Children's Population: District 1</h3>
            </div>
            <ApexCharts type="bar" height="375" width="100%" :options="state.populationOptions"
            :series="state.populationOptions.series" />
        </div>

        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">
                <h3 class="text-lg font-bold">Children's Population: District 1</h3>
            </div>
            <ApexCharts type="area" height="375" width="100%" :options="state.populationAreaOptions"
            :series="state.populationAreaOptions.series" />
        </div>

        <div class="border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div class="ml-4 mt-4">
                <h3 class="text-lg font-bold">Children's Population: District 1</h3>
            </div>
            <ApexCharts type="bar" height="1000" width="100%" :options="state.populationHoriOptions"
            :series="state.populationHoriOptions.series" />
        </div>
       
       
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

const state = reactive({
    isPageLoading: false,

    populationOptions: {
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
            enabled: true
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
                '1-A', '2-A', '3-A','4-A', '5-A', '6-A','7-A', '8-A', '9-A','10-A',
                '11-B', '12-B', '13-B','14-B', '15-B', '16-B','17-B', '18-B', '19-B','20-B',
                '21-C', '22-C', '23-C','24-C', '25-C', '26-C','27-C', '28-C', '29-C','30-C',
                '31-D', '32-D', '33-D','34-D', '35-D', '36-D','37-D', '38-D', '39-D','40-D',
                'BAGO APLAYA','BAGO GALLERA', 'BALIOK','BUCANA','CATALUNAN GRANDE','CATALUNAN PEQUEÑO','DUMOY TALOMO','LANGUB','MA-A','MAGTU-OD','MATINA APLAYA',
                'MATINA CROSSING','MATINA PANGI','TALOMO PROPER'
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
                '1-A', '2-A', '3-A','4-A', '5-A', '6-A','7-A', '8-A', '9-A','10-A',
                '11-B', '12-B', '13-B','14-B', '15-B', '16-B','17-B', '18-B', '19-B','20-B',
                '21-C', '22-C', '23-C','24-C', '25-C', '26-C','27-C', '28-C', '29-C','30-C',
                '31-D', '32-D', '33-D','34-D', '35-D', '36-D','37-D', '38-D', '39-D','40-D',
                'BAGO APLAYA','BAGO GALLERA', 'BALIOK','BUCANA','CATALUNAN GRANDE','CATALUNAN PEQUEÑO','DUMOY TALOMO','LANGUB','MA-A','MAGTU-OD','MATINA APLAYA',
                'MATINA CROSSING','MATINA PANGI','TALOMO PROPER'
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
                '1-A', '2-A', '3-A','4-A', '5-A', '6-A','7-A', '8-A', '9-A','10-A',
                '11-B', '12-B', '13-B','14-B', '15-B', '16-B','17-B', '18-B', '19-B','20-B',
                '21-C', '22-C', '23-C','24-C', '25-C', '26-C','27-C', '28-C', '29-C','30-C',
                '31-D', '32-D', '33-D','34-D', '35-D', '36-D','37-D', '38-D', '39-D','40-D',
                'BAGO APLAYA','BAGO GALLERA', 'BALIOK','BUCANA','CATALUNAN GRANDE','CATALUNAN PEQUEÑO','DUMOY TALOMO','LANGUB','MA-A','MAGTU-OD','MATINA APLAYA',
                'MATINA CROSSING','MATINA PANGI','TALOMO PROPER'
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