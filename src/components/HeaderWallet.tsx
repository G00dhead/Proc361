import React, { useState } from 'react';
import { 
  Wallet, 
  RefreshCw, 
  Plus, 
  Link as LinkIcon, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { WalletState } from '../types';

interface HeaderWalletProps {
  wallet: WalletState;
  onOpenTopUp: () => void;
  onOpenNewOrder: () => void;
  onQuickLinkSubmit: (url: string) => void;
  needsActionCount: number;
  readyToConsolidateCount: number;
  onConsolidateClick: () => void;
}

export const HeaderWallet: React.FC<HeaderWalletProps> = ({
  wallet,
  onOpenTopUp,
  onOpenNewOrder,
  onQuickLinkSubmit,
  needsActionCount,
  readyToConsolidateCount,
  onConsolidateClick,
}) => {
  const [quickUrl, setQuickUrl] = useState('');
  const [isRefreshingFx, setIsRefreshingFx] = useState(false);

  const handleRefreshFx = () => {
    setIsRefreshingFx(true);
    setTimeout(() => setIsRefreshingFx(false), 600);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;
    onQuickLinkSubmit(quickUrl);
    setQuickUrl('');
  };

  return (
    <header className="border-b border-slate-800 bg-[#0d1017] sticky top-0 z-30">
      {/* Top Bar */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Context */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
            <span className="text-xs font-mono font-bold tracking-tight">P360</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-100 tracking-tight">
                Proc360
              </h1>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                China Operations
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Procurement • Escrow • Warehouse QC • Freight
            </p>
          </div>
        </div>

        {/* Center: Live FX & Hub Operations Health */}
        <div className="hidden lg:flex items-center gap-4 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-slate-400">USD/CNY:</span>
            <span className="font-mono font-semibold text-slate-200">{wallet.exchangeRate.toFixed(4)}</span>
            <button 
              onClick={handleRefreshFx}
              title="Refresh Live Bank Rate"
              className="ml-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshingFx ? 'animate-spin text-slate-300' : ''}`} />
            </button>
          </div>

          <div className="h-3 w-px bg-slate-800"></div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Dongguan Hub: <strong className="font-mono text-slate-300">2.1h Avg QC</strong></span>
            <span>•</span>
            <span>Shenzhen Terminal: <strong className="font-mono text-slate-300">On Schedule</strong></span>
          </div>
        </div>

        {/* Right: RMB Wallet & Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Wallet Balance Widget */}
          <div 
            id="wallet-quick-status"
            className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 hover:border-slate-700 transition-colors cursor-pointer"
            onClick={onOpenTopUp}
            title="Click to view RMB Wallet ledger & Fund conversion"
          >
            <div className="h-6 w-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <Wallet className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <span>RMB Wallet</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  (Escrow: ¥{wallet.lockedEscrowCNY.toLocaleString()})
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono font-bold text-slate-100 text-xs tracking-tight">
                  ¥{wallet.balanceCNY.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  (${wallet.balanceUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })})
                </span>
              </div>
            </div>

            <button 
              type="button"
              className="ml-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" /> Top Up
            </button>
          </div>

          {/* Quick Consolidation Indicator Button */}
          {readyToConsolidateCount > 0 && (
            <button
              onClick={onConsolidateClick}
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              title="View arrived warehouse packages ready for international consolidation"
            >
              <Layers className="w-3.5 h-3.5 text-slate-300" />
              <span>Consolidate ({readyToConsolidateCount})</span>
            </button>
          )}

          {/* New Order Button - Crisp Warm Amber Accent */}
          <button
            onClick={onOpenNewOrder}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Sourcing</span>
          </button>
        </div>
      </div>

      {/* Sub-bar: 1-Click Link Sourcing Strip */}
      <div className="bg-[#090c10] border-t border-slate-800/80 px-4 sm:px-6 py-2">
        <div className="max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <form onSubmit={handleQuickSubmit} className="flex-1 w-full flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <LinkIcon className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
                placeholder="Paste 1688, Taobao, or Weidian link to fetch product spec & routing..."
                className="w-full pl-9 pr-24 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-600 font-mono transition-colors"
              />
              <button
                type="submit"
                disabled={!quickUrl.trim()}
                className="absolute inset-y-1 right-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 text-[11px] font-semibold rounded flex items-center gap-1 transition-colors border border-slate-700"
              >
                Fetch Spec
              </button>
            </div>
          </form>

          {/* Supported Sourcing Badges in Clean Monochrome */}
          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 font-medium whitespace-nowrap">
            <span className="text-slate-500">Supported:</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">1688.com</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">Taobao</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">Weidian</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">OEM Factory RFQ</span>
          </div>
        </div>
      </div>
    </header>
  );
};
