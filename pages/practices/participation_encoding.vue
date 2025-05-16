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
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'AREA OF CHILD RIGHTS/LIFE STAGE: PARTICIPATION'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'4. BCPC with child representatives'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Social Welfare and Development Office (CSWDO), Special Office for Children\'s Concerns (SOCC)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'4.1 Number of BCPC with child representatives, by type of selection process'"/>
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
        <GridCell class="sm:col-span-3 mx-2 " :displaytext="'4.1.1. Selected via Election'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'4.1.2. Selected via Appointment'"/>
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


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'4.2 Number of BCPC that conducted child-led activities'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'4.3 Number of Barangays that undertake activities participated in by children'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'4.4 Number of local initiatives/activities participated in by children'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

    

</div>


</template>
<script>
definePageMeta({
    layout: 'main'
})

</script>