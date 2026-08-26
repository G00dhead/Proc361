import React from 'react';
import { 
  Search, 
  X, 
  Layers, 
  CheckSquare, 
  AlertCircle,
  Clock,
  Box
} from 'lucide-react';
import { ZoneType } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedZone: ZoneType | 'ALL' | 'READY_CONSOLIDATE';
  onZoneChange: (z: ZoneType | 'ALL' | 'READY_CONSOLIDATE') => void;
  selectedWarehouse: string;
  onWarehouseChange: (w: string) => void;
  selectedPlatform: string;
  onPlatformChange: (p: string) => void;
  sortBy: 'urgency' | 'value_desc' | 'weight_desc' | 'date_desc';
  onSortChange: (s: 'urgency' | 'value_desc' | 'weight_desc' | 'date_desc') => void;
  totalOrdersCount: number;
  needsActionCount: number;
  inProgressCount: number;
  readyToConsolidateCount: number;
  selectedOrderIds: string[];
  onSelectAllReadyToConsolidate: () => void;
  onClearSelection: () => void;
  onConsolidateSelected: () => void;
  selectedTotalWeight: number;
  selectedTotalRMB: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedZone,
  onZoneChange,
  selectedWarehouse,
  onWarehouseChange,
  selectedPlatform,
  onPlatformChange,
  sortBy,
  onSortChange,
  totalOrdersCount,
  needsActionCount,
  inProgressCount,
  readyToConsolidateCount,
  selectedOrderIds,
  onSelectAllReadyToConsolidate,
  onClearSelection,
  onConsolidateSelected,
  selectedTotalWeight,
  selectedTotalRMB,
}) => {
  return (
    <div className="space-y-2.5">
      {/* Primary Filter Strip */}
      <div className="bg-[#0f1219] border border-slate-800 rounded-xl p-2 sm:p-2.5 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2.5">
        {/* Left: Zone Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => onZoneChange('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              selectedZone === 'ALL'
                ? 'bg-slate-800 text-slate-100 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>All Active</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-900 text-slate-400 font-mono">
              {totalOrdersCount}
            </span>
          </button>

          {/* Needs Action Tab with warm amber highlight */}
          <button
            onClick={() => onZoneChange('NEEDS_ACTION')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              selectedZone === 'NEEDS_ACTION'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Needs Action</span>
            <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
              selectedZone === 'NEEDS_ACTION' ? 'bg-black/20 text-slate-950' : 'bg-amber-400/20 text-amber-300'
            }`}>
              {needsActionCount}
            </span>
          </button>

          <button
            onClick={() => onZoneChange('READY_CONSOLIDATE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              selectedZone === 'READY_CONSOLIDATE'
                ? 'bg-slate-800 text-slate-100 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Ready to Consolidate</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-900 text-slate-400 font-mono">
              {readyToConsolidateCount}
            </span>
          </button>

          <button
            onClick={() => onZoneChange('IN_PROGRESS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              selectedZone === 'IN_PROGRESS'
                ? 'bg-slate-800 text-slate-100 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>In Progress</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-900 text-slate-400 font-mono">
              {inProgressCount}
            </span>
          </button>
        </div>

        {/* Right: Search & Dropdown Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Order #, SKU, tracking, supplier..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-600 font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Warehouse Dropdown */}
          <select
            value={selectedWarehouse}
            onChange={(e) => onWarehouseChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-slate-600 cursor-pointer"
          >
            <option value="ALL">All Hubs (Dongguan, Shenzhen, Yiwu)</option>
            <option value="Guangdong Hub (Dongguan)">Guangdong Hub (Dongguan)</option>
            <option value="Shenzhen Central Hub">Shenzhen Central Hub</option>
            <option value="Yiwu Export Terminal">Yiwu Export Terminal</option>
          </select>

          {/* Platform Dropdown */}
          <select
            value={selectedPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-slate-600 cursor-pointer"
          >
            <option value="ALL">All Platforms (1688, Taobao, Factory)</option>
            <option value="1688">1688 Wholesale</option>
            <option value="Taobao">Taobao Small Batch</option>
            <option value="Factory Direct">Factory Direct RFQ</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-slate-600 cursor-pointer font-medium"
          >
            <option value="urgency">Sort: Needs Action First</option>
            <option value="value_desc">Sort: Value (High to Low)</option>
            <option value="weight_desc">Sort: Weight (Heavy to Light)</option>
            <option value="date_desc">Sort: Newest First</option>
          </select>
        </div>
      </div>

      {/* Batch Selection Ribbon */}
      {selectedOrderIds.length > 0 && (
        <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <CheckSquare className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-100 flex items-center gap-2">
                <span>{selectedOrderIds.length} Parcels Selected</span>
                <span className="text-slate-400 font-mono">({selectedTotalWeight.toFixed(1)} kg total)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Combined Goods Value: <span className="font-mono text-slate-300">¥{selectedTotalRMB.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearSelection}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={onConsolidateSelected}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Configure Shipping ({selectedOrderIds.length})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
