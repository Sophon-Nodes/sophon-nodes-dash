<!-- A Simple test... -->
<template>
  <div class="relative antialiased text-gray-500 dark:text-gray-400">
    <span class="fixed inset-0 bg-background-light dark:bg-background-dark -z-10"></span>
    <span class="block fixed dark:hidden inset-0 overflow-hidden h-screen -z-10" 
          style="background:linear-gradient(180deg,#5cbee1,#96ccda)">
    </span>
    <span class="hidden absolute dark:block inset-0 overflow-hidden h-[64rem] -z-10" 
          style="background:radial-gradient(49.63% 57.02% at 58.99% -7.2%, rgba(43, 149, 255, 0.1) 39.4%, rgba(0, 0, 0, 0) 100%)">
    </span>
    <TooltipProvider>
      <div class="min-h-screen">
        <NavBar />
        <DashboardView />
      </div>
    </TooltipProvider>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import DashboardView from './components/DashboardView.vue';
import { TooltipProvider } from 'radix-vue';

export default {
  name: 'App',
  components: {
    NavBar,
    DashboardView,
    TooltipProvider
  },
  mounted() {
    // Get theme from localStorage or default to dark
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
</script>

<style>
:root {
  --primary: 23 90 173;
  --primary-light: 43 149 255;
  --primary-dark: 23 16 161;
  --background-light: 255 255 255;
  --background-dark: 10 12 16;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
}
</style>