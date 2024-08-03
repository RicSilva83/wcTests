import {FC, ReactNode, useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {PhantomWalletAdapter, WalletConnectWalletAdapter} from '@solana/wallet-adapter-wallets';
import {clusterApiUrl} from '@solana/web3.js';
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

import '@solana/wallet-adapter-react-ui/styles.css';


const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const endpoint = useMemo(() => clusterApiUrl('devnet'), []);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new WalletConnectWalletAdapter({
                network: WalletAdapterNetwork.Mainnet,
                options: {
                    relayUrl: 'wss://relay.walletconnect.com',
                    // example WC app project ID
                    projectId: 'e899c82be21d4acca2c8aec45e893598',
                    metadata: {
                        name: 'Example App',
                        description: 'Example App',
                        url: 'https://github.com/solana-labs/wallet-adapter',
                        icons: ['https://avatars.githubusercontent.com/u/35608259?s=200'],
                    },
                },
            }),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;