import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, bsc, polygon } from 'wagmi/chains'


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ mainnet, bsc, polygon ],
  [ publicProvider() ],
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiConfig config={config}>
    <App />
  </WagmiConfig>
  ,
)
