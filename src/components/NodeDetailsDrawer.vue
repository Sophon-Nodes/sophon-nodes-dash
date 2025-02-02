<script setup>
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTrigger, DrawerTitle, DrawerDescription } from 'vaul-vue'
import { TooltipRoot, TooltipTrigger, TooltipContent, TooltipPortal } from 'radix-vue'
import { Icon } from '@iconify/vue'
import DetailsIcon from './icons/DetailsIcon.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['openChange'])
const isCopied = ref(false)
const drawerWidth = ref(480) // 30rem default
const isResizing = ref(false)
const minWidth = 384 // 24rem
const maxWidth = 960 // 60rem
const isDesktop = ref(window.innerWidth >= 768)

const handleOpenChange = (open) => {
  emit('openChange', open)
  // Reset custom width property when drawer closes
  if (!open) {
    document.documentElement.style.removeProperty('--drawer-width')
  }
}

const updateIsDesktop = () => {
  isDesktop.value = window.innerWidth >= 768
  if (!isDesktop.value) {
    document.documentElement.style.removeProperty('--drawer-width')
  }
}

onMounted(() => {
  window.addEventListener('resize', updateIsDesktop)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsDesktop)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
  document.body.style.userSelect = ''
})

const startResize = () => {
  // Only allow resizing on desktop
  if (!isDesktop.value) return
  
  isResizing.value = true
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
  // Prevent text selection while resizing
  document.body.style.userSelect = 'none'
}

const handleMouseMove = (e) => {
  if (!isResizing.value) return
  
  // Calculate new width based on mouse position from right edge of screen
  const newWidth = window.innerWidth - e.clientX
  
  // Clamp the width between min and max values
  drawerWidth.value = Math.max(minWidth, Math.min(maxWidth, newWidth))
  // Update CSS custom property
  document.documentElement.style.setProperty('--drawer-width', `${drawerWidth.value}px`)
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
  document.body.style.userSelect = ''
}

const copyToClipboard = async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // For modern browsers
      await navigator.clipboard.writeText(props.node.operator)
    } else {
      // Fallback for mobile browsers
      const textArea = document.createElement('textarea')
      textArea.value = props.node.operator
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        textArea.remove()
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err)
        textArea.remove()
        return
      }
    }
    
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 1000)
  } catch (err) {
    console.error('Failed to copy address:', err)
  }
}
</script>

<template>
  <DrawerRoot should-scale-background @openChange="handleOpenChange">
    <DrawerTrigger asChild>
      <button class="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 outline-none w-full text-left">
        <span class="flex items-center gap-2 w-full">
          <DetailsIcon class="w-5 h-5" />
          Details
        </span>
      </button>
    </DrawerTrigger>
    
    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 bg-black/40 z-[100]" />
      <DrawerContent 
        :class="[
          'bg-white dark:bg-gray-900 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 right-0 w-full z-[101] transition-[transform,width] duration-200 ease-out',
          { 'md:!w-[30rem] md:!w-[var(--drawer-width)]': isDesktop }
        ]"
      >
        <!-- Resize handle - only visible on desktop -->
        <div
          class="hidden md:block absolute left-0 top-0 bottom-0 w-px cursor-ew-resize group"
          @mousedown="startResize"
        >
          <!-- Hover area -->
          <div class="absolute left-0 top-0 bottom-0 w-2 -translate-x-1/2 transition-all duration-200 ease-out rounded-tl-md
                      group-hover:bg-blue-100 group-hover:shadow-[0_0_8px_rgba(0,121,254,0.25)] dark:group-hover:bg-[#053B7A] dark:group-hover:shadow-[0_0_12px_rgba(99,182,255,0.2)]" />
          <!-- Center line -->
          <div class="absolute left-0 top-0 bottom-0 w-px -translate-x-1/2 transition-all duration-200 ease-out
                      bg-transparent group-hover:bg-[#0079FE] dark:group-hover:bg-[#63B6FF]" />
        </div>

        <div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-700 mt-2" />
        
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <DrawerTitle class="text-lg font-semibold text-gray-900 dark:text-white">
            Node Details
          </DrawerTitle>
          <DrawerTrigger asChild>
            <button
              class="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Icon icon="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </DrawerTrigger>
        </div>
        
        <DrawerDescription class="sr-only">
          Details about the selected node including operator address, status, uptime, rewards, and fee.
        </DrawerDescription>

        <div class="p-4 space-y-4 flex-1 overflow-y-auto">
          <div class="space-y-1">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Operator Address
            </div>
            <div 
              class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md cursor-pointer group"
              @click="copyToClipboard"
            >
              <div class="font-mono text-sm text-gray-900 dark:text-white flex-1 truncate">
                <span v-if="!isCopied">{{ props.node.operator }}</span>
                <span v-else>Copied to clipboard!</span>
              </div>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <button class="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <Icon 
                      :icon="isCopied ? 'heroicons:check-circle' : 'heroicons:clipboard'" 
                      :class="['w-5 h-5', isCopied ? 'text-green-500' : '']" 
                    />
                  </button>
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipContent 
                    class="px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-md shadow-lg"
                    :side="'top'"
                    :sideOffset="5"
                  >
                    {{ isCopied ? 'Copied!' : 'Copy to clipboard' }}
                  </TooltipContent>
                </TooltipPortal>
              </TooltipRoot>
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </div>
            <div class="text-sm text-gray-900 dark:text-white">
              {{ props.node.status ? 'Active' : 'Inactive' }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Uptime
            </div>
            <div class="text-sm text-gray-900 dark:text-white">
              {{ props.node.uptime }}%
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Rewards
            </div>
            <div class="text-sm text-gray-900 dark:text-white">
              {{ props.node.rewards }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fee
            </div>
            <div class="text-sm text-gray-900 dark:text-white">
              {{ props.node.fee }}%
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Delegators
            </div>
            <div class="text-sm text-gray-900 dark:text-white">
              {{ props.node.delegators }}
            </div>
          </div>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>

<style>
:root {
  --drawer-width: 30rem;
}
</style>
