import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  RotateCcw, 
  CheckCircle, 
  Info, 
  MoreVertical, 
  Calendar, 
  Check, 
  ExternalLink,
  ChevronDown,
  Copy,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  DollarSign,
  Truck,
  Navigation,
  Box,
  Layers,
  Headphones,
  FileText,
  X,
  ChevronRight,
  ArrowRight,
  Search
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

interface MonthlyDataPoint {
  month: string;
  fulfilled: number;
  fulfilledValUSD: number;
  fulfilledValRMB: number;
  cancel: number;
  cancelValUSD: number;
  volumeBarHeight: number; // percentage
}

const MONTHLY_DATA: MonthlyDataPoint[] = [
  { month: 'Jan', fulfilled: 210, fulfilledValUSD: 6800, fulfilledValRMB: 49232, cancel: 45, cancelValUSD: 3400, volumeBarHeight: 35 },
  { month: 'Feb', fulfilled: 245, fulfilledValUSD: 7400, fulfilledValRMB: 53576, cancel: 50, cancelValUSD: 3900, volumeBarHeight: 45 },
  { month: 'Mar', fulfilled: 290, fulfilledValUSD: 8200, fulfilledValRMB: 59368, cancel: 42, cancelValUSD: 3800, volumeBarHeight: 52 },
  { month: 'Apr', fulfilled: 260, fulfilledValUSD: 6400, fulfilledValRMB: 46336, cancel: 60, cancelValUSD: 4100, volumeBarHeight: 40 },
  { month: 'May', fulfilled: 320, fulfilledValUSD: 7800, fulfilledValRMB: 56472, cancel: 55, cancelValUSD: 4300, volumeBarHeight: 58 },
  { month: 'Jun', fulfilled: 356, fulfilledValUSD: 8900, fulfilledValRMB: 64436, cancel: 75, cancelValUSD: 5133, volumeBarHeight: 70 },
  { month: 'Jul', fulfilled: 380, fulfilledValUSD: 9400, fulfilledValRMB: 68056, cancel: 68, cancelValUSD: 4600, volumeBarHeight: 82 },
  { month: 'Aug', fulfilled: 410, fulfilledValUSD: 8600, fulfilledValRMB: 62264, cancel: 70, cancelValUSD: 4800, volumeBarHeight: 78 },
];

export const SourcingAnalyticsSection: React.FC<SourcingAnalyticsSectionProps> = ({
  orders,
  totalSourcedRMB,
  totalSourcedUSD,
  onShowToast,
  onOpenOrderDetail
}) => {
  const { t, language, translateOrderText } = useLanguage();
  const [timeInterval, setTimeInterval] = useState<TimeInterval>('Monthly');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isIntervalDropdownOpen, setIsIntervalDropdownOpen] = useState(false);
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
          completed: true, 
          isEstimate: false 
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
  const activeMonth = hoveredIndex !== null ? MONTHLY_DATA[hoveredIndex] : null;

  // SVG Chart coordinate configuration (High-res 1000x240 viewBox)
  const chartWidth = 1000;
  const chartHeight = 240;
  const paddingLeft = 55;
  const paddingRight = 45;
  const paddingTop = 25;
  const paddingBottom = 35;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;
  const chartBaselineY = chartHeight - paddingBottom;

  // Max value in USD is 10,000
  const maxVal = 10000;
  const minVal = 0;

  const pointsFulfilled = MONTHLY_DATA.map((d, i) => {
    const x = paddingLeft + (i * plotWidth) / (MONTHLY_DATA.length - 1);
    const y = chartBaselineY - ((d.fulfilledValUSD - minVal) / (maxVal - minVal)) * plotHeight;
    return { x, y, ...d };
  });

  const pointsCancel = MONTHLY_DATA.map((d, i) => {
    const x = paddingLeft + (i * plotWidth) / (MONTHLY_DATA.length - 1);
    const y = chartBaselineY - ((d.cancelValUSD - minVal) / (maxVal - minVal)) * plotHeight;
    return { x, y, ...d };
  });

  // High quality Catmull-Rom to Cubic Bezier spline generator
  const getSplinePath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x},${pts[0].y}`;
    let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  };

  const pathFulfilled = getSplinePath(pointsFulfilled);
  const pathCancel = getSplinePath(pointsCancel);
  const areaFulfilled = `${pathFulfilled} L ${pointsFulfilled[pointsFulfilled.length - 1].x},${chartBaselineY} L ${pointsFulfilled[0].x},${chartBaselineY} Z`;

  return (
    <div className="w-full flex flex-col xl:flex-row items-stretch gap-4 sm:gap-5 overflow-hidden">
      {/* LEFT SECTION: 3 STAT CARDS + ORDER ANALYSIS CHART */}
      <div className="flex-1 min-w-0 flex flex-col gap-4 sm:gap-5">
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

        {/* BOTTOM ROW: ORDER ANALYSIS CHART */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs relative overflow-hidden">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
            {/* Title & Legend Pill */}
            <div className="flex items-center gap-3.5 flex-wrap">
              <h2 className="text-base font-bold text-slate-950 tracking-tight">
                {t.orderAnalysis}
              </h2>
              <Tooltip
                title={t.escrowCommitted}
                content={language === 'zh' ? '因质检次品、协议折扣或批次折损而成功由采购专员追回的人民币款项。' : "Funds reclaimed from Chinese sellers via discounts, rebates, and defective batch returns."}
                position="top"
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/60 cursor-pointer">
                  <span className="w-2.5 h-2.5 rounded-xs bg-slate-900" />
                  <span className="font-semibold text-slate-800">{t.reimbursedAmount}</span>
                  <span className="text-[11px] text-slate-400 font-mono hidden md:inline">{t.reimbursedAmountRmb}</span>
                </div>
              </Tooltip>
            </div>

            {/* Right Interactive Selectors: Time Interval + Line/Bar Switcher */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {/* Time Interval Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsIntervalDropdownOpen(!isIntervalDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {timeInterval === 'Monthly' ? t.monthly : timeInterval === 'Weekly' ? t.weekly : t.daily}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
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
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setChartType('line')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    chartType === 'line'
                      ? 'bg-white text-slate-950 shadow-2xs'
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
                      ? 'bg-white text-slate-950 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.bar}
                </button>
              </div>
            </div>
          </div>

          {/* Chart Content Area */}
          <div className="pt-2">
            {/* Chart Legend Indicators */}
            <div className="flex items-center justify-between gap-4 text-xs font-medium text-slate-600 mb-3 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-medium text-slate-800">{t.fulfilledOrdersLegend}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="font-medium text-rose-600">{t.cancelQcReturnedLegend}</span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                {t.fxSpotRate}
              </div>
            </div>

            {/* Custom SVG Visualization Container */}
            <div 
              className="relative w-full bg-slate-50/40 rounded-2xl p-2 sm:p-3 border border-slate-100/80 select-none"
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(null)}
            >
              {/* Main Chart Graphic Canvas */}
              <div className="relative w-full h-[210px] sm:h-[230px]">
                {chartType === 'line' ? (
                  <svg 
                    className="w-full h-full" 
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="fulfilledGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="60%" stopColor="#10B981" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                      <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10B981" floodOpacity="0.3" />
                      </filter>
                    </defs>

                    {/* Horizontal Grid Lines & Y-Axis Reference Guides */}
                    {[
                      { val: '$10k', rmb: '¥72.4k', y: paddingTop },
                      { val: '$7.5k', rmb: '¥54.3k', y: paddingTop + plotHeight * 0.25 },
                      { val: '$5.0k', rmb: '¥36.2k', y: paddingTop + plotHeight * 0.5 },
                      { val: '$2.5k', rmb: '¥18.1k', y: paddingTop + plotHeight * 0.75 },
                      { val: '$0k', rmb: '¥0', y: chartBaselineY },
                    ].map((grid, idx) => (
                      <g key={grid.val}>
                        <line
                          x1={paddingLeft}
                          y1={grid.y}
                          x2={chartWidth - paddingRight}
                          y2={grid.y}
                          stroke={idx === 4 ? '#cbd5e1' : '#f1f5f9'}
                          strokeWidth={idx === 4 ? '1.5' : '1'}
                          strokeDasharray={idx === 4 ? 'none' : '4 4'}
                        />
                        <text
                          x={paddingLeft - 8}
                          y={grid.y + 3.5}
                          textAnchor="end"
                          className="text-[11px] font-mono fill-slate-400 font-medium"
                        >
                          {grid.val}
                        </text>
                        <text
                          x={chartWidth - paddingRight + 8}
                          y={grid.y + 3.5}
                          textAnchor="start"
                          className="text-[10px] font-mono fill-slate-300 hidden md:block"
                        >
                          {grid.rmb}
                        </text>
                      </g>
                    ))}

                    {/* Gradient Fill under Fulfilled Line */}
                    <path
                      d={areaFulfilled}
                      fill="url(#fulfilledGrad)"
                    />

                    {/* Cancelled Curve (Red / Bad - Dashed) */}
                    <path
                      d={pathCancel}
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2.2"
                      strokeDasharray="5 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Fulfilled Curve (Emerald Green / Good - High-Precision Spline) */}
                    <path
                      d={pathFulfilled}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#shadowGlow)"
                    />

                    {/* Vertical Active Cursor Guide Line */}
                    {hoveredIndex !== null && pointsFulfilled[hoveredIndex] && (
                      <g>
                        <line
                          x1={pointsFulfilled[hoveredIndex].x}
                          y1={paddingTop}
                          x2={pointsFulfilled[hoveredIndex].x}
                          y2={chartBaselineY}
                          stroke="#10B981"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                          opacity="0.7"
                        />
                      </g>
                    )}

                    {/* Cancelled Data Points (Subtle Red Dots) */}
                    {pointsCancel.map((pt) => (
                      <g key={`cancel-${pt.month}`}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="3.5"
                          fill="#ffffff"
                          stroke="#EF4444"
                          strokeWidth="1.8"
                        />
                      </g>
                    ))}

                    {/* Fulfilled Data Points (Emerald Dual-Ring Circular Points) */}
                    {pointsFulfilled.map((pt, i) => {
                      const isHovered = hoveredIndex === i;
                      return (
                        <g 
                          key={`pt-${pt.month}`}
                          className="cursor-pointer"
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            setHoveredIndex(i);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setHoveredIndex((prev) => (prev === i ? null : i));
                            if (onShowToast) {
                              onShowToast(`${pt.month} Velocity: ${pt.fulfilled} orders ($${pt.fulfilledValUSD.toLocaleString()} / ¥${pt.fulfilledValRMB.toLocaleString()} RMB)`);
                            }
                          }}
                        >
                          {/* Invisible larger hover hit area */}
                          <rect
                            x={pt.x - 25}
                            y={paddingTop}
                            width="50"
                            height={plotHeight}
                            fill="transparent"
                          />

                          {/* Outer Pulsing Aura Ring on Active/Hovered Point */}
                          {isHovered && (
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="11"
                              fill="#10B981"
                              fillOpacity="0.25"
                              className="animate-pulse"
                            />
                          )}

                          {/* White Outer Halo Ring */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isHovered ? 6 : 4.5}
                            fill="#ffffff"
                            stroke="#10B981"
                            strokeWidth={isHovered ? 3 : 2}
                          />

                          {/* Center Solid Core Dot */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isHovered ? 2.5 : 2}
                            fill="#10B981"
                          />
                        </g>
                      );
                    })}
                  </svg>
                ) : (
                  /* Volume Bar Chart View */
                  <div className="w-full h-full flex items-end justify-between px-8 sm:px-12 pb-2">
                    {MONTHLY_DATA.map((d, i) => {
                      const isHovered = hoveredIndex === i;
                      const fulfilledHeightPercent = (d.fulfilledValUSD / maxVal) * 100;
                      const cancelHeightPercent = (d.cancelValUSD / maxVal) * 100;
                      return (
                        <div
                          key={`bar-${d.month}`}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            setHoveredIndex(i);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setHoveredIndex((prev) => (prev === i ? null : i));
                          }}
                          className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                        >
                          <div className="flex items-end gap-1 h-[170px]">
                            {/* Fulfilled Bar (Green) */}
                            <div
                              style={{ height: `${fulfilledHeightPercent}%` }}
                              className={`w-3.5 sm:w-5 rounded-t-md transition-all ${
                                isHovered ? 'bg-emerald-500 shadow-md scale-y-[1.02]' : 'bg-emerald-500/80 group-hover:bg-emerald-500'
                              }`}
                            />
                            {/* Cancel / QC Bar (Red) */}
                            <div
                              style={{ height: `${cancelHeightPercent}%` }}
                              className={`w-2.5 sm:w-3.5 rounded-t-md transition-all ${
                                isHovered ? 'bg-rose-500 shadow-xs' : 'bg-rose-400/70 group-hover:bg-rose-500'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Floating Tooltip Card with Hover Entrance & Exit Animation */}
                <AnimatePresence>
                  {hoveredIndex !== null && activeMonth && (
                    <motion.div 
                      key={`tooltip-${hoveredIndex}`}
                      initial={{ opacity: 0, scale: 0.94, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: 4 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      style={{
                        left: `${((hoveredIndex) / (MONTHLY_DATA.length - 1)) * 74 + 13}%`,
                        top: '10%',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredIndex(null);
                      }}
                      className="absolute z-20 bg-slate-950/95 text-white border border-white/15 rounded-2xl p-3 shadow-2xl pointer-events-auto cursor-pointer -translate-x-1/2 min-w-[175px] backdrop-blur-md"
                    >
                      <div className="text-xs font-bold text-white mb-2 border-b border-white/10 pb-1.5 flex items-center justify-between">
                        <span>{activeMonth.month} 2026</span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">● Active</span>
                      </div>
                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex items-center justify-between gap-3 text-slate-200">
                          <span className="flex items-center gap-1.5 font-sans text-[11px] text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Fulfilled</span>
                          </span>
                          <span className="font-extrabold text-emerald-400">
                            ${activeMonth.fulfilledValUSD.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[10px] text-right text-slate-400 leading-tight">
                          ¥{activeMonth.fulfilledValRMB.toLocaleString()} RMB ({activeMonth.fulfilled} POs)
                        </div>
                        <div className="flex items-center justify-between gap-3 text-slate-300 pt-1 border-t border-white/10">
                          <span className="flex items-center gap-1.5 font-sans text-[11px] text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span>Cancel / QC</span>
                          </span>
                          <span className="font-bold text-rose-400">
                            ${activeMonth.cancelValUSD.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-white/10 text-[9px] text-slate-400 text-center font-sans">
                        Click or move away to dismiss
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dedicated X-Axis Month Markers (Cleanly separated from line graph) */}
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 pt-2.5 px-6 sm:px-10 border-t border-slate-200/60 mt-1">
                {MONTHLY_DATA.map((d, i) => {
                  const isSelected = hoveredIndex === i;
                  return (
                    <button
                      key={d.month}
                      type="button"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setHoveredIndex(i);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredIndex((prev) => (prev === i ? null : i));
                        if (onShowToast) onShowToast(`${d.month} Sourcing: ${d.fulfilled} orders fulfilled ($${d.fulfilledValUSD.toLocaleString()} / ¥${d.fulfilledValRMB.toLocaleString()} RMB)`);
                      }}
                      className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer font-medium ${
                        isSelected 
                          ? 'text-slate-950 font-bold bg-white shadow-xs border border-slate-200 scale-105' 
                          : 'hover:text-slate-900 hover:bg-slate-100/80 text-slate-500'
                      }`}
                    >
                      {d.month}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT SECTION: TRACK NEW SHIPMENT CARD */}
      <div className="w-full xl:w-[360px] shrink-0 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col gap-3.5 overflow-hidden">
        
        {/* Card Header */}
        <div className="flex items-center justify-between relative pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl border border-orange-200/70 flex items-center justify-center text-[#E35D3B] bg-orange-50/50">
              <Navigation className="w-3.5 h-3.5 text-[#E35D3B]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                {t.trackNewShipment}
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">LIVE</span>
              </h3>
            </div>
            <Tooltip 
              title={t.trackNewShipment}
              content={language === 'zh' ? '顺丰国内速运及美森海运/空运特快专线的实时 GPS 轨迹回传。' : "Live GPS telemetry for domestic SF Express pickups and international Air Express/Ocean freight."}
              position="bottom"
            >
              <div 
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                aria-label="Live GPS telemetry"
              >
                <Info className="w-3.5 h-3.5" />
              </div>
            </Tooltip>
          </div>

          {/* Action buttons in header */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveShipmentIndex((activeShipmentIndex + 1) % activeShipments.length);
                if (onShowToast) onShowToast(language === 'zh' ? '已切换至当前跟踪运单' : 'Switched to active freight waybill');
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title={t.switchActiveParcel}
              aria-label="Switch active shipment"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowShipmentMenu(!showShipmentMenu)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Shipment options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showShipmentMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-40 animate-in fade-in duration-100 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveShipmentIndex((activeShipmentIndex + 1) % activeShipments.length);
                      setShowShipmentMenu(false);
                      if (onShowToast) onShowToast(language === 'zh' ? '已切换至当前跟踪运单' : 'Switched to active freight waybill');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> {t.switchActiveParcel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowShipmentMenu(false);
                      navigator.clipboard.writeText(currentShipment.id);
                      if (onShowToast) onShowToast(language === 'zh' ? `已复制国际运单号: ${currentShipment.id}` : `Copied tracking number: ${currentShipment.id}`);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" /> {t.copyWaybillId}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Map Visualizer Container */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 h-40 shadow-inner">
          <svg className="w-full h-full absolute inset-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Map Route Graphics */}
          <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 320 160">
            <path
              d="M 40,110 Q 140,25 270,65"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 40,110 Q 110,55 170,45"
              fill="none"
              stroke="#E35D3B"
              strokeWidth="3"
            />

            <g transform="translate(40, 110)">
              <circle r="5" fill="#10b981" />
              <circle r="9" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping opacity-60" />
            </g>

            <g transform="translate(170, 45)">
              <circle r="6" fill="#E35D3B" />
              <circle r="11" fill="none" stroke="#E35D3B" strokeWidth="2" className="animate-ping" />
            </g>

            <g transform="translate(270, 65)">
              <circle r="5" fill="#ffffff" />
            </g>
          </svg>

          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-xs border border-white/10 text-[10px] font-mono text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E35D3B] animate-pulse" />
            <span>{currentShipment.carrier.toUpperCase()}</span>
          </div>

          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-950/80 backdrop-blur-xs border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
            <span>ETA: {currentShipment.eta}</span>
          </div>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-slate-300 bg-slate-950/85 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
            <span className="truncate max-w-[100px]">{currentShipment.origin.split(',')[0]}</span>
            <span className="text-[#E35D3B] font-bold">● {t.inTransitBadge}</span>
            <span className="truncate max-w-[100px] text-right">{currentShipment.destination.split(',')[0]}</span>
          </div>
        </div>

        {/* Tracking ID & Telemetry Summary Bar */}
        <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-semibold leading-tight">{t.currentConsignment}</span>
              <span className="text-[9px] bg-slate-200 text-slate-700 px-1 py-0.2 rounded font-mono font-medium">42.8 kg</span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-950 leading-snug mt-0.5 truncate">
              {currentShipment.id}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(currentShipment.id);
              if (onShowToast) onShowToast(language === 'zh' ? `已复制国际运单号: ${currentShipment.id}` : `Copied tracking number: ${currentShipment.id}`);
            }}
            className="p-1.5 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200/80 shadow-2xs transition-all cursor-pointer shrink-0"
            title={t.copyWaybillId}
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stepper Timeline with Checkboxes */}
        <div className="space-y-2 pt-0.5 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200 -z-0" />

          {currentShipment.timeline.map((step) => (
            <div 
              key={step.label}
              className="flex items-start justify-between gap-2 relative z-10 text-xs"
            >
              {/* Checkbox indicator */}
              <div className="flex items-start gap-2.5 min-w-0">
                <div 
                  className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    step.completed
                      ? 'bg-[#E35D3B] text-white shadow-2xs'
                      : 'bg-white border-2 border-slate-300'
                  }`}
                >
                  {step.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>

                <div className="min-w-0">
                  <p className={`font-semibold leading-tight text-xs ${step.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                    {step.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5 truncate">
                    {step.subtext}
                  </p>
                </div>
              </div>

              {/* Timestamp on right */}
              <span className="text-[10px] font-mono text-slate-400 shrink-0 font-medium pt-0.5">
                {step.time}
              </span>
            </div>
          ))}
        </div>

        {/* OTHER TRACKED SHIPMENTS (Limited to 1 preview with sidebar expand trigger) */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-slate-600" />
              {language === 'zh' ? '其他在途跟踪运单' : 'Other Tracked Shipment'}
            </span>
            <button
              type="button"
              onClick={() => setShowShipmentsDrawer(true)}
              className="text-[11px] font-semibold text-[#E35D3B] hover:text-[#c4492a] flex items-center gap-0.5 cursor-pointer transition-colors"
            >
              <span>{language === 'zh' ? `查看全部 (${activeShipments.length})` : `View all (${activeShipments.length})`}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Single preview shipment */}
          {(() => {
            const previewIndex = (activeShipmentIndex + 1) % activeShipments.length;
            const previewShipment = activeShipments[previewIndex];
            return (
              <div
                onClick={() => {
                  setActiveShipmentIndex(previewIndex);
                  if (onShowToast) {
                    onShowToast(language === 'zh' ? `已切换至跟踪运单: ${previewShipment.id}` : `Tracking shipment: ${previewShipment.id}`);
                  }
                }}
                className="w-full text-left p-2.5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100/90 text-slate-700 transition-all cursor-pointer flex items-center justify-between gap-2 shadow-2xs hover:border-slate-300"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                      {previewShipment.carrierShort}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-900 truncate">
                      {previewShipment.id}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {previewShipment.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 mt-1">
                    <span>{previewShipment.origin.split(' ')[0]}</span>
                    <span>→</span>
                    <span className="truncate">{previewShipment.destination.split(',')[0]}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right flex flex-col items-end justify-between self-stretch">
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    {previewShipment.status}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    ETA: {previewShipment.eta}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>

      </div>

      {/* RIGHT SLIDE-OVER SIDEBAR DRAWER FOR ALL SHIPMENTS */}
      <AnimatePresence>
        {showShipmentsDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShipmentsDrawer(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
            />

            {/* Sidebar Slide-over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-slate-200"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#E35D3B]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      {language === 'zh' ? '在途运单与国际物流监控' : 'All Active Consignments & Tracking'}
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {activeShipments.length} LIVE
                      </span>
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      {language === 'zh' ? '顺丰空运、美森快船与特快专递实时轨迹回传' : 'Real-time GPS telemetry and freight checkpoints'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowShipmentsDrawer(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-all cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Search & Filter Chips */}
              <div className="p-4 border-b border-slate-100 space-y-2.5 bg-white">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={drawerSearch}
                    onChange={(e) => setDrawerSearch(e.target.value)}
                    placeholder={language === 'zh' ? '搜索运单号、品名或目的地...' : 'Search by waybill #, cargo title, or destination...'}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E35D3B]/20 focus:border-[#E35D3B] transition-all"
                  />
                  {drawerSearch && (
                    <button
                      type="button"
                      onClick={() => setDrawerSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setDrawerFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all cursor-pointer ${
                      drawerFilter === 'all'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {language === 'zh' ? '全部专线' : 'All Freight'} ({activeShipments.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerFilter('air')}
                    className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all cursor-pointer ${
                      drawerFilter === 'air'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {language === 'zh' ? '空运特快' : 'Air Express'} (2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerFilter('sea')}
                    className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all cursor-pointer ${
                      drawerFilter === 'sea'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {language === 'zh' ? '海运快船' : 'Sea Freight'} (1)
                  </button>
                </div>
              </div>

              {/* Drawer Content: Shipment Cards List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeShipments
                  .filter((s) => {
                    if (drawerFilter === 'air' && !s.carrier.includes('Air') && !s.carrier.includes('空运') && !s.carrier.includes('DHL')) return false;
                    if (drawerFilter === 'sea' && !s.carrier.includes('Sea') && !s.carrier.includes('海运')) return false;
                    if (drawerSearch) {
                      const query = drawerSearch.toLowerCase();
                      return (
                        s.id.toLowerCase().includes(query) ||
                        s.title.toLowerCase().includes(query) ||
                        s.destination.toLowerCase().includes(query) ||
                        s.carrier.toLowerCase().includes(query)
                      );
                    }
                    return true;
                  })
                  .map((shipment) => {
                    const origIndex = activeShipments.findIndex((x) => x.id === shipment.id);
                    const isSelected = origIndex === activeShipmentIndex;
                    return (
                      <div
                        key={shipment.id}
                        className={`rounded-2xl border p-3.5 transition-all space-y-3 ${
                          isSelected
                            ? 'bg-orange-50/40 border-orange-300 ring-1 ring-[#E35D3B]/20 shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        {/* Top info */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white">
                                {shipment.carrierShort}
                              </span>
                              <span className="text-xs font-mono font-bold text-slate-900">
                                {shipment.id}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-bold text-[#E35D3B] bg-orange-100/80 px-1.5 py-0.2 rounded">
                                  {language === 'zh' ? '主图跟踪中' : 'Active on Map'}
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-semibold text-slate-800 mt-1 leading-snug">
                              {shipment.title}
                            </h4>
                          </div>

                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                            {shipment.status}
                          </span>
                        </div>

                        {/* Route & ETA */}
                        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between text-[11px]">
                          <div className="min-w-0 pr-2">
                            <span className="text-[10px] text-slate-400 block font-medium">
                              {language === 'zh' ? '始发与目的口岸' : 'Origin → Destination'}
                            </span>
                            <span className="font-semibold text-slate-700 truncate block mt-0.5">
                              {shipment.origin.split(' ')[0]} → {shipment.destination.split(',')[0]}
                            </span>
                          </div>

                          <div className="shrink-0 text-right">
                            <span className="text-[10px] text-slate-400 block font-medium">
                              {language === 'zh' ? '预计送达' : 'Estimated ETA'}
                            </span>
                            <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                              {shipment.eta}
                            </span>
                          </div>
                        </div>

                        {/* Cargo specs */}
                        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                          <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                            <span className="text-slate-400 block">{language === 'zh' ? '毛重/体积' : 'Weight/Vol'}</span>
                            <span className="font-mono font-semibold text-slate-800 mt-0.5 block truncate">{shipment.weight}</span>
                          </div>
                          <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                            <span className="text-slate-400 block">{language === 'zh' ? '库区库位' : 'Hub Bay'}</span>
                            <span className="font-semibold text-slate-800 mt-0.5 block truncate">{shipment.hubBay.split(' ')[1] || shipment.hubBay}</span>
                          </div>
                          <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                            <span className="text-slate-400 block">{language === 'zh' ? '包装规格' : 'Cartons'}</span>
                            <span className="font-semibold text-slate-800 mt-0.5 block truncate">{shipment.cartons.split('(')[0]}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveShipmentIndex(origIndex);
                              setShowShipmentsDrawer(false);
                              if (onShowToast) {
                                onShowToast(language === 'zh' ? `已切换为主图实时跟踪: ${shipment.id}` : `Loaded live GPS telemetry on main map for ${shipment.id}`);
                              }
                            }}
                            className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-2xs'
                                : 'bg-[#E35D3B] text-white hover:bg-[#c84d2e] shadow-2xs'
                            }`}
                          >
                            <Navigation className="w-3 h-3" />
                            <span>{isSelected ? (language === 'zh' ? '正在主图跟踪中' : 'Tracking on Map') : (language === 'zh' ? '切换为主图跟踪' : 'Track on Map')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(shipment.id);
                              if (onShowToast) {
                                onShowToast(language === 'zh' ? `已复制国际运单号: ${shipment.id}` : `Copied tracking number: ${shipment.id}`);
                              }
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer"
                            title={t.copyWaybillId}
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const matchingOrder = orders.find(
                                (o) => o.orderId === shipment.internalId || (o.trackingNumber && o.trackingNumber.includes(shipment.id))
                              ) || orders[0];
                              if (onOpenOrderDetail && matchingOrder) {
                                setShowShipmentsDrawer(false);
                                onOpenOrderDetail(matchingOrder);
                              } else if (onShowToast) {
                                onShowToast(language === 'zh' ? `正在调取 ${shipment.id} 实时品控与清关档案...` : `Opening QC dossier for ${shipment.id}...`);
                              }
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer"
                            title={language === 'zh' ? '查看质检档案' : 'Inspect QC'}
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Drawer Footer Trust Banner */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  {language === 'zh' ? '全额代管担保与货运一切险已生效' : '100% Escrow & Freight Cargo Protection'}
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded">
                  SLA: 99.4%
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

