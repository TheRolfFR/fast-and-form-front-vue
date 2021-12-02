/* eslint-disable */
<template>
  <div>
    <h2 v-text="title"></h2>
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
    <div class="mt-3">
      <b-alert v-model="showAlert" :variant="bVarriant" dismissible>
        {{ alertMessage }}
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
import { validators } from "vue-form-generator";
Vue.component("fieldDatePicker", FFDatePicker);
import axios from "axios";

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
      required: true,
    },
    baseURL: {
      required: true,
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
      showAlert: false,
      bVarriant: "primary",
      alertMessage: "",
    };
  },
  async created() {
    // try {
    //   // const res = await axios.get(baseURL);
    //   // this.dataForm = res.data;
    //   // recuperation des noms d'objet 'head'
    //   this.headDataForm = Object.keys(this.content);
    //   // console.log("headDataForm");
    //   alert("coucou " + this.headDataForm);
    // } catch (e) {
    //   console.error(e);
    //   //alert("error");
    // }
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
  },
  methods: {
    reset: function () {
      let txt;
      for (let x in this.content) {
        txt += x + " :   " + this.content[x] + "\n";
        this.content[x] = this.byDefault[x];
      }
      this.showAlert = true;
      this.alertMessage =
        "Reset : Les valeurs du formulaire ont réinitialiser. Anciennes valeurs : [" +
        txt +
        "]";
      this.bVarriant = "warning";
    },
    clear: function () {
      let txt;
      for (let x in this.content) {
        txt += x + " :   " + this.content[x] + "\n";
        this.content[x] = "";
      }
      this.showAlert = true;
      this.alertMessage =
        "Clear : Le formulaire a été vidé. Anciennes valeurs : [" + txt + "]";
      this.bVarriant = "danger";
      this.isValid = false;
    },

    cancel: function () {
      this.showAlert = true;
      this.alertMessage = "Cancel : Le formulaire ne sera pas pris en compte";
      this.bVarriant = "dark";
    },
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
    async submit() {
      try {
        const res = await axios.post(this.url, this.content);
        this.dataForm = [...this.dataForm, res.data];
      } catch (e) {
        console.error(e);
      }
      let txt;
      for (let x in this.content) {
        txt += x + " :   " + this.content[x] + "\n";
      }
      this.showAlert = true;
      this.clear();
      this.alertMessage =
        "Submit : Le formulaire est enregistré. Valeurs : [" + txt + "]";
      this.bVarriant = "primary";
    },
    async getDataList() {
      const res = await axios
        .get(this.url)
        .then((response) => (this.dataList = response.data));
      this.dataForm = res.data;
    },
  },
  onBeforeMount: () => {
    this.content = this.$props.original;
    this.$emit("input", this.content);
    this.url = this.$props.baseURL;
    this.getDataList();
  },
  watch: {
    content: {
      handler: function () {
        this.$emit("input", this.content);
      },
      deep: true,
      immediate: true,
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
