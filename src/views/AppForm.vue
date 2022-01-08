/* eslint-disable */
<template>
  <div>
    <h2>{{ "Edit/Add " + $route.params.entity }}</h2>
    <FFForm
      :byDefault="byDefault"
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
        byDefault: {
          username: "",
          type: ["Contributor"],
        },
        baseURL: "http://localhost:3004/Form_users",
      },
      contributions: {
        byDefault: {
          res: "",
          date: "today",
          TextureID: "",
          contributors: [],
        },
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
    byDefault: function () {
      return this.entityData.byDefault;
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
