<template>
  <div>
    <div class="text-right">
      <button class="btn btn-secondary mb-1" @click="switchEditMode">
        <b-icon :icon="edit ? 'pencil-fill' : 'book-fill'"></b-icon>
        <span> {{ (edit ? "Edit" : "Read") + " mode" }}</span>
      </button>
    </div>
    <FFList :newEntryURL="'/#/form/' + entityName" :entityName="entityName" />
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
    edit: function () {
      return Vue.ff.config.edit;
    },
  },
  data: function () {
    return {};
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

<style>
body {
  overflow-y: scroll;
}
</style>
