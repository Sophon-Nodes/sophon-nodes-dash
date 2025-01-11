<template>
  <main class="max-w-7xl mx-auto px-4 lg:px-12">
    <div class="py-6">
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
  </main>
</template>

<script>
import Card from './CardsList.vue';
import SophonAvatar from './SophonAvatar.vue';

export default {
  name: 'DashboardView',
  components: {
    Card,
    SophonAvatar,
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
