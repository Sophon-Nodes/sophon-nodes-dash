
<script setup>
  import { onMounted, watch } from 'vue'
  import { useAppKit, useAppKitAccount } from '@reown/appkit/vue'
  import { Icon } from '@iconify/vue'

  const modal = useAppKit()
  const account = useAppKitAccount()

  const checkWalletConnection = () => {
    if (account.value.isConnected) {
      console.log('Wallet:', account.value.address)
    } else {
      console.log('Not connected.')
    }
  }

  onMounted(() => {
    checkWalletConnection()
  })

  watch(() => account.value.isConnected, (newValue) => {
    if (newValue) {
      console.log('Connected!')
    } else {
      console.log('Not connected!')
    }
  })

  //I need to improve this, do some more testing and fix possible bugs...
  const connectWallet = async () => {
    try {
      await modal.open();
    } catch (error) {
      if (error.message.includes('Proposal expired')) {
        console.error('Try again.');
      } else {
        console.error('Error:', error);
      }
    }
  };
</script>

<template>
    <button @click="connectWallet()">
      <!-- <Icon icon="token-branded:metamask" width="24" height="24" /> -->
      <Icon class="h-5 w-5 block text-gray-100 hover:text-gray-200 dark:text-gray-500 dark:hover:text-gray-300" icon="iconoir:wallet-solid" width="24" height="24" />
    </button>
    {{ account.address }}
</template>