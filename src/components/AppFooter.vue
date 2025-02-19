<template>
  <footer class="w-full px-4 lg:px-12 mt-8 max-w-8xl mx-auto">
    <div class="border-t border-gray-200 dark:border-gray-800 py-8">
      <nav class="container mx-auto px-4 flex justify-center items-center space-x-6 text-sm text-white/90 dark:text-gray-400">
        <a href="https://sophon.xyz" target="_blank" rel="noopener noreferrer"
          class="hover:text-white dark:hover:text-gray-300 transition-colors">
          Sophon
        </a>
        <a href="https://portal.sophon.xyz" target="_blank" rel="noopener noreferrer"
          class="hover:text-white dark:hover:text-gray-300 transition-colors">
          Portal
        </a>
        <a href="https://docs.sophon.xyz" target="_blank" rel="noopener noreferrer"
          class="hover:text-white dark:hover:text-gray-300 transition-colors">
          Docs
        </a>
        <a href="https://farm.sophon.xyz" target="_blank" rel="noopener noreferrer"
          class="hover:text-white dark:hover:text-gray-300 transition-colors">
          Farm
        </a>
        <a href="https://github.com/sophon-nodes" target="_blank" rel="noopener noreferrer"
          class="hover:text-white dark:hover:text-gray-300 transition-colors">
          <Icon icon="mdi:github" class="w-4 h-4" />
        </a>
      </nav>
    </div>
  </footer>
</template>

<script>
import { Icon } from '@iconify/vue'

export default {
  name: 'AppFooter',
  components: {
    Icon
  }
}
</script>
