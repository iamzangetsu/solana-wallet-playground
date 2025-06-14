
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Wallet, Shield, Send, Coins, User, Github } from 'lucide-react';

import { Airdrop } from '../components/Airdrop';
import { SendTokens } from '../components/SendTokens';
import { SignMessage } from '../components/SignMessage';
import { ShowSolBalance } from '../components/ShowSolBalance';

const GITHUB_URL = "https://github.com/your-source-code-repository";

const Index = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col relative">
            {/* Sticky GitHub Link + GIF */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="fixed lg:top-7 top-2 right-3 z-50 flex items-center space-x-2 rounded-lg p-1.5 bg-black/80 hover:bg-black/90 transition-all group shadow-lg border border-white/20"
              style={{
                backdropFilter: 'blur(8px)'
              }}
            >
              <Github className="w-5 h-5 text-white group-hover:text-purple-300" />
              <span className="hidden md:inline text-white text-sm font-medium">Source</span>
              <img
                src="https://64.media.tumblr.com/0fa92a0603a0856d4e97cdf0ba96a894/8cdec7aa2fc5471d-a1/s540x810/725c94f19b8f71895cd2acf00379c35b8f80f3fe.gifv"
                alt="branding"
                className="w-6 h-6 rounded-md object-cover border border-white/20"
              />
            </a>

            {/* Header */}
            <header className="w-full bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">SolWallet</h1>
                      <p className="text-purple-300 text-sm">Devnet Explorer</p>
                    </div>
                  </div>
                  {/* Wallet Buttons, responsive */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 z-40">
                    <WalletMultiButton
                      className="!bg-gradient-to-r !from-purple-600 !to-blue-600 !rounded-xl !px-6 !py-3 !text-white !font-semibold hover:!from-purple-700 hover:!to-blue-700 !transition-all !duration-300 !transform hover:!scale-105"
                      style={{ zIndex: 40 }}
                    />
                    <WalletDisconnectButton
                      className="!bg-red-600 !rounded-xl !px-4 !py-3 !text-white !font-semibold hover:!bg-red-700 !transition-all !duration-300"
                      style={{ zIndex: 40 }}
                    />
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-6 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Balance Card */}
                <div className="lg:col-span-1">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
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
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {/* Airdrop Section */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg relative z-20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Coins className="w-5 h-5 text-green-400" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Request Airdrop</h2>
                    </div>
                    <Airdrop />
                  </div>

                  {/* Send Tokens Section */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Send className="w-5 h-5 text-blue-400" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Send Tokens</h2>
                    </div>
                    <SendTokens />
                  </div>

                  {/* Sign Message Section */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg z-10">
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
            <footer className="mt-8 sm:mt-16 bg-black/20 backdrop-blur-md border-t border-white/10">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-2 sm:space-y-0 text-white/60">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Built with Solana Web3.js & Tailwind CSS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-white/70 hover:text-purple-300 transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
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
