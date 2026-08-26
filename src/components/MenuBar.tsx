import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  User, 
  HelpCircle, 
  ChevronDown, 
  BarChart3, 
  Settings, 
  Wallet, 
  ShieldCheck, 
  Users, 
  Box,
  TrendingUp, 
  Headphones,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { WalletState } from '../types';

interface MenuBarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  pendingCount: number;
  totalOrdersCount: number;
  walletBalanceCNY: number;
  wallet?: WalletState;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
  onOpenFundWallet?: () => void;
  onOpenPlaceOrder?: () => void;
  onExport?: () => void;
  onShowToast?: (msg: string) => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery = '',
  onSearchChange,
  pendingCount,
  totalOrdersCount,
  walletBalanceCNY,
  wallet,
  isFocusMode = false,
  onToggleFocusMode,
  onOpenFundWallet,
  onOpenPlaceOrder,
  onExport,
  onShowToast,
}) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const accountRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setIsHelpOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localSearch);
    }
    if (onShowToast && localSearch) {
      onShowToast(`Searching orders for "${localSearch}"...`);
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 select-none shadow-xs">
      {/* Main Full-Width Header Bar (Edge-to-Edge) */}
      <div className="w-full px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Left Section: Brand Logo */}
        <div className="flex items-center shrink-0">
          <button 
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-1.5 cursor-pointer group select-none py-1.5 px-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <span className="text-2xl sm:text-[25px] text-slate-950 font-black tracking-tight leading-none font-sans">
              PROC360
            </span>
            
            {/* Orange Star Badge Icon */}
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#f68b1e] flex items-center justify-center text-white shadow-xs group-hover:scale-110 group-hover:rotate-12 transition-all duration-200 ml-0.5">
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </button>
        </div>

        {/* Center Section: Wide Search Bar for Orders */}
        <form 
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-2xl min-w-[200px]"
        >
          <div className="flex items-center w-full h-10 border border-slate-300 rounded-md bg-white focus-within:border-[#f68b1e] focus-within:ring-1 focus-within:ring-[#f68b1e] transition-all overflow-hidden shadow-2xs">
            {/* Search Icon */}
            <div className="pl-3.5 pr-2 text-slate-400 flex items-center justify-center">
              <Search className="w-4.5 h-4.5 stroke-[2]" />
            </div>

            {/* Search Input for Orders */}
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              placeholder="Search orders, tracking #, suppliers, items..."
              className="w-full h-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
            />

            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  if (onSearchChange) onSearchChange('');
                }}
                className="px-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer h-full flex items-center justify-center"
              >
                ✕
              </button>
            )}

            {/* Attached Orange Search Button */}
            <button
              type="submit"
              className="h-full bg-[#f68b1e] hover:bg-[#e07d17] active:bg-[#c96f14] text-white font-bold text-xs sm:text-sm px-4 sm:px-6 transition-colors uppercase tracking-wide shrink-0 cursor-pointer flex items-center justify-center shadow-inner"
            >
              SEARCH
            </button>
          </div>
        </form>

        {/* Right Section: Account and Help */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Account Dropdown */}
          <div className="relative" ref={accountRef}>
            <button
              type="button"
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="flex items-center gap-1.5 h-10 px-3 hover:bg-slate-50 rounded-md text-slate-800 hover:text-slate-950 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <User className="w-4.5 h-4.5 text-slate-700 stroke-[1.8]" />
              <span className="hidden sm:inline">Account</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${isAccountOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Account Popover Menu */}
            {isAccountOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/70">
                  <p className="text-xs font-bold text-slate-900 leading-none">Goodhead Boma</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">Merchant • Tier 4 Verified</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">Wallet: ¥{walletBalanceCNY.toLocaleString()} RMB</p>
                </div>

                <div className="py-1 text-xs text-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab('suppliers');
                      setIsAccountOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-[#f68b1e]" />
                    <span>Vendors & Suppliers</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab('warehouses');
                      setIsAccountOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <Box className="w-4 h-4 text-slate-500" />
                    <span>Cargo & Warehouses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab('analytics');
                      setIsAccountOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <BarChart3 className="w-4 h-4 text-slate-500" />
                    <span>Analytics & Reports</span>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenFundWallet) onOpenFundWallet();
                      setIsAccountOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <Wallet className="w-4 h-4 text-emerald-600" />
                    <span>RMB Sourcing Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab('settings');
                      setIsAccountOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Account Settings</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Dropdown */}
          <div className="relative" ref={helpRef}>
            <button
              type="button"
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="flex items-center gap-1.5 h-10 px-3 hover:bg-slate-50 rounded-md text-slate-800 hover:text-slate-950 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4.5 h-4.5 text-slate-700 stroke-[1.8]" />
              <span className="hidden sm:inline">Help</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${isHelpOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Help Popover Menu */}
            {isHelpOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70">
                  <p className="text-xs font-bold text-slate-900">Proc360 Sourcing Help</p>
                  <p className="text-[11px] text-slate-500">24/7 China Bilingual Agents</p>
                </div>

                <div className="py-1 text-xs text-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab('support');
                      setIsHelpOpen(false);
                      if (onShowToast) onShowToast('Connecting with China agent on WeChat Desk...');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <Headphones className="w-4 h-4 text-[#f68b1e]" />
                    <span>Chat with Sourcing Agent</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onShowToast) onShowToast('Bank of China FX sync: 1 USD = 7.2405 RMB');
                      setIsHelpOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Currency & FX Rates</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onShowToast) onShowToast('All orders protected by 100% Escrow Guarantee');
                      setIsHelpOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Escrow & Refund Terms</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
