/* eslint-disable */
<template>
  <div>
    <h2>{{ "Edit/Add " + $route.params.entity }}</h2>
    <FFForm
      :entityName="entityName"
      :baseURL="baseURL"
      :id="$route.params.id"
    />
  </div>
</template>

<script>
import FFForm from "../components/form/FFForm.vue";

export default {
  name: "app-list",
  data: function () {
    return {
      users: {
        baseURL: "http://localhost:3004/Form_users",
      },
      contributions: {
        baseURL: "http://localhost:3004/Form_contributions",
      },
    };
  },
  components: {
    FFForm,
  },
  computed: {
    id: function () {
      return this.$route.id;
    },
    baseURL: function () {
      return this.entityData.baseURL;
    },
    entityData: function () {
      return this.$data[this.entityName];
    },
    entityName: function () {
      return this.$route.params.entity;
    },
  },
};
</script>
