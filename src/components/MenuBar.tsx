import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Check,
  Menu,
  X,
  Plus,
  Sparkles,
  Layers,
  ArrowRight,
  Package,
  FileSpreadsheet
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Global shortcut ⌘K / Ctrl+K to quickly focus order search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      } else if (e.key === 'Escape') {
        setIsSearchFocused(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
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
    if (onShowToast) {
      if (localSearch.trim()) {
        onShowToast(language === 'zh' ? `已定位筛选包含 "${localSearch}" 的订单` : `Filtered orders for "${localSearch}"`);
      } else {
        onShowToast(language === 'zh' ? '显示全部采购订单' : 'Showing all orders');
      }
    }
    setIsMobileSearchOpen(false);
    setIsSearchFocused(false);

    // Smoothly scroll down to the orders table so the results are immediately visible
    const tableEl = document.getElementById('orders-table');
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navMenuItems = [
    {
      id: 'dashboard',
      label: language === 'zh' ? '综合控制台' : 'Dashboard & Overview',
      icon: <BarChart3 className="w-4 h-4 text-[#f68b1e]" />,
      badge: null,
    },
    {
      id: 'orders',
      label: language === 'zh' ? '全部采购订单' : 'All Sourcing Orders',
      icon: <Package className="w-4 h-4 text-slate-700" />,
      badge: `${totalOrdersCount}`,
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'needs_action',
      label: language === 'zh' ? '待处理授权与异常' : 'Action Required / Approvals',
      icon: <ShieldCheck className="w-4 h-4 text-amber-500" />,
      badge: pendingCount > 0 ? `${pendingCount} PENDING` : null,
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300 font-bold',
      action: () => {
        onSelectTab('orders');
        if (onShowToast) onShowToast(language === 'zh' ? '正在查看需授权放款与确认之订单' : 'Viewing pending authorizations');
      }
    },
    {
      id: 'warehouses',
      label: language === 'zh' ? '中转集运仓 (东莞/义乌/深圳)' : 'Warehouse Consolidation Hubs',
      icon: <Box className="w-4 h-4 text-emerald-600" />,
      badge: '3 HUBS',
      badgeColor: 'bg-emerald-50 text-emerald-800',
    },
    {
      id: 'suppliers',
      label: language === 'zh' ? '已验厂认证供应商' : 'Verified Chinese Vendors',
      icon: <Users className="w-4 h-4 text-sky-600" />,
      badge: '4 ACTIVE',
      badgeColor: 'bg-sky-50 text-sky-800',
    },
    {
      id: 'marketplace',
      label: language === 'zh' ? '1688 / 淘宝工厂代采' : '1688 / Factory Direct Portal',
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      badge: 'DIRECT',
      badgeColor: 'bg-purple-50 text-purple-800',
    },
    {
      id: 'support',
      label: language === 'zh' ? '24/7 驻华跟单专员客服' : '24/7 Bilingual China Desk',
      icon: <Headphones className="w-4 h-4 text-orange-600" />,
      badge: 'ONLINE',
      badgeColor: 'bg-emerald-100 text-emerald-800 animate-pulse font-bold',
    },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 select-none shadow-xs">
      {/* Main Full-Width Header Bar (Edge-to-Edge) */}
      <div className="w-full px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Left Section: Brand Logo */}
        <div className="flex items-center shrink-0">
          <button 
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-1.5 cursor-pointer group select-none py-1.5 px-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none min-h-[44px]"
          >
            <span className="text-xl sm:text-2xl lg:text-[25px] text-slate-950 font-black tracking-tight leading-none font-sans">
              PROC361
            </span>
            {language === 'zh' && (
              <span className="hidden sm:inline-block text-[11px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
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

        {/* Center Section: Wide Search Bar for Desktop/Tablet */}
        <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-2xl min-w-[160px] relative">
          <form 
            onSubmit={handleSearchSubmit}
            className="w-full"
          >
            <div className="flex items-center w-full h-10 border border-slate-300/90 rounded-xl bg-white focus-within:border-[#f68b1e] focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs overflow-hidden">
              {/* Search Icon */}
              <div className="pl-3 pr-2 text-slate-400 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 text-slate-400 stroke-[2.2]" />
              </div>

              {/* Search Input for Orders */}
              <input
                ref={searchInputRef}
                type="text"
                value={localSearch}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                placeholder={t('searchPlaceholder')}
                className="w-full h-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />

              {/* Shortcut badge when empty */}
              {!localSearch && (
                <div className="hidden lg:flex items-center pr-2 shrink-0 select-none">
                  <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 rounded border border-slate-200">
                    ⌘K
                  </kbd>
                </div>
              )}

              {/* Clear button when input has text */}
              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    if (onSearchChange) onSearchChange('');
                    searchInputRef.current?.focus();
                  }}
                  title={language === 'zh' ? '清空搜索' : 'Clear search'}
                  className="px-2.5 text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer h-full flex items-center justify-center shrink-0 transition-colors"
                >
                  ✕
                </button>
              )}

              {/* Optimized High-Contrast Search Button */}
              <button
                type="submit"
                id="header-search-submit-btn"
                onClick={handleSearchSubmit}
                aria-label={language === 'zh' ? '搜索采购订单' : 'Search procurement orders'}
                className="h-full bg-[#f68b1e] hover:bg-[#e07d17] active:bg-[#d46d04] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 transition-colors uppercase tracking-wider shrink-0 cursor-pointer flex items-center justify-center gap-1.5 shadow-none select-none min-h-[40px] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{t('searchBtn')}</span>
              </button>
            </div>
          </form>

          {/* Quick Search Suggestions Popover when focused */}
          {isSearchFocused && (
            <div 
              className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 text-xs animate-in fade-in zoom-in-95 duration-100"
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                <span>{language === 'zh' ? '快捷筛选词' : 'Quick Search Filters'}</span>
                <span className="font-mono text-[10px] text-slate-400">ESC {language === 'zh' ? '关闭' : 'to close'}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { label: '1688', query: '1688' },
                  { label: 'Taobao', query: 'Taobao' },
                  { label: language === 'zh' ? '待付款' : 'Payment Pending', query: 'Payment' },
                  { label: language === 'zh' ? '待质检' : 'In QC', query: 'QC' },
                  { label: language === 'zh' ? '转运中' : 'In Transit', query: 'Transit' },
                  { label: language === 'zh' ? '东莞仓' : 'Dongguan', query: 'Dongguan' },
                ].map((item) => (
                  <button
                    key={item.query}
                    type="button"
                    onClick={() => {
                      setLocalSearch(item.query);
                      if (onSearchChange) onSearchChange(item.query);
                      setIsSearchFocused(false);
                      const tableEl = document.getElementById('orders-table');
                      if (tableEl) {
                        tableEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-orange-50 hover:text-[#f68b1e] hover:border-orange-200 border border-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP Right Section: Language + Focus View + Account + Help */}
        <div className="hidden md:flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Chinese / English Language Switcher */}
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

        {/* MOBILE CONTROLS: Search Icon Toggle + Quick Language + Hamburger Menu */}
        <div className="flex md:hidden items-center gap-1.5">
          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label="Toggle mobile order search"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              isMobileSearchOpen || searchQuery
                ? 'bg-orange-50 text-[#f68b1e] border border-orange-200'
                : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
            }`}
          >
            <Search className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Mobile Language Toggle */}
          <button
            type="button"
            onClick={() => toggleLanguage()}
            aria-label="Toggle language"
            className="h-10 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center gap-1 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-orange-600" />
            <span className="font-mono text-[11px]">{language === 'zh' ? '中' : 'EN'}</span>
          </button>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open mobile navigation menu"
            className="relative w-11 h-11 rounded-xl bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 flex items-center justify-center transition-all shadow-xs cursor-pointer ml-0.5"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.5]" />
            )}

            {/* Pending count badge on hamburger */}
            {pendingCount > 0 && !isMobileMenuOpen && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#E35D3B] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-3 py-2.5 bg-slate-50 border-t border-slate-200 overflow-hidden"
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="flex-1 flex items-center h-10 px-3 bg-white border border-slate-300 rounded-xl focus-within:border-[#f68b1e] focus-within:ring-1 focus-within:ring-[#f68b1e]">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    if (onSearchChange) onSearchChange(e.target.value);
                  }}
                  placeholder={t('searchPlaceholder')}
                  className="w-full text-xs text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
                  autoFocus
                />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocalSearch('');
                      if (onSearchChange) onSearchChange('');
                    }}
                    className="p-1 text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                type="submit"
                aria-label={language === 'zh' ? '搜索采购订单' : 'Search procurement orders'}
                className="h-10 px-4 bg-gradient-to-r from-[#f68b1e] to-[#e67a0d] active:from-[#e07d17] active:to-[#d46d04] text-white font-bold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{t('searchBtn')}</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE SLIDE-OVER NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            />

            {/* Menu Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-[340px] sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-950 tracking-tight">PROC361</span>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-100/70 px-1.5 py-0.5 rounded">
                    {language === 'zh' ? '跨境控制台' : 'Console'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Merchant Profile Card */}
              <div className="p-4 border-b border-slate-100 bg-linear-to-r from-orange-50/50 via-amber-50/30 to-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      GB
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Goodhead Boma</h3>
                      <p className="text-[11px] text-emerald-700 font-semibold">{t('merchantTier')}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                    CN / US
                  </span>
                </div>

                {/* RMB Wallet Balance Bar */}
                <div className="mt-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {language === 'zh' ? '人民币采购专户余额' : 'RMB Sourcing Wallet'}
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-950 mt-0.5 block">
                      ¥{walletBalanceCNY.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RMB
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (onOpenFundWallet) onOpenFundWallet();
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1 cursor-pointer min-h-[36px]"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{t('fundWalletBtn')}</span>
                  </button>
                </div>
              </div>

              {/* Main Navigation Links */}
              <div className="p-3 flex-1 space-y-1 overflow-y-auto">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {language === 'zh' ? '主导航与业务模块' : 'Navigation & Modules'}
                </div>

                {navMenuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (item.action) {
                          item.action();
                        } else {
                          onSelectTab(item.id);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer min-h-[44px] ${
                        isActive
                          ? 'bg-slate-900 text-white font-bold shadow-xs'
                          : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`shrink-0 ${isActive ? 'text-white' : ''}`}>
                          {item.icon}
                        </div>
                        <span className="text-xs">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Secondary Quick Toggles & Settings in Menu */}
                <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'zh' ? '控制选项与偏好' : 'Preferences & Export'}
                  </div>

                  {/* Language switch button */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-semibold text-slate-800">
                        {language === 'zh' ? '界面语言' : 'Language'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          setLanguage('zh');
                          if (onShowToast) onShowToast('已切换为简体中文');
                        }}
                        className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                          language === 'zh' ? 'bg-orange-600 text-white' : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        🇨🇳 中文
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLanguage('en');
                          if (onShowToast) onShowToast('Switched to English');
                        }}
                        className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                          language === 'en' ? 'bg-orange-600 text-white' : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        🇺🇸 EN
                      </button>
                    </div>
                  </div>

                  {/* Focus View Mode Toggle */}
                  {onToggleFocusMode && (
                    <button
                      type="button"
                      onClick={() => {
                        onToggleFocusMode();
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-800 cursor-pointer min-h-[44px]"
                    >
                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-slate-600" />
                        <span className="font-semibold">{t('focusView')}</span>
                      </div>
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                        isFocusMode ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isFocusMode ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  )}

                  {/* Export CSV Report */}
                  {onExport && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onExport();
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between text-xs text-slate-800 cursor-pointer min-h-[44px]"
                    >
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold">{t('exportBtn')}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Drawer Bottom Action: Place Sourcing Order */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenPlaceOrder) onOpenPlaceOrder();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#E35D3B] hover:bg-[#c94d2d] active:bg-[#b54224] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px]"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('placeOrderBtn')}</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Escrow & Dedicated China Agent Verification</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

