import React from 'react';
import { X, Camera, ShieldCheck, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PhotoModalProps {
  photoUrl: string | null;
  caption: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photoUrl,
  caption,
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();

  if (!isOpen || !photoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative max-w-4xl w-full bg-[#0d1017] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Camera className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-200">
              {caption || (language === 'zh' ? '中转仓品控实物照片' : 'Warehouse QC Inspection Photo')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={photoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={language === 'zh' ? '在新标签页打开高分辨率原图' : 'Open full resolution in new tab'}
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Photo Container */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/50">
          <img
            src={photoUrl}
            alt={caption}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Footer Meta */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-slate-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            {language === 'zh' ? '高清实拍质检承诺 • 100% 真实还原' : 'High-Resolution Inspection Guarantee'}
          </span>
          <span className="font-mono text-slate-500">
            {language === 'zh' ? '东莞 / 深圳中转枢纽品控摄影工作站' : 'Dongguan / Shenzhen Hub Photographic Station'}
          </span>
        </div>
      </div>
    </div>
  );
};
