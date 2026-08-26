import React, { useState } from 'react';
import { Calendar, ArrowUpRight, CheckCircle2, Download, Filter } from 'lucide-react';

interface PerformanceChartProps {
  onShowToast?: (msg: string) => void;
}

type MetricMode = '7D' | '14D' | '30D';

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ onShowToast }) => {
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
    if (onShowToast) onShowToast('Downloaded Fulfillment & QC Performance CSV');
  };

  return (
    <div className="bg-[#eef3ee] p-5 sm:p-6 rounded-3xl border border-[#d6e3d7] flex flex-col justify-between shadow-xs">
      {/* Header with interactive Calendar & Expand buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Fulfillment Performance
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Sourcing speed, warehouse QC check-in & dispatch index
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Cycle Range Button */}
          <button
            type="button"
            onClick={() => {
              const next: MetricMode = metricMode === '14D' ? '30D' : metricMode === '30D' ? '7D' : '14D';
              setMetricMode(next);
              if (onShowToast) onShowToast(`Performance range: ${next === '14D' ? 'Last 14 Days' : next === '30D' ? 'Monthly Rolling' : 'Past Week'}`);
            }}
            title="Filter performance timeline"
            aria-label="Filter date range"
            className="p-2 rounded-xl bg-white/90 border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:bg-white transition-colors shadow-2xs cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Export / Expand report */}
          <button
            type="button"
            onClick={handleExportPerformance}
            title="Download performance log"
            aria-label="Expand fulfillment performance"
            className="p-2 rounded-xl bg-white/90 border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:bg-white transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Visualizer */}
      <div className="mt-6 relative">
        {/* Y-Axis Labels */}
        <div className="absolute right-0 top-0 bottom-4 flex flex-col justify-between text-[10px] font-mono font-medium text-slate-500 select-none pointer-events-none">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>

        {/* Baseline Divider */}
        <div className="absolute left-0 right-8 top-1/2 -translate-y-1/2 border-b border-dashed border-slate-300/70 pointer-events-none" />

        {/* Vertical Bars Container */}
        <div className="h-36 pr-10 flex items-end justify-between gap-1.5 sm:gap-2">
          {bars.map((bar, index) => {
            const isSelected = hoveredIndex === index;
            return (
              <div
                key={bar.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => onShowToast && onShowToast(`${bar.label}: ${bar.orders} orders processed with ${bar.value} SLA score`)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Active Tooltip */}
                {isSelected && (
                  <div className="absolute -top-7 z-10 bg-slate-950 text-white text-[10px] font-mono px-2 py-0.5 rounded-md whitespace-nowrap shadow-sm animate-in fade-in duration-100">
                    {bar.label}: {bar.orders} parcels ({bar.value})
                  </div>
                )}

                {/* Stepped Bar */}
                <div
                  style={{ height: bar.height }}
                  className={`w-full max-w-[18px] rounded-t-sm transition-all duration-200 ${
                    bar.highlight
                      ? 'bg-slate-950 shadow-sm'
                      : isSelected
                      ? 'bg-slate-800'
                      : 'bg-gradient-to-t from-slate-300/40 via-slate-400/50 to-slate-500/70 hover:to-slate-700'
                  }`}
                />

                {/* Stepped top cap indicator */}
                <div 
                  className={`w-full max-w-[22px] h-[2px] mt-0.5 ${
                    bar.highlight ? 'bg-slate-950' : 'bg-slate-400'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* X-Axis Date Highlights */}
        <div className="pr-10 pt-2 flex justify-between text-[11px] font-medium text-slate-600">
          <span>13 Sep</span>
          <span className="font-bold text-slate-950">19 Sep (Peak Sourcing Intake)</span>
          <span>25 Sep</span>
        </div>
      </div>

      {/* Mini KPI Footer with real interaction */}
      <div 
        className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs cursor-pointer hover:opacity-90"
        onClick={() => onShowToast && onShowToast('Guangdong, Shenzhen & Yiwu hub intake speed: 98.4% within 2 hours of arrival')}
      >
        <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>98.4% On-Time Warehouse Receiving</span>
        </div>
        <span className="text-slate-600 font-mono text-[11px]">Avg. 2.4 Days Supplier Lead Time</span>
      </div>
    </div>
  );
};
