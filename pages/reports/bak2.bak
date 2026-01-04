<template>
  <!-- SCREEN TOOLBAR -->
  <div class="print:hidden sticky top-16 z-[9999] bg-white border-b">
    <div class="w-full px-3 py-2 flex items-center gap-3">
      <div class="flex-1 min-w-0">
        <FormYearSelector
          v-model="state.selected_year_id"
          :options="state.options.years"
          @update:modelValue="onYearChanged"
        />
      </div>

      <button
        type="button"
        class="px-3 py-2 rounded bg-black text-white"
        @click="printNow"
      >
        Print
      </button>
    </div>
  </div>

  <!-- PRINT ROOT -->
  <section
    id="print-area"
    class="mx-auto bg-white text-[11pt]"
    style="width: 8.5in; min-height: 11in;"
  >
    <!-- PRINT HEADER (print-only) -->
    <header
      class="hidden print:block fixed left-0 right-0 bg-white"
      :style="{
        top: '0',
        height: headerH,
        paddingLeft: mL,
        paddingRight: mR,
        paddingTop: '0.2in',
      }"
    >
      <div class="flex items-start justify-between">
        <div>
          <div class="font-bold">{{ state.report_title }}</div>
          <div class="text-[10pt] text-gray-600">
            YEAR {{ state.selected_year || '—' }} (CURRENT YEAR)
          </div>
        </div>
        <div class="text-[10pt] text-gray-600">{{ printedAt }}</div>
      </div>
    </header>

    <!-- PRINT FOOTER (print-only) -->
    <footer
      class="hidden print:block fixed left-0 right-0 bg-white"
      :style="{
        bottom: '0',
        height: footerH,
        paddingLeft: mL,
        paddingRight: mR,
        paddingBottom: '0.15in',
      }"
    >
      <div class="flex items-end justify-between text-[10pt] text-gray-600">
        <div>{{ state.footer_left }}</div>
        <div class="page-number"></div>
      </div>
    </footer>

    <!-- BODY -->
    <main
      class="box-border"
      :style="{
        paddingTop: `calc(${mT} + ${headerH})`,
        paddingBottom: `calc(${mB} + ${footerH})`,
        paddingLeft: mL,
        paddingRight: mR,
      }"
    >
      <!-- TABLE -->
      <section class="w-full">
        <!-- THEAD -->
        <div class="grid-thead">
          <!-- Header Row 1 -->
          <div class="grid grid-cols-[0.65in_0.9in_1fr_0.9in_1.2in_0.8in_0.8in_0.8in_0.9in]">
            <div class="border border-black p-2 font-bold">Grp.</div>
            <div class="border border-black p-2 font-bold"></div>
            <div class="border border-black p-2 font-bold">Description</div>
            <div class="border border-black p-2 font-bold"></div>
            <div class="border border-black p-2 font-bold">Schedule</div>
            <div class="border border-black p-2 font-bold text-center col-span-3">
              ACTUAL DATA (Actual LGU Accomplishments)
            </div>
            <div class="border border-black p-2 font-bold">REMARKS</div>
          </div>

          <!-- Header Row 2 -->
          <div class="grid grid-cols-[0.65in_0.9in_1fr_0.9in_1.2in_0.8in_0.8in_0.8in_0.9in]">
            <div class="border border-black p-2">1 </div>
            <div class="border border-black p-2">2</div>
            <div class="border border-black p-2">3</div>
            <div class="border border-black p-2">4</div>
            <div class="border border-black p-2">5</div>

            <div class="border border-black p-2 font-bold text-center col-span-3">
              YEAR {{ state.selected_year || '—' }} (CURRENT YEAR)
            </div>

            <div class="border border-black p-2"></div>
          </div>

          <!-- Header Row 3 -->
          <div class="grid grid-cols-[0.65in_0.9in_1fr_0.9in_1.2in_0.8in_0.8in_0.8in_0.9in]">
            <div class="border border-black p-2"></div>
            <div class="border border-black p-2"></div>
            <div class="border border-black p-2"></div>
            <div class="border border-black p-2"></div>
            <div class="border border-black p-2"></div>

            <div class="border border-black p-2 font-bold text-center">MALE</div>
            <div class="border border-black p-2 font-bold text-center">FEMALE</div>
            <div class="border border-black p-2 font-bold text-center">TOTAL</div>

            <div class="border border-black p-2"></div>
          </div>
        </div>

        <!-- TBODY -->
        <div class="grid-tbody">
          <template v-for="(item, idx) in state.display_rows" :key="item.key">
            <!-- CATEGORY / SECTION ROW -->
            <div
              v-if="item.type === 'category'"
              class="grid-row grid grid-cols-[0.65in_0.9in_1fr_0.9in_1.2in_0.8in_0.8in_0.8in_0.9in]"
            >
              <div class="border border-black p-2 font-bold col-span-9">
                {{ item.label }}
              </div>
            </div>

            <!-- INDICATOR ROW -->
            <div
              v-else
              class="grid-row grid grid-cols-[0.65in_0.9in_1fr_0.9in_1.2in_0.8in_0.8in_0.8in_0.9in]"
            >
              <!-- GROUP NUMBER (only show when "top-level" like 2.1, 3.1; blank for 2.1.1 etc.) -->
              <div class="border border-black p-2">
                {{ item.showGroupNo ? item.group_no : '' }}
              </div>

              <!-- INDICATOR NUMBER -->
              <div class="border border-black p-2">
                {{ item.indicator_no }}
              </div>

              <!-- INDICATOR -->
              <div class="border border-black p-2 break-words">
                <div :class="item.isChild ? 'pl-4' : ''">
                  {{ item.indicator_desc }}
                </div>
              </div>

              <!-- DATA ENCODER -->
              <div class="border border-black p-2">
                {{ item.encoder_label }}
              </div>

              <!-- WHEN TO ENCODE -->
              <div class="border border-black p-2">
                {{ item.when_to_encode }}
              </div>

              <!-- MALE / FEMALE / TOTAL -->
              <div class="border border-black p-2 text-right whitespace-nowrap">
                {{ item.male }}
              </div>
              <div class="border border-black p-2 text-right whitespace-nowrap">
                {{ item.female }}
              </div>
              <div class="border border-black p-2 text-right whitespace-nowrap">
                {{ item.total }}
              </div>

              <!-- REMARKS -->
              <div class="border border-black p-2">
                {{ item.remarks_text }}
              </div>
            </div>
          </template>
        </div>
      </section>
    </main>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'

definePageMeta({ layout: 'main' })

/** PRINT SETTINGS (inches) */
const mT = '0.6in'
const mR = '0.6in'
const mB = '0.7in'
const mL = '0.6in'
const headerH = '0.9in'
const footerH = '0.55in'

const printedAt = computed(() => new Date().toLocaleString())

const state = reactive({
  loading: false,
  error: '',

  report_title: 'CRSA Report',
  footer_left: 'Confidential',

  selected_year_id: '2',
  selected_year: '2025',

  options: {
    years: [
      { value: '1', label: 'Jan - Dec 2024', year: '2024' },
      { value: '2', label: 'Jan - Dec 2025', year: '2025' },
    ],
    agencies: [
      { value: 2, label: 'CHO' },
      { value: 1, label: 'SOCC' },
      { value: 4, label: 'CSWDO' },
      // add the rest you already have
    ],
  },

  // raw nested response
  rights_entry_config_groups: {},

  // flattened rows
  print_rows: [],

  // final display list (categories + indicator rows)
  display_rows: [],
})

function printNow() {
  window.print()
}

function onYearChanged(val) {
  state.selected_year_id = String(val)
  const selected = state.options.years.find((y) => String(y.value) === String(state.selected_year_id))
  state.selected_year = selected?.year ?? ''
  // fetchRights_Entry_config()  // uncomment in your app
  rebuildDisplayRows()
}

/**
 * Helpers
 */
function getAgencyLabel(agencyId) {
  const hit = state.options.agencies.find((a) => Number(a.value) === Number(agencyId))
  return hit?.label ?? (agencyId ? `Agency ${agencyId}` : '')
}

// Show group no only for top-level indicators like "2.1" or "3.2" (two segments).
// Child indicators like "2.1.1" should not show group number (matches your sample).
function isTopLevelIndicatorNo(indicatorNo) {
  const parts = String(indicatorNo || '').split('.').filter(Boolean)
  return parts.length === 2
}

function rebuildDisplayRows() {
  // Build category headers + detail rows in order:
  // category -> indicators...
  const out = []
  let lastCategoryId = null

  for (const row of state.print_rows) {
    if (row.category_id !== lastCategoryId) {
      lastCategoryId = row.category_id

      // format: "1. MATERNAL CARE & SERVICES" (number from right_id or category_id—your sample uses "1.")
      const prefix = `${row.right_id}.`
      out.push({
        type: 'category',
        key: `cat-${row.right_id}-${row.category_id}`,
        label: `${prefix}  ${row.category_desc}`,
      })
    }

    const isChild = !isTopLevelIndicatorNo(row.indicator_no)

    out.push({
      type: 'row',
      key: `row-${row.indicator_group_element_id ?? `${row.right_id}-${row.indicator_no}`}`,

      group_no: row.group_no,
      showGroupNo: isTopLevelIndicatorNo(row.indicator_no),

      indicator_no: row.indicator_no,
      indicator_desc: row.indicator_desc,

      encoder_label: getAgencyLabel(row.agency_id),
      when_to_encode: (row.submition_type || '').toUpperCase(), // QUARTERLY, ANNUAL, etc.

      male: Number(row.male ?? 0),
      female: Number(row.female ?? 0),
      total: Number(row.total ?? 0),

      // You can improve this: if you have percent flags, use value_type/divisor/etc.
      remarks_text: row.value_type === 'percent' ? '%' : '',

      isChild,
    })
  }

  state.display_rows = out
}

/**
 * You already have this from your API:
 * state.rights_entry_config_groups = { 1: [...], 2: [...], ... }
 * This flattener is the same logic as before.
 */
function buildPrintRowsFromRightsEntryConfigGroups(groupsByRightId) {
  const rows = []

  for (const [rightIdKey, categories] of Object.entries(groupsByRightId || {})) {
    const right_id = Number(rightIdKey)

    for (const category of categories || []) {
      const category_id = category?.id ?? null
      const category_desc = category?.description ?? ''

      const subcats = category?.indicator_subcategories || []
      for (const subcat of subcats) {
        const subcategory_id = subcat?.id ?? null
        const subcategory_desc = subcat?.description ?? ''

        const groups = subcat?.indicator_groups || []
        for (const grp of groups) {
          const indicator_group_id = grp?.id ?? null
          const group_no = grp?.group_no ?? ''
          const encoding_type = grp?.encoding_type ?? ''
          const group_is_active = grp?.is_active ?? 1

          const elements = grp?.indicator_group_elements || []
          for (const el of elements) {
            const report_details = Array.isArray(el?.report_details) ? el.report_details : []
            const normalizedReportDetails = report_details.map((rd) => ({
              ...rd,
              report_element_details: rd?.report_element_details ?? null, // stop here
            }))

            rows.push({
              right_id,
              category_id,
              category_desc,
              subcategory_id,
              subcategory_desc,
              indicator_group_id,
              group_no,
              encoding_type,
              group_is_active,

              indicator_group_element_id: el?.id ?? null,
              indicator_no: el?.indicator_no ?? '',
              indicator_desc: el?.description ?? '',
              agency_id: el?.agency_id ?? null,
              submition_type: el?.submition_type ?? '',
              value_type: el?.value_type ?? '',
              divisor: el?.divisor ?? null,

              male: Number(el?.male ?? 0),
              female: Number(el?.female ?? 0),
              total: Number(el?.total ?? (Number(el?.male ?? 0) + Number(el?.female ?? 0))),
              remarks: el?.remarks ?? null,

              report_details: normalizedReportDetails,
            })
          }
        }
      }
    }
  }

  rows.sort((a, b) => {
    if (a.right_id !== b.right_id) return a.right_id - b.right_id
    if (a.category_id !== b.category_id) return (a.category_id ?? 0) - (b.category_id ?? 0)
    return String(a.indicator_no).localeCompare(String(b.indicator_no), undefined, { numeric: true })
  })

  return rows
}

onMounted(() => {
  // Demo seed (REMOVE this and replace with your real API result)
  // If you already have state.rights_entry_config_groups from fetchRights_Entry_config(),
  // just set it and call the two lines below.
  state.print_rows = buildPrintRowsFromRightsEntryConfigGroups(state.rights_entry_config_groups)
  rebuildDisplayRows()
})
</script>

<style scoped>
@media print {
  @page {
    size: 8.5in 11in;
    margin: 0;
  }

  body {
    margin: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Repeat header groups on each page (Chromium) */
  .grid-thead {
    display: table-header-group;
  }
  .grid-tbody {
    display: table-row-group;
  }

  /* Prevent a data row from splitting across pages */
  .grid-row {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .page-number::after {
    content: "Page " counter(page) " of " counter(pages);
  }
}
</style>
