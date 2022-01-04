<template>
  <div class="ff-list">
    <div class="ff-list-top row">
      <div class="col-3">
        <FFListColumnsDisplayed />
      </div>
      <div class="col-9">
        <FFListFilterZone :entityName="entityName" v-model="filters" />
      </div>
    </div>
    <b-button-toolbar key-nav class="ff-list-actions text-right my-2">
      <div class="ff-data-actions">
        <FFListDataImport class="mr-1" />
        <FFListDataExport />
      </div>
      <div class="filler"></div>
      <FFListEntryActions class="ff-entries-actions" :edit="edit" size="" />
    </b-button-toolbar>
    <div class="ff-list-main">
      <div v-if="loading" class="text-center">
        <b-spinner small variant="primary" label="Loading data" />
        Loading data...
      </div>
      <FFTable v-else :data="data" :columns="[]" :entity="entity" />
    </div>
    <div class="ff-list-bottom text-right">
      <FFListEntryNew :url="newEntryURL" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import FFListFilterZone from "./FFListFilterZone.vue";
import FFListColumnsDisplayed from "./FFListColumnsDisplayed.vue";
import FFListEntryNew from "./FFListEntryNew.vue";
import FFTable from "./table/FFTable.vue";
import FFListEntryActions from "./FFListEntryActions.vue";
import FFListDataExport from "./FFListDataExport.vue";
import FFListDataImport from "./FFListDataImport.vue";
import axios from "axios";
import ToastMixin from "../../mixins/ToastMixin";

export default {
  mixins: [ToastMixin],
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
  props: {
    baseURL: {
      required: true,
      type: String,
    },
    newEntryURL: {
      required: true,
      type: String,
    },
    entity: {
      required: true,
      type: Object,
    },
    entityName: {
      required: true,
      type: String,
    },
  },
  data: function () {
    return {
      data: [],
      list: [],
      filters: [],
      loading: true,
    };
  },
  computed: {
    edit: function () {
      return Vue.ff.config.edit;
    },
  },
  created: function () {
    this.read(this.entityName);
  },
  watch: {
    entityName: function (newValue) {
      this.read(newValue);
    },
  },
  methods: {
    read: function () {
      this.loading = true;
      return axios
        .get(this.baseURL)
        .then((res) => {
          const json = res.data;

          this.data = json;
        })
        .catch((err) => {
          const message = err.message || "List read failed";
          this.showToastDanger(
            "Error while reading list data for entity " + this.entityName,
            message
          );

          return Promise.reject(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.filler {
  flex-grow: 1;
  text-align: center;
}
.ff-list-top {
  height: 220px;

  & > * {
    height: 100%;
  }
}
</style>
