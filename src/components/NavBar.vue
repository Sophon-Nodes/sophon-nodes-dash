<template>
  <div id="navbar" class="z-30 fixed lg:sticky top-0 w-full">
    <div id="navbar-transition" class="absolute w-full h-full backdrop-blur flex-none transition-colors duration-500 border-b border-gray-500/5 dark:border-gray-300/[0.06] supports-backdrop-blur:bg-background-light/60 dark:bg-transparent"></div>
    <div class="max-w-8xl mx-auto relative">
      <div class="">
        <div class="relative">
          <div class="flex items-center lg:px-12 h-16 min-w-0 mx-4 lg:mx-0">
            <div class="h-full relative flex-1 flex items-center gap-x-4 min-w-0 border-b border-gray-500/5 dark:border-gray-300/[0.06]">
              <div class="flex-1 flex items-center gap-x-4">
                <a href="/">
                  <span class="sr-only">Sophon home page</span>
                  <img class="w-auto h-7 relative object-contain" src="../assets/images/logos/sophon-nodes-logo.svg" alt="Sophon Nodes logo">
                </a>
                <div class="flex items-center gap-x-2"></div>
              </div>
              <div class="flex-1 relative hidden lg:flex items-center ml-auto justify-end space-x-4">
                <nav class="text-sm">
                  <ul class="flex space-x-6 items-center">
                    <!-- Add navigation items here later or dark mode button -->
                  </ul>
                </nav>
              </div>
              <!-- Mobile menu button -->
              <div class="flex lg:hidden items-center gap-2">
                <button type="button" class="text-gray-500 w-8 h-8 flex items-center justify-center hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                  <span class="sr-only">Navigation</span>
                  <svg class="h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic will go here
</script>
