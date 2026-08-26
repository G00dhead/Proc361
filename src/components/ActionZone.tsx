import React from 'react';
import { AlertCircle, Box, Sparkles } from 'lucide-react';
import { OrderItem } from '../types';
import { OrderRow } from './OrderRow';

interface ActionZoneProps {
  orders: OrderItem[];
  selectedOrderIds: string[];
  onToggleSelect: (id: string) => void;
  onExecuteAction: (order: OrderItem) => void;
  onViewPhoto: (photoUrl: string, caption: string) => void;
  onSelectAllReadyToConsolidate: () => void;
  onConsolidateSelected: () => void;
}

export const ActionZone: React.FC<ActionZoneProps> = ({
  orders,
  selectedOrderIds,
  onToggleSelect,
  onExecuteAction,
  onViewPhoto,
  onSelectAllReadyToConsolidate,
  onConsolidateSelected,
}) => {
  const readyToConsolidateCount = orders.filter((o) => o.actionType === 'READY_TO_CONSOLIDATE').length;
  const totalActionValueRMB = orders.reduce((sum, o) => sum + o.priceRMB, 0);
  const totalActionWeightKg = orders.reduce((sum, o) => sum + o.weightKg, 0);

  if (orders.length === 0) {
    return (
      <section className="bg-[#0f1219] border border-slate-800 rounded-xl p-6 text-center">
        <div className="h-9 w-9 mx-auto rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-2">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-semibold text-slate-200">Zero Pending Actions</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          All orders are progressing smoothly through Chinese domestic transit, warehouse QC, or international carrier lines.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-2.5" id="needs-action-zone">
      {/* Zone Header: Clean, High-Contrast with Clear Amber Indicator */}
      <div className="bg-[#111520] border-l-2 border-l-amber-500 border-y border-r border-slate-800 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100">
                Needs Action
              </h2>
              <span className="px-2 py-0.2 rounded text-xs font-mono font-bold bg-amber-500 text-slate-950">
                {orders.length}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Decisions, payments, or arrived warehouse parcels requiring your sign-off
            </p>
          </div>
        </div>

        {/* Quick select & summary */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {readyToConsolidateCount > 0 && (
            <button
              onClick={onSelectAllReadyToConsolidate}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Quick select all parcels arrived at warehouse"
            >
              <Box className="w-3.5 h-3.5 text-amber-400" />
              <span>Select {readyToConsolidateCount} Ready to Consolidate</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
            <span>Total: ¥{totalActionValueRMB.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            <span>•</span>
            <span>{totalActionWeightKg.toFixed(1)} kg</span>
          </div>
        </div>
      </div>

      {/* Rows Container */}
      <div className="space-y-2">
        {orders.map((order) => (
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
    </section>
  );
};
