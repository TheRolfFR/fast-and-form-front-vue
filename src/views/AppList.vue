<template>
  <div>
    <div class="text-right">
      <button class="btn btn-secondary mb-1" @click="edit = !edit">
        Switch edit mode
      </button>
    </div>
    <FFList
      :baseURL="baseURL"
      :entity="entity"
      :entityName="entityName"
      :edit="edit"
    />
  </div>
</template>

<script>
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
  },
  data: function () {
    return {
      host: "http://localhost",
      port: 3004,
      edit: true,
      entities: {
        users: require("../assets/entity_user.json"),
        contributions: require("../assets/entity_contribution.json"),
      },
    };
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
};
</script>
