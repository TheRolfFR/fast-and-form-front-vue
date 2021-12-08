<template>
  <div>
    <div class="text-right">
      <span>Results per page: </span>
      <b-form-radio-group
        id="btn-radios-1"
        size="sm"
        v-model="rows"
        :options="options"
        name="radios-btn-default"
        buttons
      ></b-form-radio-group>
    </div>
    <b-table-simple class="my-2">
      <FFTableHeader :columns="displayedColumns" />
      <b-tbody>
        <FFEntry
          class="ff-table-body"
          v-for="(entry, index) in displayedData"
          :key="hash(entry, index)"
          :data="entry"
        />
      </b-tbody>
      <FFTableFooter />
    </b-table-simple>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="right"
      variant="secondary"
      size="sm"
      first-number
    ></b-pagination>
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
  props: {
    schema: {
      required: true,
      type: Object,
    },
    data: {
      required: true,
      type: Array,
    },
    columns: {
      required: true,
      type: Array,
    },
  },
  computed: {
    displayedColumns: function () {
      return this.columns.length > 0
        ? this.columns
        : this.data.length > 0
        ? Object.keys(this.data[0])
        : [];
    },
    displayedData: function () {
      const result = [];
      const data = this.data || [];

      let tmp;
      data.forEach((entry) => {
        tmp = {};

        this.displayedColumns.forEach((col) => {
          tmp[col] = entry[col];
        });
        result.push(tmp);
      });

      return result;
    },
  },
  methods: {
    hash: function (obj, index) {
      return JSON.stringify(obj) + "-" + index;
    },
  },
  data: function () {
    return {
      options: [
        { text: "25", value: 25 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
      ],
      rows: 25,
      perPage: 1,
      currentPage: 5,
    };
  },
};
</script>
