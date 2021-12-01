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
      model: {},
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
              required: true,
            },
            {
              type: "selectEx",
              label: "User type",
              model: "type",
              multiSelect: true,
              required: true,
              noneSelectedText: "Choose one ore more type",
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
              min: 2,
              validator: VueFormGenerator.validators.array,
            },
          ],
        };
      } else if (entityName === "contributions") {
        return {
          fields: [
            {
              type: "select",
              label: "Res",
              model: "res",
              required: true,
              values: ["c32", "c64"],
              min: 1,
            },
            {
              type: "DatePicker",
              label: "Contribution date",
              placeholder: "Date of the contribution submission",
              model: "date",
              required: true,
              format: "timestamp",
            },
            {
              type: "input",
              inputType: "number",
              label: "Texture ID",
              model: "TextureID",
              required: true,
              validator: VueFormGenerator.validators.integer,
            },
            {
              type: "Checklist",
              label: "Contributors",
              model: "contributors",
              required: true,
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
              min: 1,
            },
          ],
        };
      }
      return false;
    },
  },
};
</script>
