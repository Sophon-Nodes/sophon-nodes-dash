<template>
    <div class="cardp">
      <!-- Aqui você pode adicionar qualquer informação adicional que queira exibir -->
      <p class="textc">Operator: {{ node.operador }}</p>
      <!-- Passa o uptime do nó para o ProgressBar -->
      <UptimeBar :uptimePercentage="node.uptime" />
    </div>
</template>
  
<script>
  import UptimeBar from './UptimeBar.vue'; // Importe o componente ProgressBar
  
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