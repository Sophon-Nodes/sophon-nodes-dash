
<script setup>
  import { createAppKit } from '@reown/appkit/vue'
  import { defineChain } from '@reown/appkit/networks'
  import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
  import { Icon } from '@iconify/vue'

  const projectId = process.env.VUE_APP_REOWN_PROJECT_ID

  const customNetworkIcon = { 
    src: new URL('../assets/images/logos/network_sophon_logo.jpeg', import.meta.url).href,
    alt: 'Sophon Network Logo',
  }  

  const metadata = {
    name: 'sophonnodes',
    description: 'SophonNodes',
    url: 'https://sophonnodes.xyz',
    icons: ['https://assets.reown.com/reown-profile-pic.png']
  }

  const sophonNetwork = defineChain({
    id: 50104,
    caipNetworkId: 'eip155:50104',
    chainNamespace: 'eip155',
    name: 'Sophon',
    nativeCurrency: {
      decimals: 18,
      name: 'Sophon',
      symbol: 'SOPH',
    },
    rpcUrls: {
      default: {
        http: [process.env.VUE_APP_HTTP_RPC_SOPHON],
        webSocket: [process.env.VUE_APP_WS_RPC_SOPHON],
      },
    },
    blockExplorers: {
      default: { name: 'Sophon Explorer', url: 'https://explorer.sophon.xyz/' },
    },
    contracts: {
      // Add the contracts here
    }
  })

  const networks = [sophonNetwork]

  const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId
  })

  const modal = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    chainImages: { // Customize networks' logos
      50104: customNetworkIcon.src,
    },
    metadata,
    projectId,
    features: {
      email: false,
      socials: [],
      analytics: true,
      swaps: false,
      onramp: false
    },
    featuredWalletIds: [
      '18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1',
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
      'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
      '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
    ]
  })  
</script>

<template>
    <button @click="modal.open()">
      <!-- <Icon icon="token-branded:metamask" width="24" height="24" /> -->
      <Icon class="h-5 w-5 block text-gray-100 hover:text-gray-200 dark:text-gray-500 dark:hover:text-gray-300" icon="iconoir:wallet-solid" width="24" height="24" />
    </button>
</template>