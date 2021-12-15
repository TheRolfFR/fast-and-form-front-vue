<template>
  <b-card
    class="ff-filter-card"
    :bg-variant="$store.ff.config.dark ? 'dark' : ''"
  >
    <h4>Filter zone</h4>
    <div
      v-for="(propLine, index) in propertiesDivided"
      :key="index"
      class="row"
    >
      <template v-for="(prop, propKey) in propLine"
        ><FFToggableFilter
          :prop="prop"
          :propName="propKey"
          :key="propKey"
          v-model="filters[propKey]"
        />
      </template>
    </div>
  </b-card>
</template>

<script>
import Vue from "vue";
import FFToggableFilter from "./filter/FFToggableFilter.vue";

const DIVIDED = 3;

export default {
  name: "FFListFilterZone",
  components: { FFToggableFilter },
  props: {
    value: {
      required: false,
    },
    entityName: {
      required: true,
    },
  },
  data: function () {
    return {
      filters: {},
    };
  },
  computed: {
    properties: function () {
      return Vue.getEntity(this.entityName).properties || {};
    },
    propertiesDivided: function () {
      const result = [];
      const propKeys = Object.keys(this.properties);
      for (let i = 0; i < propKeys.length; ++i) {
        if (i % DIVIDED == 0) result.push({});
        result[result.length - 1][propKeys[i]] = this.properties[propKeys[i]];
      }
      return result;
    },
  },
  watch: {
    filters: function (newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>

<style>
.ff-filter-card {
  height: 100%;
  overflow: hidden scroll;
}
.ff-filter-card > .card-body {
  padding: 0.4rem;
}
</style>
