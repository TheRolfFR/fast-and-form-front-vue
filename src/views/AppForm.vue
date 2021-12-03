/* eslint-disable */
<template>
  <FFForm
    :title="'edit/add ' + $route.params.entity"
    :schema="correctSchema"
    :byDefault="byDefault"
    :baseURL="baseURL"
    :id="$route.params.id"
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
        original: {
          username: "",
          type: "",
        },
        byDefault: {
          username: "toto",
          type: ["Contributor", "Donator"],
        },
        baseURL: "http://localhost:3004/Form_users",
      },
      contributions: {
        byDefault: {
          res: "",
          date: new Date().getTime(),
          TextureID: "",
          contributors: [],
        },
        original: {
          res: "c32",
          date: new Date("1999-10-22").getTime(),
          TextureID: 2,
          contributors: ["230151512451"],
        },
        baseURL: "http://localhost:3004/Form_contributions",
      },
    };
  },
  components: {
    FFForm,
  },
  computed: {
    id: function () {
      return this.$route.id;
    },
    baseURL: function () {
      return this.entityData.baseURL;
    },
    original: function () {
      return this.entityData.original;
    },
    value: function () {
      return this.entityData.original;
    },
    byDefault: function () {
      return this.entityData.byDefault;
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
    // models: function(){
    //   const entityName = this.entityName;
    //   if (entityName === "users") {
    //     return {
    //         username :"",
    //         type: "",
    //     };
    //   }else if (entityName === "contributions") {
    //     return {
    //         id :"",
    //         res: "",
    //         date: "",
    //         TextureID: "",
    //         contributors:  "",
    //     };
    //   }
    //   return null;
    // },
  },
};
</script>
