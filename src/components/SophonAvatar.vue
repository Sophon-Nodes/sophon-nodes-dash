<script setup>
import { AvatarImage, AvatarRoot, AvatarFallback } from 'radix-vue'
import { ref } from 'vue'

// Test data for example
const avatars = [
  { 
    src: new URL('../assets/images/placeholder/sophon-avatar-1.png', import.meta.url).href,
    alt: 'Sophon Avatar',
  }
]

const currentAvatar = ref(avatars[0])
const hasError = ref(false)

const handleImageError = () => {
  hasError.value = true
}
</script>

<template>
  <AvatarRoot class="inline-flex h-6 w-6 select-none items-center justify-center overflow-hidden rounded-full bg-black">
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
</template>
