import React, { useState } from 'react';
import { X, FileText, CheckCircle2, ChevronRight, Plus, Box } from 'lucide-react';
import { TrendCardType, BriefType } from '../types';

interface NewBriefWizardProps {
  trendCards: TrendCardType[];
  onClose: () => void;
  onSave: (brief: BriefType) => void;
  currentUserEmail: string;
}

export default function NewBriefWizard({ trendCards, onClose, onSave, currentUserEmail }: NewBriefWizardProps) {
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('Consumer Experience');
  const [summary, setSummary] = useState('');
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleTrendSelection = (id: string) => {
    if (selectedCardIds.includes(id)) {
      setSelectedCardIds(selectedCardIds.filter((item) => item !== id));
    } else {
      setSelectedCardIds([...selectedCardIds, id]);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!title.trim() || !summary.trim()) {
        setErrorMsg('Please specify a title and descriptive summary.');
        return;
      }
      setErrorMsg('');
      setStep(2);
    }
  };

  const handleCompile = () => {
    if (selectedCardIds.length === 0) {
      setErrorMsg('Please link at least one trend to the brief.');
      return;
    }

    const newBrief: BriefType = {
      id: `brief-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim(),
      cards: selectedCardIds,
      createdAt: new Date().toISOString().split('T')[0],
      author: currentUserEmail || 'Discovery Analyst',
      industry,
    };

    onSave(newBrief);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#1b1b23]/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-[32px] w-full max-w-xl overflow-hidden border border-[#c6c5d7]/30 shadow-2xl relative animate-scale-up">
        
        {/* Header bar */}
        <div className="px-6 pt-6 pb-4 border-b border-[#c6c5d7]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#4651b9]/10 rounded-lg text-[#4651b9]">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#1b1b23]">Compile Executive Trend Brief</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-[#767586] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-[#f5f2fe] border-b border-[#c6c5d7]/25 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#2c2abc] text-white' : 'bg-gray-200 text-[#767586]'}`}>1</span>
            <span className="font-semibold text-[#1b1b23]">Brief Specifications</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#c6c5d7]" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#2c2abc] text-white' : 'bg-gray-200 text-[#767586]'}`}>2</span>
            <span className="font-semibold text-[#767586]">Embed Trend Indicators</span>
          </div>
        </div>

        {/* Form area */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-xs text-red-600 rounded-xl border border-red-100">
              {errorMsg}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[#767586] ml-1">Editorial Title</label>
                <input
                  type="text"
                  placeholder="e.g., Next-Gen Immersive Glassmorphic & Biotech Synergies"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-12 px-4 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[#767586] ml-1">Market Segment / Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full h-12 px-3 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm focus:outline-none text-[#1b1b23]"
                >
                  <option value="Consumer Experience">Consumer Experience</option>
                  <option value="Product Engineering">Product Engineering</option>
                  <option value="Corporate Branding">Corporate Branding</option>
                  <option value="Biotech & Materials">Biotech & Materials</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[#767586] ml-1">Executive Summary Prospectus</label>
                <textarea
                  rows={4}
                  placeholder="Draft a brief synthesized view here of why these trend indicators matter for executives, board rooms, and planning committees..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full p-4 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 h-12 bg-[#2c2abc] text-white font-bold text-sm rounded-xl hover:bg-[#4648d4] transition-all shadow-md cursor-pointer flex items-center gap-1"
                >
                  Configure Trends Linkage
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-[#767586] block selection-none">
                Select Trend Cards to Link ({selectedCardIds.length} Selected)
              </label>

              <div className="grid grid-cols-2 gap-3 max-h-[35vh] overflow-y-auto pr-1">
                {trendCards.map((card) => {
                  const isSelected = selectedCardIds.includes(card.id);
                  return (
                    <button
                      type="button"
                      key={card.id}
                      onClick={() => toggleTrendSelection(card.id)}
                      className={`p-3 rounded-2xl border text-left flex gap-3 items-center transition-all ${
                        isSelected
                          ? 'border-[#2c2abc] bg-[#2c2abc]/5 shadow-sm'
                          : 'border-[#c6c5d7]/30 hover:bg-[#f5f2fe]/40'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-extrabold text-[#1b1b23] truncate">{card.title}</h4>
                        <p className="text-[10px] text-[#767586] truncate mt-0.5">{card.badge} / {card.category}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-[#2c2abc] text-white' : 'border border-gray-300'}`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#c6c5d7]/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 h-12 bg-gray-100 hover:bg-gray-200 text-[#767586] font-bold text-sm rounded-xl transition-all cursor-pointer"
                >
                  Back to Specs
                </button>
                <button
                  type="button"
                  onClick={handleCompile}
                  className="px-6 h-12 bg-gradient-to-r from-[#21c55d] to-[#10b981] text-white font-bold text-sm rounded-xl hover:opacity-95 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Box className="w-4 h-4" />
                  Compile Executive Brief
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
