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
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'1.  AREA OF CHILD RIGHTS/LIFE STAGE: SURVIVAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'1.1 Maternal Care and Services'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Health Office (CHO)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.1 Total number of Pregnant Women'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center   border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.1.1 Total number of pregnant adolescents '"/>
    <GridCell class="sm:col-span-1 text-center  bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center   border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r border-blue-900 pb-3" :displaytext="'1.1.1.1.1 10-14 years old pregnant'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.1.1.2 15-19 years old pregnant'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.1.2. Prevalence/percentage of Adolescent Pregnancies'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.2 Total number of nutritionally-at-risk pregnant women (PW)'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.2.1 10-14 years old '"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.2.2 15-19 years old '"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.2.2 15-19 years old '"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.5 Proportion/percentage of PW with at least 4 pre-natal check-ups'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.6 Total Number of deliveries attended by skilled health professionals'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.6.1 Total number of 10-14 years old'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.6.2 Total number of 15-19 years old'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.7 Proportion/percentage of deliveries attended by skilled health professionals'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.8 Total number of deliveries in health facilities'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.8.1 Total number of 10-14 years old'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.8.2 Total number of 15-19 years old '"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.9 Total number of deliveries in Public health facilities'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.10 Total number of deliveries in Private health facilities'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.11 Total number of postpartum women together with their newborn who completed at least 2 postpartum check ups'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'  1.1.11.1 Total number of 10-14 years old '"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="' 1.1.11.2 Total number of 15-19 years old '"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.12 Proportion/percentage of postpartum women together with their newborn who completed at least 2 postpartum check ups'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.13 Total number of pregnant adolescents with at least 4 prenatal visits'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.13.1 Total number of 10-14 years old'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.13.2 Total number of 15-19 years old'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.14 Total number of pregnant adolescents with at least 2 postpartum visits'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="' 1.1.14.1 Total number of 10-14 years old'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.1.14.2 Total number of 15-19 years old'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'1.2 Child Care and Services'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Health Office (CHO)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'REMARKS'"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.1 Total number of low birth weight'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.2 Prevalence/percentage of low birth weight'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>
    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.5 Proportion/percentage of newborns initiated to breastfeeding immediately after birth'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.6 Total number of infants exclusively breastfeeding up to 6 months'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.7 Proportion/percentage of infants exclusively breasftfeeding up to 6 months'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.8 Total number of infants introduced with complementary feeding beginning at six months'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.9 Proportion/percentage of infants introduced with complementary feeding beginning at six months'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.10 Total number of Fully Immunized Children (FIC)'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.10.1 Total population of 12 months old'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.2.11 Proportion/percentage of Fully Immunized Children (FIC)'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'1.3 Maternal and Child Mortality'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Health Office (CHO)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'REMARKS'"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3.1 Total number of maternal deaths'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3.2 Rate of maternal deaths'"/>
    <GridCell class="sm:col-span-1 text-center bg-black  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3.3 Total number of neonatal mortality'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3.4 Rate of neonatal mortality'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3.5 Total number of infant deaths'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3.6 Rate of infant deaths'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3.7 Number of under five year old (U5) deaths'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3.8 Rate of under five year old (U5) deaths'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.3.9 Leading causes of IMR and U5MR'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'1.4 Nutrition Services for Pre-school children'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Health Office (CHO)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'REMARKS'"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.4.1 Nutritional status of 0-59 months old children, total number on:'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- stunting'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- wasting'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- overweight/obesity'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.4.1.1 Micronutrient deficiency'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- Vit. A'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- iron'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- iodine'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.4.2 Top 10 Barangays with highest prevalence of stunting, wasting, underweight, overweight'"/>
    <GridCell class="sm:col-span-1 text-center border-b bg-black border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l bg-black border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l bg-black border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b bg-black border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l bg-black border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l bg-black border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.4.3 Operation Timbang Plus coverage'"/>
    <GridCell class="sm:col-span-1 text-center border-b  border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b  border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.4.3.1. Actual number of 0-59 months weighed'"/>
    <GridCell class="sm:col-span-1 text-center border-b  border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b  border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.4.3.2 Total population of 0-59 months old'"/>
    <GridCell class="sm:col-span-1 text-center border-b  border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b  border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.4.4 Total number of children enrolled in dietary supplementation programs by LGU, NGAs, NGOs'"/>
    <GridCell class="sm:col-span-1 text-center border-b  border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b  border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l  border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>


    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'1.5 Nutrition Services for School Children'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Health Office (CHO)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'REMARKS'"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.5.1 Nutritional status of Kinder to Grade VI learners, total number on:'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- stunting'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- wasting'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- overweight/obesity'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.5.1 Nutritional status of Kinder to Grade VI learners, total number on:'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- Vit. A'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- iron'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'- iodine'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 border-b border-l border-r  border-blue-900 pb-3" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.5.2 Total number of learners enrolled in school-based feeding programs'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'1.6 Access to Services and Facilities'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>

    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Health Office (CHO)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="'REMARKS'"/>


    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.6.1 Total number of barangay health centers and heath stations'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.6.2 Ratio of barangay health centers and health stations to population'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.6.3 Total number of cases or incidence of children affected by HIV and AIDS'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'1.6.4 Total number of children affected by HIV and AIDS provided with appropriate services '"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    
</div>
             
   



</template>


<script setup >


    definePageMeta({
    layout: 'main'
    })
   
</script>
