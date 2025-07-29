<template>
    <div class="mt-2 grid grid-cols-1 grid-rows-2 gap-4 p-4 sm:grid-cols-20">
      <GridCell
        class="sm:col-span-20  flex justify-center items-center text-xl text-white table-header-text  border-white border-t border-l border-r border-b border-grey pb-2"
        :displaytext="''" />

      <GridCell
        class="sm:col-span-1  flex justify-center items-center text-xl text-white   border-white border-t border-l border-r border-b border-grey pb-1"
        :displaytext="''" />


      <GridCellImage
        class="sm:col-span-2 row-span-2 flex justify-center items-center text-xl text-white   border-white border-t border-l border-r border-b border-grey pb-1"
        :displaytext="''"><img src="/assets/images/davao.png" class="w-full h-auto rounded ">
      </GridCellImage>

      <GridCell
        class="sm:col-span-14 row-span-1 flex justify-center items-center text-xl text-black   border-white border-t border-l border-r border-b border-grey pb-1"
        :displaytext="'SPECIAL OFFICE FOR CHILDREN\'S CONCERNS (SOCC)'" />


      <GridCellImage
        class="sm:col-span-2 row-span-2  flex justify-center items-center text-xl text-white   border-white border-t border-l border-r border-b border-grey pb-1"
        :displaytext="''"><img src="/assets/images/socc.jpg" class="w-full h-auto rounded table-header-text ">
      </GridCellImage>

      <GridCell
        class="sm:col-span-1  flex justify-center items-center text-xl text-white   border-white border-t border-l border-r border-b border-grey pb-1"
        :displaytext="''" />
         <GridCell
      class="sm:col-span-20  flex justify-center items-center text-xl text-white table-header-text  border-white border-t border-l border-r border-b border-grey pb-0"
        :displaytext="'Child Rights Situational Analysis (CRSA) Children\'s Database System Indicators'" />
     
    </div>

    <div class="mt-0 grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-20">


      <GridCell class="sm:col-span-3 text-center table-header-4 border-white border-l border-b border-grey pb-6"
        :displaytext="''" />
      <GridCell class="sm:col-span-4 text-center table-header-4 border-l border-white border-b border-grey pb-6"
        :displaytext="'ACTUAL DATA'" />
      <GridCell class="sm:col-span-4 text-center table-header-4 border-l border-white border-b border-grey pb-6"
        :displaytext="'PROJECTED TARGETS '" />
      <GridCell class="sm:col-span-4 text-center table-header-4 border-white  border-l border-b border-grey pb-6"
        :displaytext="'NATIONAL PROJECTED TARGETS'" />
      <GridCell class="sm:col-span-2 text-center table-header-4 border-white  border-l border-b border-grey pb-6"
        :displaytext="''" />
      <GridCell
        class="sm:col-span-3 text-center table-header-4 border-white border-l  ring-1 ring-white border-b border-grey pb-6"
        :displaytext="''" />
      <GridCell
        class="sm:col-span-3 text-center table-header-4 border-white border-l  ring-1 ring-white border-b border-grey pb-6"
        :displaytext="'INDICATOR / DATA NEEDED'" />

      <GridCell
        class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey                                                                                                                                                                     pb-6"
        :displaytext="'MALE'" />
      <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey  pb-6"
        :displaytext="'FEMALE'" />
      <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey  pb-6"
        :displaytext="' TOTAL'" />
      <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey pb-6"
        :displaytext="'GRAND TOTAL'" />

      <GridCell
        class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey                                                                                                                                                                     pb-6"
        :displaytext="'MALE'" />
      <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey  pb-6"
        :displaytext="'FEMALE'" />
      <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey  pb-6"
        :displaytext="' TOTAL'" />
      <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey pb-6"
        :displaytext="'GRAND TOTAL'" />
      <GridCell
        class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey                                                                                                                                                                     pb-6"
        :displaytext="'MALE'" />
      <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey  pb-6"
        :displaytext="'FEMALE'" />
      <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey  pb-6"
        :displaytext="' TOTAL'" />
      <GridCell class="sm:col-span-1 text-center table-header-4 border-white border-l border-b border-grey pb-6"
        :displaytext="'GRAND TOTAL'" />

      <GridCell class="sm:col-span-2 text-center table-header-4 border-white  border-l border-b border-grey pb-6"
        :displaytext="'DATASOURCES'" />
      <GridCell
        class="sm:col-span-3 text-center table-header-4 border-white border-l  ring-1 ring-white border-b border-grey pb-6"
        :displaytext="'REMARKS'" />


    </div>

</template>
<script>
</script>