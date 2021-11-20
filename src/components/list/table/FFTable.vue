<template>
  <div>
    <FFTableHeader />
    <div class="ff-table-body">
      <FFEntry />
    </div>
    <FFTableFooter />
  </div>
</template>

<script>
import FFTableFooter from "./FFTableFooter.vue";
import FFEntry from "./entry/FFEntry.vue";
import FFTableHeader from "./FFTableHeader.vue";
export default {
  name: "FFTable",
  components: {
    FFTableHeader,
    FFEntry,
    FFTableFooter,
  },
};
</script>
