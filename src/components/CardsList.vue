<template>
  <div class="p-3 rounded-lg card-gradient border-[#505255] border-opacity-30 shadow-card">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 gap-6">
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <div class="w-9 h-9 p-1 rounded-md border border-gray-800 flex items-center justify-center">
          <SophonAvatar class="w-6 h-6 m-auto" />
        </div>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <div class="font-mono text-sm text-gray-400 truncate group relative">
              {{ node.operator }}
            </div>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent 
              class="px-3 py-2 text-sm bg-gray-900 text-white rounded-md shadow-lg max-w-md"
              :side="'top'"
              :sideOffset="5"
            >
              {{ node.operator }}
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </div>
      <div class="flex items-center gap-2">
        <TooltipRoot>
          <TooltipTrigger asChild>
            <div class="w-8 h-8 p-1.5 rounded-md border flex items-center justify-center"
                 :class="node.status ? 'border-blue-400 text-blue-400' : 'border-red-500 text-red-500'">
              <ActivityPulse />
            </div>
          </TooltipTrigger>
          <TooltipContent class="px-3 py-2 text-sm bg-gray-900 text-white rounded-md shadow-lg">
            {{ node.status ? 'Active' : 'Inactive' }}
          </TooltipContent>
        </TooltipRoot>
        <CardDropdownMenu :node="node" :isFavorite="isFavorite(node.operator)" @select="handleMenuSelect" />
      </div>
    </div>

    <!-- Body -->
    <div class="p-2.5 bg-[#1a1a1a]/25 rounded-lg shadow-sm border border-[#505255]/30 mb-4">
      <div class="grid grid-cols-2 gap-4 mb-2">
        <div>
          <p class="text-gray-400 text-sm">Uptime</p>
          <p class="text-white text-sm">{{ node.status ? `${node.uptime.toFixed(2)}%` : 'N/A' }}</p>
        </div>
        <div>
          <p class="text-gray-400 text-sm">Rewards</p>
          <p class="text-white text-sm">{{ node.rewards }}</p>
        </div>
      </div>
      <UptimeBar :uptimePercentage="node.status ? node.uptime : 0" :isActive="node.status" />
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-1.5">
        <NodeDelegators class="w-5 h-5 text-gray-400" />
        <span class="text-gray-400 text-sm">{{ node.delegators }}</span>
        <span class="text-gray-400 text-sm">Delegators</span>
      </div>
      <div class="flex items-center gap-1.5">
        <CoinsCommission class="w-5 h-5 text-gray-400" />
        <span class="text-gray-400 text-sm">{{ node.fee }}%</span>
        <span class="text-gray-400 text-sm">fee</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import UptimeBar from './UptimeBar.vue';
import NodeDelegators from './icons/NodeDelegators.vue';
import CoinsCommission from './icons/CoinsCommission.vue';
import SophonAvatar from './SophonAvatar.vue';
import ActivityPulse from './icons/ActivityPulse.vue';
import CardDropdownMenu from './CardDropdownMenu.vue';
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
} from 'radix-vue';

const emit = defineEmits(['setFavorite']);

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});

const removeFavorite = async (operator) => {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites = favorites.filter(id => id !== operator);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

const setFavorite = async () => {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favorites.includes(props.node.operator)) {
    favorites.push(props.node.operator);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }else{
    removeFavorite(props.node.operator);
  }
}

const isFavorite = (operator) => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(operator);
}

const handleMenuSelect = (option) => {
  if(option == 'setFavorite'){
    setFavorite();
    emit('setFavorite');
  }
};
</script>

<style scoped>
.card-gradient {
  background: radial-gradient(77.96% 65.3% at 47.31% 100.18%, rgba(43, 149, 255, 0.06) 39.4%, rgba(0, 0, 0, 0.00) 100%), #01040e;
}

.shadow-card {
  box-shadow: 0px 0px 0px 1px rgba(80, 82, 85, 0.30), 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
</style>