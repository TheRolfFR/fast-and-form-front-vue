<template>
  <b-tr>
    <b-td v-for="(value, index) in data" :key="index">{{ value }}</b-td>
  </b-tr>
</template>

<script>
export default {
  name: "FFEntry",
  props: {
    data: {
      required: true,
      type: Array,
    },
  },
};
</script>
