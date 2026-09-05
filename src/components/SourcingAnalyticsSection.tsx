import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  RotateCcw, 
  CheckCircle, 
  Info, 
  Calendar, 
  Check, 
  ChevronDown,
  DollarSign,
  Navigation,
  Truck,
  ExternalLink,
  Copy,
  RefreshCw,
  Search,
  X,
  ChevronRight,
  ShieldCheck,
  Box,
  Layers,
  MapPin,
  Plane,
  Anchor
} from 'lucide-react';
import { Tooltip } from './Tooltip';
import { OrderItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SourcingAnalyticsSectionProps {
  orders: OrderItem[];
  totalSourcedRMB: number;
  totalSourcedUSD: number;
  onShowToast?: (msg: string) => void;
  onOpenOrderDetail?: (order: OrderItem) => void;
}

type TimeInterval = 'Monthly' | 'Weekly' | 'Daily';
type ChartType = 'line' | 'bar';

interface SourcingDataPoint {
  label: string;
  fulfilled: number; // Volume coordinate (0 - 50 scale matching visual curve)
  dealsBlue: number; // Deals count shown in tooltip
  fulfilledValUSD: number;
  fulfilledValRMB: number;
  cancel: number; // Volume coordinate (0 - 50 scale matching visual curve)
  dealsGreen: number; // Deals count shown in tooltip
  cancelValUSD: number;
  volumeBarHeight: number; // percentage
}

// 14 daily data points matching the exact X-axis (29.04 to 12.05) and curve coordinates from reference graph
export const DAILY_DATA: SourcingDataPoint[] = [
  { label: '29.04', fulfilled: 5, dealsBlue: 5, fulfilledValUSD: 2400, fulfilledValRMB: 17376, cancel: 3, dealsGreen: 3, cancelValUSD: 1100, volumeBarHeight: 12 },
  { label: '30.04', fulfilled: 14, dealsBlue: 14, fulfilledValUSD: 4200, fulfilledValRMB: 30408, cancel: 24, dealsGreen: 24, cancelValUSD: 3600, volumeBarHeight: 28 },
  { label: '1.05', fulfilled: 21, dealsBlue: 21, fulfilledValUSD: 5900, fulfilledValRMB: 42716, cancel: 16, dealsGreen: 16, cancelValUSD: 2400, volumeBarHeight: 42 },
  { label: '2.05', fulfilled: 21, dealsBlue: 21, fulfilledValUSD: 6100, fulfilledValRMB: 44164, cancel: 16, dealsGreen: 16, cancelValUSD: 2400, volumeBarHeight: 42 },
  { label: '3.05', fulfilled: 15, dealsBlue: 15, fulfilledValUSD: 4800, fulfilledValRMB: 34752, cancel: 23, dealsGreen: 23, cancelValUSD: 3500, volumeBarHeight: 30 },
  { label: '4.05', fulfilled: 15, dealsBlue: 15, fulfilledValUSD: 4900, fulfilledValRMB: 35476, cancel: 9, dealsGreen: 9, cancelValUSD: 1500, volumeBarHeight: 30 },
  { label: '5.05', fulfilled: 23, dealsBlue: 23, fulfilledValUSD: 6800, fulfilledValRMB: 49232, cancel: 27, dealsGreen: 27, cancelValUSD: 4100, volumeBarHeight: 46 },
  { label: '6.05', fulfilled: 20, dealsBlue: 20, fulfilledValUSD: 6200, fulfilledValRMB: 44888, cancel: 27, dealsGreen: 27, cancelValUSD: 4100, volumeBarHeight: 40 },
  { label: '7.05', fulfilled: 20, dealsBlue: 20, fulfilledValUSD: 6200, fulfilledValRMB: 44888, cancel: 27, dealsGreen: 27, cancelValUSD: 4100, volumeBarHeight: 40 },
  { label: '8.05', fulfilled: 15, dealsBlue: 29, fulfilledValUSD: 8900, fulfilledValRMB: 64436, cancel: 32, dealsGreen: 27, cancelValUSD: 5133, volumeBarHeight: 30 },
  { label: '9.05', fulfilled: 30, dealsBlue: 30, fulfilledValUSD: 7900, fulfilledValRMB: 57196, cancel: 35, dealsGreen: 35, cancelValUSD: 5100, volumeBarHeight: 60 },
  { label: '10.05', fulfilled: 42, dealsBlue: 42, fulfilledValUSD: 9600, fulfilledValRMB: 69504, cancel: 37, dealsGreen: 37, cancelValUSD: 5300, volumeBarHeight: 84 },
  { label: '11.05', fulfilled: 34, dealsBlue: 34, fulfilledValUSD: 8500, fulfilledValRMB: 61540, cancel: 38, dealsGreen: 38, cancelValUSD: 5400, volumeBarHeight: 68 },
  { label: '12.05', fulfilled: 45, dealsBlue: 45, fulfilledValUSD: 10200, fulfilledValRMB: 73848, cancel: 41, dealsGreen: 41, cancelValUSD: 5800, volumeBarHeight: 90 },
];

export const WEEKLY_DATA: SourcingDataPoint[] = [
  { label: 'W21', fulfilled: 12, dealsBlue: 12, fulfilledValUSD: 3600, fulfilledValRMB: 26064, cancel: 8, dealsGreen: 8, cancelValUSD: 1800, volumeBarHeight: 24 },
  { label: 'W22', fulfilled: 18, dealsBlue: 18, fulfilledValUSD: 4800, fulfilledValRMB: 34752, cancel: 14, dealsGreen: 14, cancelValUSD: 2600, volumeBarHeight: 36 },
  { label: 'W23', fulfilled: 24, dealsBlue: 24, fulfilledValUSD: 6200, fulfilledValRMB: 44888, cancel: 19, dealsGreen: 19, cancelValUSD: 3100, volumeBarHeight: 48 },
  { label: 'W24', fulfilled: 22, dealsBlue: 22, fulfilledValUSD: 5900, fulfilledValRMB: 42716, cancel: 15, dealsGreen: 15, cancelValUSD: 2800, volumeBarHeight: 44 },
  { label: 'W25', fulfilled: 26, dealsBlue: 26, fulfilledValUSD: 6800, fulfilledValRMB: 49232, cancel: 21, dealsGreen: 21, cancelValUSD: 3400, volumeBarHeight: 52 },
  { label: 'W26', fulfilled: 20, dealsBlue: 20, fulfilledValUSD: 5400, fulfilledValRMB: 39096, cancel: 12, dealsGreen: 12, cancelValUSD: 2200, volumeBarHeight: 40 },
  { label: 'W27', fulfilled: 28, dealsBlue: 28, fulfilledValUSD: 7400, fulfilledValRMB: 53576, cancel: 25, dealsGreen: 25, cancelValUSD: 3900, volumeBarHeight: 56 },
  { label: 'W28', fulfilled: 25, dealsBlue: 25, fulfilledValUSD: 7100, fulfilledValRMB: 51404, cancel: 26, dealsGreen: 26, cancelValUSD: 4000, volumeBarHeight: 50 },
  { label: 'W29', fulfilled: 29, dealsBlue: 29, fulfilledValUSD: 7800, fulfilledValRMB: 56472, cancel: 27, dealsGreen: 27, cancelValUSD: 4200, volumeBarHeight: 58 },
  { label: 'W30', fulfilled: 36, dealsBlue: 36, fulfilledValUSD: 8900, fulfilledValRMB: 64436, cancel: 32, dealsGreen: 32, cancelValUSD: 4800, volumeBarHeight: 72 },
  { label: 'W31', fulfilled: 42, dealsBlue: 42, fulfilledValUSD: 9800, fulfilledValRMB: 70952, cancel: 36, dealsGreen: 36, cancelValUSD: 5200, volumeBarHeight: 84 },
  { label: 'W32', fulfilled: 38, dealsBlue: 38, fulfilledValUSD: 9100, fulfilledValRMB: 65884, cancel: 37, dealsGreen: 37, cancelValUSD: 5300, volumeBarHeight: 76 },
  { label: 'W33', fulfilled: 46, dealsBlue: 46, fulfilledValUSD: 10400, fulfilledValRMB: 75296, cancel: 40, dealsGreen: 40, cancelValUSD: 5600, volumeBarHeight: 92 },
];

export const MONTHLY_DATA: SourcingDataPoint[] = [
  { label: 'Jan', fulfilled: 12, dealsBlue: 210, fulfilledValUSD: 6800, fulfilledValRMB: 49232, cancel: 8, dealsGreen: 45, cancelValUSD: 3400, volumeBarHeight: 35 },
  { label: 'Feb', fulfilled: 16, dealsBlue: 245, fulfilledValUSD: 7400, fulfilledValRMB: 53576, cancel: 14, dealsGreen: 50, cancelValUSD: 3900, volumeBarHeight: 45 },
  { label: 'Mar', fulfilled: 22, dealsBlue: 290, fulfilledValUSD: 8200, fulfilledValRMB: 59368, cancel: 19, dealsGreen: 42, cancelValUSD: 3800, volumeBarHeight: 52 },
  { label: 'Apr', fulfilled: 18, dealsBlue: 260, fulfilledValUSD: 6400, fulfilledValRMB: 46336, cancel: 15, dealsGreen: 60, cancelValUSD: 4100, volumeBarHeight: 40 },
  { label: 'May', fulfilled: 25, dealsBlue: 320, fulfilledValUSD: 7800, fulfilledValRMB: 56472, cancel: 24, dealsGreen: 55, cancelValUSD: 4300, volumeBarHeight: 58 },
  { label: 'Jun', fulfilled: 29, dealsBlue: 356, fulfilledValUSD: 8900, fulfilledValRMB: 64436, cancel: 27, dealsGreen: 75, cancelValUSD: 5133, volumeBarHeight: 70 },
  { label: 'Jul', fulfilled: 38, dealsBlue: 380, fulfilledValUSD: 9400, fulfilledValRMB: 68056, cancel: 34, dealsGreen: 68, cancelValUSD: 4600, volumeBarHeight: 82 },
  { label: 'Aug', fulfilled: 45, dealsBlue: 410, fulfilledValUSD: 8600, fulfilledValRMB: 62264, cancel: 39, dealsGreen: 70, cancelValUSD: 4800, volumeBarHeight: 78 },
];

export const SourcingAnalyticsSection: React.FC<SourcingAnalyticsSectionProps> = ({
  orders,
  totalSourcedRMB,
  totalSourcedUSD,
  onShowToast,
  onOpenOrderDetail
}) => {
  const { t, language, translateOrderText } = useLanguage();
  const [timeInterval, setTimeInterval] = useState<TimeInterval>('Daily');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(9);
  const [isIntervalDropdownOpen, setIsIntervalDropdownOpen] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on mobile to make active point or timeline range immediately visible
  useEffect(() => {
    if (chartScrollRef.current) {
      const el = chartScrollRef.current;
      if (el.scrollWidth > el.clientWidth) {
        if (safeHoveredIndex !== null && pointsFulfilled[safeHoveredIndex]) {
          const targetX = (pointsFulfilled[safeHoveredIndex].x / chartWidth) * el.scrollWidth;
          el.scrollLeft = Math.max(0, targetX - el.clientWidth / 2);
        } else {
          el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.4;
        }
      }
    }
  }, [timeInterval]);

  // Global listener to dismiss tooltip whenever clicking anywhere outside the chart component
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent | TouchEvent) => {
      if (chartContainerRef.current && !chartContainerRef.current.contains(e.target as Node)) {
        setHoveredIndex(null);
      }
    };
    document.addEventListener('pointerdown', handleGlobalClick);
    return () => {
      document.removeEventListener('pointerdown', handleGlobalClick);
    };
  }, []);
  const [mapMode, setMapMode] = useState<'map' | 'satellite'>('map');
  const [showShipmentMenu, setShowShipmentMenu] = useState(false);
  const [activeShipmentIndex, setActiveShipmentIndex] = useState(0);
  const [showShipmentsDrawer, setShowShipmentsDrawer] = useState(false);
  const [drawerFilter, setDrawerFilter] = useState<'all' | 'air' | 'sea'>('all');
  const [drawerSearch, setDrawerSearch] = useState('');

  // Active tracked shipments matching the Proc360 logistics OS
  const activeShipments = [
    {
      id: '#170845-25-800NYK',
      internalId: 'P360-84920',
      title: language === 'zh' ? 'CNC 铝合金客制化机械键盘 (第2批次)' : 'CNC Aluminum Mechanical Keyboards (Batch #2)',
      type: 'air' as const,
      carrier: language === 'zh' ? '顺丰国际空运特快专线' : 'SF International Air Express',
      carrierShort: 'SF Express Air',
      origin: language === 'zh' ? '广东集拼中心 (东莞仓)' : 'Guangdong Consolidation Hub, Dongguan',
      destination: language === 'zh' ? '美国 洛杉矶仓库' : 'Los Angeles, CA, USA',
      status: language === 'zh' ? '干线在途' : 'In transit',
      statusColor: 'text-[#E35D3B]',
      eta: '28 Aug 2026',
      weight: '42.8 kg',
      volume: '0.24 CBM',
      cartons: language === 'zh' ? '3箱 (共50套)' : '3 Master Cartons (50 units)',
      hubBay: language === 'zh' ? '东莞集运仓 4B库区' : 'Dongguan Hub Bay 4B',
      customsStatus: language === 'zh' ? '双清包税 (DDP已放行)' : 'DDP Cleared & Duty Paid',
      packagingType: language === 'zh' ? '加厚五层箱 • 防潮气柱' : 'Reinforced 5-Ply • Air Cushion',
      timeline: [
        { 
          label: language === 'zh' ? '末端派送' : 'Delivered', 
          subtext: language === 'zh' ? '预计 2026年8月28日 送达' : 'Estimated 28 Aug 2026', 
          time: '10:20 AM', 
          completed: false, 
          isEstimate: true 
        },
        { 
          label: language === 'zh' ? '国际航班在途' : 'In Transit', 
          subtext: '27 Aug 2026', 
          time: '09:15 AM', 
          completed: true 
        },
        { 
          label: language === 'zh' ? '出口海关分拨中心' : 'In Sorting Centre', 
          subtext: '26 Aug 2026', 
          time: '06:21 AM', 
          completed: true 
        },
        { 
          label: language === 'zh' ? '拼箱已封单' : 'Order Confirmed', 
          subtext: '25 Aug 2026', 
          time: '06:21 AM', 
          completed: true 
        },
      ]
    },
    {
      id: '#194820-99-410LAX',
      internalId: 'P360-84917',
      title: language === 'zh' ? '人体工学桌面配件与线槽' : 'Ergonomic Desk Accessories & Cable Rigs',
      type: 'sea' as const,
      carrier: language === 'zh' ? '美森快船加急海运 (CLX)' : 'Matson Sea Expedited (CLX)',
      carrierShort: 'Matson Sea (CLX)',
      origin: language === 'zh' ? '深圳盐田码头出口仓' : 'Shenzhen Yantian Terminal',
      destination: language === 'zh' ? '长滩港 -> 内陆集运仓' : 'Long Beach Port -> Inland Hub',
      status: language === 'zh' ? '海运在途' : 'In transit',
      statusColor: 'text-[#E35D3B]',
      eta: '04 Sep 2026',
      weight: '112.5 kg',
      volume: '0.85 CBM',
      cartons: language === 'zh' ? '6箱 (共200件)' : '6 Master Cartons (200 units)',
      hubBay: language === 'zh' ? '深圳盐田仓 2A库区' : 'Shenzhen Bay 2A',
      customsStatus: language === 'zh' ? '海关查验放行 • 美森快船' : 'Customs Cleared • Matson CLX',
      packagingType: language === 'zh' ? '护角加固 • 熏蒸托盘' : 'Corner Guards • Fumigated Pallet',
      timeline: [
        { 
          label: language === 'zh' ? '码头卸船派送' : 'Delivered', 
          subtext: language === 'zh' ? '预计 2026年9月4日 到港' : 'Estimated 04 Sep 2026', 
          time: '02:00 PM', 
          completed: false, 
          isEstimate: true 
        },
        { 
          label: language === 'zh' ? '美森快船太平洋航行中' : 'Vessel In Pacific Transit', 
          subtext: '30 Aug 2026', 
          time: '11:40 AM', 
          completed: true 
        },
        { 
          label: language === 'zh' ? '盐田海关查验放行' : 'Customs Cleared at Yantian', 
          subtext: '26 Aug 2026', 
          time: '04:15 PM', 
          completed: true 
        },
        { 
          label: language === 'zh' ? '集装箱已封柜装船' : 'Container Sealed & Loaded', 
          subtext: '24 Aug 2026', 
          time: '08:30 AM', 
          completed: true 
        },
      ]
    },
    {
      id: '#205118-14-620ORD',
      internalId: 'P360-84915',
      title: language === 'zh' ? '阳极氧化铝 CNC 外壳总成' : 'Anodized Aluminum CNC Enclosures',
      type: 'air' as const,
      carrier: language === 'zh' ? 'DHL 国际特快专递' : 'DHL Express Priority',
      carrierShort: 'DHL Express',
      origin: language === 'zh' ? '上海浦东转运中心' : 'Shanghai Pudong Hub',
      destination: language === 'zh' ? '美国 芝加哥中转分拨点' : 'Chicago, IL, USA',
      status: language === 'zh' ? '派送中' : 'Out for delivery',
      statusColor: 'text-emerald-600',
      eta: '28 Aug 2026',
      weight: '28.4 kg',
      volume: '0.15 CBM',
      cartons: language === 'zh' ? '2箱 (共30套)' : '2 Master Cartons (30 units)',
      hubBay: language === 'zh' ? '上海浦东仓 1C库区' : 'Shanghai Hub Bay 1C',
      customsStatus: language === 'zh' ? '出口查验放行' : 'Customs Cleared',
      packagingType: language === 'zh' ? '防静电珍珠棉封装' : 'Anti-Static Foam Casing',
      timeline: [
        { 
          label: language === 'zh' ? '派送员上门派送中' : 'Out for Delivery', 
          subtext: '28 Aug 2026', 
          time: '08:45 AM', 
          completed: true 
        },
        { 
          label: language === 'zh' ? '抵达芝加哥分拨枢纽' : 'Arrived at Chicago Hub', 
          subtext: '27 Aug 2026', 
          time: '11:20 PM', 
          completed: true 
        },
        { 
          label: language === 'zh' ? '完成清关检查' : 'Customs Cleared', 
          subtext: '26 Aug 2026', 
          time: '03:10 PM', 
          completed: true 
        },
        { 
          label: language === 'zh' ? '浦东机场启运' : 'Departed Shanghai PVG', 
          subtext: '25 Aug 2026', 
          time: '09:00 AM', 
          completed: true 
        },
      ]
    }
  ];

  const currentShipment = activeShipments[activeShipmentIndex];

  // Dynamic dataset based on selected interval
  const currentData = timeInterval === 'Daily' ? DAILY_DATA : timeInterval === 'Weekly' ? WEEKLY_DATA : MONTHLY_DATA;
  const safeHoveredIndex = hoveredIndex !== null ? Math.min(hoveredIndex, currentData.length - 1) : null;
  const activePoint = safeHoveredIndex !== null ? currentData[safeHoveredIndex] : null;

  // SVG Chart coordinate configuration matching image.png exactly
  const chartWidth = 840;
  const chartHeight = 240;
  const paddingLeft = 36;
  const paddingRight = 48; // Room for dashed vertical line and "PROJECT START" label
  const paddingTop = 20;
  const paddingBottom = 32;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;
  const chartBaselineY = chartHeight - paddingBottom;

  // Y-axis scale is 0 to 50
  const maxY = 50;
  const minY = 0;

  const pointsFulfilled = currentData.map((d, i) => {
    const x = paddingLeft + (i * plotWidth) / (currentData.length - 1);
    const y = chartBaselineY - ((Math.min(maxY, Math.max(minY, d.fulfilled)) - minY) / (maxY - minY)) * plotHeight;
    return { x, y, ...d };
  });

  const pointsCancel = currentData.map((d, i) => {
    const x = paddingLeft + (i * plotWidth) / (currentData.length - 1);
    const y = chartBaselineY - ((Math.min(maxY, Math.max(minY, d.cancel)) - minY) / (maxY - minY)) * plotHeight;
    return { x, y, ...d };
  });

  // Polyline generator with straight sharp segments (matching image.png)
  const getPolylinePath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    return pts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ');
  };

  const pathFulfilled = getPolylinePath(pointsFulfilled);
  const pathCancel = getPolylinePath(pointsCancel);
  const areaFulfilled = `${pathFulfilled} L ${pointsFulfilled[pointsFulfilled.length - 1].x.toFixed(1)},${chartBaselineY} L ${pointsFulfilled[0].x.toFixed(1)},${chartBaselineY} Z`;
  const areaCancel = `${pathCancel} L ${pointsCancel[pointsCancel.length - 1].x.toFixed(1)},${chartBaselineY} L ${pointsCancel[0].x.toFixed(1)},${chartBaselineY} Z`;

  return (
    <>
      <div className="w-full flex flex-col gap-4 sm:gap-5">
        {/* TOP ROW: 3 STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          
          {/* Card 1: Total Orders */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between relative hover:border-slate-300 transition-all group">
            {/* Header with Box Icon & Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 bg-slate-50/50">
                  <Package className="w-3.5 h-3.5 text-slate-700" />
                </div>
                <span className="text-xs font-bold text-slate-900 tracking-tight">{t.totalOrders}</span>
              </div>
              <Tooltip 
                title={t.totalOrders}
                content={language === 'zh' ? '通过 1688、淘宝及工厂直采的所有采购单累计汇总。' : "Cumulative count of all Purchase Orders routed through 1688, Taobao, and OEM factories."}
                position="bottom"
              >
                <div 
                  className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  aria-label="Total orders explanation"
                >
                  <Info className="w-3.5 h-3.5" />
                </div>
              </Tooltip>
            </div>

            {/* Metric & Mini Sparkline */}
            <div className="flex items-center justify-between mt-3">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight leading-none">
                  3,484
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-600 font-mono">
                  <span>+1.1%</span>
                  <span className="text-slate-400 font-normal font-sans text-[11px]">{t.vsLastWeek}</span>
                </div>
              </div>

              {/* Sparkline Visualizer with +$12,180 badge */}
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono font-bold text-slate-700 mb-0.5">
                  +¥12,180
                </span>
                <svg className="w-20 sm:w-24 h-8 overflow-visible" viewBox="0 0 100 30">
                  <path
                    d="M 0,20 Q 20,22 35,12 T 65,18 T 100,5"
                    fill="none"
                    stroke="#E35D3B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="5" r="2.5" fill="#E35D3B" />
                </svg>
              </div>
            </div>

            {/* Helper Bar */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>{t.all1688FactoryPos}</span>
              <span className="text-slate-400 text-[10px]">{t.activeStatus}</span>
            </div>
          </div>

          {/* Card 2: Returns / QC Issues Orders */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between relative hover:border-slate-300 transition-all group">
            {/* Header with Rotate Icon & Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl border border-rose-200/70 flex items-center justify-center text-rose-600 bg-rose-50/50">
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                </div>
                <span className="text-xs font-bold text-slate-900 tracking-tight">{t.returnsOrders}</span>
              </div>
              <Tooltip 
                title={t.returnsOrders}
                content={language === 'zh' ? '在中转仓 5 项品控中未达标并由采购专员退回 1688/工厂全额退款的人民币订单。' : "Items that failed 5-point QC at China hubs and were returned to 1688/factories for full RMB refunds before international dispatch."}
                position="bottom"
              >
                <div 
                  className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  aria-label="Returns order explanation"
                >
                  <Info className="w-3.5 h-3.5 text-[#E35D3B]" />
                </div>
              </Tooltip>
            </div>

            {/* Metric & Mini Columns */}
            <div className="flex items-center justify-between mt-3">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight leading-none">
                  978
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs font-bold text-[#E35D3B] font-mono">
                  <span>-3.3%</span>
                  <span className="text-slate-400 font-normal font-sans text-[11px]">{t.vsLastWeek}</span>
                </div>
              </div>

              {/* Mini Column Array */}
              <div className="flex items-end gap-1.5 h-8 pr-1">
                <div className="w-2.5 h-6 rounded-xs bg-slate-100" />
                <div className="w-2.5 h-7 rounded-xs bg-slate-100" />
                <div className="w-2.5 h-8 rounded-xs bg-[#E35D3B]" />
                <div className="w-2.5 h-7 rounded-xs bg-slate-100" />
                <div className="w-2.5 h-6 rounded-xs bg-slate-100" />
              </div>
            </div>

            {/* Helper Bar */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate pr-1">
                {t.returnsOrdersDesc}
              </span>
              <span className="text-emerald-600 font-semibold text-[10px]">{t.escrow100}</span>
            </div>
          </div>

          {/* Card 3: Fulfilled Orders & QC Satisfaction */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between relative hover:border-slate-300 transition-all group">
            {/* Header with Checkmark Icon & Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl border border-emerald-200/70 flex items-center justify-center text-emerald-600 bg-emerald-50/50">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-slate-900 tracking-tight">{t.fulfilledOrders}</span>
              </div>
              <Tooltip 
                title={t.fulfilledOrders}
                content={language === 'zh' ? '302 笔订单已完成 5 项品控并打包入库；184 笔正在中转仓进行实物核验。' : "302 orders verified via 5-point QC inspection and packed for export; 184 in active inspection."}
                position="bottom"
              >
                <div 
                  className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  aria-label="Fulfilled orders explanation"
                >
                  <Info className="w-3.5 h-3.5" />
                </div>
              </Tooltip>
            </div>

            {/* Split Progress Columns with Clear Contextual Labels */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              {/* Passed QC / Satisfied (Green) */}
              <div className="bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-100/80">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-emerald-800 font-bold">{t.passedQc}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-md">62%</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-mono leading-none mt-1.5">
                  302 <span className="text-[11px] font-sans font-normal text-emerald-700">{t.poUnit}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-emerald-200 mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[62%]" />
                </div>
              </div>

              {/* In Inspection / Pending (Amber/Yellow) */}
              <div className="bg-amber-50/50 p-2.5 rounded-2xl border border-amber-100/80">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-amber-800 font-bold">{t.inQcQueue}</span>
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded-md">38%</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-950 font-mono leading-none mt-1.5">
                  184 <span className="text-[11px] font-sans font-normal text-amber-700">{t.poUnit}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-amber-200 mt-2 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[38%]" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ROW: ORDER ANALYSIS GRAPH (LEFT) + TRACK ORDERS (RIGHT) */}
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5">
          {/* LEFT: ORDER ANALYSIS CHART (THE GRAPH) */}
          <div className="flex-1 min-w-0 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs relative flex flex-col justify-between gap-3">
          {/* Header Controls: Responsive Flex Wrap Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100/90">
            {/* Title & Legend Pill */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <h2 className="text-sm sm:text-base font-bold text-slate-950 tracking-tight flex items-center gap-2">
                <span>{t.orderAnalysis}</span>
              </h2>
              <Tooltip
                title={t.escrowCommitted}
                content={language === 'zh' ? '因质检次品、协议折扣或批次折损而成功由采购专员追回的人民币款项。' : "Funds reclaimed from Chinese sellers via discounts, rebates, and defective batch returns."}
                position="top"
              >
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600 bg-slate-50 hover:bg-slate-100 px-2 sm:px-2.5 py-1 rounded-xl border border-slate-200/70 cursor-pointer transition-colors shadow-2xs">
                  <span className="w-2 h-2 rounded-xs bg-slate-900 shrink-0" />
                  <span className="font-semibold text-slate-800 whitespace-nowrap">{t.reimbursedAmount}</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono hidden md:inline">{t.reimbursedAmountRmb}</span>
                </div>
              </Tooltip>
            </div>

            {/* Right Interactive Selectors: Time Interval + Line/Bar Switcher */}
            <div className="flex items-center gap-2 justify-between sm:justify-end w-full sm:w-auto">
              {/* Time Interval Dropdown */}
              <div className="relative flex-1 sm:flex-initial">
                <button
                  type="button"
                  onClick={() => setIsIntervalDropdownOpen(!isIntervalDropdownOpen)}
                  className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 transition-colors cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {timeInterval === 'Monthly' ? t.monthly : timeInterval === 'Weekly' ? t.weekly : t.daily}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>

                {isIntervalDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-30 animate-in fade-in duration-100 text-xs">
                    {(['Monthly', 'Weekly', 'Daily'] as TimeInterval[]).map((interval) => (
                      <button
                        key={interval}
                        type="button"
                        onClick={() => {
                          setTimeInterval(interval);
                          setIsIntervalDropdownOpen(false);
                          if (onShowToast) onShowToast(language === 'zh' ? `已切换为 ${interval === 'Monthly' ? '月度' : interval === 'Weekly' ? '周度' : '日度'} 采购流速视图` : `Switched view to ${interval} Sourcing Velocity`);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          timeInterval === interval ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {interval === 'Monthly' ? t.monthly : interval === 'Weekly' ? t.weekly : t.daily}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Line vs Bar Switcher */}
              <div className="flex items-center bg-slate-100/90 p-0.5 rounded-xl border border-slate-200/80 shrink-0">
                <button
                  type="button"
                  onClick={() => setChartType('line')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    chartType === 'line'
                      ? 'bg-white text-slate-950 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.line}
                </button>
                <button
                  type="button"
                  onClick={() => setChartType('bar')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    chartType === 'bar'
                      ? 'bg-white text-slate-950 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.bar}
                </button>
              </div>
            </div>
          </div>

          {/* Chart Content Area */}
          <div className="pt-0 flex-1 flex flex-col justify-between">
            {/* Chart Legend Indicators */}
            <div className="flex items-center justify-between gap-3 text-xs font-medium text-slate-600 mb-2.5 flex-wrap">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span className="font-medium text-slate-800 text-[11px] sm:text-xs">{t.fulfilledOrdersLegend}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-medium text-emerald-700 text-[11px] sm:text-xs">{t.cancelQcReturnedLegend}</span>
                </div>
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                {t.fxSpotRate}
              </div>
            </div>

            {/* Custom SVG Visualization Container */}
            <div 
              ref={chartContainerRef}
              className="relative w-full flex-1 bg-white rounded-2xl p-2 sm:p-3.5 border border-slate-200/80 select-none shadow-2xs flex flex-col justify-center"
              onClick={() => {
                // Clicking on the container background clears the tooltip
                setHoveredIndex(null);
              }}
            >
              {/* Mobile Swipe Hint */}
              <div className="flex sm:hidden items-center justify-between px-1 pb-2 text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <span>←</span>
                  <span>{language === 'zh' ? '滑动查看完整采购周期' : 'Swipe to explore all dates'}</span>
                  <span>→</span>
                </span>
                <span className="text-slate-500 font-semibold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/70">
                  {currentData[0]?.label} – {currentData[currentData.length - 1]?.label}
                </span>
              </div>

              {/* Main Chart Graphic Canvas (Fully Responsive with Touch Pan on Mobile) */}
              <div 
                ref={chartScrollRef}
                className="relative w-full overflow-x-auto overflow-y-visible scrollbar-none sm:overflow-visible -mx-0.5 px-0.5 touch-pan-x"
              >
                <div className="min-w-[620px] sm:min-w-full relative h-[230px] xs:h-[250px] sm:h-[285px] md:h-[310px] lg:h-[330px]">
                {chartType === 'line' ? (
                  <svg 
                    className="w-full h-full block cursor-pointer" 
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                    preserveAspectRatio="none"
                    onClick={() => setHoveredIndex(null)}
                  >
                    <defs>
                      {/* Subtle Blue Area Gradient */}
                      <linearGradient id="blueAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.14" />
                        <stop offset="75%" stopColor="#2563EB" stopOpacity="0.02" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>

                      {/* Subtle Green Area Gradient */}
                      <linearGradient id="greenAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
                        <stop offset="75%" stopColor="#10B981" stopOpacity="0.02" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Full-canvas clickable backdrop to dismiss tooltip when clicking empty space */}
                    <rect
                      x={0}
                      y={0}
                      width={chartWidth}
                      height={chartHeight}
                      fill="transparent"
                      onClick={() => setHoveredIndex(null)}
                    />

                    {/* Horizontal Grid Lines & Y-Axis Reference Guides (50, 40, 30, 20, 10, 0) */}
                    {[50, 40, 30, 20, 10, 0].map((val) => {
                      const y = chartBaselineY - (val / 50) * plotHeight;
                      return (
                        <g key={`y-grid-${val}`}>
                          <line
                            x1={paddingLeft}
                            y1={y}
                            x2={chartWidth - paddingRight + 12}
                            y2={y}
                            stroke="#E2E8F0"
                            strokeWidth="1"
                          />
                          <text
                            x={paddingLeft - 8}
                            y={y + 3.5}
                            textAnchor="end"
                            fill="#94A3B8"
                            fontSize="11"
                            fontWeight="500"
                            fontFamily="system-ui, sans-serif"
                          >
                            {val}
                          </text>
                        </g>
                      );
                    })}

                    {/* Vertical Grid Lines aligned with each X-axis data column */}
                    {pointsFulfilled.map((pt, i) => (
                      <line
                        key={`x-grid-${pt.label}-${i}`}
                        x1={pt.x}
                        y1={paddingTop}
                        x2={pt.x}
                        y2={chartBaselineY}
                        stroke="#E2E8F0"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Subtle Gradient Area Fills underneath both curves */}
                    <path d={areaCancel} fill="url(#greenAreaGrad)" />
                    <path d={areaFulfilled} fill="url(#blueAreaGrad)" />

                    {/* Green Series Polyline (QC Returns & Reimbursed) */}
                    <path
                      d={pathCancel}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Blue Series Polyline (Procurement & Fulfilled Orders) */}
                    <path
                      d={pathFulfilled}
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Right Milestone Boundary (Vertical dashed line with label matching image) */}
                    {pointsFulfilled.length > 0 && (
                      <g>
                        <line
                          x1={pointsFulfilled[pointsFulfilled.length - 1].x + 14}
                          y1={paddingTop}
                          x2={pointsFulfilled[pointsFulfilled.length - 1].x + 14}
                          y2={chartBaselineY}
                          stroke="#CBD5E1"
                          strokeWidth="1.2"
                          strokeDasharray="3 3"
                        />
                        <text
                          x={pointsFulfilled[pointsFulfilled.length - 1].x + 26}
                          y={(paddingTop + chartBaselineY) / 2}
                          transform={`rotate(-90 ${pointsFulfilled[pointsFulfilled.length - 1].x + 26} ${(paddingTop + chartBaselineY) / 2})`}
                          textAnchor="middle"
                          fill="#94A3B8"
                          fontSize="9"
                          fontWeight="600"
                          letterSpacing="0.1em"
                        >
                          PROJECT START
                        </text>
                      </g>
                    )}

                    {/* Green Series Circular Data Nodes */}
                    {pointsCancel.map((pt, i) => (
                      <circle
                        key={`green-node-${pt.label}-${i}`}
                        cx={pt.x}
                        cy={pt.y}
                        r={safeHoveredIndex === i ? 4.8 : 3.5}
                        fill="#FFFFFF"
                        stroke="#10B981"
                        strokeWidth={safeHoveredIndex === i ? 2.4 : 1.8}
                      />
                    ))}

                    {/* Blue Series Circular Data Nodes */}
                    {pointsFulfilled.map((pt, i) => (
                      <circle
                        key={`blue-node-${pt.label}-${i}`}
                        cx={pt.x}
                        cy={pt.y}
                        r={safeHoveredIndex === i ? 4.8 : 3.5}
                        fill="#FFFFFF"
                        stroke="#2563EB"
                        strokeWidth={safeHoveredIndex === i ? 2.4 : 1.8}
                      />
                    ))}

                    {/* Active Vertical Crosshair & Mouse Cursor Pointer (matching reference screenshot) */}
                    {safeHoveredIndex !== null && pointsFulfilled[safeHoveredIndex] && (
                      <g>
                        <line
                          x1={pointsFulfilled[safeHoveredIndex].x}
                          y1={paddingTop}
                          x2={pointsFulfilled[safeHoveredIndex].x}
                          y2={chartBaselineY}
                          stroke="#1E3A8A"
                          strokeWidth="2"
                          opacity="0.95"
                        />
                        {/* Mouse cursor pointer icon positioned at intersection on green line */}
                        <g transform={`translate(${pointsFulfilled[safeHoveredIndex].x - 1}, ${pointsCancel[safeHoveredIndex].y - 2})`}>
                          <path
                            d="M0,0 L0,13 L3,10 L5.5,15 L7.5,14 L5,9 L9.5,9 Z"
                            fill="#FFFFFF"
                            stroke="#1E293B"
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                          />
                        </g>
                      </g>
                    )}

                    {/* X-Axis Ticks & Date Labels at bottom */}
                    {pointsFulfilled.map((pt, i) => {
                      const isHovered = safeHoveredIndex === i;
                      return (
                        <g key={`x-tick-${pt.label}-${i}`}>
                          <line
                            x1={pt.x}
                            y1={chartBaselineY}
                            x2={pt.x}
                            y2={chartBaselineY + 4}
                            stroke="#CBD5E1"
                            strokeWidth="1"
                          />
                          <text
                            x={pt.x}
                            y={chartBaselineY + 18}
                            textAnchor="middle"
                            fill={isHovered ? '#0F172A' : '#64748B'}
                            fontSize="11"
                            fontWeight={isHovered ? '700' : '500'}
                            fontFamily="system-ui, sans-serif"
                          >
                            {pt.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* Interactive Column Hover Hit Areas */}
                    {pointsFulfilled.map((pt, i) => {
                      const colWidth = plotWidth / Math.max(1, currentData.length - 1);
                      return (
                        <rect
                          key={`hit-${pt.label}-${i}`}
                          x={pt.x - colWidth / 2}
                          y={paddingTop}
                          width={colWidth}
                          height={plotHeight + 32}
                          fill="transparent"
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredIndex(i)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setHoveredIndex((prev) => (prev === i ? null : i));
                            if (hoveredIndex !== i && onShowToast) {
                              onShowToast(`${pt.label} Sourcing Velocity: ${pt.dealsBlue} deals (${pt.fulfilledValUSD.toLocaleString()} USD) • QC Claims: ${pt.dealsGreen} deals`);
                            }
                          }}
                        />
                      );
                    })}
                  </svg>
                ) : (
                  /* Volume Bar Chart View (Synchronized with Blue & Green Palette) */
                  <div 
                    className="w-full h-full flex items-end justify-between px-2 sm:px-6 pb-1 pt-2 cursor-pointer"
                    onClick={() => setHoveredIndex(null)}
                  >
                    {currentData.map((d, i) => {
                      const isHovered = safeHoveredIndex === i;
                      const fulfilledHeightPercent = (d.fulfilled / maxY) * 100;
                      const cancelHeightPercent = (d.cancel / maxY) * 100;
                      return (
                        <div
                          key={`bar-${d.label}-${i}`}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            setHoveredIndex(i);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setHoveredIndex((prev) => (prev === i ? null : i));
                            if (hoveredIndex !== i && onShowToast) {
                              onShowToast(`${d.label} Deals: ${d.dealsBlue} fulfilled / ${d.dealsGreen} QC claims`);
                            }
                          }}
                          className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer flex-1 max-w-[56px]"
                        >
                          <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-[160px] sm:h-[190px] w-full">
                            {/* Fulfilled Bar (Blue) */}
                            <div
                              style={{ height: `${Math.max(fulfilledHeightPercent, 6)}%` }}
                              className={`w-3 sm:w-4 rounded-t transition-all ${
                                isHovered ? 'bg-blue-600 shadow-md scale-y-[1.02]' : 'bg-blue-600/85 group-hover:bg-blue-600'
                              }`}
                            />
                            {/* Cancel / QC Bar (Green) */}
                            <div
                              style={{ height: `${Math.max(cancelHeightPercent, 4)}%` }}
                              className={`w-2.5 sm:w-3 rounded-t transition-all ${
                                isHovered ? 'bg-emerald-500 shadow-xs' : 'bg-emerald-500/75 group-hover:bg-emerald-500'
                              }`}
                            />
                          </div>

                          {/* Label directly under Bar */}
                          <div className={`px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold font-mono transition-all ${
                            isHovered ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500 group-hover:text-slate-800'
                          }`}>
                            {d.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Floating Tooltip Card (Styled matching reference image) */}
                <AnimatePresence>
                  {safeHoveredIndex !== null && activePoint && (() => {
                    const currentPt = pointsFulfilled[safeHoveredIndex] || pointsFulfilled[0];
                    const xRatio = currentPt ? currentPt.x / chartWidth : 0.5;
                    const isRightSide = xRatio > 0.5;

                    return (
                      <motion.div 
                        key={`tooltip-${safeHoveredIndex}`}
                        initial={{ opacity: 0, scale: 0.95, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 4 }}
                        transition={{ duration: 0.12 }}
                        style={{
                          left: isRightSide ? 'auto' : `${Math.max(1, Math.min(94, xRatio * 100 + 2))}%`,
                          right: isRightSide ? `${Math.max(1, Math.min(94, (1 - xRatio) * 100 + 2))}%` : 'auto',
                          top: '6%',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setHoveredIndex(null);
                        }}
                        className="absolute z-30 bg-white text-slate-900 border border-slate-200/90 rounded-xl p-3 shadow-xl shadow-slate-900/10 pointer-events-auto cursor-pointer w-[210px] sm:w-[245px] max-w-[calc(100vw-40px)]"
                      >
                        <div className="text-[10px] font-bold text-slate-700 tracking-wider uppercase mb-2 pb-1.5 border-b border-slate-100 flex items-center justify-between">
                          <span className="truncate mr-1.5">{safeHoveredIndex === 9 ? '5 DAYS BEFORE START' : `${activePoint.label} • SOURCING`}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[9px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">● ACTIVE</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setHoveredIndex(null);
                              }}
                              className="w-4 h-4 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                              title="Close tooltip"
                              aria-label="Close tooltip"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          {/* Series 1 (Blue) */}
                          <div>
                            <div className="text-[11px] font-bold text-slate-900 leading-tight">
                              {language === 'zh' ? '采购订单 (1688/工厂直采)' : 'Procurement Sourcing'}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {activePoint.label}.2026 • SF Express
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-800">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                              <span className="font-semibold text-slate-900">Deals: {activePoint.dealsBlue}</span>
                              <span className="text-[10px] text-slate-500 font-mono ml-auto">
                                ${activePoint.fulfilledValUSD.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Series 2 (Green) */}
                          <div className="pt-2 border-t border-slate-100">
                            <div className="text-[11px] font-bold text-slate-900 leading-tight">
                              {language === 'zh' ? '质检核验与退款' : 'QC Verified & Reimbursed'}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {activePoint.label}.2026 • China Hubs
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-800">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                              <span className="font-semibold text-slate-900">Deals: {activePoint.dealsGreen}</span>
                              <span className="text-[10px] text-slate-500 font-mono ml-auto">
                                ${activePoint.cancelValUSD.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Clear hint */}
                        <div className="mt-2.5 pt-1.5 text-[9px] text-slate-400 text-center font-medium border-t border-slate-100">
                          {language === 'zh' ? '点击此处或空白处关闭' : 'Click card or canvas to clear'}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
              </div>
            </div>
            </div>

            {/* Bottom Sourcing Intelligence Strip: fills vertical space and surfaces core operational KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-slate-100 mt-1 text-xs">
              <div className="bg-slate-50/90 rounded-xl p-2 sm:p-2.5 border border-slate-100/90 flex flex-col justify-between">
                <span className="text-[10px] text-slate-500 font-medium">{language === 'zh' ? '质检一次合格率' : '1st-Pass QC Rate'}</span>
                <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                  <span className="text-xs sm:text-sm font-bold text-emerald-600 font-mono">98.4%</span>
                  <span className="text-[9.5px] text-emerald-600 font-medium">↑1.2%</span>
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-xl p-2 sm:p-2.5 border border-slate-100/90 flex flex-col justify-between">
                <span className="text-[10px] text-slate-500 font-medium">{language === 'zh' ? '供应商平均入库' : 'Avg Hub Inbound'}</span>
                <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">2.4 {language === 'zh' ? '天' : 'Days'}</span>
                  <span className="text-[9.5px] text-emerald-600 font-medium">-0.4d</span>
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-xl p-2 sm:p-2.5 border border-slate-100/90 flex flex-col justify-between">
                <span className="text-[10px] text-slate-500 font-medium">{language === 'zh' ? '已追回返利/折损' : 'Reclaimed Rebates'}</span>
                <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">¥48,250</span>
                  <span className="text-[9.5px] text-slate-400 font-mono hidden xl:inline">($6.7k)</span>
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-xl p-2 sm:p-2.5 border border-slate-100/90 flex flex-col justify-between">
                <span className="text-[10px] text-slate-500 font-medium">{language === 'zh' ? '流速复合环比' : 'Sourcing Velocity'}</span>
                <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                  <span className="text-xs sm:text-sm font-bold text-blue-600 font-mono">+16.8%</span>
                  <span className="text-[9.5px] text-blue-600 font-medium">MoM</span>
                </div>
              </div>
            </div>
          </div>

        {/* RIGHT SECTION: TRACK ORDERS / SHIPMENT CARD */}
        <div className="w-full lg:w-[350px] xl:w-[370px] shrink-0 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col gap-3.5 overflow-hidden">
          
          {/* Card Header */}
          <div className="flex items-center justify-between relative pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl border border-orange-200/70 flex items-center justify-center text-[#E35D3B] bg-orange-50/50">
                <Navigation className="w-3.5 h-3.5 text-[#E35D3B]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 tracking-tight">
                    {language === 'zh' ? '在途运单跟踪' : 'Track Orders'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {currentShipment.internalId}
                </div>
              </div>
            </div>

            {/* Quick Switch Dropdown / All Shipments Drawer Trigger */}
            <div className="flex items-center gap-1">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowShipmentMenu(!showShipmentMenu)}
                  className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-mono font-medium text-slate-700 flex items-center gap-1 transition-colors"
                  title="Switch Shipment"
                >
                  <span>{currentShipment.id.slice(0, 10)}...</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showShipmentMenu && (
                  <div className="absolute right-0 top-full mt-1 w-60 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30 flex flex-col gap-1">
                    <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                      {language === 'zh' ? '切换运单' : 'Select Shipment'}
                    </div>
                    {activeShipments.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setActiveShipmentIndex(idx);
                          setShowShipmentMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex flex-col gap-0.5 transition-colors ${
                          idx === activeShipmentIndex 
                            ? 'bg-orange-50 text-[#E35D3B] font-medium' 
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-semibold">{s.id}</span>
                          <span className={`text-[10px] ${idx === activeShipmentIndex ? 'text-[#E35D3B]' : 'text-slate-400'}`}>
                            {s.carrierShort}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 truncate">{s.title}</span>
                      </button>
                    ))}
                    <div className="border-t border-slate-100 pt-1 mt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setShowShipmentMenu(false);
                          setShowShipmentsDrawer(true);
                        }}
                        className="w-full text-center py-1 text-[11px] font-medium text-[#E35D3B] hover:bg-orange-50/60 rounded-md transition-colors flex items-center justify-center gap-1"
                      >
                        <Layers className="w-3 h-3" />
                        {language === 'zh' ? '管理全部运单 (3)' : 'View All Shipments (3)'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowShipmentsDrawer(true)}
                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Open Logistics Drawer"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Route Map Graphic */}
          <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 relative overflow-hidden h-[125px] flex flex-col justify-between group">
            {/* Background grid texture */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
            
            {/* Map Mode Toggle & ETA Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 backdrop-blur-xs">
                <button
                  type="button"
                  onClick={() => setMapMode('map')}
                  className={`px-2 py-0.5 text-[9px] font-medium rounded-md transition-all ${
                    mapMode === 'map' ? 'bg-[#E35D3B] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Map
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode('satellite')}
                  className={`px-2 py-0.5 text-[9px] font-medium rounded-md transition-all ${
                    mapMode === 'satellite' ? 'bg-[#E35D3B] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Satellite
                </button>
              </div>

              <div className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-700/60 rounded-full text-[10px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ETA: {currentShipment.eta}</span>
              </div>
            </div>

            {/* Simulated Geographic Flight / Cargo Curve */}
            <div className="relative z-10 my-auto py-1">
              <svg viewBox="0 0 300 45" className="w-full h-11 overflow-visible">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E35D3B" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Background arc */}
                <path
                  d="M 30 35 Q 150 -5 270 35"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Active progress arc */}
                <path
                  d="M 30 35 Q 120 5 190 20"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Origin Pin */}
                <circle cx="30" cy="35" r="4" fill="#E35D3B" />
                <circle cx="30" cy="35" r="8" fill="#E35D3B" fillOpacity="0.2" className="animate-ping" />
                
                {/* Mid-Transit Plane / Ship Marker */}
                <g transform="translate(190, 20)">
                  <circle cx="0" cy="0" r="5" fill="#f59e0b" />
                  <circle cx="0" cy="0" r="9" fill="#f59e0b" fillOpacity="0.25" />
                </g>

                {/* Destination Pin */}
                <circle cx="270" cy="35" r="4" fill="#10b981" />
              </svg>
            </div>

            {/* Origin & Destination Labels */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-300">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#E35D3B]" />
                <span className="truncate max-w-[120px]">{currentShipment.origin.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-500">➔</span>
                <span className="truncate max-w-[120px] text-right">{currentShipment.destination.split(' ')[0]}</span>
                <MapPin className="w-3 h-3 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Current Shipment Details Pill & Carrier */}
          <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {currentShipment.title}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-1.5">
                  <span>{currentShipment.carrier}</span>
                  <span>•</span>
                  <span>{currentShipment.cartons}</span>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide shrink-0 ${
                currentShipment.statusColor === 'text-emerald-600'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                  : 'bg-orange-50 text-[#E35D3B] border border-orange-200/80'
              }`}>
                {currentShipment.status}
              </span>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-[10px]">
              <div>
                <span className="text-slate-400 block">{language === 'zh' ? '重量 / 体积' : 'Weight / Vol'}</span>
                <span className="font-mono font-medium text-slate-800">{currentShipment.weight} • {currentShipment.volume}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{language === 'zh' ? '报关 / 包装' : 'Customs / Packaging'}</span>
                <span className="font-medium text-slate-800 truncate block" title={currentShipment.customsStatus}>
                  {currentShipment.customsStatus.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Milestone Delivery Timeline */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {language === 'zh' ? '运输节点时效' : 'Delivery Progress'}
            </div>

            <div className="relative flex flex-col gap-2.5 ml-1">
              {/* Vertical connecting line - perfectly centered with circles */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] -translate-x-1/2 bg-slate-200" />

              {currentShipment.timeline.map((step, sIdx) => {
                const isFirst = sIdx === 0;
                return (
                  <div key={sIdx} className="relative flex items-start justify-between text-xs group pl-6">
                    {/* Node Dot - anchored to exact same center as the vertical line */}
                    <div className={`absolute left-[7px] -translate-x-1/2 top-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      step.completed 
                        ? 'bg-emerald-500 border-white text-white shadow-xs' 
                        : isFirst 
                          ? 'bg-orange-500 border-white text-white animate-pulse' 
                          : 'bg-slate-100 border-slate-300 text-transparent'
                    }`}>
                      {step.completed && <Check className="w-2 h-2" />}
                    </div>

                    <div className="min-w-0 pr-2">
                      <div className={`text-xs leading-tight font-medium ${
                        step.completed ? 'text-slate-800' : isFirst ? 'text-[#E35D3B] font-semibold' : 'text-slate-400'
                      }`}>
                        {step.label}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {step.subtext}
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 shrink-0">
                      {step.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-auto">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(currentShipment.id);
                onShowToast?.(language === 'zh' ? `已复制单号: ${currentShipment.id}` : `Copied tracking ID: ${currentShipment.id}`);
              }}
              className="flex-1 py-1.5 px-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'zh' ? '复制单号' : 'Copy Tracking'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowShipmentsDrawer(true)}
              className="py-1.5 px-3 bg-[#E35D3B] hover:bg-[#d04f2f] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'zh' ? '查看全部' : 'View All'}</span>
            </button>
          </div>

        </div> {/* Closes RIGHT SECTION */}
      </div> {/* Closes ROW WITH GRAPH + TRACK ORDERS */}
      </div> {/* Closes OUTER CONTAINER */}

      {/* SLIDE-OVER SHIPMENTS DRAWER */}
      <AnimatePresence>
        {showShipmentsDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShipmentsDrawer(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-slate-200"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'zh' ? '在途采购运单库' : 'Tracked Sourced Shipments'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'zh' ? '共 3 笔跨国在途物流运单已同步' : '3 international freight shipments active'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowShipmentsDrawer(false)}
                  className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Tabs & Search */}
              <div className="p-4 border-b border-slate-100 flex flex-col gap-3 bg-slate-50/50">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={drawerSearch}
                    onChange={(e) => setDrawerSearch(e.target.value)}
                    placeholder={language === 'zh' ? '搜索运单号、品名或承运商...' : 'Search by ID, product or carrier...'}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E35D3B] text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDrawerFilter('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      drawerFilter === 'all' 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {language === 'zh' ? '全部 (3)' : 'All (3)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerFilter('air')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                      drawerFilter === 'air' 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Plane className="w-3 h-3" />
                    {language === 'zh' ? '国际空运 (2)' : 'Air Freight (2)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerFilter('sea')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                      drawerFilter === 'sea' 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Anchor className="w-3 h-3" />
                    {language === 'zh' ? '快船海运 (1)' : 'Ocean Freight (1)'}
                  </button>
                </div>
              </div>

              {/* Shipments List */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {activeShipments
                  .filter(s => {
                    if (drawerFilter !== 'all' && s.type !== drawerFilter) return false;
                    if (drawerSearch.trim()) {
                      const query = drawerSearch.toLowerCase();
                      return s.id.toLowerCase().includes(query) || 
                             s.title.toLowerCase().includes(query) || 
                             s.carrier.toLowerCase().includes(query);
                    }
                    return true;
                  })
                  .map((shipment) => {
                    const originalIndex = activeShipments.findIndex(s => s.id === shipment.id);
                    const isSelected = originalIndex === activeShipmentIndex;
                    return (
                      <div
                        key={shipment.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isSelected 
                            ? 'bg-orange-50/40 border-orange-200 shadow-xs' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-900">{shipment.id}</span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                                shipment.statusColor === 'text-emerald-600'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-orange-100 text-[#E35D3B]'
                              }`}>
                                {shipment.status}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-800 mt-1">{shipment.title}</h4>
                          </div>

                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {shipment.internalId}
                          </span>
                        </div>

                        <div className="mt-2.5 text-xs text-slate-600 flex flex-col gap-1 bg-slate-50 p-2.5 rounded-xl">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">{language === 'zh' ? '起运 -> 目的仓' : 'Route'}:</span>
                            <span className="font-medium text-slate-800 truncate max-w-[200px]">
                              {shipment.origin.split(' ')[0]} ➔ {shipment.destination.split(' ')[0]}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">{language === 'zh' ? '承运渠道' : 'Carrier'}:</span>
                            <span className="font-medium text-slate-800">{shipment.carrier}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">{language === 'zh' ? '预计送达' : 'Estimated ETA'}:</span>
                            <span className="font-mono font-semibold text-emerald-600">{shipment.eta}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">{language === 'zh' ? '货重与体积' : 'Cargo Specs'}:</span>
                            <span className="font-mono text-slate-700">{shipment.weight} • {shipment.volume} • {shipment.cartons}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(shipment.id);
                              onShowToast?.(`Copied ${shipment.id}`);
                            }}
                            className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{language === 'zh' ? '复制单号' : 'Copy ID'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveShipmentIndex(originalIndex);
                              setShowShipmentsDrawer(false);
                              onShowToast?.(language === 'zh' ? `已切换至运单 ${shipment.id}` : `Viewing shipment ${shipment.id}`);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                              isSelected
                                ? 'bg-orange-100 text-[#E35D3B]'
                                : 'bg-[#E35D3B] hover:bg-[#d04f2f] text-white'
                            }`}
                          >
                            {isSelected ? (language === 'zh' ? '正在查看' : 'Viewing') : (language === 'zh' ? '查看此单' : 'Track Order')}
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
