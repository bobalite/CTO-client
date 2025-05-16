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
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'AAREA OF CHILD RIGHTS/LIFE STAGE: PROTECTION'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    <GridCell class="sm:col-span-11 text-center bg-green-300 border-b border-r border-l border-blue-900 pb-6" :displaytext="'3.1 Violence Against Children'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>


    <GridCell class="sm:col-span-11 bg-blue-200 border-b border-r border-l border-blue-900 pb-6" :displaytext="'Data Source/s: City Social Welfare and Development Office (CSWDO), Davao City Police Office (DCPO) - Women and Children Protection Unit (WCPU), Special Office for Children\'s Concerns (SOCC), Integrated Gender and Development Division (IGDD)'"/>
    <GridCell class="sm:col-span-1 text-center bg-green-300 border-b border-r  border-blue-900 pb-6" :displaytext="''"/>
    <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.1.1 Total number of violence against children cases, by type of violence'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.1 abandoned'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.2 bullying'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.4 child labor'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.5 children who use drugs'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.6 children of drug dependents'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.7 economic abuse'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.8 neglected'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.9 physical abuse'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.10 psychological abuse'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.11 sexual abuse'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.12 sexual exploitation'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.1.13 victim of OSAEC & CSAEM'"/>
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

    

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.1.2 Total number of violence against children cases resolved, by type of violence'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.2.1. Total number of reported Children In-Need of Special Protection (CNSP) cases'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.2.2. Total number of CNSP cases managed'"/>
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

    

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.1.3 Total number of Children in street situation '"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.1.4 Total number of children in conflict with with the law'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.4.1 Total number of CICL under community-based intervention program'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.4.2 Total number of CICL under center-based intervention program'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.1.4.3 Total number of CICL who underwent diversion program'"/>
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

    <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.2 Total number of NGOs or SWADIS providing services'"/>
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
    
    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.3 As available, total number of children affected by HIV/AIDS, MRRS-GCRV, emergencies and disasters, etc'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.3.1 Total number of children affected by emergencies and disasters'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.3.2 Total number of children provided with appropriate services during disasters and emergencies (health, nutrition. Psychosocial, etc)'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.3.3 Total number of children affected by armed conflict'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.3.4 Total number of children in armed conflict'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.3.5 Total number of children reported for violation of status offenses'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.3.6 Total number of children reported for violation of local ordinances'"/>
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
        <GridCell class="sm:col-span-3 mx-2" :displaytext="'3.3.7 Total number of children with disabilitie'"/>
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

    <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.4 Number of Barangays with institutionalized Barangay Council for the Protection of Children (BCPC)'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>
    

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.5 Number of Barangays with Child Protection Policy'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.6 Number of functional BVAWC Desks'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-b border-r border-blue-900 pb-2" :displaytext="''"/>

    <GridCell class="sm:col-span-12 text-center bg-green-300 border-b border-r border-l  border-blue-900 pb-1" :displaytext="''"/>
    

    <GridCell class="sm:col-span-3 border-b border-l border-r  border-blue-900 pb-3" :displaytext="'3.7 Number of Child Protection Working Groups established'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="''"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  border-l border-r border-b border-blue-900 pb-2" :displaytext="'GRAND TOTAL'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-b border-blue-900 pb-2" :displaytext="'MALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'FEMALE'"/>
    <GridCell class="sm:col-span-1 text-center  bg-black border-l border-b border-blue-900 pb-2" :displaytext="'TOTAL'"/>
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