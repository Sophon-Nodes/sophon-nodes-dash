
<script setup>
  import { createAppKit, useAppKit } from '@reown/appkit/vue'
  import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
  import { mainnet, arbitrum } from '@reown/appkit/networks'
  import { Icon } from '@iconify/vue'

  const projectId = process.env.VUE_APP_REOWN_PROJECT_ID

  const metadata = {
    name: 'sophonnodes',
    description: 'SophonNodes',
    url: 'https://sophonnodes.xyz',
    icons: ['https://assets.reown.com/reown-profile-pic.png']
  }

   createAppKit({
    adapters: [new Ethers5Adapter()],
    networks: [mainnet, arbitrum],
    metadata,
    projectId,
    features: {
      analytics: true
    }
  })

  const modal = useAppKit()
</script>

<template>
    <button @click="modal.open()">
        <Icon icon="token-branded:metamask" width="24" height="24" />
    </button>
</template>