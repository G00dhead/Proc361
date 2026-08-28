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
import { useLanguage } from '../context/LanguageContext';

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
  const { t, language } = useLanguage();
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
          ? (language === 'zh' ? '60件 哑光铝合金机械键盘（热插拔RGB）' : '60x Matte Finish Aluminum Mechanical Keyboards (Hot-Swappable RGB)')
          : isTaobao
          ? (language === 'zh' ? '150套 极简日式陶瓷手冲咖啡滤杯套装' : '150x Minimalist Ceramic Coffee Dripper & Servers')
          : (language === 'zh' ? '200把 高精度钛合金多功能随身钳' : '200x Precision Titanium Pocket Multi-tools'),
        supplier: is1688
          ? (language === 'zh' ? '东莞市佳正精密科技有限公司' : 'Dongguan Jiazheng Precision Technology Co.')
          : (language === 'zh' ? '潮州市景德陶瓷工艺厂' : 'Chaozhou Jingde Ceramic Arts Ltd.'),
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
    const finalTitle = title || (language === 'zh' ? '1688采购定制商品批次' : 'Custom Sourced Goods (1688 Batch)');
    const finalPriceRMB = targetPriceRMB || 2400;
    const finalPriceUSD = finalPriceRMB / 7.2405;

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: `P360-${Math.floor(1000 + Math.random() * 9000)}`,
      title: finalTitle,
      category: 'Sourced Goods',
      supplierName: supplierName || (language === 'zh' ? '1688 深度验厂认证工厂' : '1688 Certified Manufacturer'),
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
      actionSummary: language === 'zh' ? `待授权划拨货款 ¥${finalPriceRMB.toLocaleString()} RMB 以向工厂下达采购订单` : `Authorize ¥${finalPriceRMB.toLocaleString()} RMB to place factory batch PO`,
      warehouse: warehouse,
      weightKg: parsedPreview?.weightKg || 8.5,
      createdAt: language === 'zh' ? '刚刚' : 'Just now',
      updatedAt: language === 'zh' ? '刚刚' : 'Just now',
      tags: ['New Sourcing Order', platform, 'Payment Pending'],
      timeline: [
        { 
          title: language === 'zh' ? '采购链接规格解析完成' : 'Sourcing Link Parsed', 
          timestamp: language === 'zh' ? '刚刚' : 'Just now', 
          description: language === 'zh' ? '已核验批发阶梯起订量与规格参数' : 'Product spec validated against wholesale MOQ', 
          completed: true 
        },
        { 
          title: language === 'zh' ? '等待付款授权' : 'Payment Authorization', 
          timestamp: language === 'zh' ? '待处理' : 'Pending', 
          description: language === 'zh' ? `等待划拨货款 ¥${finalPriceRMB.toLocaleString()} RMB` : `Awaiting wallet payment of ¥${finalPriceRMB.toLocaleString()} RMB`, 
          completed: false, 
          current: true 
        },
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
              <h2 className="text-sm font-bold text-slate-950">
                {language === 'zh' ? '新建中国供应链采购直采订单' : 'Place New China Sourcing Order'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'zh' ? '一键解析 1688 批发、淘宝或工厂直连 OEM 询价' : 'Source from 1688 wholesale, Taobao, or factory direct'}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close new order modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-100 text-xs font-semibold bg-slate-50/30">
          <button
            type="button"
            onClick={() => setTab('LINK')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              tab === 'LINK'
                ? 'border-slate-950 text-slate-950 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            {language === 'zh' ? '1688 / 淘宝链接解析' : '1688 / Taobao Link'}
          </button>

          <button
            type="button"
            onClick={() => setTab('PHOTO')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              tab === 'PHOTO'
                ? 'border-slate-950 text-slate-950 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            {language === 'zh' ? '以图搜同款货源' : 'Photo Search'}
          </button>

          <button
            type="button"
            onClick={() => setTab('CUSTOM_RFQ')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              tab === 'CUSTOM_RFQ'
                ? 'border-slate-950 text-slate-950 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {language === 'zh' ? 'OEM 定制询价 RFQ' : 'Custom OEM RFQ'}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          {tab === 'LINK' && (
            <div className="space-y-2.5">
              <label className="block text-slate-700 font-semibold">
                {language === 'zh' ? '粘贴中国货源商品链接（1688、淘宝、微店）：' : 'Paste Chinese Product Link (1688, Taobao, Weidian):'}
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
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold rounded-xl shrink-0 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  {isParsing ? (language === 'zh' ? '解析中...' : 'Parsing...') : (language === 'zh' ? '智能提取' : 'Fetch Spec')}
                </button>
              </div>

              {parsedPreview && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-emerald-900 font-semibold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {language === 'zh' ? '商品与工厂参数提取成功' : 'Link Parsed Successfully'}
                    </span>
                    <span className="text-emerald-700 font-mono">1688 {language === 'zh' ? '深度验厂工厂' : 'Verified Factory'}</span>
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
              <p className="font-semibold text-slate-800">
                {language === 'zh' ? '拖拽上传商品图片或点击本地选取' : 'Drag & drop product photo or click to browse'}
              </p>
              <p className="text-[11px] text-slate-500">
                {language === 'zh' ? '智能图像识别直连 1688 产业带源头一手工厂' : 'LoadLogic visual crawler matches wholesale manufacturers across China'}
              </p>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-slate-600 font-medium mb-1">
                {language === 'zh' ? '商品名称 / 规格描述' : 'Product Title / Spec Name'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={language === 'zh' ? '例如：50套 阳极氧化金属键帽套装' : 'e.g. 50x Anodized Keycap Sets'}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">
                {language === 'zh' ? '供应商平台渠道' : 'Supplier Platform'}
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors cursor-pointer"
              >
                <option value="1688">1688.com {language === 'zh' ? '批发采购' : 'Wholesale'}</option>
                <option value="Taobao">{language === 'zh' ? '淘宝零售 / 小批量' : 'Taobao Retail / Small Batch'}</option>
                <option value="Weidian">{language === 'zh' ? '微店直采' : 'Weidian Direct'}</option>
                <option value="Factory Direct">{language === 'zh' ? '源头工厂直接定制 RFQ' : 'Factory Direct RFQ'}</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">
                {language === 'zh' ? '采购数量与单位' : 'Order Quantity & Unit'}
              </label>
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
              <label className="block text-slate-600 font-medium mb-1">
                {language === 'zh' ? '目标人民币采购金额 (¥)' : 'Target RMB Subtotal (¥)'}
              </label>
              <input
                type="number"
                value={targetPriceRMB}
                onChange={(e) => setTargetPriceRMB(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-600 font-medium mb-1">
                {language === 'zh' ? '指定中国中转仓存储枢纽' : 'Virtual Warehouse Hub Destination'}
              </label>
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors cursor-pointer"
              >
                <option value="Shenzhen Central Hub">
                  {language === 'zh' ? '深圳中央枢纽仓（适合电子、数码与空运特快专线）' : 'Shenzhen Central Hub (Best for Electronics & Air Express)'}
                </option>
                <option value="Guangdong Hub (Dongguan)">
                  {language === 'zh' ? '东莞广东枢纽仓（适合服装、五金、模具与重货）' : 'Guangdong Hub Dongguan (Best for Apparel, Molds & Heavy Cargo)'}
                </option>
                <option value="Yiwu Export Terminal">
                  {language === 'zh' ? '义乌外贸枢纽港（适合小商品、百货与中欧班列/海运）' : 'Yiwu Export Terminal (Best for Small Commodities & Rail/Sea)'}
                </option>
              </select>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>{language === 'zh' ? '下达直采订单' : 'Place Sourcing Order'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
