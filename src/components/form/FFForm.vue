<template>
  <div>
    <h2 v-text="title"></h2>
    <vue-form-generator
      :schema="finalSchema"
      :model="model"
      :options="formOptions"
      @validated="onValidated"
    ></vue-form-generator>
    <div class="text-right">
      <b-button
        variant="warning"
        v-on:click="reset"
        v-b-tooltip.hover
        class="mr-1"
        title="Resets form to original values"
      >
        Reset
      </b-button>
      <b-button
        variant="danger"
        v-on:click="clear"
        v-b-tooltip.hover
        class="mx-1"
        title="Clears values to default values"
      >
        Clear </b-button
      ><b-button
        variant="secondary"
        v-on:click="cancel"
        v-b-tooltip.hover
        class="mx-1"
        title="Returns to last page"
      >
        Cancel </b-button
      ><b-button
        variant="primary"
        @click="submit"
        class="ml-1"
        :disabled="!isValid"
        title="submits and sends the result"
      >
        Submit
      </b-button>
    </div>
  </div>
</template>

<script>
import ToastMixin from "../../mixins/ToastMixin"; // mixin to show toasts for error for example

import Vue from "vue";
import FFDatePicker from "./FFDatePicker.vue";
import { validators } from "vue-form-generator";
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
      isValid: false,
      errors: [],
    };
  },
  computed: {
    model: function () {
      return {};
    },
    finalSchema: function () {
      let result = this.schema;
      result.fields = this.toArr(result.fields);

      for (let i = 0; i < result.fields.length; ++i) {
        result.fields[i] = this.addValidator(result.fields[i]);
      }

      result.groups = this.toArr(result.groups);

      let group;
      for (let i = 0; i < result.groups.length; ++i) {
        group = result.groups[i];
        for (let j = 0; j < result.length; ++j) {
          result.fields[i] = this.addValidator(result.fields[j]);
        }
        result.groups[i] = group;
      }

      return result;
    },
  },
  methods: {
    reset: function () {},
    clear: function () {},
    cancel: function () {},
    submit: function () {},
    onValidated: function (isValid, errors) {
      this.isValid = isValid;
      this.errors = errors;
    },
    toArr: function (el) {
      if (el === undefined) return [];
      if (Array.isArray(el)) return el;
      return [el];
    },
    append: function (el, cur) {
      const arr = this.toArr(el);
      if (arr.indexOf(cur) == -1) arr.push(cur);
      return arr;
    },
    addValidator(field) {
      // fix select required tag
      if (field.required) {
        if (field.type === "select") {
          field.validator = this.append(field.validator, validators.required);
        } else if (field.type === "datePicker" || field.type === "DatePicker") {
          field.validator = this.append(field.validator, validators.date);
        } else if (field.type === "Checklist") {
          field.validator = this.append(field.validator, validators.array);
        }
      }
      return field;
    },
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

<style>
.listbox.form-control,
.combobox.form-control {
  height: auto;
}
</style>
