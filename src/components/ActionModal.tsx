import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Camera, 
  ShieldAlert, 
  AlertTriangle, 
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { OrderItem } from '../types';

interface ActionModalProps {
  order: OrderItem | null;
  isOpen: boolean;
  onClose: () => void;
  onResolveAction: (orderId: string, updatedZone: 'NEEDS_ACTION' | 'IN_PROGRESS', summaryMessage: string, refundOrDeductionRMB?: number) => void;
  walletBalanceCNY: number;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  order,
  isOpen,
  onClose,
  onResolveAction,
  walletBalanceCNY,
}) => {
  const [taxIdInput, setTaxIdInput] = useState('EIN-84-9102948');
  const [customComment, setCustomComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !order) return null;

  // 1. Payment Pending Action Handler
  const handleAuthorizePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onResolveAction(
        order.id,
        'IN_PROGRESS',
        `Payment Authorized (¥${order.priceRMB.toLocaleString()}) • Supplier dispatched to ${order.warehouse}`,
        -order.priceRMB
      );
      setIsProcessing(false);
      onClose();
    }, 500);
  };

  // 2. Customization Approval Handler
  const handleApproveCustomization = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onResolveAction(
        order.id,
        'IN_PROGRESS',
        'Customization Spec Approved • Mass batch manufacturing started (Est. 3 days)'
      );
      setIsProcessing(false);
      onClose();
    }, 500);
  };

  // 3. Address / Customs ID Resolver Handler
  const handleResolveAddress = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onResolveAction(
        order.id,
        'NEEDS_ACTION',
        `Customs ID Verified (${taxIdInput}) • Arrived at ${order.warehouse} • Ready to Consolidate`
      );
      setIsProcessing(false);
      onClose();
    }, 500);
  };

  // 4. QC Defect Option 1: Accept Refund
  const handleAcceptQCDiscount = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onResolveAction(
        order.id,
        'NEEDS_ACTION',
        'QC Approved with ¥180 RMB Discount • Stored in Hub • Ready to Consolidate',
        180
      );
      setIsProcessing(false);
      onClose();
    }, 500);
  };

  // 4. QC Defect Option 2: Free Exchange
  const handleRequestQCExchange = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onResolveAction(
        order.id,
        'IN_PROGRESS',
        'Returned 4 defective units to vendor for replacement (ETA 2 days)'
      );
      setIsProcessing(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              {order.actionType === 'PAYMENT_PENDING' && <CreditCard className="w-4 h-4" />}
              {order.actionType === 'CUSTOMIZATION_CONFIRMATION' && <Camera className="w-4 h-4" />}
              {order.actionType === 'ADDRESS_ISSUE' && <ShieldAlert className="w-4 h-4" />}
              {order.actionType === 'QC_REVISION' && <AlertTriangle className="w-4 h-4" />}
              {order.actionType === 'READY_TO_CONSOLIDATE' && <ShieldCheck className="w-4 h-4" />}
            </div>
            <div>
              <span className="font-mono text-[11px] text-amber-700 font-bold uppercase tracking-wider">
                {order.statusLabel}
              </span>
              <h2 className="text-sm font-bold text-slate-900 line-clamp-1">
                {order.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close action modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Top Order Quick Spec */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-3">
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
                className="w-11 h-11 rounded-xl object-cover border border-slate-200 bg-white"
              />
              <div>
                <span className="font-mono text-slate-400 text-[11px]">#{order.orderNumber.replace('P360-', '')} • {order.supplierPlatform}</span>
                <p className="font-bold text-slate-900">{order.quantity} {order.unit}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-extrabold text-sm text-slate-900">¥{order.priceRMB.toLocaleString()} RMB</span>
              <p className="font-mono text-[11px] text-slate-500">(${order.priceUSD.toFixed(2)})</p>
            </div>
          </div>

          {/* Scenario 1: PAYMENT PENDING */}
          {order.actionType === 'PAYMENT_PENDING' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 space-y-1.5">
                <h3 className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                  <CreditCard className="w-4 h-4 text-amber-700" /> Supplier Escrow Settlement
                </h3>
                <p className="text-amber-800 text-xs leading-relaxed">
                  Authorize payment to <span className="font-bold text-slate-900">{order.supplierName}</span>.
                  Funds remain protected in escrow until physical arrival and photographic QC inspection at {order.warehouse}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Factory Goods Subtotal:</span>
                  <span className="font-mono font-semibold text-slate-800">¥{order.priceRMB.toLocaleString()} RMB</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Domestic Freight (Supplier to Hub):</span>
                  <span className="font-mono font-semibold text-emerald-700">Included (Free)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Photographic QC Inspection:</span>
                  <span className="font-mono font-semibold text-emerald-700">Included (Free)</span>
                </div>
                <div className="flex justify-between py-1 text-xs font-bold pt-2">
                  <span className="text-slate-900">Total Wallet Debit:</span>
                  <span className="font-mono text-slate-950">¥{order.priceRMB.toLocaleString()} RMB</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Available RMB Wallet Balance:</span>
                <span className="font-mono font-bold text-slate-900">¥{walletBalanceCNY.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Scenario 2: CUSTOMIZATION CONFIRMATION */}
          {order.actionType === 'CUSTOMIZATION_CONFIRMATION' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-purple-950 text-xs">
                    {order.customizationDetails?.specType}
                  </h3>
                  <span className="text-[10px] font-mono bg-purple-200 text-purple-950 font-bold px-2 py-0.5 rounded-full">
                    Sample Proof #1
                  </span>
                </div>
                <p className="text-purple-800 text-xs">
                  {order.customizationDetails?.factoryFeedback}
                </p>
                {order.customizationDetails?.pantoneCode && (
                  <div className="font-mono text-[11px] text-purple-900 font-semibold pt-1">
                    Target: {order.customizationDetails.pantoneCode}
                  </div>
                )}
              </div>

              {order.customizationDetails?.samplePhotoUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 relative aspect-video bg-slate-100">
                  <img
                    src={order.customizationDetails.samplePhotoUrl}
                    alt="Sample Proof"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Optional revision feedback for factory:
                </label>
                <input
                  type="text"
                  value={customComment}
                  onChange={(e) => setCustomComment(e.target.value)}
                  placeholder="e.g. Please shift laser logo 0.5mm higher..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-400 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Scenario 3: ADDRESS ISSUE */}
          {order.actionType === 'ADDRESS_ISSUE' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-1.5">
                <h3 className="font-bold text-rose-950 flex items-center gap-1.5 text-xs">
                  <ShieldAlert className="w-4 h-4 text-rose-700" /> Carrier Customs Requirement
                </h3>
                <p className="text-rose-800 text-xs">
                  {order.addressDetails?.issueDescription}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-slate-700 font-semibold text-xs">
                  US Importer Tax ID / EIN / SSN:
                </label>
                <input
                  type="text"
                  value={taxIdInput}
                  onChange={(e) => setTaxIdInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs focus:outline-none focus:border-slate-400 focus:bg-white font-bold"
                />
              </div>
            </div>
          )}

          {/* Scenario 4: QC REVISION */}
          {order.actionType === 'QC_REVISION' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                <h3 className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-700" /> Inspection Defect Review
                </h3>
                <p className="text-amber-800 text-xs">
                  4 out of 80 units showed minor glaze variation. 76 units passed 100% of inspection specs.
                </p>
              </div>

              {order.qcPhotos && (
                <div className="grid grid-cols-2 gap-2.5">
                  {order.qcPhotos.map((photo) => (
                    <div key={photo.id} className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={photo.url} alt="" referrerPolicy="no-referrer" className="w-full h-28 object-cover" />
                      <div className="p-2 text-[10px]">
                        <span className={photo.passed ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                          {photo.passed ? '✓ Passed Spec' : 'Flagged Defect'}
                        </span>
                        <p className="text-slate-500 line-clamp-1 mt-0.5">{photo.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          {order.actionType === 'PAYMENT_PENDING' && (
            <button
              type="button"
              onClick={handleAuthorizePayment}
              disabled={isProcessing || walletBalanceCNY < order.priceRMB}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              {isProcessing ? 'Authorizing...' : `Authorize ¥${order.priceRMB.toLocaleString()} RMB`}
            </button>
          )}

          {order.actionType === 'CUSTOMIZATION_CONFIRMATION' && (
            <button
              type="button"
              onClick={handleApproveCustomization}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              {isProcessing ? 'Submitting...' : 'Approve Proof & Start Batch'}
            </button>
          )}

          {order.actionType === 'ADDRESS_ISSUE' && (
            <button
              type="button"
              onClick={handleResolveAddress}
              disabled={isProcessing || !taxIdInput}
              className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              {isProcessing ? 'Verifying...' : 'Save Customs Filing'}
            </button>
          )}

          {order.actionType === 'QC_REVISION' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRequestQCExchange}
                disabled={isProcessing}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
              >
                Exchange 4 Units (2 Days)
              </button>
              <button
                type="button"
                onClick={handleAcceptQCDiscount}
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                Accept & Credit +¥180 RMB
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
