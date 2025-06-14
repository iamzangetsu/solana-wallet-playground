
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { Wallet, RefreshCw } from "lucide-react";

export const ShowSolBalance = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!connection || !publicKey) {
            return;
        }

        const getBalance = async () => {
            setLoading(true);
            try {
                const bal = await connection.getBalance(publicKey);
                setBalance(bal / LAMPORTS_PER_SOL);
            } catch (error) {
                console.error("Error fetching balance:", error);
            } finally {
                setLoading(false);
            }
        };

        getBalance();
    }, [connection, publicKey]);

    const refreshBalance = async () => {
        if (!connection || !publicKey) return;
        
        setLoading(true);
        try {
            const bal = await connection.getBalance(publicKey);
            setBalance(bal / LAMPORTS_PER_SOL);
        } catch (error) {
            console.error("Error refreshing balance:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!publicKey) {
        return (
            <div className="text-center py-8">
                <Wallet className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">Connect your wallet to view balance</p>
            </div>
        );
    }

    return (
        <div className="text-center">
            <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-2">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <RefreshCw className="w-6 h-6 animate-spin" />
                        </div>
                    ) : (
                        `${balance.toFixed(4)} SOL`
                    )}
                </div>
                <p className="text-white/60 text-sm">Devnet Balance</p>
            </div>
            
            <button
                onClick={refreshBalance}
                disabled={loading}
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
            </button>
        </div>
    );
};
