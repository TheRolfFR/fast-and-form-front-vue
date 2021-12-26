/* eslint-disable */
<template>
  <div>
    <div v-if="loading" class="text-center">
      <b-spinner small variant="primary" label="Loading data" /> Loading data...
    </div>
    <template v-else>
      <vue-form-generator
        :schema="finalSchema"
        :model="content"
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
          v-b-tooltip.hover="'Clears values to default values'"
          class="mx-1"
        >
          Clear </b-button
        ><b-button
          v-if="cancelButton"
          variant="secondary"
          v-on:click="cancel"
          v-b-tooltip.hover="'Returns to last page'"
          class="mx-1"
        >
          Cancel </b-button
        ><b-button
          variant="primary"
          @click="submit"
          v-b-tooltip.hover="'Submits and sends the result'"
          class="ml-1"
          :disabled="!isValid"
        >
          Submit
        </b-button>
      </div>
    </template>
    <div class="mt-3">
      <b-alert v-model="alert.show" :variant="alert.variant" dismissible>
        {{ alert.message }}
      </b-alert>
    </div>
    <div class="mt-3">
      <button v-on:click="getDataList">Get Data</button>
      <div>{{ dataList }}</div>
    </div>
  </div>
</template>

<script>
import ToastMixin from "../../mixins/ToastMixin"; // mixin to show toasts for error for example

import Vue from "vue";
import FFDatePicker from "./FFDatePicker.vue";
import FFAutocomplete from "./FFAutocomplete.vue";
import { validators } from "vue-form-generator";
Vue.component("fieldAutocomplete", FFAutocomplete);
Vue.component("fieldDatePicker", FFDatePicker);
import axios from "axios";
import { cloneDeep } from "lodash";

export default {
  mixins: [ToastMixin],
  name: "ff-form",
  props: {
    id: {
      required: true,
    },
    schema: {
      required: true,
      type: Object,
    },
    byDefault: {
      required: false,
    },
    baseURL: {
      required: true,
    },
    cancelButton: {
      required: false,
      type: Boolean,
      default: function () {
        return true;
      },
    },
    cancelURL: {
      required: false,
      type: String,
      default: function () {
        return undefined;
      },
    },
  },
  data: function () {
    return {
      dataList: [],

      content: this.value,

      url: this.baseURL,

      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true,
      },
      isValid: false,
      errors: [],
      alert: {
        show: false,
        variant: "primary",
        message: "",
      },
      loading: true,

      original: undefined,
    };
  },
  computed: {
    model: function () {
      return 1;
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
    isNewForm: function () {
      return !this.id;
    },
    method: function () {
      return this.isNewForm ? "post" : "patch";
    },
    submitURL: function () {
      return this.baseURL + "/" + (this.isNewForm ? "" : this.id);
    },
    getURL: function () {
      return this.isNewForm ? undefined : this.submitURL;
    },
  },
  methods: {
    /**
     * Reset changes fields to their original values, the ones before being saved
     */
    reset: function () {
      let copy = cloneDeep(this.content);
      for (let x in copy) {
        copy[x] = this.original[x];
      }
      Vue.set(this, "content", copy);
    },
    /**
     * Clear erases all the values to the default model chosen
     */
    clear: function () {
      let copy = cloneDeep(this.content);
      for (let x in copy) {
        copy[x] = this.byDefault[x];
      }
      Vue.set(this, "content", copy);
    },

    cancel: function () {
      if (this.cancelURL) {
        window.location.href = this.cancelURL;
      } else {
        window.history.back();
      }
    },
    onValidated: function (isValid, errors) {
      this.isValid = isValid; // disables submit button
      this.errors = errors; // groups errors where we can access them
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
    submit: function () {
      if (!this.isValid) return;

      axios[this.method](this.submitURL, this.content)
        .then(() => {
          this.alert.variant = "primary";
          this.alert.message =
            "Success : The form has been saved. Values : " +
            JSON.stringify(this.content);
        })
        .catch((err) => {
          console.error(err);
          this.alert.variant = "danger";
          this.alert.message =
            "Error : The form has not been saved. Error : " +
            JSON.stringify(err);
        })
        .finally(() => {
          this.alert.show = true;
        });
    },
    async getDataList() {
      const res = await axios
        .get(this.url)
        .then((response) => (this.dataList = response.data));
      this.dataForm = res.data;
    },
    changeContent: function () {
      let copy;
      // if I have no ID it means it is a new entry so put default value
      if (this.id === undefined) {
        copy = cloneDeep(this.byDefault);
        Vue.set(this, "content", copy);
        Vue.set(this, "original", copy);

        this.loading = false;
      } else {
        this.getOriginal();
      }
    },
    getOriginal: function () {
      const getURL = this.getURL;
      if (!getURL) {
        this.loading = false;
        this.alert = {
          variant: "danger",
          message: "Error while charging original, no get URL",
          show: true,
        };
        return Promise.reject(new Error(this.alert.message));
      }
      return axios
        .get(getURL)
        .then((res) => {
          let data = res.data;
          console.log(data);
          Vue.set(this, "content", data);
          Vue.set(this, "original", data);
        })
        .catch((err) => {
          this.alert = {
            variant: "danger",
            message: JSON.stringify(err),
            show: true,
          };

          return Promise.reject(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created: function () {
    this.changeContent();
  },
  watch: {
    content: {
      handler: function () {
        this.$emit("input", this.content);
      },
      deep: true,
      immediate: true,
    },
    id: function () {
      this.changeContent();
    },
    title: {
      handler: function () {
        //changement de page de formulaire
        this.content = this.$props.original;
        this.url = this.$props.baseURL;
        this.clear();
        this.getDataList();
        this.showAlert = false;
      },
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
