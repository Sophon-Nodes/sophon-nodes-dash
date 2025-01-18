<script setup>
import { Icon } from '@iconify/vue'
import { ref, watch, defineProps, defineEmits } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectValue,
} from 'radix-vue'

const filter = ref();
const props = defineProps(['itens']);
const emit = defineEmits(['updateLimitPerPage', 'updateOthersFilter']);

watch(filter, async () => {  
  emit(props.itens.function, [props.itens.filterType, filter.value]);
})

</script>

<template>
  <SelectRoot v-model="filter" :defaultValue="props.itens.defaultVal">
    <SelectTrigger 
      class="inline-flex items-center justify-between rounded-lg border border-[#505255] border-opacity-30 bg-[#0A0C10] px-3 py-2 text-sm text-gray-400 shadow-card hover:bg-gray-900 gap-2"
      aria-label="Customise options"
    >
      <SelectValue placeholder="Select a option..." />
      <Icon
        icon="mingcute:down-line"
        class="h-4 w-4"
      />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent 
        class="overflow-hidden rounded-lg border border-[#505255] border-opacity-30 bg-[#0A0C10] shadow-lg"
        position="popper"
        :side-offset="5"
      >
        <SelectViewport class="p-1">
          <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-[#0A0C10] text-violet11 cursor-default">
            <Icon icon="mingcute:up-line" />
          </SelectScrollUpButton>
          <SelectItem
            v-for="(option, index) in props.itens.obj"
            :key="index"
            :value="option.value"
            class="relative flex items-center px-6 py-2 text-sm text-gray-400 rounded-md outline-none hover:bg-gray-900 cursor-pointer data-[highlighted]:bg-gray-900 data-[highlighted]:text-white data-[state=checked]:text-white"
          >
            <SelectItemIndicator class="absolute left-1">
              <Icon icon="mingcute:check-line" class="h-4 w-4" />
            </SelectItemIndicator>
            <SelectItemText>{{ option.text }}</SelectItemText>
          </SelectItem>
          <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-[#0A0C10] text-violet11 cursor-default">
            <Icon icon="mingcute:down-line" />
          </SelectScrollDownButton>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style>
.shadow-card {
  box-shadow: 0px 0px 0px 1px rgba(80, 82, 85, 0.30), 0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px -1px rgba(0, 0, 0, 0.10);
}
</style>