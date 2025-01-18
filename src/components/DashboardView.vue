<script>
import Card from './CardsList.vue';
import CardSkeleton from './CardSkeleton.vue';
import SearchIcon from './icons/SearchIcon.vue';
import ChevronLeft from './icons/ChevronLeft.vue';
import ChevronRight from './icons/ChevronRight.vue';
import DoubleChevronLeft from './icons/DoubleChevronLeft.vue';
import DoubleChevronRight from './icons/DoubleChevronRight.vue';
import SelectComponent from './SelectComponent.vue';
import { Icon } from '@iconify/vue'
import { 
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  ToggleGroupItem, 
  ToggleGroupRoot 
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
    Icon,
    ToggleGroupItem,
    ToggleGroupRoot
  },
  data() {
    return {
      nodes: [],
      totalNodes: 0,
      activeNodes: 0,
      averageUptime: "0.00%",
      averageFee: "0.00%",
      loading: false,
      startUpLoading: true,
      error: null,
      currentPage: 1,
      perPage: 27,
      operatorFilter: '',
      othersFilters: {
        nodeStatus: "true", //all, Online = true or Offline = false
        sortBy: "nodeUptime", //Possible options is nodeUptime, nodesDelegated, nodeFee, nodeRewards, favoritesNodes
        sortOrder: "desc" // desc or asc
      },
      totalResults: 0,
      favoritesNodes: [],
      debounceTimeout: null,
      filtersToggle: false,
      viewMode: 'grid',
    };
  },
  methods: {
    async fetchNodes() {
      try {
        this.loading = true;
        let url = 'http://localhost:3001/nodes';
        const params = new URLSearchParams();
        
        params.append('page', this.currentPage);
        params.append('limit', this.perPage);
        params.append('othersFilters', JSON.stringify(this.othersFilters)); 
        params.append('favoriteFilter', JSON.stringify(this.favoritesNodes));       
        params.append('search', this.operatorFilter.trim());        
        
        url = `${url}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        this.totalResults = data.navInfo.totalElements;

        this.totalNodes = data.totals.totalNodes;
        this.activeNodes = data.totals.activeNodes;
        this.averageUptime = data.totals.averageUptime.toFixed(2) + "%";
        this.averageFee = data.totals.averageFee.toFixed(2) + "%";
        
        this.nodes = data.nodes.map(node => ({
          uptime: node.nodeUptime,
          operator: node.operatorAddress,
          status: node.nodeStatus,
          rewards: node.nodeRewards,
          fee: node.nodeFee,
          delegators: node.nodesDelegated
        }));
        this.startUpLoading = false;
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
    },
    updateFavorites(){
      this.favoritesNodes = JSON.parse(localStorage.getItem('favorites'));
    },
    handleViewModeChange(newValue) {
      // Only update if a value is provided and it's different from current
      if (newValue && newValue !== this.viewMode) {
        this.viewMode = newValue;
      }
    },
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
    this.favoritesNodes = JSON.parse(localStorage.getItem('favorites'));
    this.fetchNodes();
  }
}
</script>

<template>
  <main class="max-w-8xl mx-auto px-4 lg:px-12 lg:pt-8 pt-24">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-white">Metrics</h1>
      </div>
    <div v-if="startUpLoading" class="grid grid-cols-1 md:grid-cols-4 mt-6 gap-4">
      <CardSkeleton v-for="n in 4" :key="n" />
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-4 mt-6 gap-4">
      <div class="flex-1 p-4 justify-start rounded-lg card-background border-[#505255] border-opacity-30 shadow-card">
        <div class="text-slate-400 text-base font-normal">Total Nodes</div>
        <div class="text-white text-2xl font-bold">{{ totalNodes }}</div>
      </div>
      <div class="flex-1 p-4 justify-start rounded-lg card-background border-[#505255] border-opacity-30 shadow-card">
        <div class="text-slate-400 text-base font-normal">Active Nodes</div>
        <div class="text-white text-2xl font-bold">{{ activeNodes }}</div>
      </div>
      <div class="flex-1 p-4 justify-start rounded-lg card-background border-[#505255] border-opacity-30 shadow-card">
        <div class="text-slate-400 text-base font-normal">Average Uptime</div>
        <div class="text-white text-2xl font-bold">{{ averageUptime }}</div>
      </div>
      <div class="flex-1 p-4 justify-start rounded-lg card-background border-[#505255] border-opacity-30 shadow-card">
        <div class="text-slate-400 text-base font-normal">Average Fee</div>
        <div class="text-white text-2xl font-bold">{{ averageFee }}</div>
      </div>
    </div>

    <div class="py-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-white">Node Operators</h1>
      </div>

      <div class="flex items-center gap-4 mb-5">
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
        <div class="flex items-center gap-2">
          <div class="relative flex p-1 rounded-lg bg-[#0A0C10] text-white border-[#505255] border-opacity-30 shadow-card">
            <ToggleGroupRoot
              :model-value="viewMode"
              @update:model-value="handleViewModeChange"
              type="single"
              defaultValue="grid"
              class="flex"
            >
              <ToggleGroupItem
                value="grid"
                aria-label="Grid view"
                class="p-2 rounded-[5px] hover:bg-slate-800/50 data-[state=on]:bg-slate-800"
              >
                <Icon icon="mingcute:grid-line" width="16" height="16" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="list"
                aria-label="List view"
                class="p-2 rounded-[5px] hover:bg-slate-800/50 data-[state=on]:bg-slate-800"
              >
                <Icon icon="nimbus:list" width="16" height="16" />
              </ToggleGroupItem>
            </ToggleGroupRoot>
          </div>
          <div class="relative flex p-1 rounded-lg bg-[#0A0C10] text-white border-[#505255] border-opacity-30 shadow-card">
            <button 
              @click="filtersToggle = !filtersToggle" 
              class="p-2 rounded-[5px] hover:bg-slate-800/50"
              :class="{ 'bg-slate-800': filtersToggle }"
            >
              <Icon icon="ion:filter" width="16" height="16" />
            </button>
          </div>
        </div>      
      </div>      
        <div v-if="filtersToggle" class="flex-col items-center p-3 mb-6 rounded-lg bg-[#0A0C10] border-[#505255] border-opacity-30 shadow-card">          
          <div class="flex gap-4">            
            <div class="flex-col">
              <div class="mb-1">Status</div>
              <SelectComponent @updateOthersFilter="updateOthersFilter" :itens="{
                obj:[
                  {text: 'All', value: 'all'},
                  {text: 'Online', value: 'true'},
                  {text: 'Offline', value: 'false'}
                ],
                filterType: 'nodeStatus',
                function: 'updateOthersFilter',
                defaultVal: 'true'
              }" />
            </div>
            <div class="flex-col">
              <div class="mb-1">Sort by</div>
              <SelectComponent @updateOthersFilter="updateOthersFilter" :itens="{
                obj:[
                  {text: 'Uptime', value: 'nodeUptime'},
                  {text: 'Delegations', value: 'nodesDelegated'},
                  {text: 'Fee', value: 'nodeFee'},
                  {text: 'Rewards', value: 'nodeRewards'},
                  {text: 'Favorites', value: 'favoritesNodes'}
                ],
                filterType: 'sortBy',
                function: 'updateOthersFilter',
                defaultVal: 'nodeUptime'
              }" />
            </div>
            <div class="flex-col">
              <div class="mb-1">Order by</div>
              <SelectComponent @updateOthersFilter="updateOthersFilter" :itens="{
                obj:[
                  {text: 'Desc', value: 'desc'},
                  {text: 'Asc', value: 'asc'}
                ],
                filterType: 'sortOrder',
                function: 'updateOthersFilter',
                defaultVal: 'desc'
              }" />
            </div>
          </div>
        </div>
      
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <CardSkeleton selSkeleton="cardOperators" v-for="n in 6" :key="n" />
      </div>
      
      <div v-else-if="error" class="text-red-400">
        {{ error }}
      </div>
      
      <div v-else>
        <TransitionGroup
          name="layout"
          tag="div"
          class="grid gap-3 mb-6"
          :class="{
            'grid-cols-1': viewMode === 'list',
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': viewMode === 'grid'
          }"
        >
          <div v-for="node in nodes" :key="node.operator" class="transition-all duration-300 ease-in-out">
            <Card :node="node" :view-mode="viewMode" @setFavorite="updateFavorites" />
          </div>
        </TransitionGroup>
      </div>
      <!-- Pagination -->
        <div class="flex items-center justify-end mt-6 gap-3">
          <div class="relative flex">
            <SelectComponent @updateLimitPerPage="updateLimitPerPage" :itens="{
              obj:[
                {text: '27 per page', value: 27},
                {text: '54 per page', value: 54},
                {text: '108 per page', value: 108}
              ],
              filterType: 'limitPerPage',
              function: 'updateLimitPerPage',
              defaultVal: 27
            }" />
          </div>
          <PaginationRoot
            v-model:page="currentPage"
            :total="totalResults"
            :items-per-page="perPage"
            :sibling-count="0"
            :show-edges="false"            
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
  </main>
</template>

<style>
.card-background {
  background: var(--Slate-950, #020617);
}

.shadow-card {
  box-shadow: 0px 0px 0px 1px rgba(80, 82, 85, 0.30), 0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px -1px rgba(0, 0, 0, 0.10);
}

.layout-move {
  transition: all 0.3s ease-in-out;
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s ease-in-out;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
