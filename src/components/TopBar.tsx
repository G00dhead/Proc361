import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Wallet, 
  Bell,
  SlidersHorizontal,
  PackageCheck
} from 'lucide-react';
import { WalletState } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wallet: WalletState;
  onOpenFundWallet: () => void;
  onOpenPlaceOrder: () => void;
  onExport: () => void;
  onShowToast: (msg: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  onSearchChange,
  wallet,
  onOpenFundWallet,
  onOpenPlaceOrder,
  onExport,
  onShowToast,
}) => {
  const { language, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: language === 'zh' ? '¥3,450 人民币 采购订单待授权' : '¥3,450 RMB Sourcing PO Ready',
      desc: language === 'zh' ? '东莞科创五金已确认 50套 客制化键帽批次，等待划扣放款。' : 'Dongguan Kechuang confirmed 50x keycap batch. Awaiting RMB authorization.',
      time: language === 'zh' ? '12分钟前' : '12m ago',
      urgent: true,
    },
    {
      id: 'notif-2',
      title: language === 'zh' ? '广东集运仓入库质检完毕' : 'Guangdong Hub Check-in Complete',
      desc: language === 'zh' ? '120件 重磅卫衣已到仓 (D-12库位)，100% 通过品控实拍。' : '120x Heavyweight Hoodies arrived (Bay D-12). Passed 100% photographic QC.',
      time: language === 'zh' ? '45分钟前' : '45m ago',
      urgent: false,
    },
    {
      id: 'notif-3',
      title: language === 'zh' ? '外汇实时汇率更新' : 'Live FX Rate Updated',
      desc: language === 'zh' ? '1 美元 = 7.2405 人民币 (中国银行离岸牌价已同步)。' : '1 USD = 7.2405 CNY (Bank of China offshore spot rate synced).',
      time: language === 'zh' ? '2小时前' : '2h ago',
      urgent: false,
    },
  ];

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-3 sm:px-4 sm:py-3 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      {/* Top / Left Section: Icon, Title & Active Filters + Mobile Notification Shortcut */}
      <div className="flex items-center justify-between gap-2.5 min-w-0 w-full lg:w-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#f68b1e] shrink-0 shadow-2xs">
            <PackageCheck className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <span className="font-bold text-slate-950 text-xs sm:text-sm tracking-tight truncate">
              {t('sourcingFreightConsole')}
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium shrink-0">
                <span className="max-w-[120px] sm:max-w-none truncate">{t('filteredBy')}: "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="font-bold hover:text-rose-600 cursor-pointer p-0.5 text-slate-400"
                  aria-label="Clear filter"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Mobile Notification Button (Visible on mobile/tablet right side of title) */}
        <div className="relative lg:hidden shrink-0">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Proc360 Logistics Notifications"
            className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/90 text-slate-700 shadow-2xs transition-colors relative cursor-pointer flex items-center justify-center"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E35D3B] ring-2 ring-white" />
          </button>
        </div>
      </div>

      {/* Action Buttons Toolbar - Perfectly Aligned Grid / Row */}
      <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end flex-wrap sm:flex-nowrap">
        {/* Live RMB FX Pill (Desktop) */}
        <div
          title={language === 'zh' ? '中国银行实时外汇牌价' : 'Bank of China Spot FX Rate'}
          className="hidden xl:flex items-center gap-1.5 h-9 px-3 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 font-mono shadow-2xs shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-900 text-[11px]">{t('fxSpotRate')}</span>
        </div>

        {/* Notifications Popover Trigger (Desktop only, mobile has it on top row) */}
        <div className="relative shrink-0 hidden lg:block">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Proc360 Logistics Notifications"
            className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/90 text-slate-700 shadow-2xs transition-colors relative cursor-pointer flex items-center justify-center"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E35D3B] ring-2 ring-white" />
          </button>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div 
            className="absolute right-3 sm:right-6 top-16 sm:top-20 w-72 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 sm:p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
            onMouseLeave={() => setShowNotifications(false)}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-900">{t('logisticsFeed')}</h4>
                <span className="px-1.5 py-0.2 bg-[#E35D3B] text-white rounded-full text-[10px] font-bold">
                  3 {t('newCount')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(false);
                  onShowToast(language === 'zh' ? '所有采运动态已标为已读' : 'All notifications marked as read');
                }}
                className="text-[11px] text-slate-400 hover:text-slate-700 underline cursor-pointer p-1"
              >
                {t('markAllRead')}
              </button>
            </div>

            <div className="space-y-2 mt-2.5 max-h-64 sm:max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-2.5 sm:p-3 rounded-xl text-xs transition-colors cursor-pointer ${
                    n.urgent ? 'bg-amber-50/60 border border-amber-200/60' : 'bg-slate-50 hover:bg-slate-100/80 border border-slate-100'
                  }`}
                  onClick={() => {
                    setShowNotifications(false);
                    onShowToast(n.title);
                  }}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span className="text-xs truncate pr-1">{n.title}</span>
                    <span className="text-[10px] font-normal text-slate-400 font-mono shrink-0">{n.time}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RMB Wallet Pill with Attached Fund CTA */}
        <div className="flex items-center justify-between h-9 bg-emerald-50/90 border border-emerald-200/90 rounded-xl pl-2.5 pr-1 shadow-2xs gap-2 flex-1 sm:flex-initial min-w-0">
          <div className="flex items-center gap-1.5 text-xs min-w-0">
            <Wallet className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="font-mono font-bold text-emerald-950 text-xs truncate">
              ¥{wallet.balanceCNY.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenFundWallet}
            className="h-7 px-2 sm:px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-[11px] font-bold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
            <span>{t('fundWalletBtn')}</span>
          </button>
        </div>

        {/* Action Buttons Group (Export + Place Order) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Export Button */}
          <button
            type="button"
            onClick={onExport}
            title={language === 'zh' ? '导出全部采购与物流订单 CSV 报表' : 'Export CSV of all Sourcing & Freight Orders'}
            className="h-9 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/90 text-slate-700 hover:text-slate-950 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{t('exportBtn')}</span>
          </button>

          {/* PRIMARY CTA: Place Order */}
          <button
            type="button"
            onClick={onOpenPlaceOrder}
            className="h-9 px-3.5 sm:px-4 rounded-xl bg-[#0e1118] hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{t('placeOrderBtn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

