import React from 'react';
import { X, Bookmark, ExternalLink, Calendar, Users, TrendingUp, Sparkles, Check, Copy } from 'lucide-react';
import { TrendCardType } from '../types';

interface TrendInspectModalProps {
  card: TrendCardType;
  onClose: () => void;
  onBookmarkToggle: (id: string) => void;
}

export default function TrendInspectModal({ card, onClose, onBookmarkToggle }: TrendInspectModalProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/trend/${card.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#1b1b23]/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden border border-[#c6c5d7]/30 shadow-2xl relative animate-scale-up flex flex-col md:flex-row h-[85vh] md:h-auto max-h-[90vh]">
        
        {/* Left Side: Artwork (Mobile fits top, Desktop fits left) */}
        <div className="relative w-full md:w-1/2 bg-[#f5f2fe] h-48 md:h-auto min-h-[220px]">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
          
          <div className="absolute bottom-4 left-4 text-white md:hidden">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#2c2abc] border border-white/20">
              {card.badge}
            </span>
            <h3 className="text-lg font-bold mt-1">{card.title}</h3>
          </div>

          {/* Bookmark overlays */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => onBookmarkToggle(card.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md border ${
                card.isBookmarked
                  ? 'bg-[#2c2abc] text-white border-[#2c2abc] shadow-md scale-105'
                  : 'bg-white/80 text-[#767586] hover:bg-white hover:text-[#fb7185] border-white/40'
              }`}
            >
              <Bookmark className={`w-4.5 h-4.5 ${card.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Close trigger */}
            <div className="flex justify-between items-start mb-4">
              <div className="hidden md:block">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2c2abc]/10 text-[#2c2abc] border border-[#2c2abc]/15">
                  {card.badge}
                </span>
                <p className="text-xs text-[#767586] mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {card.category} {card.timeText ? `• ${card.timeText}` : ''}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 text-[#767586] transition-colors md:absolute md:top-4 md:right-4 bg-white md:shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Titles */}
            <h2 className="hidden md:block text-2xl font-extrabold text-[#1b1b23] tracking-tight mb-2">
              {card.title}
            </h2>

            {/* Expanded Analytical detail */}
            <div className="space-y-4 text-xs leading-relaxed text-[#464554] mt-2">
              <p>
                {card.description} This emerging trend represents a key structural evolution in the modern corporate sphere, focusing heavily on organic user flow loops and low-key visual clarity patterns.
              </p>
              <p>
                Industries implementing these workflows are recording notable spikes in brand affinity, lower cognitive load benchmarks, and pristine aesthetic retention.
              </p>
            </div>

            {/* Simulated Trend Index metrics */}
            <div className="mt-6 pt-4 border-t border-[#c6c5d7]/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#767586] mb-1">Discovery Indicators</h4>
              
              <div>
                <div className="flex justify-between text-xs font-bold text-[#1b1b23] mb-1">
                  <span>Interest Growth Index</span>
                  <span className="text-[#ff7e5f] flex items-center gap-0.5 font-bold"><TrendingUp className="w-3 h-3" /> +142%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] h-full rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#1b1b23] mb-1">
                  <span>Adoption Velocity</span>
                  <span className="text-[#2c2abc]">Accelerated</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2c2abc] h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[#767586] pt-1">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> High Corporate Index
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Verified Studio Pattern
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 pt-4 border-t border-[#c6c5d7]/20 flex gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 h-11 bg-gray-50 border border-[#c6c5d7]/30 hover:bg-gray-100 rounded-xl font-bold text-xs text-[#1b1b23] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Copied Index</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Trend ID</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-11 bg-[#2c2abc] hover:bg-[#4648d4] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm"
            >
              <span>Acknowledge Insights</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
