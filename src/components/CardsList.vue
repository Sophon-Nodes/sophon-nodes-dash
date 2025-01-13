<template>
  <div class="p-3 rounded-lg card-gradient border-[#505255] border-opacity-30 shadow-card">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 gap-6">
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <div class="w-9 h-9 p-1 rounded-md border border-gray-800 flex items-center justify-center">
          <SophonAvatar class="w-6 h-6 m-auto" />
        </div>
        <div class="font-mono text-sm text-gray-400 truncate group relative">
          {{ node.operator }}
          <div class="hidden group-hover:block absolute z-10 px-3 py-2 text-sm bg-gray-900 text-white rounded-md shadow-lg whitespace-normal max-w-md top-full left-0 mt-1">
            {{ node.operator }}
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <TooltipRoot>
          <TooltipTrigger asChild>
            <div class="w-8 h-8 p-1.5 rounded-md border flex items-center justify-center"
                 :class="node.status ? 'border-green-400' : 'border-red-500'">
              <ActivityPulse class="w-full h-full"
                   :class="node.status ? 'text-green-400' : 'text-red-500'" />
            </div>
          </TooltipTrigger>
          <TooltipContent class="bg-gray-900 px-3 py-2 rounded-lg shadow-lg border border-gray-800" side="top">
            <span class="text-sm font-medium text-gray-200">{{ node.status ? 'Active' : 'Inactive' }}</span>
          </TooltipContent>
        </TooltipRoot>
        <button class="w-8 h-8 p-1.5 rounded-md border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white">
          <EllipsisIcon />
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="p-2.5 bg-[#1a1a1a]/25 rounded-lg shadow-sm border border-[#505255]/30 mb-4">
      <div class="grid grid-cols-2 gap-4 mb-2">
        <div>
          <p class="text-gray-400 text-sm">Uptime</p>
          <p class="text-white text-sm">{{ node.uptime.toFixed(2) }}%</p>
        </div>
        <div>
          <p class="text-gray-400 text-sm">Rewards</p>
          <p class="text-white text-sm">{{ node.rewards }}</p>
        </div>
      </div>
      <UptimeBar :uptimePercentage="node.uptime" :isActive="node.status" />
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-1.5">
        <NodeDelegators class="w-5 h-5 text-gray-400" />
        <span class="text-gray-400 text-sm">#</span>
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

<script>
import UptimeBar from './UptimeBar.vue';
import EllipsisIcon from './icons/EllipsisIcon.vue';
import NodeDelegators from './icons/NodeDelegators.vue';
import CoinsCommission from './icons/CoinsCommission.vue';
import SophonAvatar from './SophonAvatar.vue';
import ActivityPulse from './icons/ActivityPulse.vue';
import { TooltipRoot, TooltipTrigger, TooltipContent } from 'radix-vue';

export default {
  components: {
    UptimeBar,
    EllipsisIcon,
    NodeDelegators,
    CoinsCommission,
    SophonAvatar,
    ActivityPulse,
    TooltipRoot,
    TooltipTrigger,
    TooltipContent
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
.card-gradient {
  /* background: radial-gradient(77.96% 65.3% at 47.31% 100.18%, rgba(43, 149, 255, 0.06) 39.4%, rgba(0, 0, 0, 0.00) 100%), #0A0A0A; */
  background: radial-gradient(77.96% 65.3% at 47.31% 100.18%, rgba(43, 149, 255, 0.06) 39.4%, rgba(0, 0, 0, 0.00) 100%), theme('colors.slate.950');
}

.shadow-card {
  box-shadow: 0px 0px 0px 1px rgba(80, 82, 85, 0.30), 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
</style>