<template>
  <div class="mb-10">
    <p class="text-white">Operator: {{ node.operador }}</p>
    <UptimeBar :uptimePercentage="node.uptime" />
  </div>
</template>

<script>
  import UptimeBar from './UptimeBar.vue';

  export default {
    components: {
      UptimeBar
    },
    props: {
      node: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  /* .cardp {
    margin-bottom: 10px;
  }
  .textc {
    color: white;
  } */
</style>