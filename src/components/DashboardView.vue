<script>
import Card from './CardsList.vue';
import CardSkeleton from './CardSkeleton.vue';
import SearchIcon from './icons/SearchIcon.vue';
import ChevronLeft from './icons/ChevronLeft.vue';
import ChevronRight from './icons/ChevronRight.vue';
import DoubleChevronLeft from './icons/DoubleChevronLeft.vue';
import DoubleChevronRight from './icons/DoubleChevronRight.vue';
import SelectComponent from './SelectComponent.vue';
import {
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
} from 'radix-vue';

export default {
  name: 'DashboardView',
  components: {
    Card,
    CardSkeleton,
    SearchIcon,
    ChevronLeft,
    ChevronRight,
    DoubleChevronLeft,
    DoubleChevronRight,
    PaginationRoot,
    PaginationList,
    PaginationListItem,
    PaginationPrev,
    PaginationNext,
    PaginationFirst,
    PaginationLast,
    PaginationEllipsis,   
    SelectComponent,
  },
  data() {
    return {
      nodes: [],
      loading: false,
      error: null,
      currentPage: 1,
      perPage: 27,
      operatorFilter: '',
      othersFilters: {
        nodeStatus: "all", //all, Online = true or Offline = false
        sortBy: "nodeUptime", //Possible options is nodeUptime, nodesDelegated, nodeFee, nodeRewards
        sortOrder: "desc" // desc or asc
      },
      totalResults: 0,
      debounceTimeout: null,
    };
  },
  methods: {
    async fetchNodes() {
      try {
        this.loading = true;
        let url = 'https://api.sophon-nodes.xyz/nodes';
        const params = new URLSearchParams();
        
        params.append('page', this.currentPage);
        params.append('limit', this.perPage);
        params.append('othersFilters', JSON.stringify(this.othersFilters));        
        params.append('search', this.operatorFilter.trim());        
        
        url = `${url}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        this.totalResults = data.navInfo.totalElements;
        
        this.nodes = data.nodes.map(node => ({
          uptime: node.nodeUptime,
          operator: node.operatorAddress,
          status: node.nodeStatus,
          rewards: node.nodeRewards,
          fee: node.nodeFee,
          delegators: node.nodesDelegated
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
    },
    updateOthersFilter(value){
      this.othersFilters[value[0]] = value[1];
      this.currentPage = 1;
      this.fetchNodes();
    },
    updateLimitPerPage(value){
      this.currentPage = 1;
      this.perPage = value[1];
    }
  },
  watch: {
    operatorFilter() {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.currentPage = 1;
        this.fetchNodes();
      }, 300);
    },
    perPage() {
      this.currentPage = 1;
      this.fetchNodes();
    }
  },
  created() {
    this.fetchNodes();
    alert("Parallax: I'll still work on fixing the uptime bar bug; Still fixing the layout, just testing...");
  }
}
</script>

<template>
  <main class="max-w-8xl mx-auto px-4 lg:px-12">
    <div class="py-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-white">Node Operator List</h1>
      </div>

      <div class="flex items-center gap-4 mb-6">
        <div class="relative flex-1 max-w-mb">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            v-model="operatorFilter"
            placeholder="Search operators..."
            class="block w-full pl-10 pr-4 py-2 rounded-lg bg-[#0A0C10] text-white border-[#505255] border-opacity-30 shadow-card"
          />
        </div>        
        <div class="relative flex">
          <SelectComponent @updateLimitPerPage="updateLimitPerPage" :itens="{
            obj:[
              {text: '27 per page', value: 27},
              {text: '54 per page', value: 54},
              {text: '108 per page', value: 108}
            ],
            filterType: 'limitPerPage',
            function: 'updateLimitPerPage'
          }" />
        </div>
        <div class="relative flex">
          <SelectComponent @updateOthersFilter="updateOthersFilter" :itens="{
            obj:[
              {text: 'All Status', value: 'all'},
              {text: 'Online Status', value: 'true'},
              {text: 'Offline Status', value: 'false'}
            ],
            filterType: 'nodeStatus',
            function: 'updateOthersFilter'
          }" />
        </div>
        <div class="relative flex">
          <SelectComponent @updateOthersFilter="updateOthersFilter" :itens="{
            obj:[
              {text: 'Uptime', value: 'nodeUptime'},
              {text: 'Delegations', value: 'nodesDelegated'},
              {text: 'Fee', value: 'nodeFee'},
              {text: 'Rewards', value: 'nodeRewards'}
            ],
            filterType: 'sortBy',
            function: 'updateOthersFilter'
          }" />
        </div>
        <div class="relative flex">
          <SelectComponent @updateOthersFilter="updateOthersFilter" :itens="{
            obj:[
              {text: 'Desc', value: 'desc'},
              {text: 'Asc', value: 'asc'}
            ],
            filterType: 'sortOrder',
            function: 'updateOthersFilter'
          }" />
        </div>
      </div>
      
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <CardSkeleton v-for="n in 6" :key="n" />
      </div>
      
      <div v-else-if="error" class="text-red-400">
        {{ error }}
      </div>
      
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <div v-for="node in nodes" :key="node.operator">
            <Card :node="node" />
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-end mt-6">
          <PaginationRoot
            v-model:page="currentPage"
            :total="totalResults"
            :items-per-page="perPage"
            :sibling-count="1"
            show-edges
            class="flex items-center gap-1"
            @update:page="fetchNodes"
          >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1 text-white">
              <PaginationFirst class="w-9 h-9 flex items-center justify-center disabled:opacity-50 hover:bg-white/10 transition rounded-lg bg-[#0A0C10] border-[#505255] border-opacity-30 shadow-card">
                <DoubleChevronLeft />
              </PaginationFirst>
              <PaginationPrev class="w-9 h-9 flex items-center justify-center ml-1 mr-2 disabled:opacity-50 hover:bg-white/10 transition rounded-lg bg-[#0A0C10] border-[#505255] border-opacity-30 shadow-card">
                <ChevronLeft />
              </PaginationPrev>

              <template v-for="(page, index) in items">
                <PaginationListItem
                  v-if="page.type === 'page'"
                  :key="index"
                  :value="page.value"
                  class="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0A0C10] border-[#505255] border-opacity-30 shadow-card data-[selected]:bg-white/10 hover:bg-white/10 transition"
                >
                  {{ page.value }}
                </PaginationListItem>
                <PaginationEllipsis
                  v-else
                  :key="page.type"
                  :index="index"
                  class="w-9 h-9 flex items-center justify-center"
                >
                  &#8230;
                </PaginationEllipsis>
              </template>

              <PaginationNext class="w-9 h-9 flex items-center justify-center ml-2 mr-1 disabled:opacity-50 hover:bg-white/10 transition rounded-lg bg-[#0A0C10] border-[#505255] border-opacity-30 shadow-card">
                <ChevronRight />
              </PaginationNext>
              <PaginationLast class="w-9 h-9 flex items-center justify-center disabled:opacity-50 hover:bg-white/10 transition rounded-lg bg-[#0A0C10] border-[#505255] border-opacity-30 shadow-card">
                <DoubleChevronRight />
              </PaginationLast>
            </PaginationList>
          </PaginationRoot>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.shadow-card {
  box-shadow: 0px 0px 0px 1px rgba(80, 82, 85, 0.30), 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
</style>
