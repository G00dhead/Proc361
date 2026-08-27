import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockOrders, initialWalletState } from './data/mockOrders';
import { OrderItem, WalletState } from './types';
import { MenuBar } from './components/MenuBar';
import { TopBar } from './components/TopBar';
import { SourcingAnalyticsSection } from './components/SourcingAnalyticsSection';
import { PerformanceChart } from './components/PerformanceChart';
import { CapitalOverview } from './components/CapitalOverview';
import { OrdersTable } from './components/OrdersTable';
import { OrderDetailDrawer } from './components/OrderDetailDrawer';
import { NewOrderModal } from './components/NewOrderModal';
import { WalletModal } from './components/WalletModal';
import { ActionModal } from './components/ActionModal';
import { ConsolidationDrawer } from './components/ConsolidationDrawer';
import { PhotoModal } from './components/PhotoModal';
import { CheckCircle2, Maximize2, Sparkles } from 'lucide-react';

export function App() {
  // Main State
  const [orders, setOrders] = useState<OrderItem[]>(mockOrders);
  const [wallet, setWallet] = useState<WalletState>(initialWalletState);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Real-time Updated Order IDs Tracker for Animation Highlight
  const [recentlyUpdatedOrderIds, setRecentlyUpdatedOrderIds] = useState<Record<string, number>>({});

  const markOrderUpdated = (id: string) => {
    setRecentlyUpdatedOrderIds((prev) => ({ ...prev, [id]: Date.now() }));
  };

  // Search & Navigation Filters
  const [activeNavTab, setActiveNavTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTableTab, setSelectedTableTab] = useState<'ALL' | 'PENDING' | 'IN_TRANSIT' | 'WAREHOUSE' | 'COMPLETED'>('ALL');

  // Selected orders for international consolidation
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  // Modals & Drawers
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isFundWalletOpen, setIsFundWalletOpen] = useState(false);
  const [isConsolidationOpen, setIsConsolidationOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderItem | null>(null);
  const [activeActionOrder, setActiveActionOrder] = useState<OrderItem | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<{ url: string | null; caption: string }>({ url: null, caption: '' });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sourcing & Capital Calculations
  const totalSourcedRMB = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.priceRMB, 0);
  }, [orders]);

  const totalSourcedUSD = useMemo(() => {
    return totalSourcedRMB / wallet.exchangeRate;
  }, [totalSourcedRMB, wallet.exchangeRate]);

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.zone === 'NEEDS_ACTION').length,
      inTransit: orders.filter((o) => o.inProgressStage === 'INTL_TRANSIT_AIR' || o.inProgressStage === 'INTL_TRANSIT_SEA' || o.inProgressStage === 'DOMESTIC_TRANSIT').length,
      warehouse: orders.filter((o) => o.actionType === 'READY_TO_CONSOLIDATE' || o.inProgressStage === 'WAREHOUSE_RECEIVING_QC').length,
      completed: orders.filter((o) => o.inProgressStage === 'OUT_FOR_DELIVERY').length,
    };
  }, [orders]);

  // Filtered Orders for the table
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = order.title.toLowerCase().includes(q);
        const matchOrderNum = order.orderNumber.toLowerCase().includes(q);
        const matchSupplier = order.supplierName.toLowerCase().includes(q);
        const matchTracking =
          order.domesticTracking?.trackingNumber.toLowerCase().includes(q) ||
          order.intlTracking?.trackingNumber.toLowerCase().includes(q);
        const matchWarehouse = order.warehouse.toLowerCase().includes(q);
        if (!matchTitle && !matchOrderNum && !matchSupplier && !matchTracking && !matchWarehouse) {
          return false;
        }
      }

      // Tab filter
      if (selectedTableTab === 'PENDING') {
        return order.zone === 'NEEDS_ACTION';
      }
      if (selectedTableTab === 'IN_TRANSIT') {
        return order.inProgressStage === 'INTL_TRANSIT_AIR' || order.inProgressStage === 'INTL_TRANSIT_SEA' || order.inProgressStage === 'DOMESTIC_TRANSIT';
      }
      if (selectedTableTab === 'WAREHOUSE') {
        return order.actionType === 'READY_TO_CONSOLIDATE' || order.inProgressStage === 'WAREHOUSE_RECEIVING_QC';
      }
      if (selectedTableTab === 'COMPLETED') {
        return order.inProgressStage === 'OUT_FOR_DELIVERY';
      }

      return true;
    });
  }, [orders, searchQuery, selectedTableTab]);

  // Multi-select Handlers
  const handleToggleSelect = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllReadyToConsolidate = () => {
    const readyIds = orders
      .filter((o) => o.actionType === 'READY_TO_CONSOLIDATE')
      .map((o) => o.id);
    setSelectedOrderIds(readyIds);
  };

  const handleClearSelection = () => {
    setSelectedOrderIds([]);
  };

  // Selected Order Data for consolidation drawer
  const selectedOrdersData = useMemo(() => {
    return orders.filter((o) => selectedOrderIds.includes(o.id));
  }, [orders, selectedOrderIds]);

  const selectedTotalWeight = useMemo(() => {
    return selectedOrdersData.reduce((sum, o) => sum + o.weightKg, 0);
  }, [selectedOrdersData]);

  const selectedTotalRMB = useMemo(() => {
    return selectedOrdersData.reduce((sum, o) => sum + o.priceRMB, 0);
  }, [selectedOrdersData]);

  // Add New Order
  const handleAddNewOrder = (newOrder: OrderItem) => {
    setOrders((prev) => [newOrder, ...prev]);
    markOrderUpdated(newOrder.id);
    showToast(`Order #${newOrder.orderNumber} placed. Added to pending action list.`);
  };

  // Top Up Wallet
  const handleTopUpRMB = (amountCNY: number) => {
    setWallet((w) => ({
      ...w,
      balanceCNY: w.balanceCNY + amountCNY,
      balanceUSD: (w.balanceCNY + amountCNY) / w.exchangeRate,
    }));
    showToast(`Wallet credited +¥${amountCNY.toLocaleString(undefined, { minimumFractionDigits: 2 })} RMB.`);
  };

  // Quick Advance Status & Lifecycle Transition Handler
  const handleAdvanceOrderStatus = (order: OrderItem) => {
    let nextStage = order.inProgressStage;
    let nextZone = order.zone;
    let nextStatusLabel = order.statusLabel;
    let nextActionType = order.actionType;

    if (order.zone === 'NEEDS_ACTION') {
      nextZone = 'IN_PROGRESS';
      nextActionType = undefined;
      nextStage = 'WAREHOUSE_RECEIVING_QC';
      nextStatusLabel = 'QC Passed & Cleared';
    } else if (order.actionType === 'READY_TO_CONSOLIDATE') {
      nextStage = 'INTL_TRANSIT_AIR';
      nextActionType = undefined;
      nextStatusLabel = 'In Transit (Air Express)';
    } else if (order.inProgressStage === 'WAREHOUSE_RECEIVING_QC') {
      nextActionType = 'READY_TO_CONSOLIDATE';
      nextStatusLabel = 'Ready in Hub';
    } else if (order.inProgressStage === 'DOMESTIC_TRANSIT') {
      nextStage = 'WAREHOUSE_RECEIVING_QC';
      nextStatusLabel = 'Received at Hub';
    } else if (order.inProgressStage === 'INTL_TRANSIT_AIR' || order.inProgressStage === 'INTL_TRANSIT_SEA') {
      nextStage = 'OUT_FOR_DELIVERY';
      nextStatusLabel = 'Delivered';
    } else {
      nextStage = 'WAREHOUSE_RECEIVING_QC';
      nextStatusLabel = 'Hub Processed';
    }

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== order.id) return o;
        return {
          ...o,
          zone: nextZone,
          actionType: nextActionType,
          inProgressStage: nextStage,
          statusLabel: nextStatusLabel,
          updatedAt: 'Just now',
        };
      })
    );

    markOrderUpdated(order.id);
    showToast(`Order #${order.orderNumber} status updated to "${nextStatusLabel}"`);
  };

  // Action Resolution
  const handleResolveAction = (
    orderId: string,
    updatedZone: 'NEEDS_ACTION' | 'IN_PROGRESS',
    summaryMessage: string,
    refundOrDeductionRMB?: number
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          zone: updatedZone,
          actionSummary: summaryMessage,
          statusLabel: updatedZone === 'IN_PROGRESS' ? 'Dispatched to Hub' : 'In Warehouse Hub',
          inProgressStage: updatedZone === 'IN_PROGRESS' ? 'DOMESTIC_TRANSIT' : o.inProgressStage,
          updatedAt: 'Just now',
        };
      })
    );

    markOrderUpdated(orderId);

    if (refundOrDeductionRMB) {
      setWallet((w) => ({
        ...w,
        balanceCNY: w.balanceCNY + refundOrDeductionRMB,
        balanceUSD: (w.balanceCNY + refundOrDeductionRMB) / w.exchangeRate,
      }));
    }

    showToast(summaryMessage);
  };

  // Consolidation Confirm
  const handleConfirmConsolidation = (
    selectedIds: string[],
    shippingMethod: string,
    totalCostCNY: number
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (!selectedIds.includes(o.id)) return o;
        return {
          ...o,
          zone: 'IN_PROGRESS',
          actionType: undefined,
          statusLabel: 'Consolidated & In Transit',
          inProgressStage: 'INTL_TRANSIT_AIR',
          updatedAt: 'Just now',
          intlTracking: {
            trackingNumber: `CONSOL-${Math.floor(100000 + Math.random() * 900000)}`,
            carrier: shippingMethod === 'AIR_EXPRESS' ? 'DHL Air Express' : 'Air Cargo DDP Express',
            etaDate: '24 Sep, 2026',
            status: 'Export customs cleared in Shenzhen. In flight.',
          },
        };
      })
    );

    selectedIds.forEach((id) => markOrderUpdated(id));

    setWallet((w) => ({
      ...w,
      balanceCNY: Math.max(0, w.balanceCNY - totalCostCNY),
      balanceUSD: Math.max(0, (w.balanceCNY - totalCostCNY) / w.exchangeRate),
    }));

    setSelectedOrderIds([]);
    showToast(`Consolidated ${selectedIds.length} parcels. Tracking waybill generated.`);
  };

  // Export CSV Handler with real downloadable CSV file
  const handleExportData = () => {
    const headers = ['Order Number', 'Title', 'Supplier', 'Platform', 'Quantity', 'Amount (RMB)', 'Amount (USD)', 'Weight (kg)', 'Warehouse Hub', 'Status', 'Date Sourced'];
    const rows = orders.map((o) => [
      o.orderNumber,
      `"${o.title.replace(/"/g, '""')}"`,
      `"${o.supplierName.replace(/"/g, '""')}"`,
      o.supplierPlatform,
      `${o.quantity} ${o.unit}`,
      o.priceRMB.toFixed(2),
      o.priceUSD.toFixed(2),
      o.weightKg.toFixed(2),
      `"${o.warehouse}"`,
      `"${o.statusLabel}"`,
      o.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Proc360_China_Sourcing_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${orders.length} orders to CSV (Proc360_Sourcing_Report.csv)`);
  };

  return (
    <div className="min-h-screen bg-[#edf0f4] text-slate-800 antialiased selection:bg-slate-950 selection:text-white flex flex-col w-full overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-950 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Full-Width Screen Navigation Header (0 padding, full width of screen) */}
      <MenuBar
        activeTab={activeNavTab}
        onSelectTab={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'finance') setIsFundWalletOpen(true);
          if (tab === 'orders' || tab === 'dashboard') setSelectedTableTab('ALL');
          if (tab === 'warehouses') {
            setSelectedTableTab('WAREHOUSE');
            showToast('Viewing Shenzhen & Yiwu Consolidation Hub Cargo');
          }
          if (tab === 'suppliers') {
            showToast('Filtered: 4 Active Verified Suppliers in Guangdong & Zhejiang');
          }
          if (tab === 'analytics') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('Viewing Sourcing Lead Time & Spend Analytics');
          }
          if (tab === 'marketplace') {
            setIsNewOrderOpen(true);
            showToast('Opening 1688 / Taobao / Factory Direct Sourcing Portal');
          }
          if (tab === 'support') {
            showToast('24/7 Dedicated Agent Online (WeChat: Proc360_Desk | Response < 5 min)');
          }
          if (tab === 'settings') {
            showToast('Live FX Rate Synced: 1 USD = 7.2405 CNY (Bank of China)');
          }
          if (tab === 'profile') {
            showToast('Goodhead Boma • Merchant (Level 4 Escrow Verified)');
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        pendingCount={counts.pending}
        totalOrdersCount={counts.all}
        walletBalanceCNY={wallet.balanceCNY}
        wallet={wallet}
        isFocusMode={isFocusMode}
        onToggleFocusMode={() => {
          const next = !isFocusMode;
          setIsFocusMode(next);
          showToast(next ? 'Focus View Active: Secondary analytics charts hidden' : 'Focus View Deactivated: Sourcing charts restored');
        }}
        onOpenFundWallet={() => setIsFundWalletOpen(true)}
        onOpenPlaceOrder={() => setIsNewOrderOpen(true)}
        onExport={handleExportData}
        onShowToast={showToast}
      />

      {/* Main Dashboard Layout Container */}
      <main className="flex-1 max-w-[1720px] mx-auto p-3 sm:p-5 lg:p-6 space-y-4 pb-16 sm:pb-8 w-full overflow-x-hidden">
        {/* Top Bar: Search + RMB Wallet + Secondary Fund Button + Export + PRIMARY Place Order CTA */}
        <TopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          wallet={wallet}
          onOpenFundWallet={() => setIsFundWalletOpen(true)}
          onOpenPlaceOrder={() => setIsNewOrderOpen(true)}
          onExport={handleExportData}
          onShowToast={showToast}
        />

        {/* Sourcing Analytics & Live Freight Tracking Section (Collapsible in Focus View) */}
        <AnimatePresence initial={false}>
          {!isFocusMode && (
            <motion.div
              key="sourcing-analytics"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <SourcingAnalyticsSection
                orders={orders}
                totalSourcedRMB={totalSourcedRMB}
                totalSourcedUSD={totalSourcedUSD}
                onShowToast={showToast}
                onOpenOrderDetail={(order) => setSelectedOrderDetail(order)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Focus Mode Workspace Notice Banner */}
        {isFocusMode && (
          <div className="w-full bg-slate-900 text-white rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold">Focus View Active</span>
              <span className="text-slate-400 hidden sm:inline">• Secondary analytics charts hidden to maximize order space</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsFocusMode(false);
                showToast('Focus View Deactivated: Sourcing charts restored');
              }}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              Show Analytics Charts
            </button>
          </div>
        )}

        {/* Orders Table with 10-order View More limit */}
        <OrdersTable
          orders={filteredOrders}
          allOrdersCount={counts.all}
          selectedTab={selectedTableTab}
          onSelectTab={setSelectedTableTab}
          counts={counts}
          selectedOrderIds={selectedOrderIds}
          onToggleSelect={handleToggleSelect}
          onSelectAllReadyToConsolidate={handleSelectAllReadyToConsolidate}
          onClearSelection={handleClearSelection}
          onOpenOrderDetail={(order) => setSelectedOrderDetail(order)}
          onOpenActionModal={(order) => setActiveActionOrder(order)}
          onConsolidateSelected={() => setIsConsolidationOpen(true)}
          onOpenPhotoModal={(url, caption) => setPreviewPhoto({ url, caption })}
          onShowToast={showToast}
          selectedTotalWeight={selectedTotalWeight}
          selectedTotalRMB={selectedTotalRMB}
          recentlyUpdatedOrderIds={recentlyUpdatedOrderIds}
          onAdvanceOrderStatus={handleAdvanceOrderStatus}
        />
      </main>

      {/* Modals & Drawers */}
      {/* 1. Order Detail Slide-over Drawer */}
      <OrderDetailDrawer
        order={selectedOrderDetail}
        isOpen={!!selectedOrderDetail}
        onClose={() => setSelectedOrderDetail(null)}
        onOpenActionModal={(order) => {
          setSelectedOrderDetail(null);
          setActiveActionOrder(order);
        }}
        onViewPhoto={(url, caption) => setPreviewPhoto({ url, caption })}
        onConsolidateOrder={(order) => {
          setSelectedOrderDetail(null);
          if (!selectedOrderIds.includes(order.id)) {
            setSelectedOrderIds([order.id]);
          }
          setIsConsolidationOpen(true);
        }}
        walletBalanceCNY={wallet.balanceCNY}
      />

      {/* 2. Place New Sourcing Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onAddNewOrder={handleAddNewOrder}
      />

      {/* 3. Fund RMB Wallet Modal */}
      <WalletModal
        isOpen={isFundWalletOpen}
        onClose={() => setIsFundWalletOpen(false)}
        wallet={wallet}
        onTopUpRMB={handleTopUpRMB}
      />

      {/* 4. Action Resolution Modal */}
      <ActionModal
        order={activeActionOrder}
        isOpen={!!activeActionOrder}
        onClose={() => setActiveActionOrder(null)}
        onResolveAction={handleResolveAction}
        walletBalanceCNY={wallet.balanceCNY}
      />

      {/* 5. International Consolidation Drawer */}
      <ConsolidationDrawer
        isOpen={isConsolidationOpen}
        onClose={() => setIsConsolidationOpen(false)}
        selectedOrders={selectedOrdersData}
        onConfirmConsolidation={handleConfirmConsolidation}
        walletBalanceCNY={wallet.balanceCNY}
      />

      {/* 6. QC Photo Inspection Viewer Modal */}
      <PhotoModal
        isOpen={!!previewPhoto.url}
        photoUrl={previewPhoto.url}
        caption={previewPhoto.caption}
        onClose={() => setPreviewPhoto({ url: null, caption: '' })}
      />
    </div>
  );
}

export default App;
