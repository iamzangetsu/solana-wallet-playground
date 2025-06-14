
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Wallet, Shield, Send, Coins, User } from 'lucide-react';

import { Airdrop } from '../components/Airdrop';
import { SendTokens } from '../components/SendTokens';
import { SignMessage } from '../components/SignMessage';
import { ShowSolBalance } from '../components/ShowSolBalance';

const Index = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Header */}
            <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
              <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">SolWallet</h1>
                      <p className="text-purple-300 text-sm">Devnet Explorer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 !rounded-xl !px-6 !py-3 !text-white !font-semibold hover:!from-purple-700 hover:!to-blue-700 !transition-all !duration-300 !transform hover:!scale-105" />
                    <WalletDisconnectButton className="!bg-red-600 !rounded-xl !px-4 !py-3 !text-white !font-semibold hover:!bg-red-700 !transition-all !duration-300" />
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Balance Card */}
                <div className="lg:col-span-1">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <Coins className="w-5 h-5 text-yellow-400" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Balance</h2>
                    </div>
                    <ShowSolBalance />
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Airdrop Section */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Coins className="w-5 h-5 text-green-400" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Request Airdrop</h2>
                    </div>
                    <Airdrop />
                  </div>

                  {/* Send Tokens Section */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Send className="w-5 h-5 text-blue-400" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Send Tokens</h2>
                    </div>
                    <SendTokens />
                  </div>

                  {/* Sign Message Section */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Shield className="w-5 h-5 text-purple-400" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Sign Message</h2>
                    </div>
                    <SignMessage />
                  </div>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="mt-16 bg-black/20 backdrop-blur-md border-t border-white/10">
              <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-center space-x-2 text-white/60">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Built with Solana Web3.js & Tailwind CSS</span>
                </div>
              </div>
            </footer>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Index;
