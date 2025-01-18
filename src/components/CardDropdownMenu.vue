<script setup>
import EllipsisIcon from './icons/EllipsisIcon.vue';
import NodeDelegators from './icons/NodeDelegators.vue';
import DetailsIcon from './icons/DetailsIcon.vue';
import { Icon } from '@iconify/vue';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from 'radix-vue';
import { ref } from 'vue';

const emit = defineEmits(['select']);
const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: false
  }
});

const isCopied = ref(false);
const isFavorite = props.isFavorite ? ref(props.isFavorite) : ref(false);

const copyToClipboard = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    await navigator.clipboard.writeText(props.node.operator);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 1000);
  } catch (err) {
    console.error('Failed to copy address:', err);
  }
  return false;
};

const setFavorite = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {  
    if(isFavorite.value){
      isFavorite.value = false;
    }else{
      isFavorite.value = true;
    }
    handleSelect('setFavorite');    
  } catch (err) {
    console.error('Failed to Favorite:', err);
  }
  return false;
};

const handleSelect = async (option) => {
  emit('select', option);
};
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger>
      <button class="w-8 h-8 p-1.5 rounded-md border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800">
        <EllipsisIcon />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        class="min-w-[160px] rounded-lg p-1 flex flex-col gap-1 z-50 border border-[#2E2E2E] bg-white/[0.03] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)] backdrop-blur-[25px]"
        :side="'bottom'"
        :align="'end'"
        :sideOffset="5"
        :avoidCollisions="true"
        :collisionPadding="10"
      >
        <DropdownMenuItem 
          as="div"
          @mousedown.stop.prevent="copyToClipboard" 
          class="text-sm text-gray-300 hover:text-white px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 outline-none"
        >
          <span class="flex items-center gap-2 w-full">
            <Icon :icon="isCopied ? 'heroicons:check-circle' : 'heroicons:clipboard'" 
                  :class="['w-5 h-5', isCopied ? 'text-green-500' : '']" />
            {{ isCopied ? 'Address Copied!' : 'Copy Address' }}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem @mousedown.stop.prevent="setFavorite" class="text-sm text-gray-300 hover:text-white px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 outline-none">
          <span class="flex items-center gap-2 w-full">
            <Icon :icon="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" :class="isFavorite ? 'h-5 w-5 text-red-500' : 'h-5 w-5'" />
            {{ isFavorite ? 'My Favorite' :  'Add Favorite' }}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled @select="handleSelect('Option 3')" class="text-sm text-gray-300 hover:text-white px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 outline-none">
          <span class="flex items-center gap-2 w-full">
            <NodeDelegators class="w-5 h-5" />
            Delegate <Icon icon="hugeicons:coming-soon-01" class="w-5 h-5" />
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled @select="handleSelect('Option 4')" class="text-sm text-gray-300 hover:text-white px-2 py-1.5 rounded cursor-pointer hover:bg-gray-800 outline-none">
          <span class="flex items-center gap-2 w-full">
            <DetailsIcon class="w-5 h-5" />
            View Details <Icon icon="hugeicons:coming-soon-01" class="w-5 h-5" />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
