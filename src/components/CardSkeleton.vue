<template>
  <div v-if="selSkeleton == 'cardOperators'" class="p-3 rounded-lg card-gradient border border-white/10 dark:border-[#505255] dark:border-opacity-30 shadow-card animate-pulse">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 gap-6">
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <div class="w-9 h-9 rounded-md border border-white/20 dark:border-gray-800 bg-white/40 dark:bg-gray-800"></div>
        <div class="h-4 bg-white/40 dark:bg-gray-800 rounded w-32"></div>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-md border border-white/20 dark:border-gray-800 bg-white/40 dark:bg-gray-800"></div>
        <div class="w-8 h-8 rounded-md border border-white/20 dark:border-gray-800 bg-white/40 dark:bg-gray-800"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-4">
      <!-- Stats Row -->
      <div class="grid grid-cols-1 gap-2">
        <div class="h-16 rounded-md border border-white/20 dark:border-gray-800 bg-white/40 dark:bg-gray-800"></div>
      </div>
      
      <!-- Uptime Bar -->
      <div class="h-2 bg-white/40 dark:bg-gray-800 rounded"></div>
    </div>
  </div>
  
  <div v-else class="flex-1 p-4 h-[88px] justify-start rounded-lg bg-white/10 dark:bg-zinc-950/50 border border-white/10 dark:border-[#505255] dark:border-opacity-30 shadow-card animate-pulse">
    <div class="w-auto h-5 rounded-md border border-white/20 dark:border-gray-800 bg-white/40 dark:bg-gray-800 mb-2"></div>
    <div class="w-20 h-7 rounded-md border border-white/20 dark:border-gray-800 bg-white/40 dark:bg-gray-800"></div>
  </div>      
</template>

<script>
export default {
  name: 'CardSkeleton',
  props: {
    selSkeleton: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style scoped>
.card-gradient {
  @apply bg-white/10;
  backdrop-filter: blur(8px);
  background: radial-gradient(77.96% 65.3% at 47.31% 100.18%, rgba(255, 255, 255, 0.06) 39.4%, rgba(255, 255, 255, 0.00) 100%);
}

.dark .card-gradient {
  background: radial-gradient(77.96% 65.3% at 47.31% 100.18%, rgba(43, 149, 255, 0.06) 39.4%, rgba(0, 0, 0, 0.00) 100%), theme('colors.slate.950');
}

.card-background {
  @apply bg-white/10 dark:bg-slate-950;
  backdrop-filter: blur(8px);
}

.shadow-card {
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04),
              0px 2px 6px 0px rgba(0, 0, 0, 0.04),
              0px 16px 24px 0px rgba(0, 0, 0, 0.02);
}

.dark .shadow-card {
  box-shadow: 0px 0px 0px 1px rgba(80, 82, 85, 0.30), 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
</style>
