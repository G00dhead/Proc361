import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { OrderItem } from '../types';
import { OrderRow } from './OrderRow';

interface InProgressZoneProps {
  orders: OrderItem[];
  selectedOrderIds: string[];
  onToggleSelect: (id: string) => void;
  onExecuteAction: (order: OrderItem) => void;
  onViewPhoto: (photoUrl: string, caption: string) => void;
}

export const InProgressZone: React.FC<InProgressZoneProps> = ({
  orders,
  selectedOrderIds,
  onToggleSelect,
  onExecuteAction,
  onViewPhoto,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeStageFilter, setActiveStageFilter] = useState<string>('ALL');

  const domesticTransitCount = orders.filter((o) => o.inProgressStage === 'DOMESTIC_TRANSIT').length;
  const warehouseQcCount = orders.filter((o) => o.inProgressStage === 'WAREHOUSE_RECEIVING_QC').length;
  const internationalTransitCount = orders.filter(
    (o) => o.inProgressStage === 'INTL_TRANSIT_AIR' || o.inProgressStage === 'INTL_TRANSIT_SEA' || o.inProgressStage === 'CUSTOMS_CLEARANCE'
  ).length;

  const filteredOrders = orders.filter((order) => {
    if (activeStageFilter === 'ALL') return true;
    if (activeStageFilter === 'DOMESTIC') return order.inProgressStage === 'DOMESTIC_TRANSIT';
    if (activeStageFilter === 'QC') return order.inProgressStage === 'WAREHOUSE_RECEIVING_QC';
    if (activeStageFilter === 'INTL')
      return order.inProgressStage === 'INTL_TRANSIT_AIR' || order.inProgressStage === 'INTL_TRANSIT_SEA' || order.inProgressStage === 'CUSTOMS_CLEARANCE' || order.inProgressStage === 'OUT_FOR_DELIVERY';
    if (activeStageFilter === 'SOURCING') return order.inProgressStage === 'SOURCING_COMMUNICATING';
    return true;
  });

  return (
    <section className="space-y-2.5 pt-1" id="in-progress-zone">
      {/* Informational Header */}
      <div className="bg-[#0f1219] border border-slate-800 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-200">
                In Progress
              </h2>
              <span className="px-2 py-0.2 rounded text-xs font-mono font-medium bg-slate-800 text-slate-400 border border-slate-700">
                {orders.length} Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Informational only • Currently in domestic transit, warehouse check-in, or international flight/vessel
            </p>
          </div>
        </div>

        {/* Sub-stage Filter Tabs & Collapse */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveStageFilter('ALL')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeStageFilter === 'ALL'
                ? 'bg-slate-800 text-slate-100 border border-slate-700 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({orders.length})
          </button>

          {domesticTransitCount > 0 && (
            <button
              onClick={() => setActiveStageFilter('DOMESTIC')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeStageFilter === 'DOMESTIC'
                  ? 'bg-slate-800 text-slate-100 border border-slate-700 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Domestic Transit ({domesticTransitCount})
            </button>
          )}

          {warehouseQcCount > 0 && (
            <button
              onClick={() => setActiveStageFilter('QC')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeStageFilter === 'QC'
                  ? 'bg-slate-800 text-slate-100 border border-slate-700 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              QC & Receiving ({warehouseQcCount})
            </button>
          )}

          {internationalTransitCount > 0 && (
            <button
              onClick={() => setActiveStageFilter('INTL')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeStageFilter === 'INTL'
                  ? 'bg-slate-800 text-slate-100 border border-slate-700 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              International Transit ({internationalTransitCount})
            </button>
          )}

          <div className="h-3 w-px bg-slate-800 mx-1"></div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors"
            title={isCollapsed ? "Expand section" : "Collapse section"}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Orders List */}
      {!isCollapsed && (
        <div className="space-y-2">
          {filteredOrders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              isSelected={selectedOrderIds.includes(order.id)}
              onToggleSelect={onToggleSelect}
              onExecuteAction={onExecuteAction}
              onViewPhoto={onViewPhoto}
            />
          ))}
        </div>
      )}
    </section>
  );
};
