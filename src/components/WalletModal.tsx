import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  ShieldCheck, 
  DollarSign, 
  CreditCard,
  Building,
  Coins,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { WalletState } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  onTopUpRMB: (amountCNY: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onTopUpRMB,
}) => {
  const [topUpUSD, setTopUpUSD] = useState<number>(1000);
  const [paymentMethod, setPaymentMethod] = useState<'WISE' | 'WIRE' | 'CRYPTO' | 'CARD'>('WISE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isOpen) return null;

  const calculatedCNY = topUpUSD * wallet.exchangeRate;

  const handleExecuteTopUp = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onTopUpRMB(calculatedCNY);
      setIsProcessing(false);
      setSuccessNotice(true);
      setTimeout(() => {
        setSuccessNotice(false);
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-xs">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">Fund RMB Procurement Wallet</h2>
              <p className="text-xs text-slate-500">Zero-markup mid-market FX settlement for 1688 & freight escrow</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close wallet modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Balance Highlights */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Available to Spend
              </span>
              <p className="text-2xl font-extrabold font-mono text-slate-950 mt-1">
                ¥{wallet.balanceCNY.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                (${wallet.balanceUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active Escrow Lock
              </span>
              <p className="text-2xl font-extrabold font-mono text-slate-700 mt-1">
                ¥{wallet.lockedEscrowCNY.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Released only after physical QC inspection
              </p>
            </div>
          </div>

          {/* FX Converter Rate Box */}
          <div className="p-3.5 rounded-2xl bg-[#eef3ee] border border-[#d6e3d7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-700 font-semibold">Bank Mid-Market FX Rate:</span>
              <span className="font-mono font-bold text-slate-950">1 USD = {wallet.exchangeRate} CNY</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-800/10">
              Zero FX Markup
            </span>
          </div>

          {/* Top Up Converter Input */}
          <div className="space-y-3">
            <label className="block text-slate-800 font-semibold">
              Instant USD to RMB Currency Conversion:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <span className="text-[11px] text-slate-500 mb-1 block font-medium">Deposit Amount (USD)</span>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    value={topUpUSD}
                    onChange={(e) => setTopUpUSD(Math.max(10, Number(e.target.value)))}
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold text-sm focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    min={10}
                  />
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 mb-1 block font-medium">You Receive in Wallet (CNY)</span>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">¥</span>
                  <input
                    type="text"
                    disabled
                    value={calculatedCNY.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 font-mono font-extrabold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Quick deposit preset buttons */}
            <div className="flex gap-2">
              {[250, 500, 1000, 2500, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTopUpUSD(amt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all ${
                    topUpUSD === amt
                      ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Funding Method Selector */}
          <div className="space-y-2 pt-1">
            <span className="block text-slate-700 font-semibold">Funding Method:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('WISE')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'WISE'
                    ? 'bg-slate-950 border-slate-950 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <DollarSign className="w-4 h-4 mx-auto mb-1 opacity-80" />
                <span className="block font-semibold">Wise (0% Fee)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('WIRE')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'WIRE'
                    ? 'bg-slate-950 border-slate-950 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Building className="w-4 h-4 mx-auto mb-1 opacity-80" />
                <span className="block font-semibold">ACH / Wire</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CRYPTO')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'CRYPTO'
                    ? 'bg-slate-950 border-slate-950 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Coins className="w-4 h-4 mx-auto mb-1 opacity-80" />
                <span className="block font-semibold">USDT / USDC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'CARD'
                    ? 'bg-slate-950 border-slate-950 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1 opacity-80" />
                <span className="block font-semibold">Card (Stripe)</span>
              </button>
            </div>
          </div>

          {successNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Wallet credited +¥{calculatedCNY.toLocaleString()} RMB successfully!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Settlement: Instant • Escrow Protected
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExecuteTopUp}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <span>{isProcessing ? 'Converting...' : `Deposit ¥${calculatedCNY.toFixed(0)} CNY`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
