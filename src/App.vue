<!-- A Simple test... -->
<template>
  <TooltipProvider>
    <div class="p-4 max-w-7xl mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <SophonAvatar />
        <h1 class="text-2xl font-bold text-white">Sophon Nodes Dashboard</h1>
      </div>
      <div class="space-y-4">
        <div v-for="(node, index) in nodes" :key="index">
          <Card :node="node" />
        </div>
      </div>
    </div>
  </TooltipProvider>
</template>

<script>
import Card from './components/CardsList.vue';
import SophonAvatar from './components/SophonAvatar.vue';
import { TooltipProvider } from 'radix-vue';

export default {
  components: {
    Card,
    SophonAvatar,
    TooltipProvider
  },
  data() {
    return {
      nodes: [
        {uptime: 95, operador: "1"},
        {uptime: 75, operador: "2"},
        {uptime: 59.999, operador: "3"},
        {uptime: 45, operador: "4"}
      ]
    };
  }
}
</script>

<style>
html {
  background: radial-gradient(57.45% 50% at 50% -4.87%, rgba(43, 149, 255, 0.10) 39.4%, rgba(0, 0, 0, 0.00) 100%), #0A0C10;
  height: 100%;
  width: 100%;
}
</style>