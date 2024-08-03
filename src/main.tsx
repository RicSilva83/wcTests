import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import '@rainbow-me/rainbowkit/styles.css';
import { Chain, connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { phantomWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WalletContextProvider from './WalletContextProvider.tsx';

export const solana = {
    id: 900,
    name: 'Solana',
    nativeCurrency: {
        decimals: 9,
        name: 'Solana',
        symbol: 'SOL',
    },
    rpcUrls: {
        public: { http: ['https://api.mainnet-beta.solana.com'] },
        default: { http: ['https://api.mainnet-beta.solana.com'] },
    },
    blockExplorers: {
        solanaExplorer: { name: 'Solana Explorer', url: 'https://explorer.solana.com' },
        default: { name: 'Solana Explorer', url: 'https://explorer.solana.com' },
    },
    contracts: {
        // Solana does not use the same contract model as EVM chains, so this is left empty
    },
} as const satisfies Chain;

const chains: readonly [Chain, ...Chain[]] = [mainnet, polygon, solana];
const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [phantomWallet, walletConnectWallet],
        },
    ],
    {
        appName: 'My RainbowKit App',
        projectId: 'YOUR_PROJECT_ID',
    }
);

const config = createConfig({
    connectors: connectors,
    chains: chains,
    transports: {
        mainnet: http('https://mainnet.example.com'),
        sepolia: http('https://sepolia.example.com'),
    },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <RainbowKitProvider>
                    <WalletContextProvider>
                        <App />
                    </WalletContextProvider>
                </RainbowKitProvider>
            </WagmiProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);