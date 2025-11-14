<template>
  <div class="p-4">
    <input type="file" accept=".xlsx, .xls, .csv" @change="handleFileUpload" />

    <div v-if="excelData.length" class="mt-4">
      <!-- <h2 class="text-lg font-bold mb-2">{{displaytext}}</h2> -->

      <div class="overflow-x-auto"> <!-- makes it scrollable on small screens -->
        <table class="min-w-full w-full divide-y divide-gray-300 border border-gray-300">
          <thead class="bg-green-500">
            <tr>
              <th v-for="(h, i) in headers" :key="i" scope="col"
                class="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-300">
                {{ h }}
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(row, rIdx) in excelData" :key="rIdx">
              <td v-for="(h, cIdx) in headers" :key="cIdx"
                class="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                {{ row[h] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  </div>
</template>

<script setup>
import * as XLSX from "xlsx";
import { ref } from "vue";

const excelData = ref([]);
const headers = ref([]);
const emit = defineEmits(["excel-loaded"]);

emit("excel-loaded", {
  indicator_no: props.indicatorNo,  // NEW
  rows: excelData.value,
});

const props = defineProps({
  displaytext: String,
  indicatorNo: [String, Number],  // NEW
});


const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const raw = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
    if (!raw.length) return;

    const originalHeaders = raw[0];
    const columns = originalHeaders.map((h) =>
      String(h).trim().toLowerCase().replace(/\s+/g, "_")
    );

    headers.value = columns;

    excelData.value = raw.slice(1).map((row) => {
      const obj = {};
      columns.forEach((col, idx) => (obj[col] = row[idx]));
      return obj;
    });

    // ✅ Emit the parsed rows to the parent modal
    emit("excel-loaded", {
      indicator_no: props.displaytext, // you pass indicator_no in displaytext
      rows: excelData.value,
    });
  };

  reader.readAsArrayBuffer(file);
};
</script>
