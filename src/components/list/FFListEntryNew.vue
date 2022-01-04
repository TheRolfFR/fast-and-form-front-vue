<template>
  <b-button
    class="mr-4"
    v-b-tooltip.hover="'Add new entry'"
    @click="goToNewEntry"
  >
    <b-icon icon="plus" aria-label="Add new entry"></b-icon>
    Add new entry
  </b-button>
</template>

<script>
export default {
  name: "FFListEntryNew",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToNewEntry: function () {
      window.location.href = this.url;
    },
  },
};
</script>
