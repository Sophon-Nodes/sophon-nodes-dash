<!-- A Simple test... -->
<template>
  <TooltipProvider>
    <div class="min-h-screen">
      <NavBar />
      <DashboardView />
    </div>
  </TooltipProvider>
</template>

<script>
import NavBar from './components/NavBar.vue';
import DashboardView from './components/DashboardView.vue';
import { TooltipProvider } from 'radix-vue';

export default {
  components: {
    NavBar,
    DashboardView,
    TooltipProvider
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