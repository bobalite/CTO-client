<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-window">
      <!-- PRINT ROOT -->
      <section id="print-area" class="print-root" :style="printVars">
        <!-- repeating header -->
        <header class="print-header">
          <div class="header-left">
            <strong>{{ title }}</strong>
            <div class="muted">{{ subtitle }}</div>
          </div>
          <div class="header-right muted">
            {{ new Date().toLocaleString() }}
          </div>
        </header>

        <!-- main content -->
        <main class="print-body">
          <h2 class="section-title text-center">Children's
          Rights Situational Analysis (CRSA)</h2>
          <p class="muted"></p>

          <h2 class="section-title">Items</h2>

          <!-- multi-page table -->
          <table class="print-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th class="num">Qty</th>
                <th class="num">Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(row, i) in rows" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ row.desc }}</td>
                <td class="num">{{ row.qty }}</td>
                <td class="num">{{ row.amount }}</td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td colspan="3" class="num"><strong>Total</strong></td>
                <td class="num"><strong>{{ total }}</strong></td>
              </tr>
            </tfoot>
          </table>
        </main>

        <!-- repeating footer -->
        <footer class="print-footer">
          <div class="muted">Confidential</div>
          <div class="page-number"></div>
        </footer>
      </section>

      <!-- screen-only controls -->
      <div class="modal-actions no-print">
        <button @click="printNow">Print</button>
        <button @click="show = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

definePageMeta({
  layout: 'main'
})


const show = ref(true)

const title = ref('')
const subtitle = ref('')

const rows = ref(
  Array.from({ length: 120 }).map((_, i) => ({
    desc: `Line item ${i + 1} - long descriptions should wrap and still print.`,
    qty: (i % 5) + 1,
    amount: ((i % 7) + 1) * 100,
  }))
)

const total = computed(() =>
  rows.value.reduce((sum, r) => sum + r.amount, 0)
)

const printSettings = ref({
  // dynamic margins + header/footer heights
  marginTop: '0.6in',
  marginRight: '0.6in',
  marginBottom: '0.7in',
  marginLeft: '0.6in',
  headerHeight: '0.9in',
  footerHeight: '0.55in',
})

const printVars = computed(() => ({
  '--m-top': printSettings.value.marginTop,
  '--m-right': printSettings.value.marginRight,
  '--m-bottom': printSettings.value.marginBottom,
  '--m-left': printSettings.value.marginLeft,
  '--header-h': printSettings.value.headerHeight,
  '--footer-h': printSettings.value.footerHeight,
}))

function printNow() {
  window.print()
}
</script>
<style lang="css" scoped>
/* SCREEN preview sizing */
.print-root {
  width: 8.5in;
  min-height: 11in;
  background: #fff;
  box-sizing: border-box;
  margin: 0 auto;
}

/* Header/footer layout (works in print) */
.print-header,
.print-footer {
  position: fixed;
  left: 0;
  right: 0;
  padding-left: var(--m-left);
  padding-right: var(--m-right);
  box-sizing: border-box;
  background: #fff;
}

.print-header {
  top: 0;
  height: var(--header-h);
  padding-top: 0.2in;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.print-footer {
  bottom: 0;
  height: var(--footer-h);
  padding-bottom: 0.15in;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

/* Body area must reserve space for fixed header/footer */
.print-body {
  padding-top: calc(var(--m-top) + var(--header-h));
  padding-bottom: calc(var(--m-bottom) + var(--footer-h));
  padding-left: var(--m-left);
  padding-right: var(--m-right);
  box-sizing: border-box;
}

/* Table printing rules */
.print-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 11pt;
}

.print-table th,
.print-table td {
  border: 1px solid #111;
  padding: 6px 8px;
  vertical-align: top;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}

.print-table thead {
  display: table-header-group;
  /* repeat header each page */
}

.print-table tfoot {
  display: table-footer-group;
  /* footer group behavior */
}

.print-table tr {
  break-inside: avoid;
  page-break-inside: avoid;
  /* older */
}

.num {
  text-align: right;
  white-space: nowrap;
}

.section-title {
  margin: 0.15in 0 0.08in;
}

.muted {
  color: #444;
  font-size: 10pt;
}

/* Print-only rules */
@media print {
  @page {
    size: 8.5in 11in;
    margin: 0;
    /* we manage margins ourselves */
  }

  body {
    margin: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Hide everything except the print root */
  body * {
    visibility: hidden;
  }

  #print-area,
  #print-area * {
    visibility: visible;
  }

  #print-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 8.5in;
    min-height: 11in;
  }

  .no-print {
    display: none !important;
  }

  /* Page number (Chromium-based browsers handle this reliably) */
  .page-number::after {
    content: "Page " counter(page) " of " counter(pages);
  }
}
</style>