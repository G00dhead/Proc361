import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Clock, 
  AlertTriangle, 
  Camera, 
  Truck, 
  Box, 
  CreditCard, 
  Send,
  MapPin,
  Maximize2
} from 'lucide-react';
import { OrderItem } from '../types';

interface OrderRowProps {
  order: OrderItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onExecuteAction: (order: OrderItem) => void;
  onViewPhoto: (photoUrl: string, caption: string) => void;
}

export const OrderRow: React.FC<OrderRowProps> = ({
  order,
  isSelected,
  onToggleSelect,
  onExecuteAction,
  onViewPhoto,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isNeedsAction = order.zone === 'NEEDS_ACTION';
  const isReadyToConsolidate = order.actionType === 'READY_TO_CONSOLIDATE';

  // Action styling (Unified Warm Amber)
  const getActionBadge = () => {
    switch (order.actionType) {
      case 'PAYMENT_PENDING':
        return {
          btnText: `Pay ¥${order.priceRMB.toLocaleString()}`,
          btnColor: 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold',
        };
      case 'CUSTOMIZATION_CONFIRMATION':
        return {
          btnText: 'Review Sample Proof',
          btnColor: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
        };
      case 'ADDRESS_ISSUE':
        return {
          btnText: 'Provide Customs ID',
          btnColor: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
        };
      case 'QC_REVISION':
        return {
          btnText: 'Resolve QC Decision',
          btnColor: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
        };
      case 'READY_TO_CONSOLIDATE':
        return {
          btnText: isSelected ? '✓ Selected' : '+ Consolidate',
          btnColor: isSelected
            ? 'bg-slate-700 text-white font-medium'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium',
        };
      default:
        return {
          btnText: 'Take Action',
          btnColor: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
        };
    }
  };

  const actionStyle = getActionBadge();

  return (
    <div
      className={`border rounded-xl transition-colors duration-150 overflow-hidden ${
        isNeedsAction
          ? isSelected
            ? 'bg-[#141824] border-amber-500/60'
            : 'bg-[#10141e] hover:bg-[#131824] border-slate-800 hover:border-slate-700'
          : isSelected
          ? 'bg-slate-900 border-slate-700'
          : 'bg-[#0d1017] hover:bg-[#10141e] border-slate-800/80 hover:border-slate-700'
      }`}
    >
      {/* Compact Main Row */}
      <div className="p-3 sm:p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        {/* Left Column: Checkbox, Thumbnail, Title & Metadata */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Selection Checkbox */}
          <div className="pt-0.5 md:pt-0">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(order.id)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-slate-200 focus:ring-0 cursor-pointer"
              title={isReadyToConsolidate ? "Select for international consolidation" : "Select order"}
            />
          </div>

          {/* Thumbnail */}
          <div className="relative group/thumb shrink-0">
            <img
              src={order.thumbnail}
              alt={order.title}
              referrerPolicy="no-referrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover bg-slate-800 border border-slate-700 cursor-pointer"
              onClick={() => onViewPhoto(order.thumbnail, order.title)}
            />
            {order.qcPhotos && order.qcPhotos.length > 0 && (
              <span 
                className="absolute -bottom-1 -right-1 bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-mono font-medium px-1 rounded flex items-center gap-0.5"
                title={`${order.qcPhotos.length} Inspection Photos Available`}
              >
                <Camera className="w-2.5 h-2.5" /> {order.qcPhotos.length}
              </span>
            )}
          </div>

          {/* Product & Order Meta */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="font-mono text-xs font-bold text-slate-200 tracking-tight">
                {order.orderNumber}
              </span>
              
              {/* Neutral Platform Tag */}
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                {order.supplierPlatform}
              </span>

              <span className="text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-[200px]" title={order.supplierName}>
                {order.supplierName}
              </span>

              <a
                href={order.supplierUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-slate-300 transition-colors"
                title="View original Chinese product page"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h3 className="text-xs sm:text-sm font-medium text-slate-100 truncate pr-2" title={order.title}>
              {order.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 mt-1">
              <span className="font-mono text-slate-300">
                {order.quantity} {order.unit}
              </span>
              <span>•</span>
              <span className="font-mono font-semibold text-slate-200">
                ¥{order.priceRMB.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-slate-500 font-mono">
                (${order.priceUSD.toFixed(2)})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span className="truncate max-w-[120px]">{order.warehouse.replace(' Central Hub', '').replace(' Export Terminal', '')}</span>
                {order.warehouseBin && <span className="font-mono text-slate-400 text-[10px]">({order.warehouseBin})</span>}
              </span>
              <span>•</span>
              <span className="font-mono text-slate-400">
                {order.weightKg} kg
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Status Summary & Action Button */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
          {/* Status & Next Step / ETA summary */}
          <div className="flex flex-col md:items-end text-left md:text-right max-w-full md:max-w-[320px]">
            {isNeedsAction ? (
              <>
                <div className="flex items-center md:justify-end gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    {order.statusLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-1 font-medium" title={order.actionSummary}>
                  {order.actionSummary}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center md:justify-end gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {order.statusLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1" title={order.actionSummary}>
                  {order.actionSummary}
                </p>
              </>
            )}
          </div>

          {/* Action Button & Expand Toggle */}
          <div className="flex items-center gap-2">
            {isNeedsAction && (
              <button
                type="button"
                onClick={() => onExecuteAction(order)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap ${actionStyle.btnColor}`}
              >
                {actionStyle.btnText}
              </button>
            )}

            {/* Expand / Collapse Details */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={isExpanded ? "Collapse details" : "Expand order details & timeline"}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details Drawer */}
      {isExpanded && (
        <div className="border-t border-slate-800 bg-[#0a0c10] p-4 sm:p-5 space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Column 1: Order Specifications & Warehouse Logistics */}
            <div className="space-y-3 bg-[#0f1219] p-3.5 rounded-lg border border-slate-800 text-xs">
              <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-slate-400" /> Package & Storage Spec
              </h4>

              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Warehouse Hub:</span>
                  <span className="text-slate-200">{order.warehouse}</span>
                </div>
                {order.warehouseBin && (
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-500">Rack / Bin Location:</span>
                    <span className="font-mono text-slate-200">{order.warehouseBin}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Actual Weight:</span>
                  <span className="font-mono text-slate-200">{order.weightKg} kg</span>
                </div>
                {order.dimensionsCm && (
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-500">Dimensions:</span>
                    <span className="font-mono text-slate-200">
                      {order.dimensionsCm.length} × {order.dimensionsCm.width} × {order.dimensionsCm.height} cm
                    </span>
                  </div>
                )}
                {order.dimensionsCm && (
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-500">Volumetric Weight:</span>
                    <span className="font-mono text-slate-300">
                      {((order.dimensionsCm.length * order.dimensionsCm.width * order.dimensionsCm.height) / 5000).toFixed(2)} kg
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Unit Cost (RMB / USD):</span>
                  <span className="font-mono text-slate-200">
                    ¥{(order.priceRMB / order.quantity).toFixed(2)} / ${(order.priceUSD / order.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {order.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Milestone Lifecycle Timeline */}
            <div className="bg-[#0f1219] p-3.5 rounded-lg border border-slate-800 text-xs">
              <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-3">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Milestone Tracking Log
              </h4>

              <div className="space-y-3 relative pl-3.5 before:content-[''] before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Bullet */}
                    <div className={`absolute -left-[15px] top-0.5 w-2 h-2 rounded-full ${
                      step.completed
                        ? 'bg-slate-400'
                        : step.current
                        ? 'bg-amber-400'
                        : 'bg-slate-800'
                    }`} />

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={`font-medium ${
                          step.current ? 'text-amber-300' : step.completed ? 'text-slate-200' : 'text-slate-500'
                        }`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Domestic Tracking */}
              {order.domesticTracking && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Truck className="w-3 h-3 text-slate-400" /> {order.domesticTracking.carrier}:
                  </span>
                  <span className="font-mono text-slate-200">
                    {order.domesticTracking.trackingNumber}
                  </span>
                </div>
              )}

              {/* International Tracking */}
              {order.intlTracking && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Send className="w-3 h-3 text-slate-400" /> {order.intlTracking.carrier}:
                  </span>
                  <span className="font-mono text-slate-200">
                    {order.intlTracking.trackingNumber}
                  </span>
                </div>
              )}
            </div>

            {/* Column 3: QC Photos / Inspection */}
            <div className="bg-[#0f1219] p-3.5 rounded-lg border border-slate-800 text-xs flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-slate-400" /> Inspection & QC Photos
                  </span>
                  {order.qcPhotos && (
                    <span className="text-[10px] font-mono text-slate-400">
                      {order.qcPhotos.length} Images
                    </span>
                  )}
                </h4>

                {/* Photo Grid */}
                {order.qcPhotos && order.qcPhotos.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {order.qcPhotos.map((photo) => (
                      <div 
                        key={photo.id}
                        onClick={() => onViewPhoto(photo.url, photo.caption)}
                        className="relative group rounded-lg overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer aspect-video"
                      >
                        <img 
                          src={photo.url} 
                          alt={photo.caption} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 p-1.5 flex items-end justify-between transition-opacity">
                          <span className="text-[10px] text-slate-200 font-medium line-clamp-1">
                            {photo.caption}
                          </span>
                          <Maximize2 className="w-3 h-3 text-slate-300 shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded border border-dashed border-slate-800 text-center text-slate-500 mb-3">
                    <Camera className="w-5 h-5 mx-auto mb-1 opacity-40" />
                    <p className="text-[11px]">Inspection photos will be taken upon warehouse arrival.</p>
                  </div>
                )}

                {/* Customization Note if present */}
                {order.customizationDetails && (
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <div className="font-semibold text-slate-200">
                      {order.customizationDetails.specType}
                    </div>
                    <p className="text-slate-400">{order.customizationDetails.factoryFeedback}</p>
                  </div>
                )}
              </div>

              {/* Direct Action Trigger in drawer */}
              {isNeedsAction && (
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Action Required:</span>
                  <button
                    type="button"
                    onClick={() => onExecuteAction(order)}
                    className={`px-3 py-1.5 rounded-lg text-xs ${actionStyle.btnColor}`}
                  >
                    {actionStyle.btnText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
