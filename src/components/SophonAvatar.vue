<script setup>
import { AvatarImage, AvatarRoot, AvatarFallback, TooltipArrow, TooltipContent, TooltipRoot, TooltipTrigger } from 'radix-vue'
import { ref } from 'vue'

// Test data for example
const avatars = [
  { 
    src: new URL('../assets/images/placeholder/sophon-avatar-1.png', import.meta.url).href,
    alt: 'Sophon Avatar',
    tooltip: 'Sophon Avatar'
  }
]

const currentAvatar = ref(avatars[0])
const hasError = ref(false)

const handleImageError = () => {
  hasError.value = true
}
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger>
      <AvatarRoot class="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full bg-black">
        <AvatarImage
          v-if="!hasError"
          class="h-full w-full object-cover"
          :src="currentAvatar.src"
          :alt="currentAvatar.alt"
          @error="handleImageError"
        />
        <AvatarFallback 
          v-if="hasError"
          class="text-white text-xl font-medium"
          delayMs="0"
        >
          SP
        </AvatarFallback>
      </AvatarRoot>
    </TooltipTrigger>

    <TooltipContent class="bg-white px-3 py-2 rounded-lg shadow-lg" side="top">
      <span class="text-sm font-medium">{{ currentAvatar.tooltip }}</span>
      <TooltipArrow class="fill-white" />
    </TooltipContent>
  </TooltipRoot>
</template>
