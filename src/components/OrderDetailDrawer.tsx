import React from 'react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  CreditCard, 
  Camera, 
  AlertTriangle, 
  ShieldAlert, 
  Truck, 
  Plane, 
  Ship, 
  Layers, 
  Copy, 
  Clock, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { OrderItem } from '../types';

interface OrderDetailDrawerProps {
  order: OrderItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenActionModal: (order: OrderItem) => void;
  onViewPhoto: (url: string, caption: string) => void;
  onConsolidateOrder: (order: OrderItem) => void;
  walletBalanceCNY: number;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  order,
  isOpen,
  onClose,
  onOpenActionModal,
  onViewPhoto,
  onConsolidateOrder,
  walletBalanceCNY,
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l border-slate-200 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center font-mono font-bold text-xs">
              #{order.orderNumber.replace('P360-', '')}
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                {order.supplierPlatform} • {order.category}
              </span>
              <h2 className="text-sm font-bold text-slate-900 line-clamp-1">
                {order.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close order details drawer"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs text-slate-700">
          {/* Urgent Action Banner if in NEEDS_ACTION */}
          {order.zone === 'NEEDS_ACTION' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Action Required
                </span>
                <span className="font-mono text-[11px] bg-amber-200/70 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                  {order.statusLabel}
                </span>
              </div>
              <p className="text-amber-800 text-xs leading-relaxed">
                {order.actionSummary}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (order.actionType === 'READY_TO_CONSOLIDATE') {
                    onConsolidateOrder(order);
                  } else {
                    onOpenActionModal(order);
                  }
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                {order.actionType === 'PAYMENT_PENDING' && <CreditCard className="w-4 h-4" />}
                {order.actionType === 'CUSTOMIZATION_CONFIRMATION' && <Camera className="w-4 h-4" />}
                {order.actionType === 'READY_TO_CONSOLIDATE' && <Layers className="w-4 h-4" />}
                <span>Resolve Action Now</span>
              </button>
            </div>
          )}

          {/* Product Overview Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex gap-4">
            <img
              src={order.thumbnail}
              alt=""
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('photo-1577937927133-66ef06acdf18')) {
                  target.src = 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=160&auto=format&fit=crop&q=80';
                }
              }}
              className="w-20 h-20 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm leading-snug">
                {order.title}
              </h3>
              <p className="text-slate-500 text-xs">
                Supplier: <span className="font-medium text-slate-800">{order.supplierName}</span>
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={order.supplierUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-slate-950 underline"
                >
                  <span>View 1688 / Factory Listing</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Sourcing & Logistics Specifications */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium">Batch Order Value</span>
              <p className="text-base font-bold font-mono text-slate-900 mt-0.5">
                ¥{order.priceRMB.toLocaleString()} RMB
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                (${order.priceUSD.toFixed(2)} USD)
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium">Quantity & Parcel Weight</span>
              <p className="text-base font-bold font-mono text-slate-900 mt-0.5">
                {order.quantity} {order.unit}
              </p>
              <p className="text-[11px] font-mono text-slate-500">
                {order.weightKg} kg gross
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium">Assigned Warehouse Hub</span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {order.warehouse}
              </p>
              {order.warehouseBin && (
                <p className="text-[11px] font-mono text-slate-500">
                  Bin: {order.warehouseBin}
                </p>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium">Current Status</span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {order.statusLabel}
              </p>
              <p className="text-[11px] text-slate-500">
                Updated {order.updatedAt}
              </p>
            </div>
          </div>

          {/* QC Inspection Photos if available */}
          {order.qcPhotos && order.qcPhotos.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-slate-500" /> High-Resolution Inspection Photos
                </h3>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Passed Warehouse QC
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {order.qcPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => onViewPhoto(photo.url, photo.caption)}
                    className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer aspect-square"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-semibold p-1 text-center">
                      View Full Res
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tracking Details */}
          {(order.domesticTracking || order.intlTracking) && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-slate-500" /> Active Tracking Waybills
              </h3>

              {order.domesticTracking && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Domestic China Courier (SF Express)</span>
                    <span className="font-mono font-bold text-slate-800">{order.domesticTracking.trackingNumber}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{order.domesticTracking.origin} → {order.domesticTracking.destination}</span>
                </div>
              )}

              {order.intlTracking && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">International Forwarding ({order.intlTracking.carrier})</span>
                    <span className="font-mono font-bold text-slate-800">{order.intlTracking.trackingNumber}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700">ETA: {order.intlTracking.etaDate}</span>
                </div>
              )}
            </div>
          )}

          {/* Timeline Milestones */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" /> Sourcing & Logistics Milestones
            </h3>

            <div className="space-y-4 relative pl-4 border-l border-slate-200 ml-2">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[21px] top-0.5 w-3 h-3 rounded-full border-2 ${
                      event.completed
                        ? 'bg-slate-950 border-slate-950'
                        : event.current
                        ? 'bg-amber-500 border-white ring-2 ring-amber-500'
                        : 'bg-white border-slate-300'
                    }`}
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${event.current ? 'text-amber-900' : 'text-slate-900'}`}>
                        {event.title}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{event.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Escrow ID: ESC-{order.id.slice(-6)}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
