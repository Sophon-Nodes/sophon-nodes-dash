<template>
    <div class="cardp">
      <p class="textc">Operator: {{ node.operador }}</p>
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
  .cardp {
    margin-bottom: 10px;
  }
  .textc {
    color: white;
  }
</style>