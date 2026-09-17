import React, { useState } from 'react';
import { 
  Home, 
  Box, 
  ShoppingBag, 
  User, 
  BarChart3, 
  Store, 
  Headphones, 
  Settings, 
  ArrowRightToLine,
  ArrowLeftToLine,
  ShieldCheck,
  Zap,
  Globe2,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  pendingCount: number;
  totalOrdersCount: number;
  walletBalanceCNY: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  description: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  pendingCount,
  walletBalanceCNY
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainNavItems: NavItem[] = [
    { 
      id: 'dashboard', 
      label: 'Overview & Home', 
      icon: Home, 
      description: 'KPI telemetry, sourcing velocity, and active freight map' 
    },
    { 
      id: 'warehouses', 
      label: 'Cargo & Warehouses', 
      icon: Box, 
      description: 'Dongguan, Shenzhen & Yiwu intake, storage & QC hubs' 
    },
    { 
      id: 'orders', 
      label: 'Sourcing Orders', 
      icon: ShoppingBag, 
      badge: pendingCount, 
      description: '1688 / Taobao POs, QC photos, packing & tracking' 
    },
    { 
      id: 'suppliers', 
      label: 'Vendors & Suppliers', 
      icon: User, 
      description: 'Verified factory contacts, OEM catalogs & contracts' 
    },
    { 
      id: 'analytics', 
      label: 'Analytics & Reports', 
      icon: BarChart3, 
      description: 'Spend breakdown, price trends, and seller refund yields' 
    },
    { 
      id: 'marketplace', 
      label: '1688 / Taobao Hub', 
      icon: Store, 
      description: 'Direct factory wholesale search, quote request & import' 
    },
  ];

  const bottomNavItems: NavItem[] = [
    { 
      id: 'support', 
      label: 'China Agent Support', 
      icon: Headphones, 
      description: 'Direct WeChat & 24/7 bilingual procurement agent' 
    },
    { 
      id: 'settings', 
      label: 'System Settings', 
      icon: Settings, 
      description: 'API keys, customs billing, and user team permissions' 
    },
  ];

  return (
    <>
      {/* Desktop Integrated Sidebar Rail */}
      <aside 
        className={`bg-white border border-slate-200/90 rounded-3xl shadow-xs transition-all duration-300 flex flex-col items-center py-4 px-2 shrink-0 z-30 ${
          isExpanded ? 'w-60' : 'w-[68px]'
        } hidden sm:flex min-h-[calc(100vh-2.5rem)] sticky top-4 select-none`}
      >
        {/* Top Logo & App Title - Docked and Connected */}
        <div className="w-full flex items-center justify-between px-1 mb-2">
          <button
            type="button"
            onClick={() => onSelectTab('dashboard')}
            aria-label="Proc360 Logistics Home"
            className="flex items-center gap-2.5 group cursor-pointer"
            title="Proc360 Sourcing OS"
          >
            {/* Custom Crisp Brand Mark */}
            <div className="w-10 h-10 rounded-2xl bg-[#E35D3B] hover:bg-[#D54E2C] active:scale-95 transition-all shadow-sm flex items-center justify-center text-white shrink-0 group relative">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 text-white transition-transform group-hover:scale-105"
              >
                <path 
                  d="M8.5 7.5L4 12L8.5 16.5H11.5L7 12L11.5 7.5H8.5Z" 
                  fill="currentColor" 
                />
                <path 
                  d="M15.5 7.5L20 12L15.5 16.5H12.5L17 12L12.5 7.5H15.5Z" 
                  fill="currentColor" 
                />
              </svg>
            </div>

            {isExpanded && (
              <div className="min-w-0 text-left animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">Proc361</h1>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold">OS</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">Sourcing & Freight</p>
              </div>
            )}
          </button>

          {/* Expand/Collapse Toggle Button */}
          {isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Collapse sidebar"
              className="w-7 h-7 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Collapse Sidebar"
            >
              <ArrowLeftToLine className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Collapsed expand toggle button */}
        {!isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            aria-label="Expand sidebar"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors my-1 cursor-pointer"
            title="Expand Sidebar"
          >
            <ArrowRightToLine className="w-4 h-4" />
          </button>
        )}

        {/* Live Status Indicator Pill */}
        <div className="w-full px-1 my-1">
          {isExpanded ? (
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-[10.5px]">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-slate-700">Dongguan Hub</span>
              </div>
              <span className="font-mono text-slate-400 text-[10px]">7.24 CNY</span>
            </div>
          ) : (
            <div className="w-full flex justify-center py-0.5">
              <span className="relative flex h-2 w-2" title="China Warehouses Live">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 my-1.5" />

        {/* Main Navigation Stack */}
        <div className="flex flex-col items-center gap-1.5 w-full">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'orders' && (activeTab === 'orders' || activeTab === 'dashboard' || activeTab === ''));
            
            return (
              <div key={item.id} className="relative group w-full flex justify-center">
                <button
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  aria-label={item.label}
                  className={`flex items-center transition-all duration-150 cursor-pointer relative ${
                    isExpanded 
                      ? 'w-full px-3 py-2.5 rounded-2xl gap-3 text-left' 
                      : 'w-11 h-11 justify-center rounded-2xl'
                  } ${
                    isActive
                      ? 'bg-orange-50/80 border border-orange-200/80 text-[#E35D3B] font-bold shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {/* Left accent bar for active item in non-expanded mode */}
                  {isActive && !isExpanded && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#E35D3B] rounded-r-full" />
                  )}

                  <div className="relative flex items-center justify-center">
                    <Icon 
                      className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                        isActive ? 'text-[#E35D3B] stroke-[2.2]' : 'text-slate-500 group-hover:text-slate-800 stroke-[1.8]'
                      }`} 
                    />
                    {item.badge && item.badge > 0 && !isExpanded && (
                      <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#E35D3B] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-semibold truncate ${isActive ? 'text-[#E35D3B]' : 'text-slate-700'}`}>
                        {item.label}
                      </p>
                    </div>
                  )}

                  {isExpanded && item.badge && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#E35D3B] text-white text-[10px] font-bold font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Tooltip on non-expanded state with rich details */}
                {!isExpanded && (
                  <div className="absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 whitespace-nowrap z-50 flex flex-col gap-0.5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="px-1.5 py-0.2 bg-[#E35D3B] rounded-md text-[9px] font-bold">
                          {item.badge} active
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-normal max-w-[200px] whitespace-normal leading-tight">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Spacer pushing bottom items to the base */}
        <div className="flex-1 min-h-[32px]" />

        {/* Bottom Stack: Escrow Shield info, Support, Settings, User Avatar */}
        <div className="flex flex-col items-center gap-1.5 w-full">
          {/* Sourcing Escrow Balance Pill (Expanded mode) */}
          {isExpanded && (
            <div className="w-full p-2.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 mb-1 text-left">
              <div className="flex items-center justify-between text-[10px] font-bold text-amber-900">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#E35D3B]" /> Escrow Balance
                </span>
                <span className="text-emerald-700">Protected</span>
              </div>
              <p className="text-sm font-extrabold text-slate-950 font-mono mt-0.5">
                ¥{walletBalanceCNY.toLocaleString()}
              </p>
            </div>
          )}

          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <div key={item.id} className="relative group w-full flex justify-center">
                <button
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  aria-label={item.label}
                  className={`flex items-center transition-all duration-150 cursor-pointer ${
                    isExpanded 
                      ? 'w-full px-3 py-2 rounded-2xl gap-3 text-left' 
                      : 'w-11 h-11 justify-center rounded-2xl'
                  } ${
                    isActive
                      ? 'bg-orange-50/80 border border-orange-200/80 text-[#E35D3B] font-bold'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-[#E35D3B] stroke-[2.2]' : 'text-slate-500 group-hover:text-slate-800 stroke-[1.8]'
                    }`} 
                  />
                  {isExpanded && (
                    <span className="text-xs truncate font-medium text-slate-700">
                      {item.label}
                    </span>
                  )}
                </button>

                {/* Tooltip on non-expanded state */}
                {!isExpanded && (
                  <div className="absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 whitespace-nowrap z-50 text-left">
                    <p className="font-bold text-xs">{item.label}</p>
                    <p className="text-[10px] text-slate-400 max-w-[180px] whitespace-normal leading-tight">{item.description}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Divider */}
          <div className="w-full h-px bg-slate-100 my-1" />

          {/* User Profile Avatar */}
          <div className="relative group w-full flex justify-center">
            <button
              type="button"
              onClick={() => onSelectTab('profile')}
              aria-label="User profile settings"
              className={`flex items-center transition-all cursor-pointer ${
                isExpanded 
                  ? 'w-full p-2 rounded-2xl gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60' 
                  : 'p-0.5'
              }`}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt="Goodhead Boma"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs ring-1 ring-slate-200"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              {isExpanded && (
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Goodhead Boma</p>
                  <p className="text-[10px] text-emerald-700 font-semibold truncate">Merchant</p>
                </div>
              )}
            </button>

            {!isExpanded && (
              <div className="absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 whitespace-nowrap z-50 text-left">
                <p className="font-bold text-xs">Goodhead Boma (Merchant)</p>
                <p className="text-[10px] text-slate-400">Merchant • Verified Escrow</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Floating Bottom Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 z-40 flex items-center justify-around shadow-lg">
        {mainNavItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'orders' && (activeTab === 'orders' || activeTab === 'dashboard' || activeTab === ''));

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-colors relative ${
                isActive ? 'text-[#E35D3B]' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#E35D3B] ring-1 ring-white" />
              )}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onSelectTab('support')}
          className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'support' ? 'text-[#E35D3B]' : 'text-slate-500'
          }`}
        >
          <Headphones className="w-5 h-5" />
          <span className="text-[10px] font-medium">Support</span>
        </button>
      </nav>
    </>
  );
};
