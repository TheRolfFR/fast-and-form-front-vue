<template>
  <b-thead>
    <b-th v-for="(value, index) in columns" :key="index">{{ value }}</b-th>
  </b-thead>
</template>

<script>
export default {
  name: "FFTableHeader",
  props: {
    columns: {
      required: true,
      type: Array,
    },
  },
};
</script>
