<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'
import { Icon } from '@iconify/vue'

</script>

<template>
  <DialogRoot>
    <DialogTrigger
      class=""
    >
        <Icon icon="token-branded:metamask" width="24" height="24" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] focus:outline-none z-[100] rounded-lg p-6 border border-gray-200 dark:border-[#2E2E2E] bg-white dark:bg-white/[0.03] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)] backdrop-blur-[25px]"
      >
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold text-gray-900 dark:text-white">
            Connect a Wallet
        </DialogTitle>
        <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal text-gray-600 dark:text-slate-400">
            Select a wallet for authentication.
        </DialogDescription>
        <div class="grid grid-cols-1 gap-3">
            <button type="button" class="flex justify-between w-100 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                <span class="w-1/3 flex items-center text-sm">MetaMask</span>
                <span class="w-8 flex items-center justify-center"><Icon icon="logos:metamask-icon" width="25.6" height="24" /></span>
            </button>
            <button type="button" class="flex justify-between w-100 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                <span class="w-1/3 flex items-center text-sm">WalletConnect</span>
                <span class="w-8 flex items-center justify-center"><Icon icon="simple-icons:walletconnect" width="24" height="24" style="color: #0c83db" /></span>
            </button>            
        </div>
        <DialogClose
          class="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center focus:shadow-[0_0_0_2px] focus:outline-none p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <Icon icon="lucide:x" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>