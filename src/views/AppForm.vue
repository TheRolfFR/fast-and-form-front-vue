/* eslint-disable */
<template>
  <div>
    <h2>{{ "Edit/Add " + entityName }}</h2>
    <FFForm :entityName="entityName" :id="id" />
  </div>
</template>

<script>
import FFForm from "../components/form/FFForm.vue";

export default {
  name: "app-list",
  data: function () {
    return {};
  },
  components: {
    FFForm,
  },
  computed: {
    id: function () {
      return this.$route.params.id;
    },
    entityName: function () {
      return this.$route.params.entity;
    },
  },
};
</script>
