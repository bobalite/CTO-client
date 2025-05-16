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
        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'GENERAL INFORMATION'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'1. Population'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    
    
        <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Planning and Development Office (CPDO)'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>
    
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1 Total population, by sex'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2 Population growth rate'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3 Total population of children, by age group'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.4 Total population of children with disabilities, by type of disability, by age, '"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.5 Total population of IP Children, by ethnicity, by age'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.6 Number and proportion of children with diverse sexual orientation, disaggregated by age and sex (as available)'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2. Civil Registration'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    
    
        <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Civil Registrar\'s Office (CCRO)'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'Remarks'"/>
        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>
    
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1  Total number/percentage of children registered at birth'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2. Civil Registration'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    
    
        <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Civil Registrar\'s Office (CCRO)'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'Remarks'"/>
        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.1 Poverty threshold'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.2 Poverty incidence'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.3 Child poverty incidence, by age group (as available)'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.4. Proportion of food insecure HH'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>


        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'5. Employment'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    
    
        <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Planning and Development Office (CPDO)'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'Remarks'"/>
        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.1 Unemployment rate'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.2 Underemployment rate'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'5.3 Major areas of employment'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="'(Provide list)'"/>

        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'6.Water and Sanitation'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    
        <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Health Office (CHO), Department of Education (DepEd)'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'Remarks'"/>
        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'6.1 Total number of households (HH) with access to basic water supply'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'6.1 Total number of households (HH) with access to basic water supply'"/>
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
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'6.1.1 Level 1 water supply'"/>
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
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'6.1.2 Level 2 water supply'"/>
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
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'6.1.2 Level 3 water supply'"/>
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


        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'6.2 Total number of HH with access to sanitation facilities'"/>
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
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'6.2.1 Proportion of HH with access to sanitation facilities'"/>
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


        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'6.3 Total number of barangays certified as Zero Defecation (ZOD) areas'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>


        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'6.4 Total number of schools fully implementing the WinS (Wash in School) 3 star approach'"/>
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
            <GridCell class="sm:col-span-3 mx-2" :displaytext="'6.4.1 Proportion/percentage of schools fully implementing the WinS (Wash in School) 3 star approach'"/>
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

        <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'7. Vulnerability to emergencies and disasters'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
        <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Disaster and Risk Reduction Management Office (CDRRMO)'"/>
        <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'Remarks'"/>
        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>
    
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'7.1 Climate change-related hazards, by type of hazards'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

        
        <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'7.3 Number of Barangays with Disaster Risk Reduction and Management Committee and Plan'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
        <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
        <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="'(Provide list)'"/>


        <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>
    
        
    
    </div>
    
    
    </template>
    <script>





    definePageMeta({
        layout: 'main'
    })
    
    </script>