export type ZoneType = 'NEEDS_ACTION' | 'IN_PROGRESS' | 'COMPLETED';

export type ActionType =
  | 'PAYMENT_PENDING'
  | 'CUSTOMIZATION_CONFIRMATION'
  | 'ADDRESS_ISSUE'
  | 'READY_TO_CONSOLIDATE'
  | 'QC_REVISION';

export type InProgressStage =
  | 'SOURCING_COMMUNICATING'
  | 'DOMESTIC_TRANSIT'
  | 'WAREHOUSE_RECEIVING_QC'
  | 'PACKING_CONSOLIDATING'
  | 'INTL_TRANSIT_AIR'
  | 'INTL_TRANSIT_SEA'
  | 'CUSTOMS_CLEARANCE'
  | 'OUT_FOR_DELIVERY';

export interface TimelineEvent {
  title: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface QCPhoto {
  id: string;
  url: string;
  caption: string;
  timestamp: string;
  passed: boolean;
  notes?: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  title: string;
  category: string;
  supplierName: string;
  supplierPlatform: '1688' | 'Taobao' | 'Weidian' | 'Factory Direct';
  supplierUrl: string;
  thumbnail: string;
  quantity: number;
  unit: string;
  priceRMB: number;
  priceUSD: number;
  zone: ZoneType;
  actionType?: ActionType;
  inProgressStage?: InProgressStage;
  statusLabel: string;
  actionSummary: string; // The 1 clear next step or ETA
  warehouse: 'Guangdong Hub (Dongguan)' | 'Shenzhen Central Hub' | 'Yiwu Export Terminal';
  warehouseBin?: string;
  weightKg: number;
  dimensionsCm?: { length: number; width: number; height: number };
  qcPhotos?: QCPhoto[];
  customizationDetails?: {
    specType: string;
    samplePhotoUrl?: string;
    pantoneCode?: string;
    userNote?: string;
    factoryFeedback?: string;
  };
  addressDetails?: {
    currentAddress: string;
    issueDescription: string;
  };
  timeline: TimelineEvent[];
  domesticTracking?: {
    carrier: string;
    trackingNumber: string;
    origin: string;
    destination: string;
    currentLocation?: string;
  };
  intlTracking?: {
    carrier: string;
    trackingNumber: string;
    flightOrVessel?: string;
    etaDate: string;
  };
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface WalletState {
  balanceCNY: number;
  balanceUSD: number;
  lockedEscrowCNY: number;
  exchangeRate: number; // USD to CNY
  exchangeRateEur: number; // EUR to CNY
  lastUpdated: string;
}

export interface PackingOption {
  id: string;
  name: string;
  description: string;
  priceRMB: number;
  recommendedFor?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  type: 'AIR_EXPRESS' | 'AIR_CARGO' | 'SEA_DDP' | 'RAIL_EXPEDITED';
  durationDays: string;
  pricePerKgRMB: number;
  minWeightKg: number;
  customsIncluded: boolean;
  badge?: string;
}
