import React from 'react';
import { Bookmark, Sparkles, Send, TrendingUp } from 'lucide-react';
import { TrendCardType } from '../types';

interface TrendCardProps {
  card: TrendCardType;
  onBookmarkToggle: (id: string) => void;
  onInspect: (card: TrendCardType) => void;
  key?: string;
}

export default function TrendCard({ card, onBookmarkToggle, onInspect }: TrendCardProps) {
  // Translate badge name to appropriate style colors
  const getBadgeColors = (badgeType: string) => {
    switch (badgeType.toLowerCase()) {
      case 'aesthetic':
        return 'bg-[#2c2abc]/10 text-[#2c2abc] border border-[#2c2abc]/20';
      case 'tech':
        return 'bg-[#2d37a0]/10 text-[#2d37a0] border border-[#2d37a0]/20';
      case 'motion':
        return 'bg-[#4651b9]/10 text-[#4651b9] border border-[#4651b9]/20';
      case 'strategy':
        return 'bg-[#565e74]/10 text-[#565e74] border border-[#565e74]/20';
      case 'palette':
        return 'bg-[#2c2abc]/10 text-[#2c2abc] border border-[#2c2abc]/20';
      case 'data':
        return 'bg-[#2d37a0]/10 text-[#2d37a0] border border-[#2d37a0]/20';
      default:
        return 'bg-purple-100 text-purple-800 border border-purple-200';
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card inspect modal
    onBookmarkToggle(card.id);
  };

  return (
    <div
      onClick={() => onInspect(card)}
      className="break-inside-avoid mb-6 group cursor-pointer"
    >
      <div className="bg-[#ffffff] rounded-[24px] overflow-hidden border border-[#c6c5d7]/30 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative">
        
        {/* Card Image Area */}
        <div className="relative overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-[4/3] bg-[#f5f2fe]">
          <img
            className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
            src={card.image}
            alt={card.title}
            referrerPolicy="no-referrer"
          />
          
          {/* Bookmark Button overlays image */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleBookmarkClick}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border ${
                card.isBookmarked
                  ? 'bg-[#2c2abc] text-white border-[#2c2abc] shadow-md scale-110'
                  : 'bg-white/70 hover:bg-white text-[#767586] hover:text-[#fb7185] border-white/50'
              }`}
              title={card.isBookmarked ? 'Remove bookmark' : 'Bookmark trend'}
            >
              <Bookmark className={`w-4 h-4 ${card.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Generative Grids Card 4 overlay logic */}
          {card.id === 'generative-grids' && (
            <div className="absolute inset-x-4 bottom-4 bg-white/75 backdrop-blur-[12px] border border-white/40 p-3.5 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff7e5f] animate-ping"></span>
                  <span className="w-2 h-2 rounded-full bg-[#ff7e5f] absolute"></span>
                  <span className="text-xs font-bold text-[#2c2abc] ml-1">Live Briefing</span>
                </div>
                <div className="flex -space-x-2">
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&q=80"
                    alt="Active User"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=40&q=80"
                    alt="Active User"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80"
                    alt="Active User"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Custom Indicator */}
          {card.isCustom && (
            <div className="absolute bottom-3 left-3 bg-[#2c2abc] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 fill-current" />
              Creator Original
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2 pb-0.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeColors(card.badgeType)}`}>
              {card.badge}
            </span>
            {card.timeText && (
              <span className="text-[#767586] text-xs font-medium flex items-center gap-1">
                {card.timeText.includes('Rising') || card.timeText.includes('Hot') ? (
                  <TrendingUp className="w-3.5 h-3.5 text-[#ff7e5f]" />
                ) : null}
                {card.timeText}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#1b1b23] group-hover:text-[#2c2abc] transition-colors duration-200 leading-snug">
            {card.title}
          </h3>
          <p className="text-[#464554] text-xs line-clamp-2 leading-relaxed mt-2">
            {card.description}
          </p>

          <div className="mt-4 pt-3 border-t border-[#c6c5d7]/20 flex items-center justify-between text-xs font-semibold text-[#2c2abc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Inspect Detail Matrix</span>
            <Send className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
