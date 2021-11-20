<template>
  <div>
    <h2 v-text="title"></h2>
    <vue-form-generator
      :schema="schema"
      :model="model"
      :options="formOptions"
    ></vue-form-generator>
    <b-button type="button" class="btn btn-success" v-on:click="reset">
      Reset
    </b-button>
    <b-button type="button" class="btn btn-danger" v-on:click="clear">
      Clear
    </b-button>
    <b-button type="button" class="btn btn-secondary" v-on:click="cancel">
      Cancel
    </b-button>
    <b-button type="button" class="btn btn-primary" @click="submit">
      Submit
    </b-button>
  </div>
</template>

<script>
import ToastMixin from "../../mixins/ToastMixin"; // mixin to show toasts for error for example

export default {
  mixins: [ToastMixin],
  name: "ff-form",
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  data: function () {
    return {
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },
  computed: {
    schema: function () {
      return {};
    },
    model: function () {
      return {};
    },
  },
  method: {
    reset: function () {},
    clear: function () {},
    cancel: function () {},
    submit: function () {},
  },
};
</script>
