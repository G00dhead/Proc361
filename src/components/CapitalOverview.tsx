import React, { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, TrendingUp, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CapitalOverviewProps {
  totalSourcedRMB: number;
  totalSourcedUSD: number;
  onOpenWallet: () => void;
  onShowToast?: (msg: string) => void;
}

type Timeframe = 'MONTH' | '30D' | 'Q3_2026';

export const CapitalOverview: React.FC<CapitalOverviewProps> = ({
  totalSourcedRMB,
  totalSourcedUSD,
  onOpenWallet,
  onShowToast,
}) => {
  const { language } = useLanguage();
  const [timeframe, setTimeframe] = useState<Timeframe>('MONTH');
  const [showChannelBreakdown, setShowChannelBreakdown] = useState(false);

  // Timeframe-specific data in RMB & USD
  const timeframeData = {
    MONTH: {
      rmb: totalSourcedRMB,
      usd: totalSourcedUSD,
      growth: '+32.2%',
      stack1: { rmb: '¥1,134,200', usd: '$156,646' },
      stack2: { rmb: '¥623,800', usd: '$86,163' },
      stack3: { rmb: '¥1,434,520', usd: '$198,116' },
      label: language === 'zh' ? '2026年8月' : 'August 2026',
    },
    '30D': {
      rmb: totalSourcedRMB * 1.15,
      usd: totalSourcedUSD * 1.15,
      growth: '+28.4%',
      stack1: { rmb: '¥1,290,000', usd: '$178,160' },
      stack2: { rmb: '¥710,000', usd: '$98,060' },
      stack3: { rmb: '¥1,649,000', usd: '$227,745' },
      label: language === 'zh' ? '近30天滚动周期' : 'Last 30 Rolling Days',
    },
    Q3_2026: {
      rmb: totalSourcedRMB * 2.8,
      usd: totalSourcedUSD * 2.8,
      growth: '+44.6%',
      stack1: { rmb: '¥3,150,000', usd: '$435,050' },
      stack2: { rmb: '¥1,890,000', usd: '$261,030' },
      stack3: { rmb: '¥3,899,000', usd: '$538,495' },
      label: language === 'zh' ? '2026年第三季度采购额' : 'Q3 2026 Procurement Run',
    },
  };

  const currentData = timeframeData[timeframe];

  return (
    <div className="bg-[#eef3ee] p-5 sm:p-6 rounded-3xl border border-[#d6e3d7] flex flex-col justify-between shadow-xs">
      {/* Card Header with Working Filter and Sorting buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {language === 'zh' ? '销售与采购货值总览' : 'Sales & Sourcing Overview'}
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            {language === 'zh' 
              ? `在途采购资本及跨境运费分配情况 (${currentData.label})`
              : `Total active procurement capital & freight allocation (${currentData.label})`}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Timeframe Switcher Button */}
          <button
            type="button"
            onClick={() => {
              const next: Timeframe = timeframe === 'MONTH' ? '30D' : timeframe === '30D' ? 'Q3_2026' : 'MONTH';
              setTimeframe(next);
              if (onShowToast) onShowToast(
                language === 'zh'
                  ? `统计周期已切换为: ${next === 'MONTH' ? '本月' : next === '30D' ? '近30天' : '2026年Q3'}`
                  : `Capital timeframe: ${next === 'MONTH' ? 'This Month' : next === '30D' ? 'Last 30 Days' : 'Q3 2026'}`
              );
            }}
            title={language === 'zh' ? '切换统计时间范围' : 'Switch timeframe'}
            aria-label="Filter overview parameters"
            className="p-2 rounded-xl bg-white/90 border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:bg-white transition-colors shadow-2xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Toggle channel details */}
          <button
            type="button"
            onClick={() => {
              setShowChannelBreakdown(!showChannelBreakdown);
              if (onShowToast) onShowToast(
                showChannelBreakdown 
                  ? (language === 'zh' ? '显示总览汇总' : 'Showing overview summary') 
                  : (language === 'zh' ? '显示各采购渠道占比明细' : 'Showing supplier channel breakdown')
              );
            }}
            title={language === 'zh' ? '切换各渠道分配明细' : 'Toggle channel allocation sorting'}
            aria-label="Sort overview breakdown"
            className="p-2 rounded-xl bg-white/90 border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:bg-white transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Metric Value: RMB as Primary Currency */}
      <div className="mt-4">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-950 tracking-tight">
            ¥{currentData.rmb.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} RMB
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-slate-900 border border-slate-200/80 shadow-2xs font-mono">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            {currentData.growth} ↗
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs font-mono text-slate-600 flex-wrap">
          <span>${currentData.usd.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD {language === 'zh' ? '直采总值' : 'Total Sourced'}</span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            {language === 'zh' ? '100% 资金由 Proc360 担保代管保护' : '100% Protected under Proc360 Escrow'}
          </span>
        </div>
      </div>

      {/* Flow Ribbons / Stacked Segment Visualizer */}
      <div className="mt-6">
        {/* Column Values Header (in USD and RMB) */}
        <div className="flex justify-between text-xs font-mono font-semibold text-slate-800 mb-2 px-1">
          <span>{currentData.stack1.rmb}</span>
          <span>{currentData.stack2.rmb}</span>
          <span>{currentData.stack3.rmb}</span>
        </div>

        {/* Multi-stack bar ribbons */}
        <div className="grid grid-cols-3 gap-3">
          {/* Stack 1: 1688 Direct Wholesale */}
          <div 
            className="space-y-1 cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={() => onShowToast && onShowToast(language === 'zh' ? '渠道 1: 1688 批发工厂直采' : 'Channel 1: 1688 Wholesale Factory Sourcing')}
            title="1688 Wholesale Sourcing Volume"
          >
            <div className="h-3 rounded-md bg-slate-400/80" />
            <div className="h-4 rounded-md bg-slate-500/80" />
            <div className="h-5 rounded-md bg-slate-700" />
            <div className="h-9 rounded-md bg-slate-950" />
          </div>

          {/* Stack 2: Taobao & Weidian */}
          <div 
            className="space-y-1 cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={() => onShowToast && onShowToast(language === 'zh' ? '渠道 2: 淘宝零售及微店特色直采' : 'Channel 2: Taobao & Specialized Sourcing')}
            title="Taobao & Specialized Sourcing Volume"
          >
            <div className="h-2.5 rounded-md bg-slate-400/80" />
            <div className="h-3.5 rounded-md bg-slate-500/80" />
            <div className="h-4 rounded-md bg-slate-700" />
            <div className="h-6 rounded-md bg-slate-950" />
          </div>

          {/* Stack 3: Factory Direct OEM */}
          <div 
            className="space-y-1 cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={() => onShowToast && onShowToast(language === 'zh' ? '渠道 3: 工厂源头 OEM 定制开模批次' : 'Channel 3: Direct OEM & Custom Tooling Batches')}
            title="Custom OEM Tooling Batches"
          >
            <div className="h-3.5 rounded-md bg-slate-400/80" />
            <div className="h-4.5 rounded-md bg-slate-500/80" />
            <div className="h-6 rounded-md bg-slate-700" />
            <div className="h-10 rounded-md bg-slate-950" />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-slate-700">
          <span className="flex items-center gap-1.5 cursor-pointer" onClick={() => onShowToast && onShowToast(language === 'zh' ? '已筛选: 1688 批发' : 'Filtered: 1688 Wholesale')}>
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-950" />
            {language === 'zh' ? '1688 批发' : '1688 Wholesale'}
          </span>
          <span className="flex items-center gap-1.5 cursor-pointer" onClick={() => onShowToast && onShowToast(language === 'zh' ? '已筛选: 工厂 OEM' : 'Filtered: Factory OEM')}>
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-700" />
            {language === 'zh' ? '工厂 OEM' : 'Factory OEM'}
          </span>
          <span className="flex items-center gap-1.5 cursor-pointer" onClick={() => onShowToast && onShowToast(language === 'zh' ? '已筛选: 美国 DDP 专线' : 'Filtered: US Destination DDP')}>
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-500" />
            {language === 'zh' ? '美线 DDP' : 'US DDP Freight'}
          </span>
          <span className="flex items-center gap-1.5 cursor-pointer" onClick={() => onShowToast && onShowToast(language === 'zh' ? '已筛选: 欧洲空运海运' : 'Filtered: EU Freight')}>
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-400" />
            {language === 'zh' ? '欧线物流' : 'EU Freight'}
          </span>
          <span className="flex items-center gap-1.5 cursor-pointer" onClick={() => onShowToast && onShowToast(language === 'zh' ? '已筛选: 其它枢纽' : 'Filtered: Other Hubs')}>
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-300" />
            {language === 'zh' ? '其它枢纽' : 'Other Hubs'}
          </span>
        </div>
      </div>
    </div>
  );
};
