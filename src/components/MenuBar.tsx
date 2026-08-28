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
  Minimize2,
  Globe,
  Languages,
  Check
} from 'lucide-react';
import { WalletState } from '../types';
import { useLanguage } from '../context/LanguageContext';

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
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const accountRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

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
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
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
      onShowToast(language === 'zh' ? `正在搜索订单: "${localSearch}"...` : `Searching orders for "${localSearch}"...`);
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 select-none shadow-xs">
      {/* Main Full-Width Header Bar (Edge-to-Edge) */}
      <div className="w-full px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left Section: Brand Logo */}
        <div className="flex items-center shrink-0">
          <button 
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-1.5 cursor-pointer group select-none py-1.5 px-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
          >
            <span className="text-xl sm:text-2xl lg:text-[25px] text-slate-950 font-black tracking-tight leading-none font-sans">
              PROC360
            </span>
            {language === 'zh' && (
              <span className="hidden lg:inline-block text-[11px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                跨境采运
              </span>
            )}
            
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
          className="flex-1 max-w-2xl min-w-[140px]"
        >
          <div className="flex items-center w-full h-9 sm:h-10 border border-slate-300 rounded-md bg-white focus-within:border-[#f68b1e] focus-within:ring-1 focus-within:ring-[#f68b1e] transition-all overflow-hidden shadow-2xs">
            {/* Search Icon */}
            <div className="pl-3 pr-1.5 text-slate-400 flex items-center justify-center">
              <Search className="w-4 h-4 stroke-[2]" />
            </div>

            {/* Search Input for Orders */}
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              placeholder={t('searchPlaceholder')}
              className="w-full h-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
            />

            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  if (onSearchChange) onSearchChange('');
                }}
                className="px-2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer h-full flex items-center justify-center"
              >
                ✕
              </button>
            )}

            {/* Attached Orange Search Button */}
            <button
              type="submit"
              className="h-full bg-[#f68b1e] hover:bg-[#e07d17] active:bg-[#c96f14] text-white font-bold text-xs sm:text-sm px-3 sm:px-5 transition-colors uppercase tracking-wide shrink-0 cursor-pointer flex items-center justify-center shadow-inner"
            >
              {t('searchBtn')}
            </button>
          </div>
        </form>

        {/* Right Section: Language Switcher + Focus View Mode + Account and Help */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* KILLER FEATURE: Chinese / English Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              title={language === 'en' ? 'Switch to Chinese / 切换至中文' : '切换至英文 / Switch to English'}
              className="flex items-center gap-1.5 h-9 sm:h-10 px-2 sm:px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-md text-xs sm:text-sm font-bold text-slate-800 transition-all cursor-pointer shadow-2xs group"
            >
              <Languages className="w-4 h-4 text-orange-600 stroke-[2] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-xs tracking-tight">
                {language === 'zh' ? '中文 (简体)' : 'English'}
              </span>
              <span className="text-[10px] px-1 py-0.2 bg-slate-200/70 text-slate-600 rounded font-mono font-bold">
                {language === 'zh' ? 'ZH' : 'EN'}
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Popover Menu */}
            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Language / 选择语言
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('zh');
                    setIsLangMenuOpen(false);
                    if (onShowToast) onShowToast('已切换为简体中文界面 (已自动保存)');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between font-medium cursor-pointer transition-colors ${
                    language === 'zh' ? 'bg-orange-50/80 text-orange-950 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🇨🇳</span>
                    <span>简体中文 (Chinese)</span>
                  </div>
                  {language === 'zh' && <Check className="w-3.5 h-3.5 text-orange-600 stroke-[2.5]" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en');
                    setIsLangMenuOpen(false);
                    if (onShowToast) onShowToast('Switched to English interface (Saved)');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between font-medium cursor-pointer transition-colors ${
                    language === 'en' ? 'bg-orange-50/80 text-orange-950 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🇺🇸</span>
                    <span>English (US)</span>
                  </div>
                  {language === 'en' && <Check className="w-3.5 h-3.5 text-orange-600 stroke-[2.5]" />}
                </button>
              </div>
            )}
          </div>

          {/* Focus View Mode Toggle */}
          {onToggleFocusMode && (
            <button
              type="button"
              onClick={onToggleFocusMode}
              title={isFocusMode ? t('focusViewTooltipExit') : t('focusViewTooltipEnter')}
              className={`flex items-center gap-1.5 h-9 sm:h-10 px-2 sm:px-3 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer border select-none ${
                isFocusMode
                  ? 'bg-slate-900 text-white border-slate-950 shadow-xs ring-2 ring-slate-900/20'
                  : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200 shadow-2xs'
              }`}
            >
              {isFocusMode ? (
                <Minimize2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Maximize2 className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span className="hidden sm:inline">{t('focusView')}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold leading-none ${
                isFocusMode ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-slate-100 text-slate-500'
              }`}>
                {isFocusMode ? t('focusViewOn') : t('focusViewOff')}
              </span>
            </button>
          )}

          {/* Account Dropdown */}
          <div className="relative" ref={accountRef}>
            <button
              type="button"
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="flex items-center gap-1.5 h-9 sm:h-10 px-2 sm:px-3 hover:bg-slate-50 rounded-md text-slate-800 hover:text-slate-950 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-700 stroke-[1.8]" />
              <span className="hidden md:inline">{t('account')}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${isAccountOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Account Popover Menu */}
            {isAccountOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/70">
                  <p className="text-xs font-bold text-slate-900 leading-none">Goodhead Boma</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">{t('merchantTier')}</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">{t('walletBalanceLabel')}: ¥{walletBalanceCNY.toLocaleString()} RMB</p>
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
                    <span>{t('vendorsSuppliers')}</span>
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
                    <span>{t('cargoWarehouses')}</span>
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
                    <span>{t('analyticsReports')}</span>
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
                    <span>{t('rmbWallet')}</span>
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
                    <span>{t('accountSettings')}</span>
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
              className="flex items-center gap-1.5 h-9 sm:h-10 px-2 sm:px-3 hover:bg-slate-50 rounded-md text-slate-800 hover:text-slate-950 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-700 stroke-[1.8]" />
              <span className="hidden md:inline">{t('help')}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${isHelpOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Help Popover Menu */}
            {isHelpOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70">
                  <p className="text-xs font-bold text-slate-900">{t('sourcingHelp')}</p>
                  <p className="text-[11px] text-slate-500">{t('chinaBilingualAgents')}</p>
                </div>

                <div className="py-1 text-xs text-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab('support');
                      setIsHelpOpen(false);
                      if (onShowToast) onShowToast(language === 'zh' ? '正在连接微信专员客服 (微信: Proc360_Desk)...' : 'Connecting with China agent on WeChat Desk...');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <Headphones className="w-4 h-4 text-[#f68b1e]" />
                    <span>{t('chatWithAgent')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onShowToast) onShowToast(language === 'zh' ? '中国银行外汇牌价实时同步: 1 美元 = 7.2405 人民币' : 'Bank of China FX sync: 1 USD = 7.2405 RMB');
                      setIsHelpOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>{t('currencyFxRates')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onShowToast) onShowToast(language === 'zh' ? '所有采购单享 100% 第三方资金担保与验货退款条例' : 'All orders protected by 100% Escrow Guarantee');
                      setIsHelpOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>{t('escrowRefundTerms')}</span>
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

