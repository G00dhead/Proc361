import React, { useState } from 'react';
import { 
  X, 
  Link as LinkIcon, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Image as ImageIcon,
  Building2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { OrderItem } from '../types';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewOrder: (newOrder: OrderItem) => void;
  initialUrl?: string;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  onAddNewOrder,
  initialUrl = '',
}) => {
  const [tab, setTab] = useState<'LINK' | 'PHOTO' | 'CUSTOM_RFQ'>('LINK');
  const [productUrl, setProductUrl] = useState(initialUrl);
  const [title, setTitle] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [platform, setPlatform] = useState<'1688' | 'Taobao' | 'Weidian' | 'Factory Direct'>('1688');
  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState('pcs');
  const [targetPriceRMB, setTargetPriceRMB] = useState<number>(3200);
  const [warehouse, setWarehouse] = useState<'Guangdong Hub (Dongguan)' | 'Shenzhen Central Hub' | 'Yiwu Export Terminal'>('Shenzhen Central Hub');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedPreview, setParsedPreview] = useState<{
    title: string;
    supplier: string;
    priceRMB: number;
    weightKg: number;
    image: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSimulateUrlParse = () => {
    if (!productUrl.trim()) return;
    setIsParsing(true);

    setTimeout(() => {
      setIsParsing(false);
      const is1688 = productUrl.includes('1688');
      const isTaobao = productUrl.includes('taobao');

      const mockData = {
        title: is1688
          ? '60x Matte Finish Aluminum Mechanical Keyboards (Hot-Swappable RGB)'
          : isTaobao
          ? '150x Minimalist Ceramic Coffee Dripper & Servers'
          : '200x Precision Titanium Pocket Multi-tools',
        supplier: is1688
          ? 'Dongguan Jiazheng Precision Technology Co.'
          : 'Chaozhou Jingde Ceramic Arts Ltd.',
        priceRMB: 3850.0,
        weightKg: 14.5,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=80',
      };

      setParsedPreview(mockData);
      setTitle(mockData.title);
      setSupplierName(mockData.supplier);
      setTargetPriceRMB(mockData.priceRMB);
      setPlatform(is1688 ? '1688' : isTaobao ? 'Taobao' : '1688');
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title || 'Custom Sourced Goods (1688 Batch)';
    const finalPriceRMB = targetPriceRMB || 2400;
    const finalPriceUSD = finalPriceRMB / 7.2405;

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: `P360-${Math.floor(1000 + Math.random() * 9000)}`,
      title: finalTitle,
      category: 'Sourced Goods',
      supplierName: supplierName || '1688 Certified Manufacturer',
      supplierPlatform: platform,
      supplierUrl: productUrl || 'https://detail.1688.com/custom-rfq',
      thumbnail: parsedPreview?.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&auto=format&fit=crop&q=80',
      quantity: quantity || 50,
      unit: unit || 'pcs',
      priceRMB: finalPriceRMB,
      priceUSD: finalPriceUSD,
      zone: 'NEEDS_ACTION',
      actionType: 'PAYMENT_PENDING',
      statusLabel: 'Payment Pending',
      actionSummary: `Authorize ¥${finalPriceRMB.toLocaleString()} RMB to place factory batch PO`,
      warehouse: warehouse,
      weightKg: parsedPreview?.weightKg || 8.5,
      createdAt: 'Just now',
      updatedAt: 'Just now',
      tags: ['New Sourcing Order', platform, 'Payment Pending'],
      timeline: [
        { title: 'Sourcing Link Parsed', timestamp: 'Just now', description: 'Product spec validated against wholesale MOQ', completed: true },
        { title: 'Payment Authorization', timestamp: 'Pending', description: `Awaiting wallet payment of ¥${finalPriceRMB.toLocaleString()} RMB`, completed: false, current: true },
      ],
    };

    onAddNewOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">Place New China Sourcing Order</h2>
              <p className="text-xs text-slate-500">Source from 1688 wholesale, Taobao, or factory direct</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close new order modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-100 text-xs font-semibold bg-slate-50/30">
          <button
            type="button"
            onClick={() => setTab('LINK')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              tab === 'LINK'
                ? 'border-slate-950 text-slate-950 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" /> 1688 / Taobao Link
          </button>

          <button
            type="button"
            onClick={() => setTab('PHOTO')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              tab === 'PHOTO'
                ? 'border-slate-950 text-slate-950 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Photo Search
          </button>

          <button
            type="button"
            onClick={() => setTab('CUSTOM_RFQ')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              tab === 'CUSTOM_RFQ'
                ? 'border-slate-950 text-slate-950 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Custom OEM RFQ
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          {tab === 'LINK' && (
            <div className="space-y-2.5">
              <label className="block text-slate-700 font-semibold">
                Paste Chinese Product Link (1688, Taobao, Weidian):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="https://detail.1688.com/offer/7921849102.html"
                  className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={handleSimulateUrlParse}
                  disabled={isParsing || !productUrl.trim()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold rounded-xl shrink-0 flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  {isParsing ? 'Parsing...' : 'Fetch Spec'}
                </button>
              </div>

              {parsedPreview && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-emerald-900 font-semibold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Link Parsed Successfully
                    </span>
                    <span className="text-emerald-700 font-mono">1688 Verified Factory</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={parsedPreview.image}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover border border-emerald-200 bg-white"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{parsedPreview.title}</p>
                      <p className="text-[11px] text-slate-500">{parsedPreview.supplier}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'PHOTO' && (
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-2 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-slate-400" />
              <p className="font-semibold text-slate-800">Drag & drop product photo or click to browse</p>
              <p className="text-[11px] text-slate-500">
                LoadLogic visual crawler matches wholesale manufacturers across China
              </p>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Product Title / Spec Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 50x Anodized Keycap Sets"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Supplier Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
              >
                <option value="1688">1688.com Wholesale</option>
                <option value="Taobao">Taobao Retail / Small Batch</option>
                <option value="Weidian">Weidian Direct</option>
                <option value="Factory Direct">Factory Direct RFQ</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Order Quantity & Unit</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                  min={1}
                />
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-20 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Target RMB Subtotal (¥)</label>
              <input
                type="number"
                value={targetPriceRMB}
                onChange={(e) => setTargetPriceRMB(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-600 font-medium mb-1">Virtual Warehouse Hub Destination</label>
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
              >
                <option value="Shenzhen Central Hub">Shenzhen Central Hub (Best for Electronics & Air Express)</option>
                <option value="Guangdong Hub (Dongguan)">Guangdong Hub Dongguan (Best for Apparel, Molds & Heavy Cargo)</option>
                <option value="Yiwu Export Terminal">Yiwu Export Terminal (Best for Small Commodities & Rail/Sea)</option>
              </select>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <span>Place Sourcing Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
