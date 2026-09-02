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
  "1688": { en: "1688", zh: "1688 批发网" },
  "Guangdong Hub (Dongguan)": { en: "Guangdong Hub (Dongguan)", zh: "广东集运仓 (东莞)" },
  "Shenzhen Central Hub": { en: "Shenzhen Central Hub", zh: "深圳中央出口仓" },
  "Yiwu Export Terminal": { en: "Yiwu Export Terminal", zh: "义乌外贸集拼仓" },
  "Guangdong Hub": { en: "Guangdong Hub", zh: "广东集运仓" },
  "Shenzhen Hub": { en: "Shenzhen Hub", zh: "深圳中央仓" },
  "Yiwu Hub": { en: "Yiwu Hub", zh: "义乌集拼仓" },
  "Taobao": { en: "Taobao", zh: "淘宝网" },
  "Weidian": { en: "Weidian", zh: "微店" },
  "Factory Direct": { en: "Factory Direct", zh: "工厂直供" },
  "PO Draft Created": { en: "PO Draft Created", zh: "已生成采购草稿" },
  "Awaiting Payment": { en: "Awaiting Payment", zh: "待授权支付" },
  "Payment Pending": { en: "Payment Pending", zh: "等待放款授权" },
  "Customization Pending": { en: "Customization Pending", zh: "待确认定制打样" },
  "Address Confirmation Needed": { en: "Address Confirmation Needed", zh: "待确认清关地址" },
  "Ready to Consolidate": { en: "Ready to Consolidate", zh: "中转仓待发 / 可拼箱" },
  "QC Passed & Ready": { en: "QC Passed & Ready", zh: "质检合格 / 待出库" },
  "QC Passed & Cleared": { en: "QC Passed & Cleared", zh: "质检已通过放行" },
  "QC Revision Required": { en: "QC Revision Required", zh: "质检存疑 / 待复检" },
  "Supplier Communicating": { en: "Supplier Communicating", zh: "与厂家沟通排单中" },
  "Domestic Transit (SF Express)": { en: "Domestic Transit (SF Express)", zh: "国内顺丰速运在途" },
  "Domestic Transit (ZTO)": { en: "Domestic Transit (ZTO)", zh: "国内中通快递在途" },
  "Received at Hub": { en: "Received at Hub", zh: "中转仓已签收" },
  "In Inspection": { en: "In Inspection", zh: "中转仓质检中" },
  "Ready in Hub": { en: "Ready in Hub", zh: "中转仓就绪" },
  "Consolidated & In Transit": { en: "Consolidated & In Transit", zh: "已拼箱出库 / 国际干线在途" },
  "In Transit (Air Express)": { en: "In Transit (Air Express)", zh: "国际特快空运在途" },
  "In Transit (Air Cargo)": { en: "In Transit (Air Cargo)", zh: "空运双清专线在途" },
  "In Transit (Sea DDP)": { en: "In Transit (Sea DDP)", zh: "美森海运专线在途" },
  "Customs Clearance": { en: "Customs Clearance", zh: "海关清关中" },
  "Out for Delivery": { en: "Out for Delivery", zh: "末端派送中" },
  "Delivered": { en: "Delivered", zh: "已送达签收" },
  "Dispatched to Hub": { en: "Dispatched to Hub", zh: "供应商已发货至中转仓" },
  "In Warehouse Hub": { en: "In Warehouse Hub", zh: "存放在中转仓" },
  "Hub Processed": { en: "Hub Processed", zh: "中转仓已处理" },
  "sets": { en: "sets", zh: "套" },
  "units": { en: "units", zh: "件" },
  "pairs": { en: "pairs", zh: "双" },
  "pcs": { en: "pcs", zh: "个" },
  "rolls": { en: "rolls", zh: "卷" },
  "boxes": { en: "boxes", zh: "箱" },
  "50x CNC Anodized Mechanical Keycap Sets (Space Grey / Silver)": { en: "50x CNC Anodized Mechanical Keycap Sets (Space Grey / Silver)", zh: "50套 阳极氧化CNC铝合金客制化机械键帽套装（深空灰 / 银色）" },
  "120x French Terry Blank Heavyweight Hoodies (450 GSM / Washed Black)": { en: "120x French Terry Blank Heavyweight Hoodies (450 GSM / Washed Black)", zh: "120件 法式毛圈重磅纯色连帽卫衣（450克 / 水洗复古黑）" },
  "300x Custom Debossed Matte Silicone MagSafe Cases (Forest Green & Obsidian)": { en: "300x Custom Debossed Matte Silicone MagSafe Cases (Forest Green & Obsidian)", zh: "300个 定制凹印Logo磨砂液态硅胶磁吸保护壳（森林绿 / 黑曜石）" },
  "25x Titanium Folding EDC Pocket Scalpel Blades (Grade 5 TC4 Titanium)": { en: "25x Titanium Folding EDC Pocket Scalpel Blades (Grade 5 TC4 Titanium)", zh: "25把 TC4钛合金折叠随身EDC便携小手术刀架（含备用刀片）" },
  "10x Industrial Grade Brushless Vacuum Motors (2200W High Static Pressure)": { en: "10x Industrial Grade Brushless Vacuum Motors (2200W High Static Pressure)", zh: "10台 工业级无刷吸尘真空电机（2200W大功率 / 高静压）" },
  "80x Ceramic Pour-Over Matte Dripper & Carafe Sets (Nordic Sandstone)": { en: "80x Ceramic Pour-Over Matte Dripper & Carafe Sets (Nordic Sandstone)", zh: "80套 哑光日式陶瓷手冲咖啡滤杯与分享壶套装（北欧砂岩灰）" },
  "200x Magnetic MagSafe Phone Stands (Foldable Matte Aluminum Alloy)": { en: "200x Magnetic MagSafe Phone Stands (Foldable Matte Aluminum Alloy)", zh: "200件 折叠磁吸桌面手机支架（哑光全铝合金 / 阻尼调节）" },
  "40x Precision Torx & Phillips Screwdriver Hardware Kits (S2 Steel 64-in-1)": { en: "40x Precision Torx & Phillips Screwdriver Hardware Kits (S2 Steel 64-in-1)", zh: "40套 S2高硬度合金钢64合1精密螺丝刀批头拆机工具套装" },
  "500x Double-Walled Stainless Steel Insulated Tumblers (Matte Powder Coated 750ml)": { en: "500x Double-Walled Stainless Steel Insulated Tumblers (Matte Powder Coated 750ml)", zh: "500只 双层304不锈钢真空保温杯（哑光喷塑 750ml）" },
  "60x RGB Desk Soundbars with Integrated USB-C 10Gbps Hub & DAC": { en: "60x RGB Desk Soundbars with Integrated USB-C 10Gbps Hub & DAC", zh: "60台 RGB电竞桌面条形音箱（集成USB-C 10Gbps拓展坞与HiFi解码）" },
  "150x Ergonomic Mesh Office Chairs (KD Knock-Down Flat Pack / BIFMA Certified)": { en: "150x Ergonomic Mesh Office Chairs (KD Knock-Down Flat Pack / BIFMA Certified)", zh: "150把 人体工学透气网布办公椅（拆装平板包装 / 通过BIFMA测试）" },
  "1,000x Biodegradable Custom Printed Kraft Mailer Bags (320 x 420mm)": { en: "1,000x Biodegradable Custom Printed Kraft Mailer Bags (320 x 420mm)", zh: "1,000个 全生物降解环保牛皮纸气泡快递信封袋（定制Logo 320x420mm）" },
  "75x Smart WiFi Ambient Table Lamps (Thread/Matter & Apple HomeKit)": { en: "75x Smart WiFi Ambient Table Lamps (Thread/Matter & Apple HomeKit)", zh: "75盏 智能氛围床头台灯（支持Matter/Thread协议与苹果HomeKit）" },
  "15x Optical Precision Laser Rangefinders (120m Outdoor High Contrast Display)": { en: "15x Optical Precision Laser Rangefinders (120m Outdoor High Contrast Display)", zh: "15台 光学高精度手持激光测距仪（120米量程 / 户外高亮反显大屏）" },
  "100x Fluoroelastomer (FKM) Quick-Release Watch Straps (20mm / 22mm Assorted)": { en: "100x Fluoroelastomer (FKM) Quick-Release Watch Straps (20mm / 22mm Assorted)", zh: "100条 氟橡胶FKM快拆运动手表带（20mm / 22mm混装多色）" },
  "20x Prototype High-Torque NEMA 17 Stepper Motors with Integrated Planetary Gearbox": { en: "20x Prototype High-Torque NEMA 17 Stepper Motors with Integrated Planetary Gearbox", zh: "20台 NEMA 17大扭矩步进电机（集成精密行星减速箱 / 工业样机）" },
  "500x Matte Black Custom Zinc Alloy Carabiner Clips with Laser Engraved Logo": { en: "500x Matte Black Custom Zinc Alloy Carabiner Clips with Laser Engraved Logo", zh: "500个 哑光黑锌合金D型登山扣钥匙扣（激光雕刻定制Logo）" },
  "50x Bluetooth 5.3 Low Latency Audio Transmitter Modules (CSR8675 Chipset)": { en: "50x Bluetooth 5.3 Low Latency Audio Transmitter Modules (CSR8675 Chipset)", zh: "50套 蓝牙5.3低延迟无损音频发射模块（搭载CSR8675主控芯片）" },
  "300x Custom Thermal Insulated Stainless Steel Tumblers (500ml Powder Coat)": { en: "300x Custom Thermal Insulated Stainless Steel Tumblers (500ml Powder Coat)", zh: "300只 定制真空双层保温咖啡随行杯（500ml磨砂喷粉工艺）" },
  "1,000x Poly Mailer Bags with Custom Holographic Gradient Finish (10x13 in)": { en: "1,000x Poly Mailer Bags with Custom Holographic Gradient Finish (10x13 in)", zh: "1,000个 镭射炫彩渐变色快递包装袋（加厚防水 10x13英寸）" },
  "10x Industrial High-Precision Granite Surface Plates (400x400x100mm Grade 00)": { en: "10x Industrial High-Precision Granite Surface Plates (400x400x100mm Grade 00)", zh: "10块 工业00级高精度花岗石精密测量检验平板（400x400x100mm）" },
  "150x USB-C PD 65W GaN Fast Chargers with Foldable US/EU Prongs": { en: "150x USB-C PD 65W GaN Fast Chargers with Foldable US/EU Prongs", zh: "150只 氮化镓GaN 65W快充充电头（折叠插脚 / 双口PD快充）" },
  "80x CNC Machined 6061 Anodized Aluminium Smartphone Video Rigs": { en: "80x CNC Machined 6061 Anodized Aluminium Smartphone Video Rigs", zh: "80套 6061航空铝CNC精雕手机兔笼拓展摄像套件（阳极氧化黑）" },
  "200x Organic Bamboo Fiber Travel Coffee Cups (BPA Free, 400ml)": { en: "200x Organic Bamboo Fiber Travel Coffee Cups (BPA Free, 400ml)", zh: "200个 环保天然竹纤维便携随行咖啡杯（食品级不含BPA 400ml）" },
  "40x High-Precision Digital Torque Screwdrivers (0.05 - 1.2 Nm USB-C Rechargeable)": { en: "40x High-Precision Digital Torque Screwdrivers (0.05 - 1.2 Nm USB-C Rechargeable)", zh: "40套 高精度数显电动扭力螺丝刀（0.05-1.2Nm / Type-C锂电充电）" },
  "500x Custom Woven Jacquard Keychains with Steel Carabiner Clip": { en: "500x Custom Woven Jacquard Keychains with Steel Carabiner Clip", zh: "500条 提花高密织带个性刺绣钥匙扣挂件（配不锈钢快拆扣）" },
  "30x Ergonomic Dual-Monitor Gas Spring Arm Desk Mounts (Heavy Duty Aluminum)": { en: "30x Ergonomic Dual-Monitor Gas Spring Arm Desk Mounts (Heavy Duty Aluminum)", zh: "30套 铝合金双屏气压臂电脑显示器桌面支架（重型高承重机械臂）" },
  "1,000x Custom Silk Screened Drawstring Dust Bags for Luxury Handbags": { en: "1,000x Custom Silk Screened Drawstring Dust Bags for Luxury Handbags", zh: "1,000个 定制丝印Logo抽绳防尘收纳布袋（高支棉包袋保护套）" },
  "100x Ceramic Bearing 608RS for Inline Skates and Precision Gimbal Assemblies": { en: "100x Ceramic Bearing 608RS for Inline Skates and Precision Gimbal Assemblies", zh: "100套 608RS黑陶瓷高速精密微型轴承（滑轮/云台万向节专用）" },
  "25x Commercial Cold Brew Nitro Dispenser Keg Tap Systems (5L SS304)": { en: "25x Commercial Cold Brew Nitro Dispenser Keg Tap Systems (5L SS304)", zh: "25台 304不锈钢商用氮气冷萃咖啡打酒桶酿造系统（5升容量）" },
  "60x Wireless Magnetic Ergonomic Charging Docks (Tri-Fold 15W Qi2 Certification)": { en: "60x Wireless Magnetic Ergonomic Charging Docks (Tri-Fold 15W Qi2 Certification)", zh: "60台 三合一折叠磁吸无线充电底座（15W Qi2官方认证协议）" },
  "200x Premium Top-Grain Vegetable Tanned Leather Passport Wallets": { en: "200x Premium Top-Grain Vegetable Tanned Leather Passport Wallets", zh: "200件 头层植鞣牛皮手工护照夹多卡位收纳包（复古原色）" },
  "500x Stainless Steel M3/M4 Hex Socket Button Head Screws (Black Oxide Assortment)": { en: "500x Stainless Steel M3/M4 Hex Socket Button Head Screws (Black Oxide Assortment)", zh: "500盒 304不锈钢发黑内六角圆头机丝螺钉紧固件盒装（M3/M4全规格）" },
  "15x Customized CNC Titanium EDC Multi-tools with Bottle Opener & Pry Bar": { en: "15x Customized CNC Titanium EDC Multi-tools with Bottle Opener & Pry Bar", zh: "15把 定制CNC钛合金多功能EDC随身撬棍起子工具（开瓶开箱两用）" },
  "Electronics & Peripherals": { en: "Electronics & Peripherals", zh: "数码电子与电脑外设" },
  "Apparel & Textiles": { en: "Apparel & Textiles", zh: "服装服饰与纺织面料" },
  "Phone Accessories": { en: "Phone Accessories", zh: "数码手机配件" },
  "Outdoor & Tools": { en: "Outdoor & Tools", zh: "户外装备与随身工具" },
  "Machinery & Parts": { en: "Machinery & Parts", zh: "机械设备与工业配件" },
  "Home & Kitchen": { en: "Home & Kitchen", zh: "家居日用与精品厨具" },
  "Tools & Hardware": { en: "Tools & Hardware", zh: "五金工具与机械紧固件" },
  "Kitchenware & Drinkware": { en: "Kitchenware & Drinkware", zh: "水具水杯与厨房用品" },
  "Electronics & Audio": { en: "Electronics & Audio", zh: "数码影音与电脑周边" },
  "Furniture & Office": { en: "Furniture & Office", zh: "办公家具与商业设施" },
  "Packaging & Supplies": { en: "Packaging & Supplies", zh: "包装耗材与电商物流袋" },
  "Smart Home & Lighting": { en: "Smart Home & Lighting", zh: "智能家居与商业照明" },
  "Measuring Instruments": { en: "Measuring Instruments", zh: "测量仪器与工业测控" },
  "Watch & Accessories": { en: "Watch & Accessories", zh: "钟表配件与潮流腕带" },
  "Hardware & EDC": { en: "Hardware & EDC", zh: "五金配件与随身挂扣" },
  "Electronics": { en: "Electronics", zh: "数码电子与核心元器件" },
  "Drinkware & Home": { en: "Drinkware & Home", zh: "水具水杯与家居生活" },
  "Packaging": { en: "Packaging", zh: "包装耗材与电商耗品" },
  "Machinery & Tools": { en: "Machinery & Tools", zh: "工业母机与量具工装" },
  "Electronics & Power": { en: "Electronics & Power", zh: "数码配件与快充电源" },
  "Photography & Rigging": { en: "Photography & Rigging", zh: "摄影器材与专业配件" },
  "Eco Products": { en: "Eco Products", zh: "绿色环保与降解餐具" },
  "Tools & Electronics": { en: "Tools & Electronics", zh: "智能工具与电子仪器" },
  "Apparel Accessories": { en: "Apparel Accessories", zh: "服饰箱包与潮流挂饰" },
  "Office & Furniture": { en: "Office & Furniture", zh: "人体工学与办公设备" },
  "Packaging & Bags": { en: "Packaging & Bags", zh: "包装耗材与高档布袋" },
  "Hardware & Bearings": { en: "Hardware & Bearings", zh: "精密轴承与机械传动" },
  "Kitchen & Beverage": { en: "Kitchen & Beverage", zh: "商用厨饮与咖啡设备" },
  "Leather Goods": { en: "Leather Goods", zh: "皮具皮件与手工皮件" },
  "Fasteners & Hardware": { en: "Fasteners & Hardware", zh: "五金紧固件与标准螺钉" },
  "EDC & Titanium": { en: "EDC & Titanium", zh: "钛合金EDC与随身工具" },
  "Sourced Goods": { en: "Sourced Goods", zh: "直采定制商品" },
  "Dongguan Kechuang Precision Hardware Co.": { en: "Dongguan Kechuang Precision Hardware Co.", zh: "东莞市科创精密五金配件有限公司" },
  "Yiwu Zhiyuan Garment Factory": { en: "Yiwu Zhiyuan Garment Factory", zh: "义乌市智源制衣厂" },
  "Shenzhen Apex Silicone Mold Co.": { en: "Shenzhen Apex Silicone Mold Co.", zh: "深圳市极峰硅胶模具有限公司" },
  "Yangjiang Victor Edge Hardware Ltd.": { en: "Yangjiang Victor Edge Hardware Ltd.", zh: "阳江市锋胜五金刀剪制造有限公司" },
  "Suzhou Precision Electromechanical Co.": { en: "Suzhou Precision Electromechanical Co.", zh: "苏州市精工机电设备制造有限公司" },
  "Chaozhou Jingde Ceramic Studio": { en: "Chaozhou Jingde Ceramic Studio", zh: "潮州市景德陶瓷工艺制作工坊" },
  "Shenzhen Baseqi Electronics Co.": { en: "Shenzhen Baseqi Electronics Co.", zh: "深圳市倍思奇数码电子有限公司" },
  "Yiwu Great Precision Tool Ltd.": { en: "Yiwu Great Precision Tool Ltd.", zh: "义乌市大精工量具刃具有限公司" },
  "Yongkang Super Drinkware Tech": { en: "Yongkang Super Drinkware Tech", zh: "永康市超胜不锈钢杯业科技有限公司" },
  "Shenzhen SoundPulse Electronics Co.": { en: "Shenzhen SoundPulse Electronics Co.", zh: "深圳市声脉声学电子科技有限公司" },
  "Foshan Master Ergonomics Industry Ltd.": { en: "Foshan Master Ergonomics Industry Ltd.", zh: "佛山市美斯特工学家具实业有限公司" },
  "Wenzhou Greenpack Printing Co.": { en: "Wenzhou Greenpack Printing Co.", zh: "温州市绿包环保包装印务有限公司" },
  "Zhongshan Brilliant Lighting Tech": { en: "Zhongshan Brilliant Lighting Tech", zh: "中山市明辉光电照明科技有限公司" },
  "Changzhou Mileseey Optics Co.": { en: "Changzhou Mileseey Optics Co.", zh: "常州市迈测光学仪器制造有限公司" },
  "Shenzhen Kaiyue Silicone Moulds": { en: "Shenzhen Kaiyue Silicone Moulds", zh: "深圳市凯跃硅胶精密模具有限公司" },
  "Changzhou StepperOnline Tech": { en: "Changzhou StepperOnline Tech", zh: "常州市步进智造机电科技有限公司" },
  "Yiwu Jinyang Metal Crafts": { en: "Yiwu Jinyang Metal Crafts", zh: "义乌市金阳五金工艺礼品厂" },
  "Shenzhen Feasycom Technology": { en: "Shenzhen Feasycom Technology", zh: "深圳市飞易通智能科技有限公司" },
  "Yongkang Kingteam Drinkware Co.": { en: "Yongkang Kingteam Drinkware Co.", zh: "永康市金廷日用品制造有限公司" },
  "Dongguan Chuangxin Packing Materials": { en: "Dongguan Chuangxin Packing Materials", zh: "东莞市创鑫包装材料实业有限公司" },
  "Jinan Jinpu Granite Tools": { en: "Jinan Jinpu Granite Tools", zh: "济南金普花岗石精密量具厂" },
  "Shenzhen Baseus GaN Tech": { en: "Shenzhen Baseus GaN Tech", zh: "深圳市倍思智造科技有限公司" },
  "Shenzhen SmallRig Precision": { en: "Shenzhen SmallRig Precision", zh: "深圳市斯莫格精密摄影器材制造厂" },
  "Ningbo EcoBrite Tableware": { en: "Ningbo EcoBrite Tableware", zh: "宁波市绿辉环保家居用品制造有限公司" },
  "Dongguan Wowstick Precision Tools": { en: "Dongguan Wowstick Precision Tools", zh: "东莞市唯思科技工具有限公司" },
  "Dongguan Haolong Ribbon Weaving": { en: "Dongguan Haolong Ribbon Weaving", zh: "东莞市浩隆织带实业有限公司" },
  "Foshan Fitueyes Ergonomics": { en: "Foshan Fitueyes Ergonomics", zh: "佛山市菲特人体工学科技有限公司" },
  "Yiwu Shengqi Packaging": { en: "Yiwu Shengqi Packaging", zh: "义乌市圣奇包装制品有限公司" },
  "Cixi City Hengkang Bearing Factory": { en: "Cixi City Hengkang Bearing Factory", zh: "慈溪市恒康精密微型轴承厂" },
  "Ningbo Sinobrew Technology": { en: "Ningbo Sinobrew Technology", zh: "宁波市华啤酿造设备科技有限公司" },
  "Shenzhen BaseLink Smart Tech": { en: "Shenzhen BaseLink Smart Tech", zh: "深圳市倍联智造科技有限公司" },
  "Guangzhou Baili Leather Crafts": { en: "Guangzhou Baili Leather Crafts", zh: "广州市百丽皮革工艺品制造有限公司" },
  "Dongguan Meijun Hardware Screws": { en: "Dongguan Meijun Hardware Screws", zh: "东莞市美骏高强度精密螺丝厂" },
  "Baoji Titanium Machining Works": { en: "Baoji Titanium Machining Works", zh: "宝鸡市钛精工机械加工制造工坊" },
  "Authorize ¥3,450.00 RMB to lock supplier factory batch": { en: "Authorize ¥3,450.00 RMB to lock supplier factory batch", zh: "授权放款 ¥3,450.00 人民币锁定源头工厂生产批次" },
  "Arrived: Guangdong Hub (Bay D-12) — 48.5 kg • Ready to Consolidate": { en: "Arrived: Guangdong Hub (Bay D-12) — 48.5 kg • Ready to Consolidate", zh: "已送达广东集运仓 (库位 D-12) — 48.5 kg • 可申请拼箱出库" },
  "Factory uploaded sample logo proof — requires your approval": { en: "Factory uploaded sample logo proof — requires your approval", zh: "厂家已上传打样Logo实物图 — 等待您的审核确认" },
  "Arrived: Shenzhen Central Hub (Bay A-04) — 3.2 kg • Ready to Consolidate": { en: "Arrived: Shenzhen Central Hub (Bay A-04) — 3.2 kg • Ready to Consolidate", zh: "已送达深圳中央仓 (库位 A-04) — 3.2 kg • 可申请拼箱出库" },
  "Destination HS Code & commercial tax ID format mismatch for customs declaration": { en: "Destination HS Code & commercial tax ID format mismatch for customs declaration", zh: "出口海关HS编码与目的国商业税号格式不匹配，需补全清关资料" },
  "Inspector flagged 4 pcs with minor glaze pinhole — select refund or free factory swap": { en: "Inspector flagged 4 pcs with minor glaze pinhole — select refund or free factory swap", zh: "质检员发现4件微小釉面气孔瑕疵 — 请选择退款或厂家免费换新" },
  "Arrived: Shenzhen Central Hub (Bay B-09) — 14.8 kg • Ready to Consolidate": { en: "Arrived: Shenzhen Central Hub (Bay B-09) — 14.8 kg • Ready to Consolidate", zh: "已送达深圳中央仓 (库位 B-09) — 14.8 kg • 可申请拼箱出库" },
  "ETA Tomorrow at Yiwu Terminal • SF Express #SF39104820194 (Dispatched from Hangzhou)": { en: "ETA Tomorrow at Yiwu Terminal • SF Express #SF39104820194 (Dispatched from Hangzhou)", zh: "预计明日送达义乌集拼仓 • 顺丰速运 #SF39104820194 (杭州已发货)" },
  "In Flight: Air China Cargo CZ452 to LAX • ETA Aug 27 (2 Days)": { en: "In Flight: Air China Cargo CZ452 to LAX • ETA Aug 27 (2 Days)", zh: "航班在空中：国航货运 CZ452 飞往洛杉矶 • 预计8月27日到达 (2天)" },
  "Docked at Shenzhen Hub 25m ago • Technicians testing USB-C power delivery & taking photos": { en: "Docked at Shenzhen Hub 25m ago • Technicians testing USB-C power delivery & taking photos", zh: "25分钟前已运抵深圳中央仓 • 质检员正在实测USB-C供电并拍摄高清品控图" },
  "Matson CLX Vessel MV-Manukai • Pacific Ocean • ETA Long Beach in 11 Days": { en: "Matson CLX Vessel MV-Manukai • Pacific Ocean • ETA Long Beach in 11 Days", zh: "美森快船 MV-Manukai • 跨越太平洋 • 预计11天后抵达长滩港" },
  "Proc360 Agent negotiating 12% bulk tier discount with factory manager": { en: "Proc360 Agent negotiating 12% bulk tier discount with factory manager", zh: "Proc360 驻华采购代表正与工厂厂长协商12%的大货阶梯折扣" },
  "ZTO Express #ZTO78201948 • Jiangsu to Shenzhen Hub (ETA Tomorrow)": { en: "ZTO Express #ZTO78201948 • Jiangsu to Shenzhen Hub (ETA Tomorrow)", zh: "中通快递 #ZTO78201948 • 江苏发往深圳中央仓 (预计明日送达)" },
  "Cleared Customs • UPS Express #1Z9999999999999 • On delivery truck today (ETA by 6 PM)": { en: "Cleared Customs • UPS Express #1Z9999999999999 • On delivery truck today (ETA by 6 PM)", zh: "清关完成 • UPS特快 #1Z9999999999999 • 今日末端派送中 (预计18:00前)" },
  "Factory checking gear backlash tolerance (<15 arcmin) before accepting PO": { en: "Factory checking gear backlash tolerance (<15 arcmin) before accepting PO", zh: "厂家正在复核齿轮传动齿隙公差 (<15弧分) 以确认正式排产" },
  "Checked in at Yiwu Hub (Bay C-09) • Laser engraving sample verified • Ready to pack": { en: "Checked in at Yiwu Hub (Bay C-09) • Laser engraving sample verified • Ready to pack", zh: "已入库义乌集拼仓 (库位 C-09) • 激光雕刻样品已核对 • 待申请转运" },
  "Departed HK International Airport via Cathay Cargo CX884 to Frankfurt Hub": { en: "Departed HK International Airport via Cathay Cargo CX884 to Frankfurt Hub", zh: "国泰货运 CX884 已从香港国际机场起飞 • 飞往法兰克福货运枢纽" },
  "Vessel EVER GIVEN Voyage 042E en route to Port of Long Beach (Container #TEMU9182)": { en: "Vessel EVER GIVEN Voyage 042E en route to Port of Long Beach (Container #TEMU9182)", zh: "长赐轮 EVER GIVEN 航次 042E 驶往长滩港 (集装箱号 #TEMU9182)" },
  "Arrived at Dongguan Hub (Bay A-03) • Adhesive strip tensile test passed • Ready to consolidate": { en: "Arrived at Dongguan Hub (Bay A-03) • Adhesive strip tensile test passed • Ready to consolidate", zh: "已送达广东东莞集运仓 (库位 A-03) • 封箱胶条拉力测试通过 • 待合并集运" },
  "Shipped via De邦 Heavy Trucking (Tracking: DP81920491) • Palletized with fumigated timber": { en: "Shipped via De邦 Heavy Trucking (Tracking: DP81920491) • Palletized with fumigated timber", zh: "德邦重货专线在途 (运单号: DP81920491) • 采用实木熏蒸托盘打托" },
  "Cleared US Customs • DHL Express #9182048192 • Arriving today before 5:00 PM": { en: "Cleared US Customs • DHL Express #9182048192 • Arriving today before 5:00 PM", zh: "美国海关清关完毕 • DHL 特快 #9182048192 • 今日 17:00 前派送到门" },
  "Arrived at Shenzhen Hub (Bay B-04) • Scratch-free anodization QC passed • Ready to bundle": { en: "Arrived at Shenzhen Hub (Bay B-04) • Scratch-free anodization QC passed • Ready to bundle", zh: "已送达深圳中央仓 (库位 B-04) • 阳极氧化表面无划痕全检通过 • 待出库" },
  "In transit via SF Express #SF1928401928 • En route Ningbo to Yiwu Hub": { en: "In transit via SF Express #SF1928401928 • En route Ningbo to Yiwu Hub", zh: "顺丰速运在途 #SF1928401928 • 宁波发往义乌外贸集拼仓" },
  "Flown via Air Cargo DDP • Arrived at Amsterdam Schiphol AMS hub for clearance": { en: "Flown via Air Cargo DDP • Arrived at Amsterdam Schiphol AMS hub for clearance", zh: "空运双清DDP专线 • 航班已降落阿姆斯特丹史基浦枢纽清关" },
  "Arrived at Dongguan Hub (Bay D-01) • Thread count & logo alignment approved • Ready to bundle": { en: "Arrived at Dongguan Hub (Bay D-01) • Thread count & logo alignment approved • Ready to bundle", zh: "已送达广东集运仓 (库位 D-01) • 织物密度与Logo对齐已核验 • 可拼箱" },
  "Matson CLX Vessel M/V MANUKAI • Pacific ocean lane 4 • ETA Long Beach: 05 Sep": { en: "Matson CLX Vessel M/V MANUKAI • Pacific ocean lane 4 • ETA Long Beach: 05 Sep", zh: "美森快船 M/V MANUKAI • 太平洋4号航线 • 预计9月5日抵达长滩港" },
  "Delivered to client warehouse in Brooklyn, NY • Signed by J. Martinez": { en: "Delivered to client warehouse in Brooklyn, NY • Signed by J. Martinez", zh: "已送达客户位于纽约布鲁克林的仓库 • J. Martinez 签收" },
  "Arrived at Yiwu Hub (Bay B-11) • Free spin resistance test passed • Ready to ship": { en: "Arrived at Yiwu Hub (Bay B-11) • Free spin resistance test passed • Ready to ship", zh: "已送达义乌集拼仓 (库位 B-11) • 轴承空转阻力测试达标 • 可转运出库" },
  "Departed Shenzhen Airport via UPS Express • In customs transit at Anchorage ANC": { en: "Departed Shenzhen Airport via UPS Express • In customs transit at Anchorage ANC", zh: "UPS特快已飞离深圳机场 • 正在美国安克雷奇枢纽进行转关" },
  "Arrived at Shenzhen Hub (Bay E-04) • Qi2 charging speed testing verified on iPhone & Android": { en: "Arrived at Shenzhen Hub (Bay E-04) • Qi2 charging speed testing verified on iPhone & Android", zh: "已送达深圳中央仓 (库位 E-04) • Qi2无线快充已完成双系统实测 • 待出库" },
  "In transit via SF Express #SF9182049182 • En route Guangzhou to Dongguan Hub": { en: "In transit via SF Express #SF9182049182 • En route Guangzhou to Dongguan Hub", zh: "顺丰速运在途 #SF9182049182 • 广州发往广东东莞集运仓" },
  "Arrived at Dongguan Hub (Bay A-14) • Thread pitch gauge verified • Ready to bundle": { en: "Arrived at Dongguan Hub (Bay A-14) • Thread pitch gauge verified • Ready to bundle", zh: "已送达广东集运仓 (库位 A-14) • 螺牙通止规抽检全数达标 • 可拼箱" },
  "Delivered via DHL Express to Seattle, WA • Front porch dropoff confirmed": { en: "Delivered via DHL Express to Seattle, WA • Front porch dropoff confirmed", zh: "DHL 国际特快已送达华盛顿州西雅图 • 门廊安全交付已确认" },
  "Sourcing Request Placed": { en: "Sourcing Request Placed", zh: "已提交采买需求" },
  "Supplier Stock & MOQ Verified": { en: "Supplier Stock & MOQ Verified", zh: "供应商库存与起订量已核实" },
  "RMB Payment Authorization": { en: "RMB Payment Authorization", zh: "等待授权人民币代付" },
  "Domestic Dispatch to Shenzhen Hub": { en: "Domestic Dispatch to Shenzhen Hub", zh: "国内发货至深圳中央仓" },
  "Order Sourced & Paid": { en: "Order Sourced & Paid", zh: "采购单已下达并完成结算" },
  "Factory Dispatched via ZTO": { en: "Factory Dispatched via ZTO", zh: "工厂已通过中通快递发货" },
  "Received at Dongguan Virtual Hub": { en: "Received at Dongguan Virtual Hub", zh: "广东东莞集运仓已收货录入" },
  "HD Photographic QC Inspection Passed": { en: "HD Photographic QC Inspection Passed", zh: "高清实物摄影品控质检已通过" },
  "Awaiting Shipment Consolidation": { en: "Awaiting Shipment Consolidation", zh: "等待申请国际拼箱出库" },
  "Custom Tooling Spec Submitted": { en: "Custom Tooling Spec Submitted", zh: "定制模具工程规格书已提交" },
  "Tooling CNC & Sample Injected": { en: "Tooling CNC & Sample Injected", zh: "模具CNC加工并完成首件注塑" },
  "High-Res Sample Proof Uploaded": { en: "High-Res Sample Proof Uploaded", zh: "高保真打样实拍图已上传" },
  "Mass Production & Shenzhen Inbound": { en: "Mass Production & Shenzhen Inbound", zh: "批量生产并入库深圳中央仓" },
  "Sourced & Settled": { en: "Sourced & Settled", zh: "采购下单并结算扣款" },
  "In Transit from Yangjiang": { en: "In Transit from Yangjiang", zh: "阳江工厂国内发货在途" },
  "Warehouse QC Passed": { en: "Warehouse QC Passed", zh: "中转仓入库质检合格" },
  "Ready to Forward": { en: "Ready to Forward", zh: "仓储就绪，可申请转运" },
  "Consolidated & Shipped": { en: "Consolidated & Shipped", zh: "已拼箱完成并起运转运" },
  "Customs Clearance Completed": { en: "Customs Clearance Completed", zh: "海关查验清关完毕" },
  "Loaded on Local Courier Van": { en: "Loaded on Local Courier Van", zh: "末端派送车已装车" },
  "Specification Sheet Submitted": { en: "Specification Sheet Submitted", zh: "定制工程技术要求已提交" },
  "Engineering Feasibility Check": { en: "Engineering Feasibility Check", zh: "工厂工程可行性复核中" },
  "Factory Production Complete": { en: "Factory Production Complete", zh: "工厂批量生产完毕" },
  "Arrived at Yiwu Hub": { en: "Arrived at Yiwu Hub", zh: "已送达义乌外贸集拼仓" },
  "Dispatched to HK Cargo Apron": { en: "Dispatched to HK Cargo Apron", zh: "已运抵香港国际货运停机坪" },
  "Air Flight Departed": { en: "Air Flight Departed", zh: "国际空运航班已离港起飞" },
  "Container Loaded & Sealed": { en: "Container Loaded & Sealed", zh: "集装箱已完成装载封箱" },
  "Vessel in Open Ocean": { en: "Vessel in Open Ocean", zh: "远洋货轮跨洋航行中" },
  "Delivered by SF Express": { en: "Delivered by SF Express", zh: "顺丰速运派送入库签收" },
  "Palletized & Crated": { en: "Palletized & Crated", zh: "重型打托与木箱熏蒸封箱" },
  "Departed Shandong Freight Terminal": { en: "Departed Shandong Freight Terminal", zh: "已驶离山东货运枢纽站" },
  "Air Export Completed": { en: "Air Export Completed", zh: "空运出港报关已完成" },
  "With Local Delivery Courier": { en: "With Local Delivery Courier", zh: "当地快递员正进行末端派送" },
  "Intake Inspection Cleared": { en: "Intake Inspection Cleared", zh: "入库称重与点数核验通过" },
  "Picked Up by Courier": { en: "Picked Up by Courier", zh: "国内承运商已上门提货" },
  "In Transit to Yiwu Hub": { en: "In Transit to Yiwu Hub", zh: "国内发往义乌中转仓在途" },
  "Departed Shenzhen Airport": { en: "Departed Shenzhen Airport", zh: "国际货运航班已从深圳机场起飞" },
  "Landed at AMS Schiphol": { en: "Landed at AMS Schiphol", zh: "航班已降落阿姆斯特丹史基浦机场" },
  "Quality Inspection Approved": { en: "Quality Inspection Approved", zh: "5点式品质检测全数通过" },
  "Loaded at Shanghai Port": { en: "Loaded at Shanghai Port", zh: "美森快轮已在上海港完成装船" },
  "Mid-Pacific Crossing": { en: "Mid-Pacific Crossing", zh: "正在横渡中太平洋航道" },
  "Delivered & Signed": { en: "Delivered & Signed", zh: "已派送签收并归档凭单" },
  "Quality Passed": { en: "Quality Passed", zh: "品质检验合格放行" },
  "Departed SZX Terminal": { en: "Departed SZX Terminal", zh: "UPS国际航空包机已起飞" },
  "Arrived at ANC Transit Hub": { en: "Arrived at ANC Transit Hub", zh: "已抵达安克雷奇航空中转站" },
  "Dispatched from Factory": { en: "Dispatched from Factory", zh: "工厂已发货装车" },
  "In Transit": { en: "In Transit", zh: "干线在途运输中" },
  "Intake Completed": { en: "Intake Completed", zh: "扫码称重录入完成" },
  "Delivered to Recipient": { en: "Delivered to Recipient", zh: "已送达收件人手中" },
  "Laser Deboss Logo (Center Alignment 1.2mm depth)": { en: "Laser Deboss Logo (Center Alignment 1.2mm depth)", zh: "激光立体凹印Logo（居中对齐 深度1.2mm）" },
  "Master tool proofing complete. Please confirm logo kerning and micro-bevel texture before starting batch injection molding (300 units).": { en: "Master tool proofing complete. Please confirm logo kerning and micro-bevel texture before starting batch injection molding (300 units).", zh: "主模具首件打样已完成。请在批量注塑（300件）前确认Logo字间距与微倒角质感。" },
  "Ensure edges are flush with camera bump ring.": { en: "Ensure edges are flush with camera bump ring.", zh: "请确保边缘与镜头保护圈齐平贴合。" },
  "DHL Express DDP air customs requires valid US EIN / IRS Taxpayer ID for industrial motors valued over $500, or selection of standard Sea DDP freight.": { en: "DHL Express DDP air customs requires valid US EIN / IRS Taxpayer ID for industrial motors valued over $500, or selection of standard Sea DDP freight.", zh: "货值超过500美元的工业电机，DHL航空DDP清关需要有效的美国联邦企业税号 (EIN / IRS Taxpayer ID)，或选择标准美森海运DDP双清包税渠道。" },
};
