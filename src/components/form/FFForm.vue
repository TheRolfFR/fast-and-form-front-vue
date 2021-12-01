<template>
  <div>
    <h2 v-text="title"></h2>
    <vue-form-generator
      :schema="schema"
      :model="model"
      :options="formOptions"
    ></vue-form-generator>
    <div class="float-right">
      <b-button-group>
        <b-button variant="success" v-on:click="reset"> Reset </b-button>
        <b-button variant="danger" v-on:click="clear"> Clear </b-button>
        <b-button variant="secondary" v-on:click="cancel"> Cancel </b-button>
        <b-button variant="primary" @click="submit"> Submit </b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
import ToastMixin from "../../mixins/ToastMixin"; // mixin to show toasts for error for example

import Vue from "vue";
import FFDatePicker from "./FFDatePicker.vue";
Vue.component("fieldDatePicker", FFDatePicker);

export default {
  mixins: [ToastMixin],
  name: "ff-form",
  props: {
    title: {
      required: true,
      type: String,
    },
    schema: {
      required: true,
      type: Object,
    },
    original: {
      required: true,
    },
    byDefault: {
      required: false,
    },
    value: {
      required: false,
    },
  },
  data: function () {
    return {
      content: this.value,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },
  computed: {
    model: function () {
      return {};
    },
  },
  methods: {
    reset: function () {},
    clear: function () {},
    cancel: function () {},
    submit: function () {},
  },
  onBeforeMount: () => {
    this.content = this.$props.original;
    this.$emit("input", this.content);
  },
  watch: {
    content: {
      handler: function () {
        this.$emit("input", this.content);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
