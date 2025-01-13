<template>
  <main class="max-w-7xl mx-auto px-4 lg:px-12">
    <div class="py-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold text-white">Sophon Nodes Dashboard</h1>
        </div>
        <div class="flex items-center gap-4">
          <input 
            type="text" 
            v-model="operatorFilter"
            placeholder="Filter by operator addresses (comma-separated)"
            class="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 w-96"
          />
          <button 
            @click="fetchNodes"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
          >
            Apply Filter
          </button>
        </div>
      </div>
      
      <div v-if="loading" class="text-white">
        Loading nodes data...
      </div>
      
      <div v-else-if="error" class="text-red-400">
        {{ error }}
      </div>
      
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <div v-for="node in nodes" :key="node.operador">
            <Card :node="node" />
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between text-white">
          <div class="flex items-center gap-2">
            <label>Nodes per page:</label>
            <select 
              v-model="perPage" 
              class="bg-gray-800 border border-gray-700 rounded px-2 py-1"
              @change="fetchNodes"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          
          <div class="flex items-center gap-4">
            <button 
              @click="previousPage" 
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {{ currentPage }}</span>
            <button 
              @click="nextPage"
              class="px-4 py-2 bg-gray-800 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Card from './CardsList.vue';

export default {
  name: 'DashboardView',
  components: {
    Card,
  },
  data() {
    return {
      nodes: [],
      loading: false,
      error: null,
      currentPage: 1,
      perPage: 10,
      operatorFilter: ''
    };
  },
  methods: {
    async fetchNodes() {
      try {
        this.loading = true;
        let url = 'https://monitor.sophon.xyz/nodes';
        const params = new URLSearchParams();
        
        // Add pagination parameters
        params.append('page', this.currentPage);
        params.append('per_page', this.perPage);
        
        // Add operator filter if provided
        if (this.operatorFilter.trim()) {
          params.append('operators', this.operatorFilter.trim());
        }
        
        url = `${url}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        
        this.nodes = data.nodes.map(node => ({
          uptime: node.uptime,
          operador: node.operator,
          status: node.status,
          rewards: node.rewards,
          fee: node.fee
        }));
      } catch (err) {
        this.error = 'Failed to fetch node data';
        console.error('Error fetching nodes:', err);
      } finally {
        this.loading = false;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchNodes();
      }
    },
    nextPage() {
      this.currentPage++;
      this.fetchNodes();
    }
  },
  created() {
    this.fetchNodes();
  }
}
</script>
