
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { Send, Loader } from "lucide-react";

export const SendTokens = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function sendTokens() {
        if (!publicKey) {
            setMessage("Wallet not connected!");
            return;
        }

        const amountNumber = parseFloat(amount);
        if (!amountNumber || amountNumber <= 0) {
            setMessage("Please enter a valid amount!");
            return;
        }

        if (!to) {
            setMessage("Please enter a recipient address!");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const toPublicKey = new PublicKey(to);
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: toPublicKey,
                    lamports: amountNumber * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature);
            
            setMessage(`Successfully sent ${amountNumber} SOL!`);
            setTo("");
            setAmount("");
        } catch (error) {
            setMessage("Transaction failed. Please check the details and try again.");
            console.error("Send tokens error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Recipient Address"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <input
                    type="number"
                    placeholder="Amount (SOL)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    min="0"
                    step="0.001"
                />
            </div>

            <button
                onClick={sendTokens}
                disabled={loading || !publicKey}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
                {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                ) : (
                    <Send className="w-5 h-5" />
                )}
                <span>{loading ? "Sending..." : "Send Tokens"}</span>
            </button>

            {message && (
                <div className={`p-3 rounded-lg text-sm font-medium ${
                    message.includes("Successfully") 
                        ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>
                    {message}
                </div>
            )}
        </div>
    );
};
