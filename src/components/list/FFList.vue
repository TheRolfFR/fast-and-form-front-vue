<template>
  <div class="ff-list">
    <div class="ff-list-top">
      <FFListColumnsDisplayed />
      <FFListFilterZone />
    </div>
    <b-button-toolbar class="ff-list-actions text-right my-2">
      <div class="filler"></div>
      <div class="ff-data-actions">
        <FFListDataImport />
        <FFListDataExport />
      </div>
      <FFListEntryActions class="ff-entries-actions" :edit="edit" size="" />
    </b-button-toolbar>
    <div class="ff-list-main">
      <div v-if="loading" class="text-center">
        <b-spinner small variant="primary" label="Loading data" />
        Loading data...
      </div>
      <FFTable
        v-else
        :data="data"
        :columns="[]"
        :entity="entity"
        :edit="edit"
      />
    </div>
    <div class="ff-list-bottom">
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
    entity: {
      required: true,
      type: Object,
    },
    entityName: {
      required: true,
      type: String,
    },
    edit: {
      required: false,
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data: function () {
    return {
      list: [],
      loading: true,
    };
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

<style>
.filler {
  flex-grow: 1;
  text-align: center;
}
.ff-list-top {
  height: 220px;
  border: 2px solid grey;
  border-radius: 0.25rem;
}
.ff-list-top::before {
  content: "Zone d'affichage de colonne et zone de filtrage: Demillet et Mohamad";
}
</style>
