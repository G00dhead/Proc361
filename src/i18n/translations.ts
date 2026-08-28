export type Language = 'en' | 'zh';

export interface TranslationDictionary {
  // Navigation & Header
  appTitle: string;
  searchPlaceholder: string;
  searchBtn: string;
  focusView: string;
  focusViewOn: string;
  focusViewOff: string;
  focusViewTooltipEnter: string;
  focusViewTooltipExit: string;
  focusBannerTitle: string;
  focusBannerDesc: string;
  showAnalyticsBtn: string;
  account: string;
  help: string;
  merchantTier: string;
  walletBalanceLabel: string;
  vendorsSuppliers: string;
  cargoWarehouses: string;
  analyticsReports: string;
  rmbWallet: string;
  accountSettings: string;
  sourcingHelp: string;
  chinaBilingualAgents: string;
  chatWithAgent: string;
  currencyFxRates: string;
  escrowRefundTerms: string;

  // TopBar
  sourcingFreightConsole: string;
  filteredBy: string;
  fxSpotRate: string;
  logisticsFeed: string;
  newCount: string;
  markAllRead: string;
  fundWalletBtn: string;
  exportBtn: string;
  placeOrderBtn: string;

  // Navigation Menu Tabs
  navDashboard: string;
  navOrders: string;
  navWarehouses: string;
  navSourcing: string;
  navFinance: string;
  navSuppliers: string;
  navAnalytics: string;
  navSupport: string;
  navSettings: string;

  // Sourcing Analytics Section
  sourcingCommandTitle: string;
  sourcingCommandSubtitle: string;
  liveSyncTime: string;
  sourcedVolume: string;
  escrowCommitted: string;
  ordersProcessed: string;
  pendingActions: string;
  completedRate: string;
  inWarehouse: string;
  readyToConsolidate: string;
  totalWeight: string;
  fulfilledOrders: string;
  passedQc: string;
  inQcQueue: string;
  hubCheckSummary: string;
  sourcingVelocityTitle: string;
  sourcingVelocityDesc: string;
  liveFreightTitle: string;
  liveFreightDesc: string;
  freightAirExpress: string;
  freightAirCargo: string;
  freightSeaMatson: string;
  freightDeparted: string;
  freightCustomsCleared: string;
  freightInTransit: string;
  freightDelivered: string;
  viewTracking: string;
  poUnit: string;
  totalOrders: string;
  vsLastWeek: string;
  all1688FactoryPos: string;
  activeStatus: string;
  returnsOrders: string;
  returnsOrdersDesc: string;
  escrow100: string;
  orderAnalysis: string;
  reimbursedAmount: string;
  reimbursedAmountRmb: string;
  monthly: string;
  weekly: string;
  daily: string;
  line: string;
  bar: string;
  fulfilledOrdersLegend: string;
  cancelQcReturnedLegend: string;
  trackNewShipment: string;
  switchActiveParcel: string;
  copyWaybillId: string;
  currentConsignment: string;
  inTransitBadge: string;
  showing: string;
  ofWords: string;
  ordersWord: string;
  showLess: string;
  viewMore: string;
  remaining: string;
  thOrderId: string;
  thProductSupplier: string;
  thAmountRmb: string;
  thPickup: string;
  thDelivery: string;
  thEstDelivery: string;
  btnReviewProof: string;
  btnConsolidate: string;
  btnFixAddress: string;
  btnSeeMore: string;
  btnAdvanceStage: string;
  btnViewTimeline: string;
  btnInspectQcPhotos: string;
  btnDownloadInvoice: string;
  btnCopyTracking: string;
  btnRequestRepack: string;
  btnChatChinaAgent: string;

  // Table Tabs & Filters
  tabAll: string;
  tabActionRequired: string;
  tabInTransit: string;
  tabWarehouse: string;
  tabCompleted: string;
  sortBy: string;
  sortDateNewest: string;
  sortDateOldest: string;
  sortPriceHigh: string;
  sortPriceLow: string;
  sortWeightHigh: string;
  sortWeightLow: string;
  sortOrderNum: string;
  sortStatus: string;
  searchNoResults: string;
  searchNoResultsDesc: string;
  clearFiltersBtn: string;

  // Multi-Select Bar
  selectedCount: string;
  selectAllReady: string;
  clearSelection: string;
  consolidateParcelsBtn: string;

  // Table Headers
  thOrderInfo: string;
  thItemSpec: string;
  thSupplier: string;
  thQuantity: string;
  thPrice: string;
  thWarehouse: string;
  thQcStatus: string;
  thStatus: string;
  thAction: string;

  // Row Actions
  btnAuthorizePo: string;
  btnApproveQc: string;
  btnReviewSpecs: string;
  btnVerifyAddress: string;
  btnPackConsolidate: string;
  btnTrackFreight: string;
  btnInspectPhotos: string;
  btnViewDetails: string;
  btnAdvanceStatus: string;
  btnRequestRefund: string;
  btnVisitSupplier: string;
  btnCopyOrder: string;

  // Order Details Drawer
  drawerTitle: string;
  drawerSubtitle: string;
  specifications: string;
  supplierDetails: string;
  paymentEscrow: string;
  qualityInspection: string;
  qc5PointCheck: string;
  qcPhotosCount: string;
  domesticTracking: string;
  intlTracking: string;
  timelineTitle: string;
  copySuccess: string;

  // Action Modal
  actionModalTitle: string;
  actionModalSubtitle: string;
  authPoDesc: string;
  authPoWalletNotice: string;
  authPoConfirmBtn: string;
  qcApprovalDesc: string;
  qcConfirmBtn: string;
  qcRejectRefundBtn: string;
  specConfirmDesc: string;
  specConfirmBtn: string;
  addressConfirmDesc: string;
  addressConfirmBtn: string;
  cancelBtn: string;

  // New Order Modal
  newOrderTitle: string;
  newOrderSubtitle: string;
  pasteUrlLabel: string;
  pasteUrlPlaceholder: string;
  fetchDetailsBtn: string;
  itemTitleLabel: string;
  itemTitlePlaceholder: string;
  supplierNameLabel: string;
  supplierPlatformLabel: string;
  quantityLabel: string;
  unitPriceRmbLabel: string;
  categoryLabel: string;
  destWarehouseLabel: string;
  sourcingNotesLabel: string;
  sourcingNotesPlaceholder: string;
  submitOrderBtn: string;

  // Wallet Modal
  walletModalTitle: string;
  walletModalSubtitle: string;
  availableBalance: string;
  lockedEscrow: string;
  selectTopUpAmount: string;
  customAmountPlaceholder: string;
  paymentMethod: string;
  payWechat: string;
  payAlipay: string;
  payBankCard: string;
  payWireTransfer: string;
  escrowProtectionNotice: string;
  confirmTopUpBtn: string;

  // Consolidation Drawer
  consolidationTitle: string;
  consolidationSubtitle: string;
  selectedParcelsList: string;
  packagingOptions: string;
  bubbleWrapOpt: string;
  bubbleWrapDesc: string;
  doubleBoxOpt: string;
  doubleBoxDesc: string;
  waterproofOpt: string;
  waterproofDesc: string;
  shippingChannel: string;
  estDelivery: string;
  shippingCalculation: string;
  subtotalGoods: string;
  freightCost: string;
  packagingCost: string;
  totalFreightPayable: string;
  confirmConsolidationBtn: string;

  // Photo Modal
  photoModalTitle: string;
  photoInspectionReport: string;
  downloadPhoto: string;
  closeBtn: string;

  // Warehouse Names
  whDongguan: string;
  whShenzhen: string;
  whYiwu: string;

  // Sourcing Platforms
  platform1688: string;
  platformTaobao: string;
  platformWeidian: string;
  platformFactory: string;

  // Common UI words
  viewMoreOrders: string;
  collapseOrders: string;
  showingOrdersCount: string;
  justNow: string;
  languageToggle: string;
  of: string;
  orders: string;
  availableToSpend: string;
  activeEscrowLock: string;
  cancel: string;
  close: string;
  noOrdersMatch: string;
  trySwitchingTabs: string;
  statusPaymentPending: string;
  statusProofReview: string;
  statusAddressError: string;
  statusNeedsAction: string;
  statusReadyInHub: string;
  statusInTransit: string;
  statusDelivered: string;
  statusInProcess: string;
  tabAllOrders: string;
  tabWarehouseHub: string;
  sort: string;
  sortAmountHigh: string;
  sortWeightHeavy: string;
  sortOrderNumber: string;
  orderId: string;
  productSupplier: string;
  amountRmb: string;
  pickup: string;
  delivery: string;
  status: string;
  action: string;
  inspectQcPhotos: string;
  updatedPill: string;
  authorizePo: string;
  reviewProof: string;
  consolidate: string;
  fixAddress: string;
  seeMore: string;
  advanceStageQc: string;
  viewOrderTimelineBin: string;
  downloadInvoiceRmb: string;
  copyTrackingWaybill: string;
  requestWarehouseRepack: string;
  chatWithChinaAgent: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    // Navigation & Header
    appTitle: 'PROC360',
    searchPlaceholder: 'Search orders, tracking #, suppliers, items...',
    searchBtn: 'SEARCH',
    focusView: 'Focus View',
    focusViewOn: 'ON',
    focusViewOff: 'OFF',
    focusViewTooltipEnter: 'Enter Focus View (Hide analytics charts to maximize order space)',
    focusViewTooltipExit: 'Exit Focus View (Show analytics charts)',
    focusBannerTitle: 'Focus View Active',
    focusBannerDesc: 'Secondary analytics charts hidden to maximize order table space',
    showAnalyticsBtn: 'Show Analytics Charts',
    account: 'Account',
    help: 'Help',
    merchantTier: 'Merchant • Tier 4 Verified',
    walletBalanceLabel: 'Wallet',
    vendorsSuppliers: 'Vendors & Suppliers',
    cargoWarehouses: 'Cargo & Warehouses',
    analyticsReports: 'Analytics & Reports',
    rmbWallet: 'RMB Sourcing Wallet',
    accountSettings: 'Account Settings',
    sourcingHelp: 'Proc360 Sourcing Help',
    chinaBilingualAgents: '24/7 China Bilingual Agents',
    chatWithAgent: 'Chat with Sourcing Agent',
    currencyFxRates: 'Currency & FX Rates',
    escrowRefundTerms: 'Escrow & Refund Terms',

    // TopBar
    sourcingFreightConsole: 'Sourcing & Freight Console',
    filteredBy: 'Filtered',
    fxSpotRate: '1 USD = ¥7.2405 RMB',
    logisticsFeed: 'Proc360 Logistics Feed',
    newCount: 'New',
    markAllRead: 'Mark all read',
    fundWalletBtn: 'Fund',
    exportBtn: 'Export',
    placeOrderBtn: 'Place Order',

    // Navigation Menu Tabs
    navDashboard: 'Dashboard',
    navOrders: 'Orders',
    navWarehouses: 'Warehouses',
    navSourcing: '1688 Sourcing',
    navFinance: 'Finance & Wallet',
    navSuppliers: 'Suppliers',
    navAnalytics: 'Analytics',
    navSupport: 'Support',
    navSettings: 'Settings',

    // Sourcing Analytics Section
    sourcingCommandTitle: 'China Sourcing Command Center',
    sourcingCommandSubtitle: 'Real-time procurement velocity, warehouse receiving & consolidated freight',
    liveSyncTime: 'Live Synced (Bank of China)',
    sourcedVolume: 'Sourced Volume',
    escrowCommitted: 'Escrow Committed',
    ordersProcessed: 'Orders Processed',
    pendingActions: 'Action Needed',
    completedRate: 'Completed',
    inWarehouse: 'In Warehouse Hub',
    readyToConsolidate: 'Ready to Consolidate',
    totalWeight: 'Total Weight',
    fulfilledOrders: 'Fulfilled Orders',
    passedQc: 'Passed QC',
    inQcQueue: 'In QC Queue',
    hubCheckSummary: 'Passed 5-pt QC & boxed',
    sourcingVelocityTitle: 'Sourcing Velocity & PO Batches',
    sourcingVelocityDesc: '7-Day procurement volume & warehouse arrivals',
    liveFreightTitle: 'Live Cross-Border Freight',
    liveFreightDesc: 'Active international consolidated lines in transit',
    freightAirExpress: 'Air Express Priority',
    freightAirCargo: 'Air Cargo DDP',
    freightSeaMatson: 'Sea Freight Matson DDP',
    freightDeparted: 'Departed Hub',
    freightCustomsCleared: 'Customs Cleared',
    freightInTransit: 'In Flight / Transit',
    freightDelivered: 'Delivered',
    viewTracking: 'View Tracking',
    poUnit: 'POs',
    totalOrders: 'Total Orders',
    vsLastWeek: 'vs last week',
    all1688FactoryPos: 'All 1688 & factory POs',
    activeStatus: 'Active',
    returnsOrders: 'Returns Orders',
    returnsOrdersDesc: 'China QC rejects & seller refunds',
    escrow100: '100% Escrow',
    orderAnalysis: 'Order Analysis',
    reimbursedAmount: 'Reimbursed $5,133',
    reimbursedAmountRmb: '(¥37,200 RMB)',
    monthly: 'Monthly',
    weekly: 'Weekly',
    daily: 'Daily',
    line: 'Line',
    bar: 'Bar',
    fulfilledOrdersLegend: 'Fulfilled Orders (USD / RMB)',
    cancelQcReturnedLegend: 'Cancel / QC Returned',
    trackNewShipment: 'Track New Shipment',
    switchActiveParcel: 'Switch Active Parcel',
    copyWaybillId: 'Copy Waybill ID',
    currentConsignment: 'Current Consignment',
    inTransitBadge: 'IN TRANSIT',
    showing: 'Showing',
    ofWords: 'of',
    ordersWord: 'orders',
    showLess: 'Show Less (Collapse to 10)',
    viewMore: 'View More',
    remaining: 'remaining',
    thOrderId: 'Order ID',
    thProductSupplier: 'Product & Supplier',
    thAmountRmb: 'Amount (RMB)',
    thPickup: 'Pickup',
    thDelivery: 'Delivery',
    thEstDelivery: 'Est. Delivery',
    btnReviewProof: 'Review Proof',
    btnConsolidate: 'Consolidate',
    btnFixAddress: 'Fix Address',
    btnSeeMore: 'See more',
    btnAdvanceStage: '⚡ Advance Stage & QC Update',
    btnViewTimeline: 'View Order Timeline & Bin',
    btnInspectQcPhotos: 'Inspect QC Photos',
    btnDownloadInvoice: 'Download Invoice (RMB)',
    btnCopyTracking: 'Copy Tracking / Waybill',
    btnRequestRepack: 'Request Warehouse Repack',
    btnChatChinaAgent: 'Chat with China Agent',

    // Table Tabs & Filters
    tabAll: 'All Orders',
    tabActionRequired: 'Action Required',
    tabInTransit: 'In Transit',
    tabWarehouse: 'In Warehouse',
    tabCompleted: 'Completed',
    sortBy: 'Sort by',
    sortDateNewest: 'Date (Newest First)',
    sortDateOldest: 'Date (Oldest First)',
    sortPriceHigh: 'Value (Highest ¥)',
    sortPriceLow: 'Value (Lowest ¥)',
    sortWeightHigh: 'Weight (Heaviest kg)',
    sortWeightLow: 'Weight (Lightest kg)',
    sortOrderNum: 'Order Number',
    sortStatus: 'Status',
    searchNoResults: 'No orders found matching criteria',
    searchNoResultsDesc: 'Try adjusting your search query or switching tabs',
    clearFiltersBtn: 'Clear Search & Filters',

    // Multi-Select Bar
    selectedCount: 'selected for consolidation',
    selectAllReady: 'Select All Ready in Hub',
    clearSelection: 'Clear Selection',
    consolidateParcelsBtn: 'Consolidate & Ship Selected',

    // Table Headers
    thOrderInfo: 'Order # / Date',
    thItemSpec: 'Product & Specifications',
    thSupplier: 'Supplier & Platform',
    thQuantity: 'Quantity',
    thPrice: 'Price (RMB / USD)',
    thWarehouse: 'Warehouse Hub',
    thQcStatus: 'QC Status',
    thStatus: 'Procurement Status',
    thAction: 'Action',

    // Row Actions
    btnAuthorizePo: 'Authorize PO',
    btnApproveQc: 'Approve QC',
    btnReviewSpecs: 'Confirm Specs',
    btnVerifyAddress: 'Verify Address',
    btnPackConsolidate: 'Pack & Ship',
    btnTrackFreight: 'Live Tracking',
    btnInspectPhotos: 'Inspect QC',
    btnViewDetails: 'Details',
    btnAdvanceStatus: 'Next Step',
    btnRequestRefund: 'Request Refund',
    btnVisitSupplier: 'Visit Supplier',
    btnCopyOrder: 'Copy PO #',

    // Order Details Drawer
    drawerTitle: 'Order Details',
    drawerSubtitle: 'Complete sourcing specifications, QC photos & logistics history',
    specifications: 'Specifications',
    supplierDetails: 'Supplier & Marketplace',
    paymentEscrow: 'Payment & Escrow',
    qualityInspection: 'Quality Control Inspection',
    qc5PointCheck: '5-Point Inspection Checklist',
    qcPhotosCount: 'High-Res QC Photos',
    domesticTracking: 'China Domestic Freight',
    intlTracking: 'International Freight Tracking',
    timelineTitle: 'Sourcing & Fulfillment Timeline',
    copySuccess: 'Copied to clipboard',

    // Action Modal
    actionModalTitle: 'Action Required',
    actionModalSubtitle: 'Review and confirm the next step for this procurement order',
    authPoDesc: 'Supplier has confirmed unit pricing, batch MOQ, and domestic freight. Authorizing will lock the RMB funds in escrow and dispatch the agent to place the official factory order.',
    authPoWalletNotice: 'Will be deducted from your RMB Sourcing Wallet',
    authPoConfirmBtn: 'Authorize PO & Release Escrow',
    qcApprovalDesc: 'Review the 5-point quality inspection report and high-resolution photo proofs. Once approved, the item will be moved to the consolidation bay for international packing.',
    qcConfirmBtn: 'Approve QC & Move to Consolidation',
    qcRejectRefundBtn: 'Reject QC & Demand Full RMB Refund',
    specConfirmDesc: 'The factory has submitted physical customization sample photos and pantone color matches. Please confirm to proceed with bulk production.',
    specConfirmBtn: 'Confirm Customization Specs',
    addressConfirmDesc: 'Verify international destination address and tax ID for customs clearance documentation.',
    addressConfirmBtn: 'Confirm Address & Dispatch',
    cancelBtn: 'Cancel',

    // New Order Modal
    newOrderTitle: 'New Sourcing Purchase Order',
    newOrderSubtitle: 'Submit any 1688, Taobao, Weidian, or Factory Direct product link',
    pasteUrlLabel: 'Marketplace URL / Product Link',
    pasteUrlPlaceholder: 'Paste link from 1688.com, Taobao, Tmall, or Weidian...',
    fetchDetailsBtn: 'Auto-Fetch',
    itemTitleLabel: 'Product Title',
    itemTitlePlaceholder: 'e.g., Ceramic Pour-Over Matte Dripper & Carafe Sets',
    supplierNameLabel: 'Supplier / Factory Name',
    supplierPlatformLabel: 'Source Marketplace',
    quantityLabel: 'Quantity',
    unitPriceRmbLabel: 'Unit Price (¥ RMB)',
    categoryLabel: 'Category',
    destWarehouseLabel: 'Destination Warehouse Hub',
    sourcingNotesLabel: 'Sourcing & Inspection Notes',
    sourcingNotesPlaceholder: 'Specify color codes, packaging preferences, or QC focus areas...',
    submitOrderBtn: 'Create Purchase Order (Draft)',

    // Wallet Modal
    walletModalTitle: 'RMB Sourcing Wallet',
    walletModalSubtitle: 'Top up Chinese Yuan (¥ RMB) for supplier orders, QC, and international freight',
    availableBalance: 'Available Balance',
    lockedEscrow: 'Locked in Escrow',
    selectTopUpAmount: 'Select Top-Up Amount',
    customAmountPlaceholder: 'Custom RMB Amount (¥)',
    paymentMethod: 'Payment Channel',
    payWechat: 'WeChat Pay (微信支付)',
    payAlipay: 'Alipay (支付宝)',
    payBankCard: 'Bank Card / Instant Debit',
    payWireTransfer: 'International USD/EUR Wire (SWIFT)',
    escrowProtectionNotice: '100% Escrow Protection: Funds are only released to Chinese vendors after domestic warehouse check-in and passed QC inspection.',
    confirmTopUpBtn: 'Top Up RMB Balance',

    // Consolidation Drawer
    consolidationTitle: 'Consolidate & Ship Parcels',
    consolidationSubtitle: 'Combine multiple China warehouse packages into one consolidated international freight shipment',
    selectedParcelsList: 'Selected Packages for Consolidation',
    packagingOptions: 'Custom Packaging & Protection',
    bubbleWrapOpt: 'Multi-Layer Bubble Wrap',
    bubbleWrapDesc: 'Shock-absorbing protective wrap for fragile items',
    doubleBoxOpt: 'Heavy-Duty Double Carton',
    doubleBoxDesc: 'Reinforced outer corrugated carton for high-value cargo',
    waterproofOpt: 'Waterproof Vacuum Sealing',
    waterproofDesc: 'Moisture-proof vacuum film for apparel and electronics',
    shippingChannel: 'International Shipping Channel',
    estDelivery: 'Est. Delivery',
    shippingCalculation: 'Consolidated Freight Summary',
    subtotalGoods: 'Total Goods Value',
    freightCost: 'International Freight',
    packagingCost: 'Value-Added Packaging',
    totalFreightPayable: 'Total Payable (RMB)',
    confirmConsolidationBtn: 'Confirm Consolidation & Generate Air Waybill',

    // Photo Modal
    photoModalTitle: 'QC Photo Inspection Viewer',
    photoInspectionReport: '5-Point Warehouse Inspection Report (100% Resolution)',
    downloadPhoto: 'Download High-Res Photo',
    closeBtn: 'Close',

    // Warehouse Names
    whDongguan: 'Guangdong Hub (Dongguan)',
    whShenzhen: 'Shenzhen Central Hub',
    whYiwu: 'Yiwu Export Terminal',

    // Sourcing Platforms
    platform1688: '1688 Wholesale',
    platformTaobao: 'Taobao',
    platformWeidian: 'Weidian',
    platformFactory: 'Factory Direct',

    // Common UI words
    viewMoreOrders: 'View All Orders',
    collapseOrders: 'Show Fewer Orders',
    showingOrdersCount: 'Showing',
    justNow: 'Just now',
    languageToggle: '中文 / EN',
    of: 'of',
    orders: 'orders',
    availableToSpend: 'Available to Spend',
    activeEscrowLock: 'Active Escrow Lock',
    cancel: 'Cancel',
    close: 'Close',
    noOrdersMatch: 'No orders match the selected filter',
    trySwitchingTabs: 'Try switching tabs or adjusting search query',
    statusPaymentPending: 'Payment Pending',
    statusProofReview: 'Proof Review Required',
    statusAddressError: 'Address Confirmation Needed',
    statusNeedsAction: 'Action Required',
    statusReadyInHub: 'Ready in Hub',
    statusInTransit: 'In Transit',
    statusDelivered: 'Delivered',
    statusInProcess: 'In Process',
    tabAllOrders: 'All Sourcing Orders',
    tabWarehouseHub: 'Warehouse Hub',
    sort: 'Sort',
    sortAmountHigh: 'Amount (High to Low)',
    sortWeightHeavy: 'Weight (Heavy to Light)',
    sortOrderNumber: 'Order Number',
    orderId: 'Order ID',
    productSupplier: 'Product Spec & Supplier',
    amountRmb: 'Amount (RMB / USD)',
    pickup: 'Pickup / Hub',
    delivery: 'Delivery Destination',
    status: 'Status',
    action: 'Action',
    inspectQcPhotos: 'QC Photos',
    updatedPill: 'UPDATED',
    authorizePo: 'Authorize PO',
    reviewProof: 'Review Proof',
    consolidate: 'Consolidate',
    fixAddress: 'Fix Address',
    seeMore: 'More Options',
    advanceStageQc: 'Advance Lifecycle Stage / Pass QC',
    viewOrderTimelineBin: 'View Order Timeline & Warehouse Bin',
    downloadInvoiceRmb: 'Download Commercial Invoice (RMB/USD)',
    copyTrackingWaybill: 'Copy Tracking Waybill Number',
    requestWarehouseRepack: 'Request Special Repacking / Waterproofing',
    chatWithChinaAgent: 'Chat with Dedicated Sourcing Agent',
  },

  zh: {
    // Navigation & Header
    appTitle: 'PROC360 跨境采运',
    searchPlaceholder: '搜索订单号、运单号、供应商、品名规格...',
    searchBtn: '搜索',
    focusView: '专注模式',
    focusViewOn: '已开启',
    focusViewOff: '已关闭',
    focusViewTooltipEnter: '开启专注模式 (折叠上方统计图表，最大化订单操作空间)',
    focusViewTooltipExit: '退出专注模式 (恢复显示数据图表)',
    focusBannerTitle: '专注模式运行中',
    focusBannerDesc: '上方图表已自动折叠，方便批量处理采购订单',
    showAnalyticsBtn: '展开数据图表',
    account: '我的账户',
    help: '帮助与客服',
    merchantTier: '认证采购商 • 等级 4 优质买家',
    walletBalanceLabel: '采购钱包',
    vendorsSuppliers: '供应商管理',
    cargoWarehouses: '集运中转仓',
    analyticsReports: '采购数据报表',
    rmbWallet: '人民币采购资金账户',
    accountSettings: '系统设置',
    sourcingHelp: 'Proc360 采运服务支持',
    chinaBilingualAgents: '7x24小时 双语采购专员',
    chatWithAgent: '联系专属采购专员 (微信/在线)',
    currencyFxRates: '实时汇率行情 (中国银行)',
    escrowRefundTerms: '资金托管与退款保障条例',

    // TopBar
    sourcingFreightConsole: '中国供应链采运控制台',
    filteredBy: '筛选条件',
    fxSpotRate: '1 美元 (USD) = ¥7.2405 人民币 (RMB)',
    logisticsFeed: '采运实时动态',
    newCount: '条新消息',
    markAllRead: '全部已读',
    fundWalletBtn: '充值',
    exportBtn: '导出报表',
    placeOrderBtn: '新建采购单',

    // Navigation Menu Tabs
    navDashboard: '工作台',
    navOrders: '订单管理',
    navWarehouses: '集运仓库',
    navSourcing: '1688 选品',
    navFinance: '资金账户',
    navSuppliers: '供应商库',
    navAnalytics: '数据分析',
    navSupport: '在线客服',
    navSettings: '系统设置',

    // Sourcing Analytics Section
    sourcingCommandTitle: '中国供应链采购与集运指挥中心',
    sourcingCommandSubtitle: '实时跟踪 1688 / 淘宝采购进度、中转仓验货品控及国际拼箱干线物流',
    liveSyncTime: '实时同步 (中国银行外汇牌价)',
    sourcedVolume: '累计采购总额',
    escrowCommitted: '托管资金占用',
    ordersProcessed: '处理中采购单',
    pendingActions: '待处理事项',
    completedRate: '履约达成率',
    inWarehouse: '中转仓待发存货',
    readyToConsolidate: '可拼箱出库',
    totalWeight: '库存总重量',
    fulfilledOrders: '品控质检概况',
    passedQc: '质检合格',
    inQcQueue: '待质检/检验中',
    hubCheckSummary: '已完成 5 项品控拍照并封箱',
    sourcingVelocityTitle: '采购时效与批次流转',
    sourcingVelocityDesc: '近 7 天采购下单量、国内到仓及出库趋势',
    liveFreightTitle: '跨境干线物流在途跟踪',
    liveFreightDesc: '国际空运专线、海运 DDP 实时在途追踪',
    freightAirExpress: '国际特快专线 (DHL/FedEx)',
    freightAirCargo: '空运双清包税 (Air DDP)',
    freightSeaMatson: '美森快船海运 DDP',
    freightDeparted: '中转仓已出库',
    freightCustomsCleared: '出口海关已放行',
    freightInTransit: '国际干线在途 / 航班起飞',
    freightDelivered: '末端派送完成',
    viewTracking: '查看轨迹',
    poUnit: '单',
    totalOrders: '采购单总量',
    vsLastWeek: '比上周',
    all1688FactoryPos: '全量 1688 与工厂采购单',
    activeStatus: '实时运行',
    returnsOrders: '退货 / 次品订单',
    returnsOrdersDesc: '质检次品拦截与卖家全额退款',
    escrow100: '100% 担保金',
    orderAnalysis: '采购与履约走势分析',
    reimbursedAmount: '维权退款 $5,133',
    reimbursedAmountRmb: '(¥37,200 人民币)',
    monthly: '月度',
    weekly: '周度',
    daily: '日度',
    line: '折线图',
    bar: '柱状图',
    fulfilledOrdersLegend: '已完成履约 (美元 / 人民币)',
    cancelQcReturnedLegend: '取消 / 次品拦截退货',
    trackNewShipment: '实时跨境干线轨迹',
    switchActiveParcel: '切换在途运单',
    copyWaybillId: '复制国际运单号',
    currentConsignment: '当前跟踪运单',
    inTransitBadge: '国际干线在途',
    showing: '当前显示',
    ofWords: '/',
    ordersWord: '笔订单',
    showLess: '收起列表 (显示前10笔)',
    viewMore: '展开更多',
    remaining: '笔待展示',
    thOrderId: '采购单号',
    thProductSupplier: '商品品名与供应商',
    thAmountRmb: '采购货值 (¥)',
    thPickup: '货源产地',
    thDelivery: '中转仓/交付地',
    thEstDelivery: '预计到达',
    btnReviewProof: '审核打样',
    btnConsolidate: '申请集运',
    btnFixAddress: '修正地址',
    btnSeeMore: '查看详情',
    btnAdvanceStage: '⚡ 推进流转与质检更新',
    btnViewTimeline: '查看履约时间轴与仓位',
    btnInspectQcPhotos: '查验中转仓实拍照',
    btnDownloadInvoice: '下载采购发票与报关凭证',
    btnCopyTracking: '复制快递/国际运单号',
    btnRequestRepack: '申请仓库加固打包',
    btnChatChinaAgent: '联系中国专属买手',

    // Table Tabs & Filters
    tabAll: '全部订单',
    tabActionRequired: '需我处理',
    tabInTransit: '国内/国际在途',
    tabWarehouse: '中转仓待发',
    tabCompleted: '已交付完成',
    sortBy: '排序方式',
    sortDateNewest: '下单时间 (最新优先)',
    sortDateOldest: '下单时间 (最早优先)',
    sortPriceHigh: '金额 (最高 ¥ 优先)',
    sortPriceLow: '金额 (最低 ¥ 优先)',
    sortWeightHigh: '重量 (最重 kg 优先)',
    sortWeightLow: '重量 (最轻 kg 优先)',
    sortOrderNum: '订单编号',
    sortStatus: '订单状态',
    searchNoResults: '未找到匹配的采购订单',
    searchNoResultsDesc: '请尝试更换关键词，或切换上方标签筛选',
    clearFiltersBtn: '清除搜索与筛选',

    // Multi-Select Bar
    selectedCount: '个包裹已选择',
    selectAllReady: '勾选中转仓全部待发包裹',
    clearSelection: '取消勾选',
    consolidateParcelsBtn: '合并打包并申请国际发货',

    // Table Headers
    thOrderInfo: '采购单号 / 日期',
    thItemSpec: '商品名称与规格',
    thSupplier: '供应商与渠道',
    thQuantity: '采购数量',
    thPrice: '采购金额 (RMB / USD)',
    thWarehouse: '所在中转仓',
    thQcStatus: '品控质检',
    thStatus: '采运生命周期状态',
    thAction: '操作',

    // Row Actions
    btnAuthorizePo: '授权采购单 (放款)',
    btnApproveQc: '确认质检通过',
    btnReviewSpecs: '确认打样方案',
    btnVerifyAddress: '核对收货地址',
    btnPackConsolidate: '申请集运出库',
    btnTrackFreight: '物流实时轨迹',
    btnInspectPhotos: '查看高清验货照',
    btnViewDetails: '详情',
    btnAdvanceStatus: '流转状态',
    btnRequestRefund: '申请维权退款',
    btnVisitSupplier: '直达货源链接',
    btnCopyOrder: '复制采购单号',

    // Order Details Drawer
    drawerTitle: '采购单详情',
    drawerSubtitle: '完整的商品参数、品控实拍照片、国内快递及国际头程物流记录',
    specifications: '商品参数与定制要求',
    supplierDetails: '供应商与货源平台',
    paymentEscrow: '货款与托管账户明细',
    qualityInspection: '中转仓品控质检',
    qc5PointCheck: '5项深度品控检验清单',
    qcPhotosCount: '中转仓高清实拍照',
    domesticTracking: '国内快递轨迹',
    intlTracking: '国际干线物流轨迹',
    timelineTitle: '采运全流程时间轴',
    copySuccess: '已成功复制到剪贴板',

    // Action Modal
    actionModalTitle: '待处理业务确认',
    actionModalSubtitle: '请审核并确认该笔跨境采购订单的下一步操作',
    authPoDesc: '供应商已确认批发单价、起订量(MOQ)及国内快递运费。授权采购将自动从您的资金钱包划扣对应人民币进入担保交易，并指派驻华买手向工厂正式下单。',
    authPoWalletNotice: '将从您的人民币采购账户中扣除',
    authPoConfirmBtn: '确认授权采购并支付货款',
    qcApprovalDesc: '请仔细核对仓库验货员拍摄的高清多角度实拍图与质检报告。确认合格后商品将移至集运出库区待拼箱。',
    qcConfirmBtn: '确认质检合格，转入待发区',
    qcRejectRefundBtn: '质检不合格，申请供应商全额退款',
    specConfirmDesc: '工厂已上传大货产前打样实拍与潘通色号比对结果，请确认是否准予批量生产。',
    specConfirmBtn: '确认产前样规格无误',
    addressConfirmDesc: '请核实海外清关所用的最终收件地址及税号信息，以便仓库打印国际面单。',
    addressConfirmBtn: '确认收件地址并放行',
    cancelBtn: '取消',

    // New Order Modal
    newOrderTitle: '提交新采购需求单',
    newOrderSubtitle: '支持粘贴 1688、淘宝、天猫、微店或工厂直供商品链接',
    pasteUrlLabel: '商品货源链接',
    pasteUrlPlaceholder: '粘贴 1688.com、淘宝、微店等商品详情页链接...',
    fetchDetailsBtn: '一键抓取',
    itemTitleLabel: '商品品名',
    itemTitlePlaceholder: '例如：日式陶瓷手冲咖啡滤杯与分享壶套装',
    supplierNameLabel: '供应商 / 工厂名称',
    supplierPlatformLabel: '采购渠道',
    quantityLabel: '采购数量',
    unitPriceRmbLabel: '采购单价 (¥ 人民币)',
    categoryLabel: '商品类目',
    destWarehouseLabel: '指定国内中转仓',
    sourcingNotesLabel: '采购与验货特殊要求',
    sourcingNotesPlaceholder: '填写定制色号、加固包装要求或品控检验重点...',
    submitOrderBtn: '创建采购需求单 (草稿)',

    // Wallet Modal
    walletModalTitle: '人民币采购资金账户',
    walletModalSubtitle: '充值采购资金 (¥ RMB)，用于支付供应商货款、定制打样费及国际集运运费',
    availableBalance: '可用余额',
    lockedEscrow: '担保交易托管中',
    selectTopUpAmount: '选择充值金额',
    customAmountPlaceholder: '自定义充值金额 (¥)',
    paymentMethod: '支付方式',
    payWechat: '微信支付 (WeChat Pay)',
    payAlipay: '支付宝 (Alipay)',
    payBankCard: '国内/外银行卡快捷支付',
    payWireTransfer: '国际电汇 / SWIFT / ACH (美元/欧元)',
    escrowProtectionNotice: '100% 担保安全保障：采购资金将暂存于第三方监管账户，待中转仓完成实物验货品控且确认合格后，才会结算给中国供应商。如遇缺货或次品，全额原路退回。',
    confirmTopUpBtn: '确认充值并入账',

    // Consolidation Drawer
    consolidationTitle: '包裹合并集运出库',
    consolidationSubtitle: '将中转仓内多个已验货包裹合并打包装箱，降低国际头程与尾程运费',
    selectedParcelsList: '已选择待拼箱包裹',
    packagingOptions: '增值加固包装服务',
    bubbleWrapOpt: '多层气泡膜全包缓冲',
    bubbleWrapDesc: '适合易碎品、陶瓷及精密配件，防撞防摔',
    doubleBoxOpt: '加厚高硬度五层双瓦楞外箱',
    doubleBoxDesc: '适合高价值商品及重货，防外力挤压变形',
    waterproofOpt: '全密封防水防潮真空胶膜',
    waterproofDesc: '适合服装纺织品、皮具及电子产品防潮防雨',
    shippingChannel: '国际物流发货渠道',
    estDelivery: '预计时效',
    shippingCalculation: '集运运费预算明细',
    subtotalGoods: '货物总货值',
    freightCost: '国际干线运费',
    packagingCost: '定制加固打包费',
    totalFreightPayable: '集运运费总计 (RMB)',
    confirmConsolidationBtn: '确认合并打包并生成国际运单',

    // Photo Modal
    photoModalTitle: '中转仓品控实拍大图',
    photoInspectionReport: '5 项品控验货实拍照 (100% 原始高清分辨率)',
    downloadPhoto: '下载高清原图',
    closeBtn: '关闭',

    // Warehouse Names
    whDongguan: '广东集运仓 (东莞)',
    whShenzhen: '深圳中央出口仓',
    whYiwu: '义乌外贸集拼仓',

    // Sourcing Platforms
    platform1688: '1688 批发网',
    platformTaobao: '淘宝网',
    platformWeidian: '微店',
    platformFactory: '工厂直供',

    // Common UI words
    viewMoreOrders: '查看全部订单',
    collapseOrders: '收起部分订单',
    showingOrdersCount: '当前显示',
    justNow: '刚刚',
    languageToggle: '中文 / EN',
    of: '/',
    orders: '笔订单',
    availableToSpend: '可用采购余额',
    activeEscrowLock: '担保代管锁定义',
    cancel: '取消',
    close: '关闭',
    noOrdersMatch: '当前筛选条件下暂无订单',
    trySwitchingTabs: '请尝试切换筛选标签或清除搜索关键词',
    statusPaymentPending: '等待放款',
    statusProofReview: '打样待审核',
    statusAddressError: '清关地址待确认',
    statusNeedsAction: '待处理事项',
    statusReadyInHub: '中转仓就绪',
    statusInTransit: '运输在途',
    statusDelivered: '已签收',
    statusInProcess: '流转进行中',
    tabAllOrders: '全部直采订单',
    tabWarehouseHub: '集运中转仓',
    sort: '排序方式',
    sortAmountHigh: '金额 (从高到低)',
    sortWeightHeavy: '毛重 (从重到轻)',
    sortOrderNumber: '订单编号',
    orderId: '订单编号',
    productSupplier: '商品规格与源头工厂',
    amountRmb: '采购金额 (人民币/美元)',
    pickup: '提货/中转枢纽',
    delivery: '目的港/派送地址',
    status: '执行状态',
    action: '操作处理',
    inspectQcPhotos: '高清品控照片',
    updatedPill: '已更新',
    authorizePo: '授权放款下达PO',
    reviewProof: '审核打样实物',
    consolidate: '申请拼箱出库',
    fixAddress: '修改清关地址',
    seeMore: '更多快捷操作',
    advanceStageQc: '推进流转状态 / 标记品控通过',
    viewOrderTimelineBin: '查看物流节点与中转库位',
    downloadInvoiceRmb: '下载采购形式发票 (商业形式发票)',
    copyTrackingWaybill: '复制国内外物流运单号',
    requestWarehouseRepack: '申请仓库加固包装 / 防水打包',
    chatWithChinaAgent: '联系 1v1 驻华双语采购客服',
  },
};

// Helper dictionary for translating dynamic values in orders
export const orderTextTranslations: Record<string, { en: string; zh: string }> = {
  // Warehouses
  'Guangdong Hub (Dongguan)': { en: 'Guangdong Hub (Dongguan)', zh: '广东集运仓 (东莞)' },
  'Shenzhen Central Hub': { en: 'Shenzhen Central Hub', zh: '深圳中央出口仓' },
  'Yiwu Export Terminal': { en: 'Yiwu Export Terminal', zh: '义乌外贸集拼仓' },

  // Platforms
  '1688': { en: '1688', zh: '1688 批发网' },
  'Taobao': { en: 'Taobao', zh: '淘宝网' },
  'Weidian': { en: 'Weidian', zh: '微店' },
  'Factory Direct': { en: 'Factory Direct', zh: '工厂直供' },

  // Status Labels
  'PO Draft Created': { en: 'PO Draft Created', zh: '已生成采购草稿' },
  'Awaiting Payment': { en: 'Awaiting Payment', zh: '待授权支付' },
  'Payment Pending': { en: 'Payment Pending', zh: '等待放款授权' },
  'Customization Pending': { en: 'Customization Pending', zh: '待确认定制打样' },
  'Address Confirmation Needed': { en: 'Address Confirmation Needed', zh: '待确认清关地址' },
  'Ready to Consolidate': { en: 'Ready to Consolidate', zh: '中转仓待发 / 可拼箱' },
  'QC Passed & Ready': { en: 'QC Passed & Ready', zh: '质检合格 / 待出库' },
  'QC Passed & Cleared': { en: 'QC Passed & Cleared', zh: '质检已通过放行' },
  'QC Revision Required': { en: 'QC Revision Required', zh: '质检存疑 / 待复检' },
  'Supplier Communicating': { en: 'Supplier Communicating', zh: '与厂家沟通排单中' },
  'Domestic Transit (SF Express)': { en: 'Domestic Transit (SF Express)', zh: '国内顺丰速运在途' },
  'Domestic Transit (ZTO)': { en: 'Domestic Transit (ZTO)', zh: '国内中通快递在途' },
  'Received at Hub': { en: 'Received at Hub', zh: '中转仓已签收' },
  'In Inspection': { en: 'In Inspection', zh: '中转仓质检中' },
  'Ready in Hub': { en: 'Ready in Hub', zh: '中转仓就绪' },
  'Consolidated & In Transit': { en: 'Consolidated & In Transit', zh: '已拼箱出库 / 国际干线在途' },
  'In Transit (Air Express)': { en: 'In Transit (Air Express)', zh: '国际特快空运在途' },
  'In Transit (Air Cargo)': { en: 'In Transit (Air Cargo)', zh: '空运双清专线在途' },
  'In Transit (Sea DDP)': { en: 'In Transit (Sea DDP)', zh: '美森海运专线在途' },
  'Customs Clearance': { en: 'Customs Clearance', zh: '出口/进口海关清关中' },
  'Out for Delivery': { en: 'Out for Delivery', zh: '末端派送中' },
  'Delivered': { en: 'Delivered', zh: '已送达签收' },
  'Dispatched to Hub': { en: 'Dispatched to Hub', zh: '供应商已发货至中转仓' },
  'In Warehouse Hub': { en: 'In Warehouse Hub', zh: '存放在中转仓' },
  'Hub Processed': { en: 'Hub Processed', zh: '中转仓已处理' },

  // Units
  'sets': { en: 'sets', zh: '套' },
  'units': { en: 'units', zh: '件' },
  'pairs': { en: 'pairs', zh: '双' },
  'pcs': { en: 'pcs', zh: '个' },
  'rolls': { en: 'rolls', zh: '卷' },
  'boxes': { en: 'boxes', zh: '箱' },
};
