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
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'AREA OF CHILD RIGHTS/LIFE STAGE: DEVELOPMENT'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.1 Early Childhood Care and Development'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Social Welfare and Development Office (CSWDO)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.1 Total number of ECCD enrollees '"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>



    <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'2.1.1.2 Total population of 3-4 years old '"/>
    </div>    
    
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.2 Total Number of child development centers/facilities'"/>
    <!-- <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/> -->
    <GridTextInput v-model = "survival2.actual_projected" :function ="compute_projected2" :class = "'sm:col-span-1 '" />
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'2.1.2.1 Number of public child development centers/faciities'"/>
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
        <GridCell class="sm:col-span-3 mx-4" :displaytext="'2.1.2.1.1 Number of Center-based'"/>
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
        <GridCell class="sm:col-span-3 mx-4" :displaytext="'2.1.2.1.2 Number of Homebased/Supervised Neighborhood Play'"/>
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

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.3 Accreditation of public child development centers/facilities and child development workers'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.4. Total number of Public centers (i.e Day Care, Child Development) enrollees'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.5 Total number of private child development centers (i.e Montessori) enrollees'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.6 Total number of Community-based (i.e SNPs, mobile learning) centers enrollees'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.7 Total number of PTOP enrollees'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.8 Total number of DepEd ECCD enrollees'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.9 Number of children served vs. targets'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'2.1.9.1  Targets'"/>
    </div>   

    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <div class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3">
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'2.1.9.2  Served'"/>
    </div>   
    
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.10 Total number of children with disabilities served'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.1.11 Total number of barangays without child development centers/facilities'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.2 School Enrolment (kindergarten, primary, secondary)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: Department of Education (DepEd)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'REMARKS'"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.2.1 Total number of Kindergarten enrollees '"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.2.2. Total number of Elementary enrollees'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.2.3  Total number of Junior High School enrollees'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'  2.2.4  Total number of Senior High School enrollees'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.3 Net Enrolment rate'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.3.1 Kindergarten'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.3.2 Elementary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.3.3  Secondary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.4 Completion rate'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="' 2.4.1 Elementary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.4.2  Secondary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.5  School Leaver (Drop-outs) (5-17 years old)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.5.1 Kinder & Elementary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.5.2 Secondary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.6 School leaver rate (drop-out rate)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.6.1 Kinder & Elementary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.6.2 Secondary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.7 No. of IP children enrolled'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.7.1 Kindergarten'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.7.2 Elementary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="' 2.7.3 Junior High School'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.7.4 Senior High School'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.8 Number of Muslim Children enrolled'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

     
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.7.1 Kindergarten'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.7.2 Elementary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="' 2.7.3 Junior High School'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.7.4 Senior High School'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.9 No. of children with disabilities enrolled'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


         
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.7.1 Kindergarten'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.7.2 Elementary'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="' 2.7.3 Junior High School'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.7.4 Senior High School'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.10 Total number of children enrolled/passers in ALS'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.10.1 Basic Literacy Program'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.10.2 A&E Elementary Level'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.10.3 A&E Junior High School Level'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.11 Total number of Out- of- school children and youth (OSCY)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.11.1  6-11 years old'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="' 2.11.2  12-15 years old'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="' 2.11.3  16-17 years old'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.11.4  5-17 years old'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>



    
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'2.12 Total number of OSCY enrolled in Elementary/Secondary School'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.12.1 Total number of OSCY enrolled in Alternative Learning System (ALS)'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.12.2 Total number of 5-17 years old OSCY assissted for enrollment'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>





    

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.12.3 Total number of school dropouts reintegrated in formal school'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.12.4 Total number of school dropouts aged 5-17 years old'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
    

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.12.5 Total number of children aged 5-17 years old'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>



    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.12.6 Total number of barangays with play/recreational area'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/> 
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'2.12.7 Total number of barangays with library/reading centers'"/>
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
<script setup>
import { reactive, computed } from 'vue'


const survival2 = reactive({
    
     actual_projected : 0,
    
});


const compute_projected2 = computed(() =>{
   try {
      actual_projected = 2000;
      return (survival2.actual_projected);
   } catch (error) {
     
      return (0);
   }
})

definePageMeta({
    layout: 'main'
})

</script>