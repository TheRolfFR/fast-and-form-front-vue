<template>
  <div class="FFList">
    <div class="FFList-top">
      <FFListColumnsDisplayed />
      <FFListFilterZone />
    </div>
    <div class="FFList-actions">
      <div class="ff-data-actions">
        <FFListDataImport />
        <FFListDataExport />
      </div>
      <div class="ff-entries-actions">
        <FFListEntryActions />
      </div>
    </div>
    <div class="FFList-main">
      <FFTable />
    </div>
    <div class="FFList-bottom">
      <FFListEntryNew />
    </div>
  </div>
</template>

<script>
import FFListFilterZone from "./FFListFilterZone.vue";
import FFListColumnsDisplayed from "./FFListColumnsDisplayed.vue";
import FFListEntryNew from "./FFListEntryNew.vue";
import FFTable from "./table/FFTable.vue";
import FFListEntryActions from "./FFListEntryActions.vue";
import FFListDataExport from "./FFListDataExport.vue";
import FFListDataImport from "./FFListDataImport.vue";

export default {
  components: {
    FFListDataExport,
    FFListDataImport,
    FFListEntryActions,
    FFTable,
    FFListEntryNew,
    FFListColumnsDisplayed,
    FFListFilterZone,
  },
  name: "FFList",
};
</script>
