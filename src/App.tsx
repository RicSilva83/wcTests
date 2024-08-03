import { useEffect, useState } from 'react';
import './App.css';
import {WalletDisconnectButton, WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey} from '@solana/web3.js';
import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            console.log('publicKey', publicKey);
            if (publicKey) {
                // Update the RPC URL to a valid one
                const connection = new Connection("https://misty-orbital-crater.solana-mainnet.quiknode.pro/c9cc4c34174920228a62a86b5e55fddc1b68d237", );
                const balance = await connection.getBalance(new PublicKey(publicKey));
                setBalance(balance / 1e9); // Convert lamports to SOL
            }
        };

        fetchBalance();
    }, [publicKey]);

    return (
        <div className="App flex flex-col gap-10 justify-center items-center">
            <h1 className={"p-5"}>My Solana App</h1>
            <WalletMultiButton />
            <WalletDisconnectButton/>

            {publicKey && (
                <div>
                    <p>Wallet Address: {publicKey.toBase58()}</p>
                    <p>Solana Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
                </div>
            )}
            <div style={{marginTop: '2.5rem'}}>
                <ConnectButton/>
            </div>
        </div>
    );
}

export default App;