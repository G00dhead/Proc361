import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Plane, 
  Ship, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  PackageCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { OrderItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ConsolidationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrders: OrderItem[];
  onConfirmConsolidation: (selectedIds: string[], shippingMethod: string, totalCostCNY: number) => void;
  walletBalanceCNY: number;
}

export const ConsolidationDrawer: React.FC<ConsolidationDrawerProps> = ({
  isOpen,
  onClose,
  selectedOrders,
  onConfirmConsolidation,
  walletBalanceCNY,
}) => {
  const { t, translateOrderText, language } = useLanguage();
  const [shippingTier, setShippingTier] = useState<'AIR_EXPRESS' | 'AIR_DDP' | 'SEA_FAST' | 'RAIL_EUROPE'>('AIR_DDP');
  const [removeShoeBoxes, setRemoveShoeBoxes] = useState(true);
  const [bubbleWrap, setBubbleWrap] = useState(true);
  const [waterproofBag, setWaterproofBag] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const totalWeightKg = selectedOrders.reduce((sum, o) => sum + o.weightKg, 0);
  const totalGoodsValueRMB = selectedOrders.reduce((sum, o) => sum + o.priceRMB, 0);
  const optimizedWeightKg = removeShoeBoxes ? Math.max(0.5, totalWeightKg * 0.78) : totalWeightKg;

  // Rate calculation table
  const ratePerKg = {
    AIR_EXPRESS: 85, // CNY / kg
    AIR_DDP: 52,     // CNY / kg
    SEA_FAST: 22,    // CNY / kg
    RAIL_EUROPE: 28, // CNY / kg
  }[shippingTier];

  const baseFreightCNY = Math.round(optimizedWeightKg * ratePerKg);
  const packagingFeeCNY = (bubbleWrap ? 25 : 0) + (waterproofBag ? 15 : 0);
  const totalConsolidationCNY = baseFreightCNY + packagingFeeCNY;
  const totalConsolidationUSD = totalConsolidationCNY / 7.2405;

  const handleDispatch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirmConsolidation(
        selectedOrders.map((o) => o.id),
        shippingTier,
        totalConsolidationCNY
      );
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l border-slate-200 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">
                {language === 'zh' ? '合并打包国际集运' : 'Consolidate International Parcel'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'zh' ? '将多个中国中转仓包裹合并为单一 DDP 双清包税跨境运单' : 'Combine multiple China warehouse parcels into one DDP shipment'}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close consolidation drawer"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-slate-700">
          {/* Selected Orders Overview */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">
                {language === 'zh' ? `已选择 ${selectedOrders.length} 个仓储包裹` : `Selected Warehouse Parcels (${selectedOrders.length})`}
              </span>
              <span className="font-mono text-slate-500 text-[11px]">
                {language === 'zh'
                  ? `毛重: ${totalWeightKg.toFixed(1)} kg • 货值: ¥${totalGoodsValueRMB.toLocaleString()}`
                  : `Gross: ${totalWeightKg.toFixed(1)} kg • Value: ¥${totalGoodsValueRMB.toLocaleString()}`}
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {selectedOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
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
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate text-xs">{translateOrderText(order.title)}</p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {order.quantity} {translateOrderText(order.unit)} • {order.weightKg} kg • {translateOrderText(order.warehouse)}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-800 text-xs shrink-0 ml-2">
                    ¥{order.priceRMB.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Repackaging Options */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              {language === 'zh' ? '体积减重优化与增值合箱' : 'Volume Optimization & Repackaging'}
            </h3>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-800 block">
                    {language === 'zh' ? '拆除多余外盒原包装' : 'Discard bulky outer retail packaging'}
                  </span>
                  <span className="text-[11px] text-emerald-700">
                    {language === 'zh' ? '立减计费体积重约 22%' : 'Reduces volumetric dimensional weight by ~22%'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={removeShoeBoxes}
                  onChange={(e) => setRemoveShoeBoxes(e.target.checked)}
                  className="rounded border-slate-300 text-slate-950 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-800 block">
                    {language === 'zh' ? '多层气泡柱防震加固' : 'Corner protection & multi-layer bubble wrap'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {language === 'zh' ? '+¥25 RMB 易碎品防摔缓冲' : '+¥25 RMB flat packaging service'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={bubbleWrap}
                  onChange={(e) => setBubbleWrap(e.target.checked)}
                  className="rounded border-slate-300 text-slate-950 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-800 block">
                    {language === 'zh' ? '全包裹重型防水袋封装' : 'Sealed heavy-duty waterproof bag'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {language === 'zh' ? '+¥15 RMB 防潮防雨隔层' : '+¥15 RMB moisture barrier'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={waterproofBag}
                  onChange={(e) => setWaterproofBag(e.target.checked)}
                  className="rounded border-slate-300 text-slate-950 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* International Carrier Selection */}
          <div className="space-y-2.5">
            <span className="font-bold text-slate-900 text-xs block">
              {language === 'zh' ? '选择跨境国际专线渠道：' : 'Select International Shipping Line:'}
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setShippingTier('AIR_DDP')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  shippingTier === 'AIR_DDP'
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Plane className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/20">
                    {language === 'zh' ? '6-9 工作日' : '6-9 Days'}
                  </span>
                </div>
                <p className="font-bold text-xs">{language === 'zh' ? '航空空运专线 DDP' : 'Air Cargo DDP'}</p>
                <p className={`text-[11px] font-mono mt-0.5 ${shippingTier === 'AIR_DDP' ? 'text-slate-300' : 'text-slate-500'}`}>
                  {language === 'zh' ? '¥52 / kg • 双清包税' : '¥52 / kg • Customs Included'}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setShippingTier('AIR_EXPRESS')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  shippingTier === 'AIR_EXPRESS'
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Plane className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/20">
                    {language === 'zh' ? '3-5 工作日' : '3-5 Days'}
                  </span>
                </div>
                <p className="font-bold text-xs">{language === 'zh' ? 'DHL / FedEx 商业特快' : 'DHL / FedEx Express'}</p>
                <p className={`text-[11px] font-mono mt-0.5 ${shippingTier === 'AIR_EXPRESS' ? 'text-slate-300' : 'text-slate-500'}`}>
                  {language === 'zh' ? '¥85 / kg • 极速直飞' : '¥85 / kg • Priority Flight'}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setShippingTier('SEA_FAST')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  shippingTier === 'SEA_FAST'
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Ship className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/20">
                    {language === 'zh' ? '18-24 天' : '18-24 Days'}
                  </span>
                </div>
                <p className="font-bold text-xs">{language === 'zh' ? '美森快船海运 DDP' : 'Matson Fast Sea DDP'}</p>
                <p className={`text-[11px] font-mono mt-0.5 ${shippingTier === 'SEA_FAST' ? 'text-slate-300' : 'text-slate-500'}`}>
                  {language === 'zh' ? '¥22 / kg • 大宗高性价比' : '¥22 / kg • Lowest Freight'}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setShippingTier('RAIL_EUROPE')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  shippingTier === 'RAIL_EUROPE'
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Truck className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/20">
                    {language === 'zh' ? '14-18 天' : '14-18 Days'}
                  </span>
                </div>
                <p className="font-bold text-xs">{language === 'zh' ? '义新欧中欧班列' : 'Yiwu-Europe Rail Express'}</p>
                <p className={`text-[11px] font-mono mt-0.5 ${shippingTier === 'RAIL_EUROPE' ? 'text-slate-300' : 'text-slate-500'}`}>
                  {language === 'zh' ? '¥28 / kg • 欧线双清包税' : '¥28 / kg • EU Duty Paid'}
                </p>
              </button>
            </div>
          </div>

          {/* Pricing Calculation Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex justify-between py-1 text-xs border-b border-slate-200/60">
              <span className="text-slate-500">{language === 'zh' ? '提单核算计费重量：' : 'Billable Bill-of-Lading Weight:'}</span>
              <span className="font-mono font-bold text-slate-800">{optimizedWeightKg.toFixed(1)} kg</span>
            </div>
            <div className="flex justify-between py-1 text-xs border-b border-slate-200/60">
              <span className="text-slate-500">{language === 'zh' ? '国际干线运费：' : 'Freight Cost:'}</span>
              <span className="font-mono text-slate-800">¥{baseFreightCNY.toLocaleString()} RMB</span>
            </div>
            <div className="flex justify-between py-1 text-xs border-b border-slate-200/60">
              <span className="text-slate-500">{language === 'zh' ? '加固与封装服务费：' : 'Repackaging & Barrier Services:'}</span>
              <span className="font-mono text-slate-800">¥{packagingFeeCNY} RMB</span>
            </div>
            <div className="flex justify-between py-1 text-sm font-bold pt-1">
              <span className="text-slate-950">{language === 'zh' ? '国际集运应付总额：' : 'Total Consolidation Freight:'}</span>
              <div className="text-right">
                <span className="font-mono text-slate-950">¥{totalConsolidationCNY.toLocaleString()} RMB</span>
                <span className="block text-[11px] font-mono text-slate-400 font-normal">(${totalConsolidationUSD.toFixed(2)} USD)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-400 block font-mono text-[11px]">{language === 'zh' ? '人民币钱包可用余额：' : 'RMB Wallet Balance:'}</span>
            <span className="font-mono font-bold text-slate-900">¥{walletBalanceCNY.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="button"
              onClick={handleDispatch}
              disabled={isProcessing || selectedOrders.length === 0}
              className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>{isProcessing ? (language === 'zh' ? '正在派发...' : 'Dispatching...') : (language === 'zh' ? '确认发货并派送' : 'Dispatch Consolidated Shipment')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
