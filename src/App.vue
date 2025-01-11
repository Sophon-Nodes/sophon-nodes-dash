<!-- A Simple test... -->
<template>
  <div>
    <div v-for="(node, index) in nodes" :key="index">
      <Card :node="node" />
    </div>
  </div>
</template>

<script>
import Card from './components/CardsList.vue';

export default {
  components: {
    Card
  },
  data() {
    return {
      nodes: [
        {uptime: 95, operador: "1"},
        {uptime: 75, operador: "2"},
        {uptime: 60, operador: "3"},
        {uptime: 45, operador: "4"}
      ]
    };
  }
}
</script>

<style>
html {
  background: radial-gradient(57.45% 50% at 50% -4.87%, rgba(43, 149, 255, 0.10) 39.4%, rgba(0, 0, 0, 0.00) 100%), #0A0C10;
}
</style>