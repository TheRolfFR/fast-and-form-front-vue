<template>
  <FFForm
    :title="'edit/add ' + $route.params.entity"
    :schema="correctSchema"
    :byDefault="byDefault"
    :original="original"
    v-model="model"
  />
</template>

<script>
import FFForm from "../components/form/FFForm.vue";
import VueFormGenerator from "vue-form-generator";

export default {
  name: "app-list",
  data: function () {
    return {
      users: {
        original: {},
        byDefault: {
          id: undefined,
          username: "",
          type: ["Contributor"],
        },
        model: {},
      },
      contributions: {
        original: {},
        byDefault: {
          id: undefined,
          res: "c32",
          date: new Date().getTime(),
          textureId: undefined,
          contributors: [],
        },
      },
    };
  },
  components: {
    FFForm,
  },
  mounted() {
    console.log(this.$route.params);
  },
  computed: {
    original: function () {
      return this.entityData.original;
    },
    byDefault: function () {
      return this.entityData.default;
    },
    model: function () {
      return this.entityData.model;
    },
    entityData: function () {
      return this.$data[this.entityName];
    },
    entityName: function () {
      return this.$route.params.entity;
    },
    correctSchema: function () {
      const entityName = this.entityName;
      if (entityName === "users") {
        return {
          fields: [
            {
              type: "input",
              inputType: "text",
              label: "Username",
              model: "username",
            },
            {
              type: "select",
              label: "User type",
              model: "type",
              values: [
                "Administrator",
                "Donator",
                "Add-on Maker",
                "Mods Contributor",
                "Contributor",
                "Dungeons Contributor",
                "Developer",
                "Translator",
              ],
            },
          ],
        };
      } else if (entityName === "contributions") {
        return {
          fields: [
            {
              type: "input",
              inputType: "number",
              label: "Id",
              model: "id",
              validator: VueFormGenerator.validators.integer,
              disabled: true,
            },
            {
              type: "select",
              label: "Res",
              model: "res",
              values: ["c32", "c64"],
            },
            {
              type: "pikaday",
              label: "Simple datepicker",
              placeholder: "User's birth of date",
              model: "date",
              validator: VueFormGenerator.validators.date,
              pikadayOptions: {
                position: "top left",
              },
            },
            {
              type: "input",
              inputType: "number",
              label: "Texture ID",
              model: "TextureID",
              validator: VueFormGenerator.validators.integer,
            },
            {
              type: "Checklist",
              label: "Contributors",
              model: "contributors",
              listBox: true,
              values: [
                "230151512451",
                "230151512452",
                "230151512453",
                "230151512454",
                "230151512455",
                "230151512456",
                "230151512457",
              ],
            },
          ],
        };
      }
      return false;
    },
  },
};
</script>
