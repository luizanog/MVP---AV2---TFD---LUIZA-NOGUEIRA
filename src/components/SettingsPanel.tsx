import React from 'react';
import { Settings, Sparkles, User, Database, Eye, RefreshCw, Layers } from 'lucide-react';

interface SettingsPanelProps {
  currentUserEmail: string;
  onLogout: () => void;
  onResetData: () => void;
  glowsEnabled: boolean;
  setGlowsEnabled: (enabled: boolean) => void;
  airySpacing: boolean;
  setAirySpacing: (airySpacing: boolean) => void;
}

export default function SettingsPanel({
  currentUserEmail,
  onLogout,
  onResetData,
  glowsEnabled,
  setGlowsEnabled,
  airySpacing,
  setAirySpacing,
}: SettingsPanelProps) {
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Settings Header banner */}
      <div className="bg-white border border-[#c6c5d7]/30 rounded-[28px] p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2c2abc]/10 flex items-center justify-center text-[#2c2abc]">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1b1b23]">Studio Matrix Settings</h2>
            <p className="text-xs text-[#767586]">Manage your local presentation environment & options</p>
          </div>
        </div>
      </div>

      {/* User info Section */}
      <div className="bg-white border border-[#c6c5d7]/30 rounded-[28px] p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#767586] flex items-center gap-1.5">
          <User className="w-4 h-4 text-[#2c2abc]" />
          Active Account Metadata
        </h3>
        <div className="p-4 bg-[#f5f2fe] rounded-2xl flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-[#767586]">Registered User Identity</p>
            <p className="text-sm font-bold text-[#1b1b23] break-all">{currentUserEmail}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-[#ba1a1a]/10 hover:bg-[#ba1a1a]/20 text-[#ba1a1a] text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Acknowledge Exit (Sign Out)
          </button>
        </div>
      </div>

      {/* Visual Workspace Customizer */}
      <div className="bg-white border border-[#c6c5d7]/30 rounded-[28px] p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#767586] flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-[#2c2abc]" />
          Visual Studio Styling Options
        </h3>
        
        <div className="space-y-4">
          
          {/* Toggles for Glows */}
          <div className="flex items-center justify-between p-1">
            <div>
              <p className="text-xs font-bold text-[#1b1b23]">Toggle Atmospheric Glows</p>
              <p className="text-[11px] text-[#767586]">Enables animated radial gradient blurs behind elements</p>
            </div>
            <button
              onClick={() => setGlowsEnabled(!glowsEnabled)}
              className={`w-14 h-8 rounded-full transition-all relative ${
                glowsEnabled ? 'bg-[#2c2abc]' : 'bg-gray-300'
              }`}
            >
              <span className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-all ${
                glowsEnabled ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>

          <hr className="border-[#c6c5d7]/20" />

          {/* Grid Spacing presets */}
          <div className="flex items-center justify-between p-1">
            <div>
              <p className="text-xs font-bold text-[#1b1b23]">Responsive Layout Comfort</p>
              <p className="text-[11px] text-[#767586]">Toggle between spacious editorial margins and standard sizing</p>
            </div>
            <div className="flex bg-[#f5f2fe] p-1 rounded-xl">
              <button
                onClick={() => setAirySpacing(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !airySpacing ? 'bg-white text-[#2c2abc] shadow-sm' : 'text-[#767586] hover:text-[#1b1b23]'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setAirySpacing(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  airySpacing ? 'bg-white text-[#2c2abc] shadow-sm' : 'text-[#767586] hover:text-[#1b1b23]'
                }`}
              >
                Airy
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* System control block */}
      <div className="bg-white border border-[#c6c5d7]/30 rounded-[28px] p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#767586] flex items-center gap-1.5">
          <Database className="w-4 h-4 text-[#2c2abc]" />
          Platform Diagnostics & Dataset Controls
        </h3>
        
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
          <Layers className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-900">Developer Testing Sandbox</p>
            <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
              The TrendClarity discovery database resides locally in secure container cookies and browser storage. If you create too many draft cards, use the reset trigger below to restore pristine original mockups.
            </p>
            <button
              onClick={() => {
                onResetData();
                alert('TrendClarity system database restored to pristine mockups state.');
              }}
              className="mt-3 h-9 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Local Database
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
