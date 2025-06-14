
# SolWallet – A Solana Devnet Dashboard

SolWallet is a modern, developer-focused web wallet for Solana, built with React, TypeScript, Tailwind CSS, and the Solana Wallet Adapter. It enables seamless interaction with the Solana Devnet: connect your wallet, request airdrops, send SOL, and sign messages – all in a user-friendly, decentralized interface.

---

## ✨ Features

- **Connect to any Solana Wallet** via [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- **Request Airdrops** of SOL on Devnet for easy testing
- **Send SOL tokens** to any address
- **View your Devnet SOL Balance** instantly
- **Sign messages** with your wallet for on-chain/off-chain verification
- **Responsive and beautiful UI** with Tailwind and shadcn/ui
- **Built-in GitHub link** for transparency and open source spirit

---

## 🛠️ Tech Stack

- **[Solana Web3.js](https://solana-labs.github.io/solana-web3.js/):**
  The official JavaScript API for Solana blockchain interaction, powering wallet connects, transaction signing, balance checks, and more.

- **[Wallet Adapter](https://github.com/solana-labs/wallet-adapter):**
  Unified plug-and-play React solution to connect a variety of Solana wallets, making onboarding fast and secure. Includes out-of-the-box UI components for wallet selection, connect, and disconnect.

- **React + TypeScript:** Robust, component-based architecture.
- **Tailwind CSS + shadcn/ui:** Modern, accessible, and responsive design system.
- **lucide-react:** Beautiful SVG icon library.
- **Vite:** Lightning-fast development environment.

---

## 🌍 Decentralized Concepts

SolWallet is **non-custodial** and **decentralized**:

- All key management and signing are handled **inside your wallet** – your keys are never shared with the app or its server.
- You interact directly with the **Solana Devnet** – nothing is centralized or hidden.
- **Open Source:** [View the source on GitHub!](https://github.com/your-source-code-repository)

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js** and **npm** (v16 or later recommended)
- A supported Solana wallet (e.g. Phantom, Solflare, Backpack).

### 2. Installation

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or as directed by Vite) to start using SolWallet!

### 3. Connect a Wallet

1. Click **Connect Wallet** at the top right.
2. Select your preferred wallet from the modal.
3. Interact with Solana Devnet instantly!

---

## 🧑‍💻 Project Structure

- `src/pages/Index.tsx` – Main dashboard UI
- `src/components/ShowSolBalance.tsx` – Displays connected wallet’s SOL balance
- `src/components/Airdrop.tsx` – SOL faucet for Devnet testing
- `src/components/SendTokens.tsx` – Transfer SOL to another address
- `src/components/SignMessage.tsx` – Sign messages and copy signatures
- **Styling:** Tailwind CSS, shadcn/ui, lucide-react icons

---

## 🔐 About Solana Web3.js & Wallet Adapter

**solana/web3.js** exposes all functionality to:

- Connect to the Solana cluster (Devnet/Mainnet/Testnet)
- Create and sign transactions (like transfers and message signing)
- Fetch account info and SOL balances

**Wallet Adapter** provides wallet interoperability and security by abstracting the details of each wallet’s connection and signing API, letting you focus on building great dApps.

---

## 🛡️ Security

- **Non-custodial:** Your private keys never leave your wallet.
- All messages and transactions are reviewed and signed in your wallet extension or app.
- No backend: all actions are direct client-to-blockchain.

**Never share your private keys or secret recovery phrases!**

---

## 📝 Customization & Deployment

- Easily theme with Tailwind classes or add more wallet adapters.
- Deploy with [Lovable](https://lovable.dev) or any Vercel/Netlify/VPS using standard React build steps.
- Connect your custom domain for production.

---

## 🙋 FAQ

**Q: Is this mainnet-ready?**  
A: SolWallet is designed for **Devnet** only! For mainnet use, update the network config and be aware of production risks.

**Q: Can I add more wallets?**  
A: Absolutely! Configure more wallets in the WalletProvider array in `Index.tsx`.

---

## ❤️ Credits

- [Solana Labs](https://solana.com/)
- [solana-labs/wallet-adapter](https://github.com/solana-labs/wallet-adapter)
- [shadcn/ui](https://ui.shadcn.com/)
- [lucide-react](https://lucide.dev/)

---

## 📄 License

MIT

