import React, { useState } from 'react';
import { X, Sparkles, Image, Check } from 'lucide-react';
import { TrendCardType } from '../types';
import { supabase } from '../supabase';

interface NewTrendModalProps {
  onClose: () => void;
  onSave: (card: TrendCardType) => void;
}

const PRESET_IMAGES = [
  {
    name: 'Metabolic Bio',
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Cyber Glass',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Serene Botanical',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Liquid Abstract',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  }
];

export default function NewTrendModal({ onClose, onSave }: NewTrendModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Typography');
  const [badge, setBadge] = useState('Aesthetic');
  const [badgeType, setBadgeType] = useState('aesthetic');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [customUrl, setCustomUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Please specify a title and descriptive details.');
      return;
    }

    const finalImage = customUrl.trim() ? customUrl.trim() : imageUrl;

    const newCard: TrendCardType = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      badge,
      badgeType,
      image: finalImage,
      description: description.trim(),
      timeText: 'Just Published',
      isBookmarked: false,
      isCustom: true,
    };

  const { error } = await supabase
  .from('trends')
  .insert([
    {
      title: title.trim(),
      category,
      description: description.trim(),
      ai_summary: badge,
    },
  ]);

if (error) {
  console.error(error);
  setErrorMsg('Erro ao salvar no banco.');
  return;
}
    onSave(newCard);
    onClose();
  };

  const handleBadgeChange = (selectedBadge: string) => {
    setBadge(selectedBadge);
    // Auto-map type values
    const mapping: Record<string, string> = {
      'Aesthetic': 'aesthetic',
      'Tech': 'tech',
      'Motion': 'motion',
      'Strategy': 'strategy',
      'Palette': 'palette',
      'Data': 'data',
    };
    setBadgeType(mapping[selectedBadge] || 'aesthetic');
  };

  return (
    <div className="fixed inset-0 bg-[#1b1b23]/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-[32px] w-full max-w-xl overflow-hidden border border-[#c6c5d7]/30 shadow-2xl relative animate-scale-up">
        {/* Header bar */}
        <div className="px-6 pt-6 pb-4 border-b border-[#c6c5d7]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#2c2abc]/10 rounded-lg text-[#2c2abc]">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-xl font-bold text-[#1b1b23]">Create Creative Trend Draft</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-[#767586] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-xs text-red-600 rounded-xl border border-red-100">
              {errorMsg}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-[#767586] ml-1">Trend Concept Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Organic Glass-Tiles or Biomimetic Haptic Nodes..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-12 px-4 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-[#767586] ml-1">Macro Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 px-3 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm focus:outline-none text-[#1b1b23]"
              >
                <option value="Typography">Typography</option>
                <option value="Motion Design">Motion Design</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Branding">Branding</option>
              </select>
            </div>

            {/* Impact indicator badge */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-[#767586] ml-1">Design Vibe</label>
              <select
                value={badge}
                onChange={(e) => handleBadgeChange(e.target.value)}
                className="w-full h-12 px-3 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm focus:outline-none text-[#1b1b23]"
              >
                <option value="Aesthetic">Aesthetic</option>
                <option value="Tech">Tech</option>
                <option value="Motion">Motion</option>
                <option value="Strategy">Strategy</option>
                <option value="Palette">Palette</option>
                <option value="Data">Data</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-[#767586] ml-1">Trend Manifest Description</label>
            <textarea
              required
              rows={3}
              placeholder="Provide a description of the design aesthetic, physical properties, or technological components driving this industrial shift..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 bg-[#f5f2fe] border-none rounded-xl focus:ring-2 focus:ring-[#2c2abc] transition-all text-sm focus:outline-none resize-none"
            />
          </div>

          {/* Hero Artwork select */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#767586] ml-1 flex items-center gap-1">
              <Image className="w-3.5 h-3.5" />
              Trend Artwork Visual Selection
            </label>
            
            {/* Presets */}
            <div className="grid grid-cols-4 gap-2">
              {PRESET_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.name}
                  onClick={() => {
                    setImageUrl(img.url);
                    setCustomUrl('');
                  }}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    imageUrl === img.url && !customUrl
                      ? 'border-[#2c2abc] ring-2 ring-[#2c2abc]/20 scale-95'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-end p-1">
                    <span className="text-[9px] font-semibold text-white truncate w-full text-center">{img.name}</span>
                  </div>
                  {imageUrl === img.url && !customUrl && (
                    <div className="absolute top-1 right-1 bg-[#2c2abc] text-white p-0.5 rounded-full">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Custom URL */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Or key custom Unsplash image URL..."
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                  }}
                  className="flex-1 h-10 px-3 bg-[#f5f2fe] border-none rounded-lg focus:ring-2 focus:ring-[#2c2abc] transition-all text-xs focus:outline-none"
                />
                {customUrl.trim() && (
                  <div className="w-10 h-10 border border-[#c6c5d7]/30 bg-[#fcf8ff] rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={customUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Footer Button */}
          <div className="pt-4 border-t border-[#c6c5d7]/20 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 h-12 bg-gray-100 hover:bg-gray-200 text-[#767586] font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 h-12 bg-[#2c2abc] text-white font-bold text-sm rounded-xl hover:bg-[#4648d4] transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              Publish to Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
