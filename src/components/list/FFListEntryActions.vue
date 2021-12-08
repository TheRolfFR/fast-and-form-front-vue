<template>
  <b-button-group>
    <b-button :disabled="read" v-b-tooltip.hover="'Edit'" variant="primary">
      <b-icon icon="pencil-fill" aria-label="Edit"></b-icon>
    </b-button>
    <b-button :disabled="read" v-b-tooltip.hover="'Delete'" variant="primary">
      <b-icon icon="trash2-fill" aria-label="Delete"></b-icon>
    </b-button>
    <b-button v-b-tooltip.hover="'See full entry'" variant="primary">
      <b-icon icon="eye-fill" aria-label="See full entry"></b-icon>
    </b-button>
    <b-button
      :disabled="true"
      v-b-tooltip.hover="'Add to favorite'"
      variant="primary"
    >
      <b-icon icon="star-fill" aria-label="Add to favorite"></b-icon>
    </b-button>
  </b-button-group>
</template>

<script>
export default {
  name: "FFListEntryActions",
  props: {
    edit: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    read: function () {
      return !this.edit;
    },
  },
};
</script>
