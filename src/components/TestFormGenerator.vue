<template>
  <div >
    <!-- ********************************************* -->
    <b-container fluid>
    <vue-form-generator
      :schema="schema"
      :schema1="schema"
      :model="model"
      :options="formOptions"
    ></vue-form-generator>
    <b-button @click="submit">submit</b-button>
    </b-container>
    <!-- ********************************************* -->

    <!-- <p> resultat</p>
    {{ model.username }} -->
    <p v-for="todo of dataForm" :key="todo.id">
      <b> username: </b> {{ todo.username }} <b> email: </b>{{ todo.email }}
      <!-- modifer le json -->
      <br>
      <label for="name">update username :</label>
      <input type="text" id="name" name="name" />
      <b-button @click="update(todo.id)">update</b-button>
    
    </p>

    <!-- affichage des entetes -->
    <!-- <p v-for="head of headDataForm" :key="head.id">
      {{ head }}
    </p> -->

    <!-- https://codesandbox.io/s/amazing-wood-u7i0v?file=/index.html:119-179 -->
    <!-- <table>
      <thead  v-for="head of headDataForm" :key="head.id">
        <tr >
          <th>{{ head }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo of dataForm" :key="todo.id">
          <td>
            {{ todo }}
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import Vue from "vue";
import "@/assets/style.css";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import axios from "axios";
const baseURL = "http://localhost:3003/Form";

// documentaion utile
// https://vue-generators.gitbook.io/vue-generators/validation/built-in-validators

Vue.use(VueFormGenerator);

export default {
  data() {
    return {
      // recuperation des données dans le json
      dataForm: [],
      // recuperation des noms d'objet 'head'
      headDataForm: [],

      model: {
        username: "",
        email: "",
        color: "",
        animal: "",
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
              {
                type: "select",
                id: "animal",
                label: "favorite animal",
                model: "animal",
                values: ["dog", "cat", "hamster", "rabbit "],
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

  // raporte tout ce qu'il y a dans le json afin d'ajouter dessous
  async created() {
    try {
      const res = await axios.get(baseURL);

      this.dataForm = res.data;
      
      // recuperation des noms d'objet 'head'
      this.headDataForm = Object.keys(this.model);
      // console.log("headDataForm");
      // console.log(this.headDataForm);
   
   } catch (e) {
      console.error(e);
    }
  },
  methods: {
    // envoie les données du formulaire vers notre json
    async submit() {
      try {
        const res = await axios.post(baseURL, this.model);
        this.dataForm = [...this.dataForm, res.data];
        // console.log("this.dataForm");
        // console.log(this.dataForm);
        this.model.username = "";
      } catch (e) {
        console.error(e);
      }
    },

    // modifie les données dans le json grace a leur ID
    async update(id) {
      try {
        
        await axios.patch(`${baseURL}/${id}`, {
          // vide animal 
          animal: "",
          // update de username
          username: document.getElementById("name").value,
        });
      const res = await axios.get(baseURL);
      this.dataForm = res.data;
      } catch (e) {
        console.error(e);
      }
     
    },
  },
};
</script>

