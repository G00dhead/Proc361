import React, { useState } from 'react';
import { Calendar, ArrowUpRight, CheckCircle2, Download, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PerformanceChartProps {
  onShowToast?: (msg: string) => void;
}

type MetricMode = '7D' | '14D' | '30D';

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ onShowToast }) => {
  const { language } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(6);
  const [metricMode, setMetricMode] = useState<MetricMode>('14D');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Stepped chart bars matching the reference image's aesthetic
  const bars = [
    { label: '13 Sep', height: '42%', value: '42%', orders: 18, highlight: false },
    { label: '14 Sep', height: '58%', value: '58%', orders: 24, highlight: false },
    { label: '15 Sep', height: '48%', value: '48%', orders: 19, highlight: false },
    { label: '16 Sep', height: '64%', value: '64%', orders: 28, highlight: false },
    { label: '17 Sep', height: '52%', value: '52%', orders: 22, highlight: false },
    { label: '18 Sep', height: '70%', value: '70%', orders: 31, highlight: false },
    { label: '19 Sep', height: '94%', value: '94%', orders: 48, highlight: true }, // Highlighted black peak in image
    { label: '20 Sep', height: '62%', value: '62%', orders: 26, highlight: false },
    { label: '21 Sep', height: '45%', value: '45%', orders: 17, highlight: false },
    { label: '22 Sep', height: '55%', value: '55%', orders: 23, highlight: false },
    { label: '23 Sep', height: '68%', value: '68%', orders: 29, highlight: false },
    { label: '24 Sep', height: '85%', value: '85%', orders: 36, highlight: false },
    { label: '25 Sep', height: '50%', value: '50%', orders: 20, highlight: false },
  ];

  const handleExportPerformance = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Date,Receiving Efficiency,Orders Intake\n' +
      bars.map(b => `${b.label},${b.value},${b.orders}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Proc360_Fulfillment_Performance_${metricMode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onShowToast) onShowToast(language === 'zh' ? '已导出中转仓履约与质检性能报表 (CSV)' : 'Downloaded Fulfillment & QC Performance CSV');
  };

  return (
    <div className="bg-[#eef3ee] p-5 sm:p-6 rounded-3xl border border-[#d6e3d7] flex flex-col justify-between shadow-xs">
      {/* Header with interactive Calendar & Expand buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {language === 'zh' ? '供应链履约时效与质检指数' : 'Fulfillment Performance'}
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            {language === 'zh' ? '采购响应速率、中国枢纽仓入库验货及发运流转指数' : 'Sourcing speed, warehouse QC check-in & dispatch index'}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Cycle Range Button */}
          <button
            type="button"
            onClick={() => {
              const next: MetricMode = metricMode === '7D' ? '14D' : metricMode === '14D' ? '30D' : '7D';
              setMetricMode(next);
              if (onShowToast) onShowToast(
                language === 'zh'
                  ? `履约时效周期切换为: ${next === '7D' ? '近7天' : next === '14D' ? '近14天' : '近30天'}`
                  : `Performance view: ${next === '7D' ? 'Last 7 Days' : next === '14D' ? 'Last 14 Days' : 'Last 30 Days'}`
              );
            }}
            title={language === 'zh' ? '切换周期范围' : 'Cycle date range'}
            aria-label="Filter performance dates"
            className="p-2 rounded-xl bg-white/90 border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:bg-white transition-colors shadow-2xs cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Export button */}
          <button
            type="button"
            onClick={handleExportPerformance}
            title={language === 'zh' ? '导出履约数据' : 'Export performance telemetry'}
            aria-label="Export performance"
            className="p-2 rounded-xl bg-white/90 border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:bg-white transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Metric Value: 68.4% Efficiency Index */}
      <div className="mt-4">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-950 tracking-tight">
            68.4%
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-slate-900 border border-slate-200/80 shadow-2xs font-mono">
            {metricMode} {language === 'zh' ? '均值' : 'Avg'}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs font-mono text-slate-600 flex-wrap">
          <span className="font-semibold text-slate-800">
            {language === 'zh' ? '中转仓平均入库质检耗时：3.8小时' : '3.8 hrs avg intake to QC photo'}
          </span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {language === 'zh' ? '99.4% 顺丰准时入仓率' : '99.4% SF Express On-Time Delivery'}
          </span>
        </div>
      </div>

      {/* Interactive Stepped Bar Chart matching the visual in screenshot */}
      <div className="mt-6">
        <div className="flex items-end justify-between gap-1.5 h-28 pt-2">
          {bars.map((bar, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={bar.label}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                title={`${bar.label}: ${bar.value} efficiency (${bar.orders} orders processed)`}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <span className="text-[10px] font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded-md shadow-2xs border border-slate-200 animate-in fade-in duration-100">
                    {bar.value}
                  </span>
                )}

                {/* The Bar */}
                <div
                  style={{ height: bar.height }}
                  className={`w-full max-w-[18px] rounded-md transition-all duration-200 ${
                    bar.highlight || isHovered
                      ? 'bg-slate-950 shadow-xs'
                      : 'bg-slate-300/80 group-hover:bg-slate-400'
                  }`}
                />

                {/* Day label */}
                <span className={`text-[10px] font-mono transition-colors ${
                  bar.highlight || isHovered ? 'text-slate-950 font-bold' : 'text-slate-500'
                }`}>
                  {bar.label.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chart Sub-legend */}
        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-600 border-t border-[#d6e3d7] pt-2 px-1">
          <span>{language === 'zh' ? '广东东莞仓 + 深圳前海仓' : 'Dongguan Hub + Shenzhen Qianhai'}</span>
          <span className="text-slate-900 font-bold">{language === 'zh' ? '质检通过峰值: 94%' : 'QC Clearance Peak: 94%'}</span>
        </div>
      </div>
    </div>
  );
};
