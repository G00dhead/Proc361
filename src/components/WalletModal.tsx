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
import { useLanguage } from '../context/LanguageContext';

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
  const { t, language } = useLanguage();
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
              <h2 className="text-sm font-bold text-slate-950">
                {language === 'zh' ? '人民币跨境直采钱包充值' : 'Fund RMB Procurement Wallet'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'zh' ? '0 汇率加价银行中间价实时结算 • 1688及货运担保代管' : 'Zero-markup mid-market FX settlement for 1688 & freight escrow'}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close wallet modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
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
                {t.availableToSpend}
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
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {t.activeEscrowLock}
              </span>
              <p className="text-2xl font-extrabold font-mono text-slate-700 mt-1">
                ¥{wallet.lockedEscrowCNY.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'zh' ? '仅在实物拍照品控通过后划转' : 'Released only after physical QC inspection'}
              </p>
            </div>
          </div>

          {/* FX Converter Rate Box */}
          <div className="p-3.5 rounded-2xl bg-[#eef3ee] border border-[#d6e3d7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-700 font-semibold">{language === 'zh' ? '实时银行中间参考汇率：' : 'Bank Mid-Market FX Rate:'}</span>
              <span className="font-mono font-bold text-slate-950">1 USD = {wallet.exchangeRate} CNY</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-800/10">
              {language === 'zh' ? '0 汇差加价' : 'Zero FX Markup'}
            </span>
          </div>

          {/* Top Up Converter Input */}
          <div className="space-y-3">
            <label className="block text-slate-800 font-semibold">
              {language === 'zh' ? '即时美元向人民币换汇充值：' : 'Instant USD to RMB Currency Conversion:'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <span className="text-[11px] text-slate-500 mb-1 block font-medium">{language === 'zh' ? '存入美元金额 (USD)' : 'Deposit Amount (USD)'}</span>
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
                <span className="text-[11px] text-slate-500 mb-1 block font-medium">{language === 'zh' ? '钱包到账人民币 (CNY)' : 'You Receive in Wallet (CNY)'}</span>
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
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
            <span className="block text-slate-700 font-semibold">{language === 'zh' ? '选择充值支付方式：' : 'Funding Method:'}</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('WISE')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
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
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
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
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
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
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
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
              <span>
                {language === 'zh'
                  ? `人民币钱包已成功充值入账 +¥${calculatedCNY.toLocaleString()} RMB！`
                  : `Wallet credited +¥${calculatedCNY.toLocaleString()} RMB successfully!`}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            {language === 'zh' ? '结算机制：实时即时到账 • 资金受代管保护' : 'Settlement: Instant • Escrow Protected'}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="button"
              onClick={handleExecuteTopUp}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>
                {isProcessing
                  ? (language === 'zh' ? '正在换汇入账...' : 'Converting...')
                  : (language === 'zh' ? `确认充值 ¥${calculatedCNY.toFixed(0)} CNY` : `Deposit ¥${calculatedCNY.toFixed(0)} CNY`)}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
