<template>
  <div>
    <div class="text-right">
      <button class="btn btn-secondary mb-1" @click="edit = !edit">
        Switch edit mode
      </button>
    </div>
    <FFList :baseURL="baseURL" :entity="entity" :edit="edit" :schema="{}" />
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
    entity: function () {
      const entity =
        this.$route && this.$route.params
          ? this.$route.params.entity
          : undefined;
      if (entity === undefined) throw new Error("No entity given");
      return entity;
    },
    baseURL: function () {
      return this.host + ":" + String(this.port) + "/" + "Form_" + this.entity;
    },
  },
  data: function () {
    return {
      host: "http://localhost",
      port: 3004,
      edit: true,
    };
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
};
</script>
