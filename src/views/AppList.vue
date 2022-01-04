<template>
  <div>
    <div class="text-right">
      <button class="btn btn-secondary mb-1" @click="switchEditMode">
        <b-icon :icon="edit ? 'pencil-fill' : 'book-fill'"></b-icon>
        <span> {{ (edit ? "Edit" : "Read") + " mode" }}</span>
      </button>
    </div>
    <FFList
      :baseURL="baseURL"
      :newEntryURL="'/#/form/' + entityName"
      :entity="entity"
      :entityName="entityName"
    />
  </div>
</template>

<script>
import Vue from "vue";
import FFList from "../components/list/FFList.vue";

export default {
  name: "app-list",
  components: {
    FFList,
  },
  computed: {
    entityName: function () {
      const entityName =
        this.$route && this.$route.params
          ? this.$route.params.entity
          : undefined;
      if (entityName === undefined) throw new Error("No entity name given");
      return entityName;
    },
    entity: function () {
      const entityName = this.entityName;
      if (this.entities[entityName] === undefined)
        throw new Error("No entity given");
      return this.entities[entityName] || {};
    },
    baseURL: function () {
      return (
        this.host + ":" + String(this.port) + "/" + "Form_" + this.entityName
      );
    },
    edit: function () {
      return Vue.ff.config.edit;
    },
  },
  data: function () {
    return {
      host: "http://localhost",
      port: 3004,
      entities: {
        users: require("../assets/entity_user.json"),
        contributions: require("../assets/entity_contribution.json"),
      },
    };
  },
  methods: {
    switchEditMode: function () {
      Vue.ff.config.edit = !Vue.ff.config.edit;
    },
  },
  watch: {
    $route(to, from) {
      to;
      from;
      // console.log(to, from);
    },
  },
};
</script>
