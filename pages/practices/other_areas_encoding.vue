<template>

    <section class="bg-white dark:bg-green-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">SPECIAL OFFICE FOR CHILDREN'S CONCERNS (SOCC)</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-yellow-400">Child Rights Situational Analysis (CRSA)</p>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-yellow-400">Database Indicators</p>
            
            
        </div>
    </section>
    
    <div class="mt-1 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-12">
    
        <GridCell class="sm:col-span-3 text-center  bg-green-300  border-t border-r  border-l border-blue-900 pb-6" :displaytext="''"/>
        <GridCell class="sm:col-span-4 text-center bg-yellow-300 border-t border-r   border-blue-900 pb-6" :displaytext="'ACTUAL DATA'"/>
        <GridCell class="sm:col-span-4 text-center bg-blue-300 border-t border-r border-blue-900 pb-6" :displaytext="'PROJECTED DATA '"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-t border-r   border-blue-900 pb-6" :displaytext="''"/>
        <GridCell class="sm:col-span-3 text-center  bg-green-300 border-l border-r border-blue-900 pb-6" :displaytext="'INDICATOR / DATA NEEDED'"/>
        <GridCell class="sm:col-span-4 text-center bg-yellow-300 border-r  border-t border-b border-blue-900 pb-6" :displaytext="'YEAR (2024)'"/>
        <GridCell class="sm:col-span-4 text-center bg-blue-300 border-r  border-t border-b border-blue-900 pb-6" :displaytext="'YEAR (2024) '"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-r  border-blue-900 pb-6" :displaytext="'REMARKS'"/>
        <GridCell class="sm:col-span-3 text-center bg-green-300 border-l border-r border-b border-blue-900 pb-6" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-yellow-300  border-b border-blue-900 pb-6" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-yellow-300 border-l border-b border-blue-900 pb-6" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center bg-yellow-300 border-l border-b border-blue-900 pb-6" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-yellow-300 border-l border-r border-b border-blue-900 pb-6" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-blue-300  border-b border-blue-900 pb-6" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center bg-blue-300 border-l border-b border-blue-900 pb-6" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center bg-blue-300 border-l border-b border-blue-900 pb-6" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-blue-300 border-l border-r border-b border-blue-900 pb-6" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300  border-b border-r border-blue-900 pb-6" :displaytext="''"/>
        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'OTHER AREAS'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Governance'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    
        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'5.1 Local Council for the Protection of Children Functionality'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    
    
        <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: Department of Interior and Local Government (DILG), Special Office for Children\'s Concerns (SOCC)'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>
    
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.1 Total number of functional BCPC by level of functionality'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
        <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
            <GridCell class="sm:col-span-3 mx-2 " :displaytext="'5.1.1 Basic'"/>
        </div>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
        
        <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'5.1.2 Progressive'"/>
        </div>    
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
        <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
            <GridCell class="sm:col-span-3 mx-2" :displaytext="' 5.1.3 Mature'"/>
        </div>    
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
        <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
            <GridCell class="sm:col-span-3 mx-2" :displaytext="' 5.1.4 Ideal'"/>
        </div>    
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'5.2 Budget for children allocation and utilization'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    
    
        <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Budget Office (CBO)'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>
    
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.2.1 Total LGU budget and percentage of budget allocated for children’s programs, projects, activities'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.2.2 Total LGU budget allocated and percentage of budget utilized for children’s programs, projects and activities'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
        
        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'5.3 LGU Compliance to the Four Legacies for Children'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    
        <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Budget Office (CBO)'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
       
    
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.3.1 Availability of Local Development Plan for Children and Local Investment Plan for Children'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.3.2 Availability of Local Code for Children'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.3.3 Availability of Local State of Children Report'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.3.4 Availability of Comprehensive Local Juvenile Intervention Program '"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.3.5 Integration of the Comprehensive Emergency Program for Children in the LDRRM Plan & Budget'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
        
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.3.6 Established and updated database on children, with all of the following disaggregated information on children:'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'5.3.6.1 Age'"/>
        </div>    
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'5.3.6.2 Sex'"/>
        </div>    
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        
        <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'5.3.6.3 Ethnicity'"/>
        </div>    
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'5.3.6.4 Disability'"/>
        </div>    
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'5.3.6.5 School Status (in/out)'"/>
        </div>    
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
    </div>
    
    
    </template>
    <script>
// import { GridCell, GridTextInput } from '#build/components';

    definePageMeta({
        layout: 'main'
    })
    
    </script>