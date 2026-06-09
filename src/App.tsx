/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Search,
  Mic,
  Bell,
  Compass,
  TrendingUp,
  Bookmark,
  FileText,
  Settings as SettingsIcon,
  Plus,
  SlidersHorizontal,
  ChevronRight,
  LogOut,
  X,
  FileSpreadsheet
} from 'lucide-react';

import { TrendCardType, BriefType } from './types';
import {
  INITIAL_TREND_CARDS,
  INITIAL_BRIEFS,
  CATEGORIES,
  AI_TREND_INSIGHTS
} from './data';

import SignInScreen from './components/SignInScreen';
import TrendCard from './components/TrendCard';
import NewTrendModal from './components/NewTrendModal';
import NewBriefWizard from './components/NewBriefWizard';
import TrendInspectModal from './components/TrendInspectModal';
import SettingsPanel from './components/SettingsPanel';

export default function App() {
  // Authentication session state
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  // Core navigation options
  const [currentTab, setCurrentTab] = useState<'feed' | 'trending' | 'saved' | 'briefs' | 'settings'>('feed');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Trends');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary dataset lists
  const [trendCards, setTrendCards] = useState<TrendCardType[]>(INITIAL_TREND_CARDS);
  const [briefs, setBriefs] = useState<BriefType[]>(INITIAL_BRIEFS);

  // Custom visual triggers & controls
  const [glowsEnabled, setGlowsEnabled] = useState<boolean>(true);
  const [airySpacing, setAirySpacing] = useState<boolean>(false);
  const [currentAIInsight, setCurrentAIInsight] = useState<string>('');
  const [isCopiedInsight, setIsCopiedInsight] = useState<boolean>(false);

  // Menu open triggers
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Active modals
  const [activeInspectCard, setActiveInspectCard] = useState<TrendCardType | null>(null);
  const [isNewTrendOpen, setIsNewTrendOpen] = useState<boolean>(false);
  const [isNewBriefOpen, setIsNewBriefOpen] = useState<boolean>(false);

  // Notification simulation logs
  const [notificationLogs, setNotificationLogs] = useState<string[]>([
    'Trend "Eco-Minimalism" was updated 2 hours ago.',
    'Marcus Vance compiled "Sustainable Luxury Design" brief.',
    'Retro-Translucency declared "Rising Trend Q3" by design board.',
  ]);

  // Mouse coordinate coordinates for background organic shapes blurs
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized ratio values
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLoginSuccess = (email: string) => {
    setSessionEmail(email);
    // Pop up introductory briefing event
    setNotificationLogs((prev) => [
      `User ${email} signed in securely to Discovery Studio.`,
      ...prev
    ]);
  };

  const handleLogout = () => {
    setSessionEmail(null);
    setCurrentTab('feed');
    setSearchQuery('');
    setSelectedCategory('All Trends');
  };

  const handleResetDatabase = () => {
    setTrendCards(INITIAL_TREND_CARDS);
    setBriefs(INITIAL_BRIEFS);
  };

  const handleBookmarkToggle = (id: string) => {
    setTrendCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isBookmarked: !card.isBookmarked } : card
      )
    );
    // If we're inspecting, keep the modal state synced
    if (activeInspectCard && activeInspectCard.id === id) {
      setActiveInspectCard((prev) =>
        prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null
      );
    }
  };

  const handleSaveTrend = (newCard: TrendCardType) => {
    setTrendCards((prev) => [newCard, ...prev]);
    setNotificationLogs((prev) => [
      `Published custom card trend index "${newCard.title}".`,
      ...prev
    ]);
    setSelectedCategory('All Trends');
    setCurrentTab('feed');
  };

  const handleSaveBrief = (newBrief: BriefType) => {
    setBriefs((prev) => [newBrief, ...prev]);
    setNotificationLogs((prev) => [
      `Completed compilation brief "${newBrief.title}" with target indicators.`,
      ...prev
    ]);
    setCurrentTab('briefs');
  };

  const triggerRandomAIInsight = () => {
    const freshIndex = Math.floor(Math.random() * AI_TREND_INSIGHTS.length);
    setCurrentAIInsight(AI_TREND_INSIGHTS[freshIndex]);
    setIsCopiedInsight(false);
  };

  // Filter trends based on active tab search, category, etc.
  const filteredTrends = trendCards.filter((card) => {
    // 1. Sidebar Tab selection logic
    if (currentTab === 'trending') {
      const isTrending =
        card.timeText?.includes('Rising') ||
        card.timeText?.includes('Hot') ||
        card.timeText?.includes('High Impact');
      if (!isTrending) return false;
    } else if (currentTab === 'saved') {
      if (!card.isBookmarked) return false;
    }

    // 2. Category selection logic (All categories vs items check)
    if (selectedCategory !== 'All Trends') {
      if (card.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    // 3. Search Bar query matching description or titles
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = card.title.toLowerCase().includes(q);
      const matchesDesc = card.description.toLowerCase().includes(q);
      const matchesCat = card.category.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesCat) return false;
    }

    return true;
  });

  // Render Login interface if user is not authenticated
  if (!sessionEmail) {
    return <SignInScreen onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-[#fcf8ff] text-[#1b1b23] font-sans min-h-screen relative overflow-x-hidden flex flex-col">
      
      {/* Background Organic Blurred Blobs */}
      {glowsEnabled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute rounded-full bg-[#2c2abc] w-[450px] h-[450px] filter blur-[100px] opacity-[0.14] transition-transform duration-700 ease-out"
            style={{
              top: '5%',
              right: '2%',
              transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`
            }}
          />
          <div
            className="absolute rounded-full bg-[#bdc2ff] w-[500px] h-[500px] filter blur-[90px] opacity-[0.25] transition-transform duration-500 ease-out"
            style={{
              bottom: '5%',
              left: '2%',
              transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px)`
            }}
          />
          <div
            className="absolute rounded-full bg-[#2d37a0] w-[350px] h-[350px] filter blur-[80px] opacity-[0.12] transition-transform duration-1000 ease-out"
            style={{
              top: '40%',
              left: '33%',
              transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`
            }}
          />
        </div>
      )}

      {/* Top Navigation Bar Component */}
      <header className="fixed top-0 w-full z-40 bg-[rgba(252,248,255,0.85)] backdrop-blur-xl border-b border-[#c6c5d7]/25 shadow-sm">
        <div className="max-w-[1440px] h-20 mx-auto px-6 md:px-12 flex justify-between items-center relative">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-12">
            <button
              onClick={() => {
                setCurrentTab('feed');
                setSelectedCategory('All Trends');
                setSearchQuery('');
              }}
              className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-10 h-10 bg-[#2c2abc] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#2c2abc]/10 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-[#2c2abc] tracking-tight">TrendClarity</span>
                <p className="text-[9px] text-[#767586] font-semibold tracking-widest uppercase mt-[-2px]">Discovery Studio</p>
              </div>
            </button>

            {/* Quick Filter Access links */}
            <nav className="hidden lg:flex items-center gap-8 text-[#464554] text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => {
                  setCurrentTab('feed');
                  setSelectedCategory('All Trends');
                }}
                className={`py-2 transition-all cursor-pointer ${
                  currentTab === 'feed' && selectedCategory === 'All Trends'
                    ? 'text-[#2c2abc] border-b-2 border-[#2c2abc] font-black'
                    : 'hover:text-[#2c2abc]'
                }`}
              >
                Discover
              </button>
              <button
                onClick={() => {
                  setCurrentTab('feed');
                  setSelectedCategory('Motion Design');
                }}
                className={`py-2 transition-all cursor-pointer ${
                  currentTab === 'feed' && selectedCategory === 'Motion Design'
                    ? 'text-[#2c2abc] border-b-2 border-[#2c2abc] font-black'
                    : 'hover:text-[#2c2abc]'
                }`}
              >
                Motion Link
              </button>
              <button
                onClick={triggerRandomAIInsight}
                className="py-2 hover:text-[#2c2abc] flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ff7e5f]" />
                Generator
              </button>
              <button
                onClick={() => setCurrentTab('briefs')}
                className={`py-2 transition-all cursor-pointer ${
                  currentTab === 'briefs'
                    ? 'text-[#2c2abc] border-b-2 border-[#2c2abc] font-black'
                    : 'hover:text-[#2c2abc]'
                }`}
              >
                Briefings Repo
              </button>
            </nav>
          </div>

          {/* Core Settings utilities & inputs */}
          <div className="flex items-center gap-4">
            
            {/* Expanded Search Bar */}
            <div className="relative hidden md:flex items-center bg-[#f5f2fe] border border-[#c6c5d7]/20 rounded-full py-2 px-4 focus-within:ring-2 focus-within:ring-[#2c2abc] transition-all w-64 focus-within:w-76 group">
              <Search className="w-4 h-4 text-[#767586] mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trends or filters..."
                className="bg-transparent border-none focus:outline-none text-xs w-full text-[#1b1b23] placeholder:text-[#c6c5d7]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-0.5 hover:bg-gray-200 rounded-full text-[#767586] flex-shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sparkle trigger - AI Insight button */}
            <button
              onClick={triggerRandomAIInsight}
              title="Generate Q3 design guidance"
              className="p-2 sm:p-2.5 rounded-full hover:bg-[#2c2abc]/10 text-[#2c2abc] transition-all active:scale-95 cursor-pointer flex-shrink-0 relative"
            >
              <Sparkles className="w-5 h-5" />
            </button>

            {/* Simulated Voice trigger button */}
            <button
              onClick={() => {
                alert('Audio voice detection triggers when integrated in production workspace environment.');
              }}
              title="Voice Search"
              className="p-2 sm:p-2.5 rounded-full hover:bg-[#2c2abc]/10 text-[#2c2abc] transition-all active:scale-95 cursor-pointer flex-shrink-0"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Bell Toggle Notifications button */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
                className={`p-2 sm:p-2.5 rounded-full transition-all active:scale-95 cursor-pointer flex-shrink-0 relative ${
                  isNotificationsOpen ? 'bg-[#2c2abc]/15 text-[#2c2abc]' : 'hover:bg-[#2c2abc]/10 text-[#2c2abc]'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-[#ff7e5f]" />
              </button>

              {/* Notification dropdown list popup */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-[#c6c5d7]/30 shadow-2xl p-4 z-50 animate-scale-up">
                  <div className="flex justify-between items-center mb-3 pb-1 border-b border-gray-100">
                    <span className="text-xs font-bold text-[#1b1b23]">Studio Activities Log</span>
                    <button
                      onClick={() => setNotificationLogs([])}
                      className="text-[10px] text-[#2c2abc] font-semibold hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                  {notificationLogs.length === 0 ? (
                    <p className="text-xs text-[#767586] text-center py-6">No recent system notifications.</p>
                  ) : (
                    <div className="space-y-2.5 max-h-60 overflow-y-auto">
                      {notificationLogs.map((log, offset) => (
                        <div key={offset} className="flex gap-2.5 items-start text-[11px] leading-relaxed text-[#464554] p-1.5 hover:bg-gray-50 rounded-lg">
                          <span className="w-1.5 h-1.5 bg-[#2c2abc] rounded-full flex-shrink-0 mt-1.5" />
                          <p>{log}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dropdown Profile and sign out container */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
                className="w-10 h-10 rounded-full overflow-hidden border border-[#c6c5d7]/40 ring-offset-2 ring-1 ring-[#c6c5d7]/10 hover:ring-[#2c2abc] transition-all cursor-pointer flex-shrink-0"
              >
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="Avatar Profile"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-[#c6c5d7]/30 shadow-2xl p-4 z-50 animate-scale-up text-left">
                  <p className="text-[10px] font-bold text-[#767586] uppercase tracking-wider">Signed In As</p>
                  <p className="text-xs font-black text-[#1b1b23] truncate mb-2.5">{sessionEmail}</p>
                  
                  <hr className="border-gray-100 mb-2" />
                  
                  <button
                    onClick={() => {
                      setCurrentTab('settings');
                      setIsProfileOpen(false);
                    }}
                    className="w-full py-1.5 px-2 hover:bg-[#f5f2fe] text-xs font-semibold text-[#1b1b23] rounded-lg transition-all text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <SettingsIcon className="w-3.5 h-3.5" />
                    Adjust Preferences
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-1.5 px-2 hover:bg-[#ba1a1a]/5 text-xs font-semibold text-[#ba1a1a] rounded-lg transition-all text-left flex items-center gap-1.5 mt-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out Session
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Main Multi-Module Body Structure */}
      <div className="flex-1 max-w-[1440px] mx-auto w-full pt-20 px-4 md:px-12 flex relative">
        
        {/* Left Side Navigation Rails - Desktop View only */}
        <aside className="hidden lg:flex flex-col w-64 h-[80vh] sticky top-28 py-6 pr-6 border-r border-[#c6c5d7]/20 flex-shrink-0 justify-between select-none z-10">
          <div>
            <div className="mb-6 px-3">
              <h2 className="text-[11px] font-black uppercase text-[#767586] tracking-widest leading-none">Discovery Studio</h2>
              <p className="text-xs text-[#1b1b23] font-bold mt-1">Modern Corporate</p>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => {
                  setCurrentTab('feed');
                  setSelectedCategory('All Trends');
                }}
                className={`w-full h-12 px-4 rounded-xl flex items-center gap-3 font-semibold text-xs transition-all tracking-wide cursor-pointer text-left ${
                  currentTab === 'feed'
                    ? 'bg-[#2c2abc]/10 text-[#2c2abc] font-black'
                    : 'text-[#464554] hover:bg-[#f5f2fe]'
                }`}
              >
                <Compass className={`w-4 h-4 ${currentTab === 'feed' ? 'stroke-[2.5px]' : ''}`} />
                <span>Primary Feed</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('trending');
                  setSelectedCategory('All Trends');
                }}
                className={`w-full h-12 px-4 rounded-xl flex items-center gap-3 font-semibold text-xs transition-all tracking-wide cursor-pointer text-left ${
                  currentTab === 'trending'
                    ? 'bg-[#2c2abc]/10 text-[#2c2abc] font-black'
                    : 'text-[#464554] hover:bg-[#f5f2fe]'
                }`}
              >
                <TrendingUp className={`w-4 h-4 ${currentTab === 'trending' ? 'stroke-[2.5px]' : ''}`} />
                <span>Rising Trends</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('saved');
                }}
                className={`w-full h-12 px-4 rounded-xl flex items-center gap-3 font-semibold text-xs transition-all tracking-wide cursor-pointer text-left ${
                  currentTab === 'saved'
                    ? 'bg-[#2c2abc]/10 text-[#2c2abc] font-black'
                    : 'text-[#464554] hover:bg-[#f5f2fe]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${currentTab === 'saved' ? 'stroke-[2.5px]' : ''}`} />
                <span>Saved Indicators ({trendCards.filter((t) => t.isBookmarked).length})</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('briefs');
                }}
                className={`w-full h-12 px-4 rounded-xl flex items-center gap-3 font-semibold text-xs transition-all tracking-wide cursor-pointer text-left ${
                  currentTab === 'briefs'
                    ? 'bg-[#2c2abc]/10 text-[#2c2abc] font-black'
                    : 'text-[#464554] hover:bg-[#f5f2fe]'
                }`}
              >
                <FileText className={`w-4 h-4 ${currentTab === 'briefs' ? 'stroke-[2.5px]' : ''}`} />
                <span>Executive Briefs ({briefs.length})</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('settings');
                }}
                className={`w-full h-12 px-4 rounded-xl flex items-center gap-3 font-semibold text-xs transition-all tracking-wide cursor-pointer text-left ${
                  currentTab === 'settings'
                    ? 'bg-[#2c2abc]/10 text-[#2c2abc] font-black'
                    : 'text-[#464554] hover:bg-[#f5f2fe]'
                }`}
              >
                <SettingsIcon className={`w-4 h-4 ${currentTab === 'settings' ? 'stroke-[2.5px]' : ''}`} />
                <span>Studio Preferences</span>
              </button>
            </nav>
          </div>

          {/* Sidebar CTA Action */}
          <div className="pt-6 border-t border-[#c6c5d7]/20">
            <button
              onClick={() => setIsNewBriefOpen(true)}
              className="w-full h-13 bg-[#4651b9] text-white rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-[#4651b9]/10 cursor-pointer active:scale-98 transition-all"
            >
              <Plus className="w-4 h-4" />
              Compile New Brief
            </button>
          </div>
        </aside>

        {/* Central main workspace content */}
        <main className={`flex-1 lg:pl-10 pb-20 ${airySpacing ? 'py-12' : 'py-8'} z-10`}>
          
          {/* Sparkles Generated AI Indicator Overlay */}
          {currentAIInsight && (
            <div className="mb-8 p-5 bg-white border border-[#2c2abc]/30 rounded-3xl relative animate-scale-up shadow-sm">
              <div className="absolute top-4 right-4 flex gap-1.5">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentAIInsight);
                    setIsCopiedInsight(true);
                    setTimeout(() => setIsCopiedInsight(false), 2000);
                  }}
                  className="px-2.5 py-1 bg-[#2c2abc]/5 hover:bg-[#2c2abc]/10 rounded-lg text-[#2c2abc] font-bold text-[10px] uppercase transition-all"
                >
                  {isCopiedInsight ? 'Copied Link' : 'Copy Insight'}
                </button>
                <button
                  onClick={() => setCurrentAIInsight('')}
                  className="p-1 rounded-full hover:bg-gray-100 text-[#767586] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-3.5 items-start pr-12">
                <div className="p-2 bg-[#ff7e5f]/10 rounded-xl text-[#ff7e5f] flex-shrink-0">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#2c2abc]">AI Studio Trend Catalyst</h4>
                  <p className="text-sm font-semibold italic text-[#1b1b23] mt-1 pr-6 leading-relaxed">
                    "{currentAIInsight}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Layout Routing depends on currentTab status */}
          {currentTab === 'settings' ? (
            <SettingsPanel
              currentUserEmail={sessionEmail}
              onLogout={handleLogout}
              onResetData={handleResetDatabase}
              glowsEnabled={glowsEnabled}
              setGlowsEnabled={setGlowsEnabled}
              airySpacing={airySpacing}
              setAirySpacing={setAirySpacing}
            />
          ) : currentTab === 'briefs' ? (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2abc] tracking-tight">Active Strategic Briefings</h1>
                  <p className="text-xs text-[#767586] mt-1">Synchronized insights package archives for executive reporting</p>
                </div>
                <button
                  onClick={() => setIsNewBriefOpen(true)}
                  className="h-12 px-6 bg-[#4651b9] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90 shadow-md cursor-pointer"
                >
                  <Plus className="w-4.5 h-4.5" />
                  New Brief
                </button>
              </div>

              {briefs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#c6c5d7]/30 text-center p-12">
                  <p className="text-xs text-[#767586]">No briefings compiled yet. Use compiler wizard to group indicators.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {briefs.map((brief) => (
                    <div key={brief.id} className="bg-white border border-[#c6c5d7]/30 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative group">
                      <div className="flex justify-between items-start">
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-100">
                          {brief.industry}
                        </span>
                        <span className="text-[10px] text-[#767586] font-medium">{brief.createdAt}</span>
                      </div>
                      
                      <h3 className="text-base font-extrabold text-[#1b1b23] mt-3 group-hover:text-[#2c2abc] transition-colors">
                        {brief.title}
                      </h3>
                      
                      <p className="text-xs text-[#464554] mt-2 line-clamp-3 leading-relaxed">
                        {brief.summary}
                      </p>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[9px] font-semibold text-gray-700 uppercase">
                            {brief.author.charAt(0)}
                          </div>
                          <span className="text-[10px] text-[#767586]">By {brief.author}</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#c6c5d7]">
                          {brief.cards.length} Linked Indicators
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="animate-fade-in">
              
              {/* Main Feed Content heading header section */}
              <div className="flex flex-col gap-6 mb-8 select-none">
                <div className="flex justify-between items-end flex-wrap gap-4">
                  <div>
                    <span className="text-[11px] font-extrabold text-[#767586] tracking-widest uppercase">
                      {currentTab === 'saved' ? 'Saved Collections' : currentTab === 'trending' ? 'Dynamic Trend Accelerator' : 'Emerging Technologies'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#2c2abc] tracking-tight mt-1">
                      {currentTab === 'saved' ? 'Bookmarked Insights' : currentTab === 'trending' ? 'Trending Next-Gen' : 'Discover the Next'}
                    </h1>
                  </div>

                  {/* Top quick search utility block on mobile screens */}
                  <button
                    onClick={() => setIsNewTrendOpen(true)}
                    className="h-12 px-6 bg-[#2c2abc] hover:bg-[#4648d4] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-[#2c2abc]/10 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    New Trend card
                  </button>
                </div>

                {/* Categories Horizontal Filter Chips List */}
                <div className="flex flex-wrap gap-2 pt-2 scrollbar-none">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2c2abc] text-white shadow-md shadow-[#2c2abc]/15 scale-102 font-heavy'
                            : 'bg-[#d7dff9]/40 text-[#5a6278] hover:bg-[#cbf1ff]/30 border border-[#c6c5d7]/20'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feed Masonry cards grid listing view */}
              <div className="w-full">
                {filteredTrends.length === 0 ? (
                  <div className="bg-white border border-[#c6c5d7]/30 rounded-[28px] p-12 text-center max-w-lg mx-auto">
                    <p className="text-sm font-semibold text-[#1b1b23]">No matching trends matched your criteria</p>
                    <p className="text-xs text-[#767586] mt-1 leading-relaxed">
                      Try resetting active tags, searching another term, or clicking "+" to publish a custom indicator draft model.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All Trends');
                        setCurrentTab('feed');
                      }}
                      className="mt-4 px-4 py-2 bg-[#2c2abc] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="columns-1 md:columns-2 xl:columns-3 gap-6">
                    {filteredTrends.map((card) => (
                      <TrendCard
                        key={card.id}
                        card={card}
                        onBookmarkToggle={handleBookmarkToggle}
                        onInspect={(c) => setActiveInspectCard(c)}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Persistent floating active mobile FAB button trigger */}
      <button
        onClick={() => setIsNewTrendOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-[#2c2abc] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 cursor-pointer shadow-[#2c2abc]/20 block md:hidden"
        title="Add Custom Trend Card"
      >
        <Plus className="w-6 h-6 stroke-[2.5px]" />
      </button>

      {/* --- Overlay Modals Portals --- */}

      {/* 1. Modal: Inspect trend indicators details */}
      {activeInspectCard && (
        <TrendInspectModal
          card={activeInspectCard}
          onClose={() => setActiveInspectCard(null)}
          onBookmarkToggle={handleBookmarkToggle}
        />
      )}

      {/* 2. Modal: Design and append trend card details */}
      {isNewTrendOpen && (
        <NewTrendModal
          onClose={() => setIsNewTrendOpen(false)}
          onSave={handleSaveTrend}
        />
      )}

      {/* 3. Modal: Executive briefings wizard template setup */}
      {isNewBriefOpen && (
        <NewBriefWizard
          trendCards={trendCards}
          onClose={() => setIsNewBriefOpen(false)}
          onSave={handleSaveBrief}
          currentUserEmail={sessionEmail}
        />
      )}

      {/* Aesthetic pairing footnote */}
      <footer className="py-6 mt-auto text-center border-t border-[#c6c5d7]/15">
        <p className="text-[11px] text-[#767586] select-none">
          TrendClarity discovery studio workspace • Validated for High-Contrast Responsive layouts
        </p>
      </footer>

    </div>
  );
}
