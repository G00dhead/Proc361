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
import { Roll, Count, Badge, Chip } from '../stageshow';

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
  const paddingRight = 24; // Clean symmetric right padding without old project-start text
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

  // Stageshow Readout Metrics (Rolling headline per Stageshow chart-scrub craft)
  const totalDelivered = (currentData || []).reduce((acc, d) => acc + d.dealsBlue, 0);
  const totalCancelled = (currentData || []).reduce((acc, d) => acc + d.dealsGreen, 0);

  const readoutLabel = activePoint 
    ? `${activePoint.label} • ${language === 'zh' ? '选定周期' : 'Selected Period'}`
    : `${language === 'zh' ? '全周期' : 'Full Cycle'} (${currentData.length} ${timeInterval === 'Monthly' ? (language === 'zh' ? '个月' : 'Months') : timeInterval === 'Weekly' ? (language === 'zh' ? '周' : 'Weeks') : (language === 'zh' ? '天' : 'Days')})`;

  const readoutDelivered = activePoint 
    ? `${activePoint.dealsBlue} ${language === 'zh' ? '单' : 'orders'}` 
    : `${totalDelivered.toLocaleString()} ${language === 'zh' ? '单' : 'orders'}`;

  const readoutCancelled = activePoint 
    ? `${activePoint.dealsGreen} ${language === 'zh' ? '单' : 'orders'}` 
    : `${totalCancelled.toLocaleString()} ${language === 'zh' ? '单' : 'orders'}`;

  const readoutRate = activePoint
    ? `${((activePoint.dealsBlue / (activePoint.dealsBlue + activePoint.dealsGreen || 1)) * 100).toFixed(1)}%`
    : `${((totalDelivered / (totalDelivered + totalCancelled || 1)) * 100).toFixed(1)}%`;

  // Stageshow Autoplay Choreography Loop
  const [isWalkthroughPlaying, setIsWalkthroughPlaying] = useState(false);
  const [walkthroughCursor, setWalkthroughCursor] = useState<{ x: number; y: number; clicking: boolean; label?: string } | null>(null);

  useEffect(() => {
    if (!isWalkthroughPlaying) {
      setWalkthroughCursor(null);
      return;
    }

    const steps = [
      { idx: 1, delay: 1100 },
      { idx: 3, delay: 1200 },
      { idx: 6, delay: 1300 },
      { idx: Math.min(8, pointsFulfilled.length - 1), delay: 1800, click: true },
      { idx: Math.min(11, pointsFulfilled.length - 1), delay: 1300 },
    ];

    let currentStep = 0;
    let timerId: number | null = null;

    const playNext = () => {
      if (!isWalkthroughPlaying) return;
      const step = steps[currentStep % steps.length];
      const targetIndex = Math.min(step.idx, pointsFulfilled.length - 1);
      const pt = pointsFulfilled[targetIndex];
      if (pt) {
        setHoveredIndex(targetIndex);
        setWalkthroughCursor({
          x: pt.x,
          y: pt.y,
          clicking: !!step.click,
          label: `${pt.label}: ${pt.dealsBlue} ${language === 'zh' ? '单' : 'orders'}`
        });
        if (step.click) {
          setTimeout(() => {
            setWalkthroughCursor((c) => c ? { ...c, clicking: false } : null);
          }, 400);
        }
      }
      currentStep++;
      timerId = window.setTimeout(playNext, step.delay);
    };

    playNext();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isWalkthroughPlaying, pointsFulfilled, language]);

  return (
    <>
      <div className="w-full flex flex-col gap-4 sm:gap-5">
        {/* ROW 1: TOP STATS CARDS (LEFT) + TRACK ORDERS (RIGHT) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
          
          {/* LEFT: HIERARCHICAL STATS CARDS (5 cols) - Snug & dense, eliminating empty whitespace */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between gap-3">
            {/* Card 1: Total Orders (Hero / Biggest Card in the Hierarchy) */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between relative hover:border-slate-300 transition-all">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100/90">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 bg-slate-50/80 shrink-0">
                    <Package className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-800 tracking-tight">{t.totalOrders}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[9.5px] font-medium">
                      {t.all1688FactoryPos}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="hidden sm:inline-block text-[10px] text-slate-400 font-medium">
                    {t.activeStatus}
                  </span>
                  <Tooltip 
                    title={t.totalOrders}
                    content={language === 'zh' ? '通过 1688、淘宝及工厂直采的所有采购单累计汇总。' : "Cumulative count of all Purchase Orders routed through 1688, Taobao, and OEM factories."}
                    position="bottom"
                  >
                    <div 
                      className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded-lg hover:bg-slate-100 cursor-pointer shrink-0"
                      aria-label="Total orders explanation"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </div>
                  </Tooltip>
                </div>
              </div>

              {/* Metric & Velocity Row */}
              <div className="py-2 flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight leading-none">
                      3,484
                    </div>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[10px] font-mono font-semibold">
                      +1.1%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans mt-1">
                    {t.vsLastWeek} • <span className="text-slate-700 font-medium font-mono">¥{totalSourcedRMB.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> <span className="text-slate-300">/</span> <span className="text-slate-500 font-mono">${totalSourcedUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                {/* Sparkline & Velocity Pill */}
                <div className="flex flex-col items-end shrink-0">
                  <div className="text-[9.5px] font-mono font-semibold text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/70">
                    +¥12,180/wk
                  </div>
                  <div className="mt-1">
                    <svg className="w-20 sm:w-24 h-5 overflow-visible" viewBox="0 0 100 30">
                      <path
                        d="M 0,20 Q 20,22 35,12 T 65,18 T 100,6"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="100" cy="6" r="2.5" fill="#64748b" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pipeline Status Progress (Eliminates vacant vertical space with purposeful status) */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{language === 'zh' ? '采购流转分布' : 'Pipeline Distribution'}</span>
                  <div className="flex items-center gap-2 text-[9.5px]">
                    <span className="text-slate-700 font-semibold">1,842 {language === 'zh' ? '在途' : 'Transit'}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-blue-600 font-semibold">1,156 {language === 'zh' ? '入库质检' : 'Hub QC'}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-700 font-semibold">486 {language === 'zh' ? '待发' : 'Ready'}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden flex">
                  <div className="h-full bg-slate-800 w-[53%]" title="In Transit 53%" />
                  <div className="h-full bg-blue-500 w-[33%]" title="Hub QC 33%" />
                  <div className="h-full bg-emerald-500 w-[14%]" title="Ready for Export 14%" />
                </div>
              </div>
            </div>

            {/* Sub-cards Row: Returns & Fulfilled side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
              {/* Card 2: Returns / QC Issues Orders (Secondary Compact Card) */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs flex flex-col justify-between relative hover:border-slate-300 transition-all group">
                {/* Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100/90">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 bg-slate-50/50 shrink-0">
                      <RotateCcw className="w-3 h-3 text-slate-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 tracking-tight truncate">{t.returnsOrders}</span>
                  </div>
                  <Tooltip 
                    title={t.returnsOrders}
                    content={language === 'zh' ? '在中转仓 5 项品控中未达标并由采购专员退回 1688/工厂全额退款的人民币订单。' : "Items that failed 5-point QC at China hubs and were returned to 1688/factories for full RMB refunds before international dispatch."}
                    position="bottom"
                  >
                    <div 
                      className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded hover:bg-slate-100 cursor-pointer shrink-0"
                      aria-label="Returns order explanation"
                    >
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                  </Tooltip>
                </div>

                {/* Metric Section */}
                <div className="py-1.5">
                  <div className="flex items-baseline justify-between gap-1">
                    <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight leading-none">
                      978
                    </div>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-600 border border-rose-200/70 text-[10px] font-mono font-semibold shrink-0">
                      -3.3%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-sans">
                    <span>{t.vsLastWeek}</span>
                    <span className="font-mono text-emerald-700 font-semibold bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200/50">
                      ¥48,250 {language === 'zh' ? '已退' : 'Ref.'}
                    </span>
                  </div>
                </div>

                {/* Helper Bar */}
                <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate pr-1 text-slate-600">
                    {language === 'zh' ? '次品拦截' : 'QC Catch'} <strong className="font-mono text-slate-800">99.4%</strong>
                  </span>
                  <span className="text-emerald-700 font-medium text-[9.5px] shrink-0 font-mono">{t.escrow100}</span>
                </div>
              </div>

              {/* Card 3: Fulfilled Orders & QC Satisfaction (Secondary Compact Card) */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs flex flex-col justify-between relative hover:border-slate-300 transition-all group">
                {/* Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100/90">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 bg-slate-50/50 shrink-0">
                      <CheckCircle className="w-3 h-3 text-slate-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 tracking-tight truncate">{t.fulfilledOrders}</span>
                  </div>
                  <Tooltip 
                    title={t.fulfilledOrders}
                    content={language === 'zh' ? '302 笔订单已完成 5 项品控并打包入库；184 笔正在中转仓进行实物核验。' : "302 orders verified via 5-point QC inspection and packed for export; 184 in active inspection."}
                    position="bottom"
                  >
                    <div 
                      className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded hover:bg-slate-100 cursor-pointer shrink-0"
                      aria-label="Fulfilled orders explanation"
                    >
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                  </Tooltip>
                </div>

                {/* Metric Section */}
                <div className="py-1.5">
                  <div className="flex items-baseline justify-between gap-1">
                    <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight leading-none">
                      486 <span className="text-xs font-sans font-normal text-slate-400">{t.poUnit}</span>
                    </div>
                    <span className="text-[9.5px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200/60">
                      62% QC OK
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 mt-1.5 overflow-hidden flex">
                    <div className="h-full bg-emerald-500 w-[62%]" title="Passed QC 62%" />
                    <div className="h-full bg-amber-400 w-[38%]" title="In QC Queue 38%" />
                  </div>
                </div>

                {/* Split Counts */}
                <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="text-emerald-700 font-semibold">302 {t.passedQc}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-amber-700 font-semibold">184 {t.inQcQueue}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">4.2h {language === 'zh' ? '均效' : 'avg'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: TRACK ORDERS (7 cols) - Balanced horizontal layout matching card height */}
          <div className="lg:col-span-7 xl:col-span-7 bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between gap-3 overflow-hidden">
            
            {/* Card Header */}
            <div className="flex items-center justify-between relative pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg border border-orange-200/70 flex items-center justify-center text-[#E35D3B] bg-orange-50/50">
                  <Navigation className="w-3.5 h-3.5 text-[#E35D3B]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 tracking-tight">
                      {language === 'zh' ? '在途运单跟踪' : 'Track Orders'}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                      ({currentShipment.internalId})
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Switch Dropdown / All Shipments Drawer Trigger */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowShipmentMenu(!showShipmentMenu)}
                    className="px-2 py-0.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-mono font-medium text-slate-700 flex items-center gap-1 transition-colors"
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

            {/* Internal 2-Column Body on md+: Map & Details (Left) + Timeline & Action (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch flex-1">
              
              {/* Left Sub-column: Route Map & Current Specs */}
              <div className="flex flex-col justify-between gap-2">
                {/* Interactive Route Map Graphic */}
                <div className="bg-slate-950 rounded-2xl p-2.5 border border-slate-800 relative overflow-hidden h-[100px] flex flex-col justify-between group">
                  {/* Background grid texture */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
                  
                  {/* Map Mode Toggle & ETA Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 backdrop-blur-xs">
                      <button
                        type="button"
                        onClick={() => setMapMode('map')}
                        className={`px-1.5 py-0.5 text-[8.5px] font-medium rounded transition-all ${
                          mapMode === 'map' ? 'bg-[#E35D3B] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Map
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapMode('satellite')}
                        className={`px-1.5 py-0.5 text-[8.5px] font-medium rounded transition-all ${
                          mapMode === 'satellite' ? 'bg-[#E35D3B] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Satellite
                      </button>
                    </div>

                    <div className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-700/60 rounded-full text-[9.5px] font-mono text-emerald-300 flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ETA: {currentShipment.eta}</span>
                    </div>
                  </div>

                  {/* Simulated Geographic Flight / Cargo Curve */}
                  <div className="relative z-10 my-auto py-0.5">
                    <svg viewBox="0 0 300 40" className="w-full h-8 overflow-visible">
                      <defs>
                        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#E35D3B" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 30 30 Q 150 -5 270 30"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M 30 30 Q 120 5 190 18"
                        fill="none"
                        stroke="url(#routeGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="30" cy="30" r="3.5" fill="#E35D3B" />
                      <circle cx="30" cy="30" r="7" fill="#E35D3B" fillOpacity="0.2" className="animate-ping" />
                      <g transform="translate(190, 18)">
                        <circle cx="0" cy="0" r="4" fill="#f59e0b" />
                        <circle cx="0" cy="0" r="8" fill="#f59e0b" fillOpacity="0.25" />
                      </g>
                      <circle cx="270" cy="30" r="3.5" fill="#10b981" />
                    </svg>
                  </div>

                  {/* Origin & Destination Labels */}
                  <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#E35D3B]" />
                      <span className="truncate max-w-[100px]">{currentShipment.origin.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">➔</span>
                      <span className="truncate max-w-[100px] text-right">{currentShipment.destination.split(' ')[0]}</span>
                      <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* Current Shipment Details Pill */}
                <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-slate-900 truncate">
                        {currentShipment.title}
                      </div>
                      <div className="text-[9.5px] text-slate-500 font-mono flex items-center gap-1">
                        <span>{currentShipment.carrier}</span>
                        <span>•</span>
                        <span>{currentShipment.cartons}</span>
                      </div>
                    </div>

                    <Badge 
                      tone={currentShipment.statusColor === 'text-emerald-600' ? 'success' : 'accent'} 
                      dot
                      className="text-[9.5px] py-0.5 px-2 font-mono shrink-0 shadow-2xs"
                    >
                      {currentShipment.status}
                    </Badge>
                  </div>

                  {/* Quick Specs Grid */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-200/60 text-[9px]">
                    <div>
                      <span className="text-slate-400 block">{language === 'zh' ? '重量 / 体积' : 'Weight / Vol'}</span>
                      <span className="font-mono font-medium text-slate-800">{currentShipment.weight} • {currentShipment.volume}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">{language === 'zh' ? '清关状态' : 'Customs'}</span>
                      <span className="font-medium text-slate-800 truncate block" title={currentShipment.customsStatus}>
                        {currentShipment.customsStatus.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sub-column: Milestone Progress & Actions */}
              <div className="flex flex-col justify-between gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-2 md:pt-0 md:pl-3">
                <div className="flex flex-col gap-1.5">
                  <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'zh' ? '运输节点时效' : 'Delivery Progress'}
                  </div>

                  <div className="relative flex flex-col gap-2 ml-0.5">
                    <div className="absolute left-[6px] top-1.5 bottom-1.5 w-[2px] -translate-x-1/2 bg-slate-200" />

                    {currentShipment.timeline.map((step, sIdx) => {
                      const isFirst = sIdx === 0;
                      return (
                        <div key={sIdx} className="relative flex items-start justify-between text-xs group pl-5">
                          <div className={`absolute left-[6px] -translate-x-1/2 top-0.5 w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                            step.completed 
                              ? 'bg-emerald-500 border-white text-white shadow-xs' 
                              : isFirst 
                                ? 'bg-orange-500 border-white text-white animate-pulse' 
                                : 'bg-slate-100 border-slate-300 text-transparent'
                          }`}>
                            {step.completed && <Check className="w-1.5 h-1.5" />}
                          </div>

                          <div className="min-w-0 pr-1">
                            <div className={`text-[11px] leading-tight font-medium ${
                              step.completed ? 'text-slate-800' : isFirst ? 'text-[#E35D3B] font-semibold' : 'text-slate-400'
                            }`}>
                              {step.label}
                            </div>
                            <div className="text-[9px] text-slate-400">
                              {step.subtext}
                            </div>
                          </div>

                          <div className="text-[9px] font-mono text-slate-400 shrink-0">
                            {step.time}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 mt-auto">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(currentShipment.id);
                      onShowToast?.(language === 'zh' ? `已复制单号: ${currentShipment.id}` : `Copied tracking ID: ${currentShipment.id}`);
                    }}
                    className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-medium text-slate-700 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Copy className="w-3 h-3 text-slate-500" />
                    <span>{language === 'zh' ? '复制单号' : 'Copy Tracking'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowShipmentsDrawer(true)}
                    className="py-1.5 px-2.5 bg-[#E35D3B] hover:bg-[#d04f2f] text-white rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors shadow-xs"
                  >
                    <Layers className="w-3 h-3" />
                    <span>{language === 'zh' ? '运单库' : 'View All'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ROW 2: ORDER ANALYSIS GRAPH (FULL WIDTH) - SIMPLE & INTUITIVE */}
        <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs relative flex flex-col justify-between gap-3">
          {/* Header Controls: Clear, plain-language title and interval switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
            {/* Title & Clear Explanation */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-950 tracking-tight">
                  {language === 'zh' ? '订单趋势 (成功完成 vs 取消订单)' : 'Order Trends (Completed vs Cancelled)'}
                </h2>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                {language === 'zh' ? '直观查看随时间交付的正常订单与取消退款对比' : 'Simple overview showing orders delivered successfully compared to cancelled orders'}
              </p>
            </div>

            {/* Right Interactive Selectors: Time Interval + Line/Bar Switcher */}
            <div className="flex items-center gap-2 justify-between sm:justify-end w-full sm:w-auto">
              {/* Time Interval Dropdown */}
              <div className="relative flex-1 sm:flex-initial">
                <button
                  type="button"
                  onClick={() => setIsIntervalDropdownOpen(!isIntervalDropdownOpen)}
                  className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
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
                          if (onShowToast) onShowToast(language === 'zh' ? `已切换为 ${interval === 'Monthly' ? '月度' : interval === 'Weekly' ? '周度' : '日度'} 视图` : `Showing ${interval} orders`);
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

              {/* Stageshow Autoplay Walkthrough Button */}
              <button
                type="button"
                onClick={() => {
                  const nextState = !isWalkthroughPlaying;
                  setIsWalkthroughPlaying(nextState);
                  if (nextState && onShowToast) {
                    onShowToast(language === 'zh' ? '正在播放 Stageshow 演示' : 'Playing Stageshow Walkthrough');
                  }
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isWalkthroughPlaying
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
                }`}
                title="Play Stageshow Product Walkthrough Demo"
              >
                <span className={isWalkthroughPlaying ? "animate-spin" : ""}>🎬</span>
                <span className="hidden sm:inline font-mono">
                  {isWalkthroughPlaying 
                    ? (language === 'zh' ? '演示中 (点击暂停)' : 'Touring (Tap to Pause)') 
                    : (language === 'zh' ? 'Stageshow 演示' : 'Stageshow Demo')}
                </span>
              </button>
            </div>
          </div>

          {/* Stageshow Dynamic Readout Strip (The headline is the readout per chart-scrub rule) */}
          <div className="bg-slate-50/95 rounded-2xl px-3.5 py-2.5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                <Roll variant="fade">{readoutLabel}</Roll>
              </div>
              <div className="h-3 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3.5 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <span className="text-slate-500">{language === 'zh' ? '交付:' : 'Delivered:'}</span>
                  <span className="font-bold text-slate-900 font-mono">
                    <Roll stagger={20}>{readoutDelivered}</Roll>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-slate-500">{language === 'zh' ? '取消:' : 'Cancelled:'}</span>
                  <span className="font-bold text-red-600 font-mono">
                    <Roll stagger={20}>{readoutCancelled}</Roll>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium text-[11px]">{language === 'zh' ? '交付成功率' : 'Success Rate'}:</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full text-xs">
                <Roll variant="fade">{readoutRate}</Roll>
              </span>
            </div>
          </div>

          {/* Chart Content Area */}
          <div className="pt-0 flex-1 flex flex-col justify-between">
            {/* Clear Legend: Blue = Completed, Red = Cancelled */}
            <div className="flex items-center justify-between gap-3 text-xs font-medium text-slate-600 mb-2 flex-wrap">
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-900 text-[11px] sm:text-xs">
                    {language === 'zh' ? '已完成订单 (顺利签收)' : 'Completed Orders (Delivered)'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                  <span className="font-semibold text-red-600 text-[11px] sm:text-xs">
                    {language === 'zh' ? '取消与退款订单' : 'Cancelled / Refunded'}
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {language === 'zh' ? '点击或悬停图表任意点查看详情' : 'Click or hover points to see exact counts'}
              </div>
            </div>

            {/* Custom SVG Visualization Container */}
            <div 
              ref={chartContainerRef}
              className="relative w-full flex-1 bg-white rounded-2xl p-2 sm:p-3.5 border border-slate-200/80 select-none shadow-2xs flex flex-col justify-center"
              onClick={() => {
                setHoveredIndex(null);
              }}
            >
              {/* Mobile Swipe Hint */}
              <div className="flex sm:hidden items-center justify-between px-1 pb-2 text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <span>←</span>
                  <span>{language === 'zh' ? '滑动查看完整周期' : 'Swipe to explore all dates'}</span>
                  <span>→</span>
                </span>
                <span className="text-slate-500 font-semibold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/70">
                  {currentData[0]?.label} – {currentData[currentData.length - 1]?.label}
                </span>
              </div>

              {/* Main Chart Graphic Canvas */}
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
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
                        <stop offset="75%" stopColor="#2563EB" stopOpacity="0.02" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>

                      {/* Subtle Red Area Gradient for Cancelled */}
                      <linearGradient id="redAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.12" />
                        <stop offset="75%" stopColor="#EF4444" stopOpacity="0.02" />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
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
                            x2={chartWidth - paddingRight}
                            y2={y}
                            stroke="#F1F5F9"
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
                        stroke="#F8FAFC"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Subtle Gradient Area Fills underneath both curves */}
                    <path d={areaCancel} fill="url(#redAreaGrad)" />
                    <path d={areaFulfilled} fill="url(#blueAreaGrad)" />

                    {/* Red Series Polyline (Cancelled Orders) */}
                    <path
                      d={pathCancel}
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Blue Series Polyline (Completed Orders) */}
                    <path
                      d={pathFulfilled}
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Red Series Circular Data Nodes */}
                    {pointsCancel.map((pt, i) => (
                      <circle
                        key={`red-node-${pt.label}-${i}`}
                        cx={pt.x}
                        cy={pt.y}
                        r={safeHoveredIndex === i ? 5.5 : 3.5}
                        fill="#FFFFFF"
                        stroke="#EF4444"
                        strokeWidth={safeHoveredIndex === i ? 2.5 : 1.8}
                      />
                    ))}

                    {/* Blue Series Circular Data Nodes */}
                    {pointsFulfilled.map((pt, i) => (
                      <circle
                        key={`blue-node-${pt.label}-${i}`}
                        cx={pt.x}
                        cy={pt.y}
                        r={safeHoveredIndex === i ? 5.5 : 3.5}
                        fill="#FFFFFF"
                        stroke="#2563EB"
                        strokeWidth={safeHoveredIndex === i ? 2.5 : 1.8}
                      />
                    ))}

                    {/* Active Vertical Crosshair */}
                    {safeHoveredIndex !== null && pointsFulfilled[safeHoveredIndex] && (
                      <g className="pointer-events-none">
                        <line
                          x1={pointsFulfilled[safeHoveredIndex].x}
                          y1={paddingTop}
                          x2={pointsFulfilled[safeHoveredIndex].x}
                          y2={chartBaselineY}
                          stroke="#64748B"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          opacity="0.8"
                        />
                        {/* Glowing Dot on Completed curve */}
                        <circle
                          cx={pointsFulfilled[safeHoveredIndex].x}
                          cy={pointsFulfilled[safeHoveredIndex].y}
                          r={6.5}
                          fill="#2563EB"
                          stroke="#FFFFFF"
                          strokeWidth="2.5"
                        />
                        {/* Glowing Dot on Cancel curve */}
                        {pointsCancel[safeHoveredIndex] && (
                          <circle
                            cx={pointsCancel[safeHoveredIndex].x}
                            cy={pointsCancel[safeHoveredIndex].y}
                            r={5.5}
                            fill="#EF4444"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                          />
                        )}
                      </g>
                    )}

                    {/* Stageshow Virtual Animated Cursor during Walkthrough */}
                    {walkthroughCursor && (
                      <g
                        className="pointer-events-none transition-transform duration-700 ease-out"
                        style={{ transform: `translate(${walkthroughCursor.x}px, ${walkthroughCursor.y}px)` }}
                      >
                        {walkthroughCursor.clicking && (
                          <circle cx="1" cy="1" r="18" fill="rgba(37, 99, 235, 0.3)" className="animate-ping" />
                        )}
                        <svg width="22" height="26" viewBox="0 0 18 22" fill="none" className="drop-shadow-md overflow-visible">
                          <path d="M1 1L6.5 20.5L10 13.5L17 11.5L1 1Z" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        {walkthroughCursor.label && (
                          <g transform="translate(18, 12)">
                            <rect x="0" y="0" width="112" height="22" rx="6" fill="#0F172A" opacity="0.94" />
                            <text x="8" y="15" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="system-ui">
                              {walkthroughCursor.label}
                            </text>
                          </g>
                        )}
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
                              onShowToast(`${pt.label}: ${pt.dealsBlue} completed orders, ${pt.dealsGreen} cancelled`);
                            }
                          }}
                        />
                      );
                    })}
                  </svg>
                ) : (
                  /* Volume Bar Chart View (Clear Blue & Red Bars) */
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
                              onShowToast(`${d.label}: ${d.dealsBlue} completed / ${d.dealsGreen} cancelled`);
                            }
                          }}
                          className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer flex-1 max-w-[56px]"
                        >
                          <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-[160px] sm:h-[190px] w-full">
                            {/* Completed Bar (Blue) */}
                            <div
                              style={{ height: `${Math.max(fulfilledHeightPercent, 6)}%` }}
                              className={`w-3 sm:w-4 rounded-t transition-all ${
                                isHovered ? 'bg-blue-600 shadow-md scale-y-[1.02]' : 'bg-blue-600/85 group-hover:bg-blue-600'
                              }`}
                            />
                            {/* Cancelled Bar (Red) */}
                            <div
                              style={{ height: `${Math.max(cancelHeightPercent, 4)}%` }}
                              className={`w-2.5 sm:w-3 rounded-t transition-all ${
                                isHovered ? 'bg-red-500 shadow-xs' : 'bg-red-500/75 group-hover:bg-red-500'
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

                {/* Dead-Simple, Non-Tech Floating Tooltip Card */}
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
                          left: isRightSide ? 'auto' : `${Math.max(2, Math.min(92, xRatio * 100 + 2))}%`,
                          right: isRightSide ? `${Math.max(2, Math.min(92, (1 - xRatio) * 100 + 2))}%` : 'auto',
                          top: '8%',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setHoveredIndex(null);
                        }}
                        className="absolute z-30 bg-white text-slate-900 border border-slate-200/90 rounded-2xl p-3 shadow-xl pointer-events-auto cursor-pointer w-[200px] sm:w-[220px]"
                      >
                        <div className="text-[11px] font-bold text-slate-900 mb-2 pb-1.5 border-b border-slate-100 flex items-center justify-between">
                          <span>{activePoint.label}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHoveredIndex(null);
                            }}
                            className="w-4 h-4 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            aria-label="Close"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="space-y-2 text-xs">
                          {/* Completed */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                              <span className="font-medium text-slate-700">
                                {language === 'zh' ? '已完成订单' : 'Completed'}
                              </span>
                            </div>
                            <span className="font-bold text-slate-950 font-mono">
                              {activePoint.dealsBlue} {language === 'zh' ? '单' : 'orders'}
                            </span>
                          </div>

                          {/* Cancelled */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                              <span className="font-medium text-red-600">
                                {language === 'zh' ? '取消/退货' : 'Cancelled'}
                              </span>
                            </div>
                            <span className="font-bold text-red-600 font-mono">
                              {activePoint.dealsGreen} {language === 'zh' ? '单' : 'orders'}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2.5 pt-1.5 text-[9.5px] text-slate-400 text-center font-medium border-t border-slate-100">
                          {language === 'zh' ? '点击关闭提示' : 'Click to dismiss'}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
              </div>
            </div>
            </div>

            {/* Bottom Strip: 4 Dead-Simple, Everyday Metrics that Anyone Understands with Stageshow Roll */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2.5 sm:pt-3 border-t border-slate-100 mt-1 text-xs">
              <div className="bg-slate-50/90 rounded-2xl p-2.5 sm:p-3 border border-slate-100/90 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {language === 'zh' ? '成功交付订单' : 'Orders Delivered'}
                </span>
                <div className="mt-1">
                  <div className="text-sm sm:text-base font-bold text-slate-950 font-mono">
                    <Roll stagger={20}>{readoutDelivered.split(' ')[0]}</Roll>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                    {language === 'zh' ? '● 顺利签收' : '● Successfully arrived'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-2xl p-2.5 sm:p-3 border border-slate-100/90 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {language === 'zh' ? '取消与退款' : 'Cancelled & Refunded'}
                </span>
                <div className="mt-1">
                  <div className="text-sm sm:text-base font-bold text-red-600 font-mono">
                    <Roll stagger={20}>{readoutCancelled.split(' ')[0]}</Roll>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {language === 'zh' ? '100% 货款已退回' : '100% refunded to wallet'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-2xl p-2.5 sm:p-3 border border-slate-100/90 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {language === 'zh' ? '平均到货时间' : 'Average Delivery Time'}
                </span>
                <div className="mt-1">
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    <Roll variant="fade">{safeHoveredIndex !== null ? '4.8 Days' : '5 - 7 Days'}</Roll>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {language === 'zh' ? '工厂出货至签收' : 'From factory to your door'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-2xl p-2.5 sm:p-3 border border-slate-100/90 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {language === 'zh' ? '整体成功率' : 'Success Rate'}
                </span>
                <div className="mt-1">
                  <div className="text-sm sm:text-base font-bold text-emerald-600 font-mono">
                    <Roll variant="fade">{readoutRate}</Roll>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                    {language === 'zh' ? '无异常顺利履约' : 'Completed without issues'}
                  </div>
                </div>
              </div>
            </div>
          </div> {/* Closes ORDER ANALYSIS GRAPH (FULL WIDTH) */}

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
