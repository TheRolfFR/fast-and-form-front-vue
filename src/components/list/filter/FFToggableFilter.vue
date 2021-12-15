<template>
  <div class="col">
    <b-form-checkbox v-model="status">
      {{ prop.displayName }}
    </b-form-checkbox>
    <FFFilterString
      v-if="prop.type === 'string'"
      :prop="prop"
      :disabled="!status"
      v-model="filterValue"
      class="mt-2"
    />
    <FFFilterArray
      v-if="prop.type === 'array'"
      :prop="prop"
      :disabled="!status"
      v-model="filterValue"
      class="mt-2"
    />
  </div>
</template>

<script>
import FFFilterArray from "./FFFilterArray.vue";
import FFFilterString from "./FFFilterString.vue";

export default {
  name: "FFToggableFilter",
  components: { FFFilterString, FFFilterArray },
  props: {
    propName: {
      type: String,
      required: true,
    },
    prop: {
      type: Object,
      required: true,
    },
    value: {
      required: false,
    },
  },
  data: function () {
    return {
      filterValue: this.value,
      status: false,
    };
  },
  watch: {
    filterValue: function (newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
