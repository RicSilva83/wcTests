import { useEffect, useState } from 'react';
import './App.css';
import WalletContextProvider from "./WalletContextProvider.tsx";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                const connection = new Connection('https://api.mainnet-beta.solana.com');
                const balance = await connection.getBalance(new PublicKey(publicKey));
                setBalance(balance / 1e9); // Convert lamports to SOL
            }
        };

        fetchBalance();
    }, [publicKey]);

    return (
        <WalletContextProvider>
            <div className="App flex flex-col justify-center items-center">
                <h1>My Solana App</h1>
                <WalletMultiButton />
                <ConnectButton />
                {publicKey && (
                    <div>
                        <p>Wallet Address: {publicKey.toBase58()}</p>
                        <p>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
                    </div>
                )}
            </div>
        </WalletContextProvider>
    );
}

export default App;