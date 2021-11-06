<template>
  <div>
    <form>
      <div><input type="text" v-model="$props.server" /></div>
      <div><input type="submit" v-on:click.prevent="testDB" /></div>
    </form>
    <div id="result" v-if="!loading">
      <b-alert class="m-3" :variant="status === 200 ? 'success' : 'danger'" show
        >{{ status }}: {{ statusText }}</b-alert
      >
      <div class="m-3">
        <pre
          class="p-2"
          v-text="result"
          style="width: 100%; text-align: left; background: #222; color: white"
        ></pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    server: {
      type: String,
      default: function () {
        return "http://localhost:8080/";
      },
    },
  },
  name: "TestDB",
  data: function () {
    return {
      result: "Loading result...",
      loading: true,
      status: 200,
      statusText: "",
    };
  },
  mounted: function () {
    this.testDB();
  },
  methods: {
    testDB: function () {
      this.loading = true;
      axios
        .get("http://localhost:8080/")
        .then((res) => {
          console.log(res);
          this.status = res.status;
          this.result = res.data;
          if (res.status === 200 && res.statusText === "") {
            this.statusText = "Request successful";
          } else {
            this.statusText = res.statusText;
          }
        })
        .catch((e) => {
          console.error(e);
          this.status = e.request.status;
          this.statusText = e.request.statusText || "Error unknown";
          this.result = JSON.stringify(e, null, 2);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
