
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Shield, Loader, Copy } from "lucide-react";
import bs58 from "bs58";

export const SignMessage = () => {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [signature, setSignature] = useState("");
    const [status, setStatus] = useState("");

    async function onClick() {
        if (!publicKey) {
            setStatus("Wallet not connected!");
            return;
        }
        
        if (!signMessage) {
            setStatus("Wallet does not support message signing!");
            return;
        }

        if (!message.trim()) {
            setStatus("Please enter a message to sign!");
            return;
        }

        setLoading(true);
        setStatus("");
        setSignature("");

        try {
            const encodedMessage = new TextEncoder().encode(message);
            const sig = await signMessage(encodedMessage);

            if (!ed25519.verify(sig, encodedMessage, publicKey.toBytes())) {
                throw new Error("Message signature invalid!");
            }

            const sigString = bs58.encode(sig);
            setSignature(sigString);
            setStatus("Message signed successfully!");
        } catch (error) {
            setStatus("Failed to sign message. Please try again.");
            console.error("Sign message error:", error);
        } finally {
            setLoading(false);
        }
    }

    const copySignature = () => {
        navigator.clipboard.writeText(signature);
        setStatus("Signature copied to clipboard!");
    };

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                <textarea
                    placeholder="Enter message to sign..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                />
            </div>

            <button
                onClick={onClick}
                disabled={loading || !publicKey}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
                {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                ) : (
                    <Shield className="w-5 h-5" />
                )}
                <span>{loading ? "Signing..." : "Sign Message"}</span>
            </button>

            {signature && (
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">Signature:</span>
                        <button
                            onClick={copySignature}
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="bg-black/30 rounded p-3 text-xs text-white/80 font-mono break-all">
                        {signature}
                    </div>
                </div>
            )}

            {status && (
                <div className={`p-3 rounded-lg text-sm font-medium ${
                    status.includes("successfully") || status.includes("copied")
                        ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>
                    {status}
                </div>
            )}
        </div>
    );
};
