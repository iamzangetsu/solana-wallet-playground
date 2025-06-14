
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { Coins, Loader } from "lucide-react";

export const Airdrop = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function sendAirdropToUser() {
        if (!publicKey) {
            setMessage("Wallet not connected!");
            return;
        }

        const amountNumber = parseFloat(amount);
        if (!amountNumber || amountNumber <= 0) {
            setMessage("Please enter a valid amount!");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const signature = await connection.requestAirdrop(publicKey, amountNumber * LAMPORTS_PER_SOL);
            await connection.confirmTransaction(signature);
            setMessage(`Successfully airdropped ${amountNumber} SOL!`);
            setAmount("");
        } catch (error) {
            setMessage("Airdrop failed. Please try again.");
            console.error("Airdrop error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex space-x-3">
                <input
                    type="number"
                    placeholder="Amount (SOL)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    min="0"
                    step="0.1"
                    max="5"
                />
                <button
                    onClick={sendAirdropToUser}
                    disabled={loading || !publicKey}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
                >
                    {loading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                        <Coins className="w-5 h-5" />
                    )}
                    <span>{loading ? "Requesting..." : "Request Airdrop"}</span>
                </button>
            </div>

            {message && (
                <div className={`p-3 rounded-lg text-sm font-medium ${
                    message.includes("Successfully") 
                        ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>
                    {message}
                </div>
            )}

            <p className="text-white/60 text-sm">
                Request up to 5 SOL on Devnet for testing purposes
            </p>
        </div>
    );
};
