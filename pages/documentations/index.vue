<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Documentations</h1>
            </div>
          
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <h2 class="text-base font-semibold leading-6 text-gray-900">Population</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem blanditiis perspiciatis repellat facilis cupiditate aliquid, officia sit. Quas recusandae illum accusantium neque deserunt, similique consectetur, est odio quae, libero nesciunt.

                        </p>
                        
                    </div>
         
                </div>
            </div>
        </div>

        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <h2 class="text-base font-semibold leading-6 text-gray-900">Graphs</h2>
                    </div>
         
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { graphService } from '~/components/api/GraphService';
definePageMeta({
    layout: 'main'
})

</script>