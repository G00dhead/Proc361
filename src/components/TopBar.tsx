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
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: '¥3,450 RMB Sourcing PO Ready',
      desc: 'Dongguan Kechuang confirmed 50x keycap batch. Awaiting RMB authorization.',
      time: '12m ago',
      urgent: true,
    },
    {
      id: 'notif-2',
      title: 'Guangdong Hub Check-in Complete',
      desc: '120x Heavyweight Hoodies arrived (Bay D-12). Passed 100% photographic QC.',
      time: '45m ago',
      urgent: false,
    },
    {
      id: 'notif-3',
      title: 'Live FX Rate Updated',
      desc: '1 USD = 7.2405 CNY (Bank of China offshore spot rate synced).',
      time: '2h ago',
      urgent: false,
    },
  ];

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      {/* Left Info / Active Filter Notice */}
      <div className="flex items-center gap-2.5 text-xs text-slate-700">
        <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f68b1e] shrink-0">
          <PackageCheck className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold text-slate-950">Sourcing & Freight Console</span>
          {searchQuery && (
            <span className="ml-2 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium">
              Filtered: "{searchQuery}"
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="ml-1.5 font-bold hover:text-rose-600 cursor-pointer"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Right Action Cluster */}
      <div className="flex items-center gap-2 shrink-0 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
        {/* Live RMB FX Pill */}
        <div
          title="Bank of China Spot FX Rate"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-900 text-[11px]">1 USD = ¥{wallet.exchangeRate} RMB</span>
        </div>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Proc360 Logistics Notifications"
            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E35D3B] ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div 
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setShowNotifications(false)}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">Proc360 Logistics Feed</h4>
                  <span className="px-1.5 py-0.2 bg-[#E35D3B] text-white rounded-full text-[10px] font-bold">
                    3 New
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    onShowToast('All notifications marked as read');
                  }}
                  className="text-[11px] text-slate-400 hover:text-slate-700 underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>

              <div className="space-y-2 mt-3 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-3 rounded-lg text-xs transition-colors cursor-pointer ${
                      n.urgent ? 'bg-amber-50/60 border border-amber-200/60' : 'bg-slate-50 hover:bg-slate-100/80 border border-slate-100'
                    }`}
                    onClick={() => {
                      setShowNotifications(false);
                      onShowToast(n.title);
                    }}
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] font-normal text-slate-400 font-mono">{n.time}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RMB Wallet Display with "Fund Wallet" Button */}
        <div className="flex items-center gap-2 bg-emerald-50/90 border border-emerald-200/90 rounded-lg px-2.5 py-1 shadow-2xs">
          <div className="flex items-center gap-1 text-xs">
            <Wallet className="w-3.5 h-3.5 text-emerald-700" />
            <span className="font-mono font-bold text-emerald-950 text-xs">
              ¥{wallet.balanceCNY.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RMB
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenFundWallet}
            className="px-2 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-[10px] font-bold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
            <span>Fund</span>
          </button>
        </div>

        {/* Export Button */}
        <button
          type="button"
          onClick={onExport}
          title="Export CSV of all Sourcing & Freight Orders"
          className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>

        {/* PRIMARY CTA: Place Order */}
        <button
          type="button"
          onClick={onOpenPlaceOrder}
          className="px-3 py-1.5 rounded-lg bg-[#0e1118] hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Place Order</span>
        </button>
      </div>
    </div>
  );
};
