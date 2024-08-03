// SolanaInteraction.tsx

import React, { useCallback, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

const SolanaInteraction: React.FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [message, setMessage] = useState<string>('');

    const onClick = useCallback(async () => {
        if (!publicKey) {
            setMessage('Please connect your wallet first');
            return;
        }

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey('recipient-public-key'),
                lamports: 1000000, // Adjust the amount accordingly
            })
        );

        try {
            const signature = await sendTransaction(transaction, connection);
            setMessage(`Transaction sent with signature: ${signature}`);
        } catch (error: any) {
            setMessage(`Transaction failed: ${error.message}`);
        }
    }, [publicKey, sendTransaction, connection]);

    return (
        <div>
            <button onClick={onClick} disabled={!publicKey}>
                Send Transaction
            </button>
            <p>{message}</p>
        </div>
    );
};

export default SolanaInteraction;
