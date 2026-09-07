import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  ExternalLink, 
  Check, 
  Package, 
  Layers, 
  Sparkles, 
  AlertTriangle, 
  CreditCard, 
  Camera, 
  ShieldAlert, 
  Download, 
  Copy, 
  MessageSquare, 
  Box, 
  Truck, 
  Eye, 
  CheckCircle2, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  ArrowRight,
  Zap,
  Info,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Tooltip } from './Tooltip';
import { OrderItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

export type SortField = 'date' | 'price' | 'weight' | 'orderNumber' | 'status';
export type SortDirection = 'asc' | 'desc';

interface OrdersTableProps {
  orders: OrderItem[];
  allOrdersCount: number;
  selectedTab: 'ALL' | 'PENDING' | 'IN_TRANSIT' | 'WAREHOUSE' | 'COMPLETED';
  onSelectTab: (tab: 'ALL' | 'PENDING' | 'IN_TRANSIT' | 'WAREHOUSE' | 'COMPLETED') => void;
  counts: {
    all: number;
    pending: number;
    inTransit: number;
    warehouse: number;
    completed: number;
  };
  selectedOrderIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAllReadyToConsolidate: () => void;
  onClearSelection: () => void;
  onOpenOrderDetail: (order: OrderItem) => void;
  onOpenActionModal: (order: OrderItem) => void;
  onConsolidateSelected: () => void;
  onOpenPhotoModal: (url: string, caption: string) => void;
  onShowToast: (message: string) => void;
  selectedTotalWeight: number;
  selectedTotalRMB: number;
  recentlyUpdatedOrderIds?: Record<string, number>;
  onAdvanceOrderStatus?: (order: OrderItem) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  allOrdersCount,
  selectedTab,
  onSelectTab,
  counts,
  selectedOrderIds,
  onToggleSelect,
  onSelectAllReadyToConsolidate,
  onClearSelection,
  onOpenOrderDetail,
  onOpenActionModal,
  onConsolidateSelected,
  onOpenPhotoModal,
  onShowToast,
  selectedTotalWeight,
  selectedTotalRMB,
  recentlyUpdatedOrderIds = {},
  onAdvanceOrderStatus,
}) => {
  const { t, translateOrderText, language } = useLanguage();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isExpandedView, setIsExpandedView] = useState(false);

  // Sorting Handler
  const handleSetSort = (field: SortField, dir: SortDirection, label: string) => {
    setSortField(field);
    setSortDirection(dir);
    setIsSortMenuOpen(false);
    onShowToast(language === 'zh' ? `已按 ${label} 排序订单` : `Sorted orders by ${label}`);
  };

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      let comparison = 0;

      if (sortField === 'price') {
        comparison = a.priceRMB - b.priceRMB;
      } else if (sortField === 'weight') {
        comparison = a.weightKg - b.weightKg;
      } else if (sortField === 'orderNumber') {
        comparison = a.orderNumber.localeCompare(b.orderNumber);
      } else if (sortField === 'status') {
        comparison = a.statusLabel.localeCompare(b.statusLabel);
      } else {
        comparison = (a.createdAt || '').localeCompare(b.createdAt || '');
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [orders, sortField, sortDirection]);

  // View more slicing logic: if more than 10 orders, show 10 when not expanded
  const displayedOrders = useMemo(() => {
    if (sortedOrders.length <= 10 || isExpandedView) {
      return sortedOrders;
    }
    return sortedOrders.slice(0, 10);
  }, [sortedOrders, isExpandedView]);

  // Total ready to consolidate in current view
  const readyToConsolidateCount = useMemo(() => {
    return orders.filter((o) => o.actionType === 'READY_TO_CONSOLIDATE').length;
  }, [orders]);

  // Invoice generator
  const handleDownloadInvoice = (order: OrderItem) => {
    const invoiceContent = `PROC360 CHINA SOURCING INVOICE & CUSTOMS RECEIPT
==================================================
Order ID: #${order.orderNumber}
PO Ref: ${order.orderNumber}
Date Sourced: ${order.createdAt}
Platform: ${order.supplierPlatform}
Supplier: ${order.supplierName}

ITEM DETAILS
Item Title: ${order.title}
Category: ${translateOrderText(order.category)}
Unit Quantity: ${order.quantity} ${order.unit}
Unit Weight: ${order.weightKg.toFixed(2)} kg
China Warehouse: ${translateOrderText(order.warehouse)} Hub

FINANCIAL BREAKDOWN
Purchase Price (RMB): ¥${order.priceRMB.toFixed(2)}
Estimated USD Value: $${order.priceUSD.toFixed(2)}
Customs Clearance Status: DDP Pre-declared
Domestic Tracking (SF Express): ${order.domesticTracking?.trackingNumber || 'Pending pickup'}
International Waybill: ${order.intlTracking?.trackingNumber || 'Awaiting international consolidation'}

5-Point QC Status: ${order.qcPhotos?.length ? '5/5 Passed' : 'Pending Intake'}
Authorized Procurement Agent: Goodhead Boma (Merchant) (Proc360 Logistics OS)
==================================================`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_PO_${order.orderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast(language === 'zh' ? `已下载采购单 #${order.orderNumber} 官方票据 (RMB)` : `Downloaded Official Invoice for #${order.orderNumber}`);
  };

  // Helper for origin mapping
  const getOriginInfo = (order: OrderItem) => {
    if (order.supplierPlatform === '1688') {
      return { city: language === 'zh' ? '深圳，中国' : 'Shenzhen, CN', flag: '🇨🇳' };
    }
    if (order.supplierPlatform === 'Taobao') {
      return { city: language === 'zh' ? '杭州，中国' : 'Hangzhou, CN', flag: '🇨🇳' };
    }
    return { city: language === 'zh' ? '广东，中国' : 'Guangdong, CN', flag: '🇨🇳' };
  };

  // Helper for destination mapping
  const getDestinationInfo = (order: OrderItem) => {
    if (order.intlTracking?.carrier.includes('DHL') || order.intlTracking?.carrier.includes('Air')) {
      return { city: language === 'zh' ? '洛杉矶，美国' : 'Los Angeles, USA', flag: '🇺🇸' };
    }
    if (order.warehouse.includes('Dongguan')) {
      return { city: language === 'zh' ? '东莞仓' : 'Dongguan Hub', flag: '🇨🇳' };
    }
    if (order.warehouse.includes('Yiwu')) {
      return { city: language === 'zh' ? '义乌仓' : 'Yiwu Hub', flag: '🇨🇳' };
    }
    return { city: language === 'zh' ? '深圳仓' : 'Shenzhen Hub', flag: '🇨🇳' };
  };

  // Helper for estimated delivery
  const getEstDelivery = (order: OrderItem) => {
    if (order.intlTracking?.etaDate) {
      return translateOrderText(order.intlTracking.etaDate.replace(', 2026', ''));
    }
    return language === 'zh' ? '8月28日' : '28 Aug';
  };

  // Status Badge Mapper
  const getStatusBadge = (order: OrderItem) => {
    if (order.zone === 'NEEDS_ACTION') {
      if (order.actionType === 'PAYMENT_PENDING') {
        return { label: t.statusPaymentPending, dotColor: 'bg-yellow-400', textColor: 'text-yellow-800' };
      }
      if (order.actionType === 'CUSTOMIZATION_CONFIRMATION') {
        return { label: t.statusProofReview, dotColor: 'bg-purple-500', textColor: 'text-purple-700' };
      }
      if (order.actionType === 'ADDRESS_ISSUE') {
        return { label: t.statusAddressError, dotColor: 'bg-rose-500', textColor: 'text-rose-700' };
      }
      return { label: t.statusNeedsAction, dotColor: 'bg-yellow-400', textColor: 'text-yellow-800' };
    }

    if (order.actionType === 'READY_TO_CONSOLIDATE') {
      return { label: t.statusReadyInHub, dotColor: 'bg-emerald-500', textColor: 'text-emerald-700' };
    }

    if (order.inProgressStage === 'INTL_TRANSIT_AIR' || order.inProgressStage === 'INTL_TRANSIT_SEA') {
      return { label: t.statusInTransit, dotColor: 'bg-emerald-500', textColor: 'text-emerald-700' };
    }

    if (order.inProgressStage === 'OUT_FOR_DELIVERY') {
      return { label: t.statusDelivered, dotColor: 'bg-emerald-500', textColor: 'text-emerald-700' };
    }

    return { label: t.statusInProcess, dotColor: 'bg-emerald-500', textColor: 'text-emerald-700' };
  };

  // Tab configuration
  const filterTabs = [
    { 
      id: 'ALL' as const, 
      label: t.tabAllOrders, 
      count: counts.all, 
      icon: null, 
      badgeClass: (active: boolean) => active ? 'bg-slate-950 text-white' : 'bg-slate-300/80 text-slate-700' 
    },
    { 
      id: 'PENDING' as const, 
      label: t.tabActionRequired, 
      count: counts.pending, 
      icon: <span className={`w-2 h-2 rounded-full ${counts.pending > 0 ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`} />, 
      badgeClass: (active: boolean) => active ? 'bg-amber-500 text-white border-amber-600' : 'bg-amber-100 text-amber-900 border-amber-300/80' 
    },
    { 
      id: 'IN_TRANSIT' as const, 
      label: t.tabInTransit, 
      count: counts.inTransit, 
      icon: <Truck className="w-3.5 h-3.5 text-sky-600" />, 
      badgeClass: (active: boolean) => active ? 'bg-sky-600 text-white border-sky-700' : 'bg-sky-100 text-sky-900 border-sky-300/80' 
    },
    { 
      id: 'WAREHOUSE' as const, 
      label: t.tabWarehouseHub, 
      count: counts.warehouse, 
      icon: <Box className="w-3.5 h-3.5 text-emerald-600" />, 
      badgeClass: (active: boolean) => active ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-emerald-100 text-emerald-900 border-emerald-300/80' 
    },
    { 
      id: 'COMPLETED' as const, 
      label: t.tabCompleted, 
      count: counts.completed, 
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-slate-800" />, 
      badgeClass: (active: boolean) => active ? 'bg-slate-800 text-white border-slate-900' : 'bg-slate-200 text-slate-700 border-slate-300' 
    },
  ];

  return (
    <div id="orders-table" className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden scroll-mt-20">
      {/* Top Controls & Filter Navigation Bar */}
      <div className="p-3 sm:p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Navigation Filter Tabs - Segmented Controller with Dedicated Status Badges */}
        <div className="relative inline-flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl border border-slate-300/70 overflow-x-auto max-w-full scrollbar-none shrink-0">
          {filterTabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onSelectTab(tab.id);
                  setIsExpandedView(false);
                }}
                className={`relative h-8 px-3 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer inline-flex items-center gap-2 shrink-0 transition-colors z-10 select-none ${
                  isActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200 ring-1 ring-slate-950/5 -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="inline-flex items-center gap-1.5">
                  {tab.icon}
                  {tab.label}
                </span>
                <span
                  className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md text-[11px] font-mono font-bold leading-none border transition-colors ${tab.badgeClass(
                    isActive
                  )}`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Consolidate Bar + Sort Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          {/* Multi-Select Consolidation CTA */}
          {selectedOrderIds.length > 0 && (
            <button
              type="button"
              onClick={onConsolidateSelected}
              className="h-8.5 px-3 bg-[#0e1118] hover:bg-slate-800 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 shadow-xs animate-in fade-in cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#E35D3B]" />
              <span>
                {language === 'zh' 
                  ? `合并集运 ${selectedOrderIds.length} 个包裹 (${selectedTotalWeight.toFixed(1)}kg)`
                  : `Consolidate ${selectedOrderIds.length} Parcels (${selectedTotalWeight.toFixed(1)}kg)`}
              </span>
            </button>
          )}

          {/* Quick Sort Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="h-8.5 inline-flex items-center gap-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">{t.sort}: {sortField.toUpperCase()}</span>
              <span className="sm:hidden">{t.sort}</span>
            </button>

            {isSortMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-40 animate-in fade-in duration-100 text-xs">
                <button
                  type="button"
                  onClick={() => handleSetSort('date', 'desc', t.sortDateNewest)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                    sortField === 'date' ? 'bg-slate-100 font-bold text-slate-950' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{t.sortDateNewest}</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSetSort('price', 'desc', t.sortAmountHigh)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                    sortField === 'price' ? 'bg-slate-100 font-bold text-slate-950' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{t.sortAmountHigh}</span>
                  <span className="font-mono text-xs">¥</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSetSort('weight', 'desc', t.sortWeightHeavy)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                    sortField === 'weight' ? 'bg-slate-100 font-bold text-slate-950' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{t.sortWeightHeavy}</span>
                  <Box className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSetSort('orderNumber', 'asc', t.sortOrderNumber)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                    sortField === 'orderNumber' ? 'bg-slate-100 font-bold text-slate-950' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{t.sortOrderNumber}</span>
                  <span className="font-mono text-[10px]">#P360</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Structure with Stable Height and Fluid Crossfade */}
      <div className="w-full overflow-x-auto min-h-[440px] flex flex-col justify-between">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400 tracking-wider select-none bg-slate-50/50">
              <th className="py-2.5 px-2 sm:px-4 w-7 sm:w-9">
                <input
                  type="checkbox"
                  aria-label="Select all ready to consolidate items"
                  checked={
                    readyToConsolidateCount > 0 &&
                    orders.filter((o) => o.actionType === 'READY_TO_CONSOLIDATE').every((o) => selectedOrderIds.includes(o.id))
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      onSelectAllReadyToConsolidate();
                    } else {
                      onClearSelection();
                    }
                  }}
                  className="rounded border-slate-300 text-slate-950 focus:ring-0 cursor-pointer"
                />
              </th>
              <th 
                className="hidden sm:table-cell py-2.5 px-2 font-medium cursor-pointer hover:text-slate-700"
                onClick={() => handleSetSort('orderNumber', sortDirection === 'asc' ? 'desc' : 'asc', t.orderId)}
              >
                <Tooltip title={t.orderId} content={language === 'zh' ? 'Proc360 采购单唯一跟踪编码' : "Proc360 unique purchase order tracking identifier"} position="top" width="w-52">
                  <div className="flex items-center gap-1">
                    <span>{t.orderId}</span>
                    {sortField === 'orderNumber' && (sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                  </div>
                </Tooltip>
              </th>
              <th className="py-2.5 px-2 sm:px-2.5 font-medium sticky left-7 sm:static bg-slate-50/95 sm:bg-transparent z-10">{t.productSupplier}</th>
              <th 
                className="py-2.5 px-2 sm:px-3 font-medium cursor-pointer hover:text-slate-700 text-right whitespace-nowrap"
                onClick={() => handleSetSort('price', sortDirection === 'asc' ? 'desc' : 'asc', t.amountRmb)}
              >
                <Tooltip title={t.amountRmb} content={language === 'zh' ? '采购总额（人民币及折算美元）' : "Total wholesale procurement cost in RMB & converted USD"} position="top" width="w-56">
                  <div className="flex items-center justify-end gap-1">
                    <span>{t.amountRmb}</span>
                    {sortField === 'price' && (sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                  </div>
                </Tooltip>
              </th>
              <th className="hidden md:table-cell py-2.5 px-3 font-medium">
                <Tooltip title={language === 'zh' ? '国内中转路线与预计时效' : "Transit Route & Target ETA"} content={language === 'zh' ? '供应商发货地至集运中转仓（东莞/义乌/深圳）以及预计送达日期' : "Origin factory in China to hub warehouse and carrier estimated delivery date"} position="top" width="w-56">
                  <div className="flex items-center gap-1">
                    <span>{language === 'zh' ? '运输路线 / 枢纽' : 'Route / Hub & ETA'}</span>
                  </div>
                </Tooltip>
              </th>
              <th className="py-2.5 px-1.5 sm:px-2 font-medium">
                <Tooltip title={t.status} content={language === 'zh' ? '采购、质检与跨境转运实时状态' : "Real-time procurement, inspection, and shipping status"} position="top" width="w-56">
                  <span>{t.status}</span>
                </Tooltip>
              </th>
              <th className="hidden md:table-cell py-2.5 px-2 text-right font-medium">{t.action}</th>
              <th className="py-2.5 px-1 sm:px-3 w-8 text-right"></th>
            </tr>
          </thead>

          <motion.tbody
            key={selectedTab}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="divide-y divide-slate-100"
          >
            {displayedOrders.map((order, idx) => {
              const isSelected = selectedOrderIds.includes(order.id);
              const origin = getOriginInfo(order);
              const destination = getDestinationInfo(order);
              const estDelivery = getEstDelivery(order);
              const status = getStatusBadge(order);
              const isNeedsAction = order.zone === 'NEEDS_ACTION';
              const isEven = idx % 2 === 0;

              // Check if order was recently updated for subtle highlight/fade-in animation
              const isRecentlyUpdated = recentlyUpdatedOrderIds && 
                recentlyUpdatedOrderIds[order.id] && 
                (Date.now() - recentlyUpdatedOrderIds[order.id] < 4500);

              return (
                <tr
                  key={order.id}
                  onClick={() => onOpenOrderDetail(order)}
                  className={`group cursor-pointer transition-colors duration-150 ${
                    isRecentlyUpdated
                      ? 'animate-row-update bg-amber-50/90 ring-1 ring-orange-400/70 border-l-4 border-l-[#E35D3B]'
                      : isSelected
                      ? 'bg-slate-100/90 ring-1 ring-inset ring-slate-300/80'
                      : isNeedsAction
                      ? isEven
                        ? 'bg-amber-50/40 hover:bg-amber-100/50'
                        : 'bg-amber-50/15 hover:bg-amber-100/35'
                      : isEven
                      ? 'bg-white hover:bg-slate-100/60'
                      : 'bg-slate-50/80 hover:bg-slate-100/80'
                  }`}
                >
                  {/* Checkbox */}
                  <td
                    className="py-2.5 px-2 sm:px-4 w-7 sm:w-9"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelect(order.id);
                    }}
                  >
                    <input
                      type="checkbox"
                      aria-label={`Select order ${order.orderNumber}`}
                      checked={isSelected}
                      onChange={() => onToggleSelect(order.id)}
                      className="rounded border-slate-300 text-slate-950 focus:ring-0 cursor-pointer"
                    />
                  </td>

                  {/* Order ID: Desktop/tablet only */}
                  <td className="hidden sm:table-cell py-2.5 px-2 text-xs font-mono font-bold text-slate-900 whitespace-nowrap">
                    #{order.orderNumber.replace('P360-', '')}
                  </td>

                  {/* Product & Supplier (Avatar / Title) - Pinned on mobile */}
                  <td className="py-2.5 px-2 sm:px-2.5 min-w-0 max-w-[140px] sm:max-w-[200px] xl:max-w-[240px] sticky left-7 sm:static bg-inherit z-10">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="relative shrink-0">
                        <img
                          src={order.thumbnail}
                          alt=""
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback to a reliable SVG placeholder or high-reliability image
                            const target = e.currentTarget;
                            if (!target.src.includes('photo-1577937927133-66ef06acdf18')) {
                              target.src = 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=160&auto=format&fit=crop&q=80';
                            }
                          }}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl object-cover border border-slate-200/80 bg-slate-100"
                        />
                        {order.qcPhotos && order.qcPhotos.length > 0 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (order.qcPhotos && order.qcPhotos[0]) {
                                onOpenPhotoModal(order.qcPhotos[0].url, order.qcPhotos[0].caption);
                              }
                            }}
                            title={t.inspectQcPhotos}
                            className="absolute -bottom-1 -right-1 p-0.5 bg-white rounded-md shadow-xs border border-slate-200 text-slate-600 hover:text-slate-950"
                          >
                            <Camera className="w-2.5 h-2.5 text-blue-600" />
                          </button>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900 truncate group-hover:text-slate-950 text-xs">
                          {translateOrderText(order.title)}
                        </p>
                        <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] mt-0.5 text-slate-400 truncate">
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold text-[9px] font-mono">
                            {order.supplierPlatform}
                          </span>
                          <span className="sm:hidden font-mono font-bold text-[9px] text-slate-600">
                            #{order.orderNumber.replace('P360-', '')}
                          </span>
                          <span className="truncate hidden sm:inline">{translateOrderText(order.supplierName)}</span>
                        </div>
                        {/* Mobile route line */}
                        <div className="md:hidden text-[9px] text-slate-400 truncate mt-0.5">
                          {origin.city} ➔ {destination.city}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Amount (RMB) Primary - Pinned */}
                  <td className="py-2.5 px-2 sm:px-3 whitespace-nowrap text-right shrink-0">
                    <div className="font-mono font-bold text-slate-900 text-xs text-right">
                      ¥{order.priceRMB.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 text-right">
                      ${order.priceUSD.toFixed(2)}
                      <span className="hidden sm:inline"> • {order.weightKg.toFixed(1)}kg</span>
                    </div>
                  </td>

                  {/* Route, Hub & Target Delivery ETA Combined - Hidden on mobile */}
                  <td className="hidden md:table-cell py-2.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-xs leading-none">{origin.flag}</span>
                      <span className="font-medium text-slate-800">{origin.city}</span>
                      <span className="text-slate-400 text-[10px] mx-0.5">➔</span>
                      <span className="text-xs leading-none">{destination.flag}</span>
                      <span className="font-medium text-slate-800">{destination.city}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                      <span>{language === 'zh' ? '预计送达' : 'Est'}:</span>
                      <span className="text-slate-600 font-medium">{estDelivery}</span>
                    </div>
                  </td>

                  {/* Status with Dot + Updated Pill - Responsive */}
                  <td className="py-2.5 px-1.5 sm:px-2 whitespace-nowrap">
                    <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${status.dotColor}`} />
                      <span className={`font-semibold capitalize text-xs truncate max-w-[70px] sm:max-w-none ${status.textColor}`}>
                        {status.label}
                      </span>
                      {isRecentlyUpdated && (
                        <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[#E35D3B]/15 text-[#E35D3B] text-[9.5px] font-bold font-mono animate-pulse">
                          ⚡ {t.updatedPill}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Action Button - Hidden on mobile */}
                  <td className="hidden md:table-cell py-2.5 px-2 text-right whitespace-nowrap">
                    {order.actionType === 'PAYMENT_PENDING' ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenActionModal(order);
                        }}
                        className="px-2.5 py-1 text-xs rounded-xl bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-bold shadow-2xs transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <CreditCard className="w-3 h-3" /> {t.authorizePo}
                      </button>
                    ) : order.actionType === 'CUSTOMIZATION_CONFIRMATION' ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenActionModal(order);
                        }}
                        className="px-2.5 py-1 text-xs rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-2xs transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <Camera className="w-3 h-3" /> {t.reviewProof}
                      </button>
                    ) : order.actionType === 'READY_TO_CONSOLIDATE' ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!selectedOrderIds.includes(order.id)) {
                            onToggleSelect(order.id);
                          }
                          onConsolidateSelected();
                        }}
                        className="px-2.5 py-1 text-xs rounded-xl bg-[#0e1118] hover:bg-slate-800 text-white font-semibold shadow-2xs transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <Layers className="w-3 h-3" /> {t.consolidate}
                      </button>
                    ) : order.actionType === 'ADDRESS_ISSUE' ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenActionModal(order);
                        }}
                        className="px-2.5 py-1 text-xs rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-2xs transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <ShieldAlert className="w-3 h-3" /> {t.fixAddress}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenOrderDetail(order);
                        }}
                        className="px-2.5 py-1 text-xs rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:bg-slate-50 font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        {t.seeMore}
                      </button>
                    )}
                  </td>

                  {/* Context More Menu with real actionable items - Pinned */}
                  <td
                    className="py-2.5 px-1 sm:px-3 text-right relative shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      aria-label="Order actions menu"
                      onClick={() =>
                        setActiveMenuId(activeMenuId === order.id ? null : order.id)
                      }
                      className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Popover Action Menu */}
                    {activeMenuId === order.id && (
                      <div 
                        className="absolute right-2 sm:right-6 top-10 w-56 sm:w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-40 text-left animate-in fade-in zoom-in-95 duration-150"
                        onMouseLeave={() => setActiveMenuId(null)}
                      >
                        {/* Mobile Primary Action Button inside More Options */}
                        <div className="md:hidden mb-1">
                          {order.actionType === 'PAYMENT_PENDING' && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onOpenActionModal(order);
                              }}
                              className="w-full px-3 py-2 text-xs rounded-xl bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-bold shadow-2xs transition-colors flex items-center gap-2 cursor-pointer mb-1"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>{t.authorizePo}</span>
                            </button>
                          )}
                          {order.actionType === 'CUSTOMIZATION_CONFIRMATION' && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onOpenActionModal(order);
                              }}
                              className="w-full px-3 py-2 text-xs rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-2xs transition-colors flex items-center gap-2 cursor-pointer mb-1"
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>{t.reviewProof}</span>
                            </button>
                          )}
                          {order.actionType === 'READY_TO_CONSOLIDATE' && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                if (!selectedOrderIds.includes(order.id)) {
                                  onToggleSelect(order.id);
                                }
                                onConsolidateSelected();
                              }}
                              className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1118] hover:bg-slate-800 text-white font-semibold shadow-2xs transition-colors flex items-center gap-2 cursor-pointer mb-1"
                            >
                              <Layers className="w-3.5 h-3.5 text-[#E35D3B]" />
                              <span>{t.consolidate}</span>
                            </button>
                          )}
                          {order.actionType === 'ADDRESS_ISSUE' && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onOpenActionModal(order);
                              }}
                              className="w-full px-3 py-2 text-xs rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-2xs transition-colors flex items-center gap-2 cursor-pointer mb-1"
                            >
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span>{t.fixAddress}</span>
                            </button>
                          )}
                        </div>

                        {/* Quick Advance Status Trigger */}
                        {onAdvanceOrderStatus && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onAdvanceOrderStatus(order);
                            }}
                            className="w-full px-3 py-2 text-xs font-bold text-[#E35D3B] hover:bg-orange-50 rounded-xl flex items-center gap-2 cursor-pointer bg-orange-50/50 mb-1"
                          >
                            <Zap className="w-3.5 h-3.5 text-[#E35D3B]" />
                            <span>⚡ {t.advanceStageQc}</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onOpenOrderDetail(order);
                          }}
                          className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>{t.viewOrderTimelineBin}</span>
                        </button>

                        {order.qcPhotos && order.qcPhotos.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onOpenPhotoModal(order.qcPhotos![0].url, order.qcPhotos![0].caption);
                            }}
                            className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
                          >
                            <Camera className="w-3.5 h-3.5 text-blue-600" />
                            <span>{t.inspectQcPhotos} ({order.qcPhotos.length})</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            handleDownloadInvoice(order);
                          }}
                          className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>{t.downloadInvoiceRmb}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            const tracking = order.domesticTracking?.trackingNumber || order.intlTracking?.trackingNumber || order.orderNumber;
                            navigator.clipboard.writeText(tracking);
                            onShowToast(language === 'zh' ? `已复制运单号: ${tracking}` : `Copied tracking code: ${tracking}`);
                          }}
                          className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>{t.copyTrackingWaybill}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onShowToast(language === 'zh' ? `已为 #${order.orderNumber} 提交中转仓重新打包及防潮加固需求` : `Warehouse repacking & moisture protection requested for #${order.orderNumber}`);
                          }}
                          className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
                        >
                          <Box className="w-3.5 h-3.5 text-slate-500" />
                          <span>{t.requestWarehouseRepack}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onShowToast(language === 'zh' ? `Proc360 中文驻厂采购专员已对接【${translateOrderText(order.supplierName)}】• 微信跟单中` : `Proc360 Agent assigned to ${order.supplierName} • WeChat chat active`);
                          }}
                          className="w-full px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-xl flex items-center gap-2 cursor-pointer border-t border-slate-100 mt-1 pt-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.chatWithChinaAgent}</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>

      {/* View More Button Footer when orders are more than 10 */}
      {sortedOrders.length > 10 && (
        <div className="p-3.5 sm:p-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span>{t.showing}</span>
            <span className="font-bold text-slate-900 font-mono">
              {displayedOrders.length}
            </span>
            <span>{t.of}</span>
            <span className="font-bold text-slate-900 font-mono">
              {sortedOrders.length}
            </span>
            <span>{t.orders}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              const nextState = !isExpandedView;
              setIsExpandedView(nextState);
              if (nextState) {
                onShowToast(language === 'zh' ? `正在展示全部 ${sortedOrders.length} 笔采购订单` : `Showing all ${sortedOrders.length} sourcing orders`);
              } else {
                onShowToast(language === 'zh' ? '已折叠展示前 10 笔订单' : 'Collapsed to top 10 orders');
              }
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {isExpandedView ? (
              <>
                <ChevronUp className="w-4 h-4 text-[#E35D3B]" />
                <span>{t.showLess}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-[#E35D3B]" />
                <span>{t.viewMore} ({sortedOrders.length - 10} {t.remaining})</span>
              </>
            )}
          </button>
        </div>
      )}

      {orders.length === 0 && (
        <div className="p-12 text-center text-slate-400 space-y-1">
          <Package className="w-8 h-8 mx-auto text-slate-300 mb-2" />
          <p className="font-semibold text-slate-700">{t.noOrdersMatch}</p>
          <p className="text-xs text-slate-400">{t.trySwitchingTabs}</p>
        </div>
      )}
    </div>
  );
};

