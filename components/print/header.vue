<template>
  <div class="print-header grid grid-cols-20 gap-0 border border-gray-300">

    <!-- Row 1: top spacer band (optional) -->
    <div class="col-span-20 h-4 bg-white border-b border-gray-300"></div>

    <!-- Row 2: logos + title -->
    <div class="col-span-2 flex items-center justify-center border-r border-gray-300 p-2">
      <img
        src="/assets/images/davao.png"
        class="header-logo"
        alt="Davao City"
      />
    </div>

    <div class="col-span-16 flex flex-col items-center justify-center p-2">
      <div class="header-org">
        SPECIAL OFFICE FOR CHILDREN'S CONCERNS (SOCC)
      </div>
      <div class="header-title">
        Child Rights Situational Analysis (CRSA) – Children's Database System Indicators
      </div>
    </div>

    <div class="col-span-2 flex items-center justify-center border-l border-gray-300 p-2">
      <img
        src="/assets/images/socc.jpg"
        class="header-logo"
        alt="SOCC"
      />
    </div>

  </div>
</template>

<style scoped>
/* Force stable 20-col grid everywhere (screen + print) */
.print-header {
  display: grid;
  grid-template-columns: repeat(20, minmax(0, 1fr));
}

/* Logos: keep them controlled so they don't blow up the row height */
.header-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

/* Typography tuned for print */
.header-org {
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  color: #111827;
}

.header-title {
  margin-top: 0.25rem;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  color: #111827;
}

/* Print hardening */
@media print {
  .header-logo {
    width: 56px;
    height: 56px;
  }

  .header-org {
    font-size: 12.5pt;
  }

  .header-title {
    font-size: 11pt;
  }
}
</style>
