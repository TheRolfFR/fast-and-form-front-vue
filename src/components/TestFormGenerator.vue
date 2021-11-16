<template>
  <div class="panel-body">
    <vue-form-generator
      :schema="schema"
      :schema1="schema"
      :model="model"
      :options="formOptions"
    ></vue-form-generator>

    <B> resultat : </B>
    <br>
    Bonjour {{ model.username }}
    <br><br>
    <B> resultat Complet : </B>
    <br>
    {{ model }}
  </div>
</template>

<script>
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";



// documentaion utile
// https://vue-generators.gitbook.io/vue-generators/validation/built-in-validators

Vue.use(VueFormGenerator);

export default {
  data() {
    return {
      model: {
        username: "",
        email: "",
        color: "Red",
      },
      schema: {
        groups: [
          {
            legend: "User Details",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Username",
                model: "username",
                min: 3,
                validator: "string",
              },
              {
                type: "input",
                inputType: "email",
                id: "email",
                label: "Email Address",
                model: "email",
                validator: "email",
              },
              {
                type: "input",
                inputType: "number",
                id: "age",
                label: "Age",
                model: "age",
                validator: "number",
              },
            ],
          },
          {
            legend: "Preferences",
            fields: [
              {
                type: "select",
                label: "Color",
                model: "color",
                values: ["Red", "Green", "Blue"],
              },
            ],
          },
        ],
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },
};
</script>

