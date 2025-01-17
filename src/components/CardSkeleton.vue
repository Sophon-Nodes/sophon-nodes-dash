<template>
  <div v-if="selSkeleton == 'cardOperators'" class="p-3 rounded-lg card-gradient border-[#505255] border-opacity-30 shadow-card animate-pulse">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 gap-6">
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <div class="w-9 h-9 rounded-md border border-gray-800 bg-gray-800"></div>
        <div class="h-4 bg-gray-800 rounded w-32"></div>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-md border border-gray-800 bg-gray-800"></div>
        <div class="w-8 h-8 rounded-md border border-gray-800 bg-gray-800"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-4">
      <!-- Stats Row -->
      <div class="grid grid-cols-1 gap-2">
        <div class="h-16 rounded-md border border-gray-800 bg-gray-800"></div>
      </div>
      
      <!-- Uptime Bar -->
      <div class="h-2 bg-gray-800 rounded"></div>
    </div>
  </div>
  
  <div v-else class="flex-1 p-4 h-[88px] justify-start rounded-lg card-background border-[#505255] border-opacity-30 shadow-card animate-pulse">
    <div class="w-auto h-5 rounded-md border border-gray-800 bg-gray-800 mb-2"></div>
    <div class="w-20 h-7 rounded-md border border-gray-800 bg-gray-800"></div>
  </div>      
  
</template>

<script>
export default {
  name: 'CardSkeleton',
  props: {
    selSkeleton: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.card-gradient {
  background: radial-gradient(77.96% 65.3% at 47.31% 100.18%, rgba(43, 149, 255, 0.06) 39.4%, rgba(0, 0, 0, 0.00) 100%), theme('colors.slate.950');
}

.shadow-card {
  box-shadow: 0px 0px 0px 1px rgba(80, 82, 85, 0.30), 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
</style>
