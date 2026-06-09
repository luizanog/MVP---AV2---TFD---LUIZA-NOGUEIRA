import { TrendCardType, BriefType } from './types';

export const INITIAL_TREND_CARDS: TrendCardType[] = [
  {
    id: 'eco-minimalism',
    title: 'Eco-Minimalism',
    category: 'Branding',
    badge: 'Aesthetic',
    badgeType: 'aesthetic',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuB5utj6maxCqBcuckKgGpmdEX8FLSvlR-eUhIuOp55ej5QbTOcPGWZgLx6LSJUX6pHohuip_zaFAgFAgcX8tblyctd-WzPDTStJfLRE_5cEERLIEK57X_zoRbaHacUHJZ2BLIHdMT_KMwro0kWg35YF9p_zhRAwiK-FEQzMYRWxKzwx0UwRTCMWlf47VdJAPdMJyYHgQ-6BukJvHXhEAW_FTVKvrTBJ_ow9mXm8E3forHO-aKqKg76U2Y',
    description: 'Fusing organic botanical elements with rigid architectural grids for sustainable luxury branding.',
    timeText: 'Updated 2h ago',
    isBookmarked: false,
  },
  {
    id: 'retro-translucency',
    title: 'Retro-Translucency',
    category: 'Motion Design',
    badge: 'Tech',
    badgeType: 'tech',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsA2shObR-O8dstszAs6eij04Z6vBMyi0jgt9ZRDVpq4d5zIVBq8EHvQRM3mKYcMh4DdVz5y5xx_3aTnj6jZu5gJQF7JWAxBJCS1UsMXKknnjDUQFjJNfinwSOsaLawJnLuyzDB-usLbPO4Uvm_1uXdt9SNCQHMcuQUVhudQuD31n6wTy_nb2ZMe0fj7B8l0jPryHUNTq0gv6xsY5GVC0yXPc3-SwqK_A2i32nblo1PBdYcuZmvd3zzHrM',
    description: 'The resurgence of semi-transparent hardware aesthetics in modern UI glassmorphism.',
    timeText: 'Rising Trend',
    isBookmarked: true,
  },
  {
    id: 'fluid-typography',
    title: 'Fluid Typography',
    category: 'Typography',
    badge: 'Motion',
    badgeType: 'motion',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsjhim7p64uuSQQ7MU5H66G14v-Gxx61EXIziqsUoMkCd0jtdQhu_Kyd0LCAB_dh0CntLF3U0gcK2ppNx-y5fPn56pVQUBCOPvkC7MWAfXK9afZx1BNkTSY-1eDy98b8ol0npjStLTrZ_NoEFU_2yL76inOBhrqBmPlQ1O-w5cBXY-EjvA3v7vXvejWUzh2QvPB_3wGZ9RsGQXKubb-3k7ENH9Ou4-sQhvQdyEcLaKRslFyrT6vYq9TfQ',
    description: 'Kinetic letterforms that morph based on user interaction and dynamic data streams.',
    timeText: 'High Impact',
    isBookmarked: false,
  },
  {
    id: 'generative-grids',
    title: 'Generative Grids',
    category: 'Motion Design',
    badge: 'Strategy',
    badgeType: 'strategy',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvNCjOG2zbgt3Y1fRYZ8_TP0_qSbbdrE7qUNWOLt1lkS720VOo3xaxYnKP62Ju5zcFUVX2IOUmZux-v5whkPo4F_eA0dvJHf_COLiDsSB742y-yvANVB_ONL77HQwLITsMansHsxl3pGzrQHxhkU7jmsMgdL4dEZHjzHy8KonokujsqVoMSFKZl4byTA0_9ULsgBCSqnisFdcyZ_Lea9m95lu1Zy9yVtzbwdzT9my00LZ9CjUORuUIiZA',
    description: 'Using AI to dynamically reconfigure layout systems for ultra-responsive web experiences.',
    timeText: 'Hot Innovation',
    isBookmarked: false,
  },
  {
    id: 'hyper-gradients',
    title: 'Hyper-Gradients',
    category: 'Branding',
    badge: 'Palette',
    badgeType: 'palette',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLulcdj2gO0pzwfTNk_W9FQ-AVPcXYOUcr1NDbCjCDP0yyXz4L_CItkcWmYTnANto9c6Y-nZdZUsVPiBOUGz0hyTGw-T7KbPyvodRKLxRfdchMLIi7hUUqgNxRM6xyFKhXpkhUyjuUtHTBEJsLbfNC5QnfG81PjgNn1yQIPXWAznaL8wh1gJA-qkEIpFURNHxPchJpEHYs7brXQAy5nYGECradoD8dQTJgZYH0EStXu1eEQZ2fktmb2x5j4',
    description: 'Transitioning from simple dual-tones to complex, multi-layered mesh gradients with noise textures.',
    timeText: 'Aesthetic Trend',
    isBookmarked: false,
  },
  {
    id: 'abstract-informationalism',
    title: 'Abstract Informationalism',
    category: 'Biotechnology',
    badge: 'Data',
    badgeType: 'data',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLv-cafn-Y-BgRUIlFgiWn32tfvk06JVd1_bFzIENqT4if_7YUwHBY3_OeB0R-8TqBRFnocM0ufs5d_wGKIBBbMu_WWLUIpopAF_1C6H1p6G_jo_1IhIqyFt1pWrsxFZ3-xamICkTtatW4loMv1b6GuO1Qiba9Up9VjK5QprHTok_wy3eD3_J0aTmTrmSp2f2RErALK7kDXI6Lns7xW759uXUIN5pf0FluMO9MdyOVYIvVAdGs7RUiTH3Xc',
    description: 'Converting raw analytics into high-fidelity artistic visualizations for executive briefings.',
    timeText: 'Analytics Boost',
    isBookmarked: false,
  },
  {
    id: 'synthetic-metabolic',
    title: 'Metabolic Packaging',
    category: 'Biotechnology',
    badge: 'Bio-Aesthetic',
    badgeType: 'strategy',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=600&q=80',
    description: 'Living, breathing packaging materials that dynamically shift color grids to monitor product degradation levels.',
    timeText: 'Rising Trend',
    isBookmarked: false,
  },
  {
    id: 'kinetic-slab-type',
    title: 'Kinetic Variable Slabs',
    category: 'Typography',
    badge: 'Typography',
    badgeType: 'motion',
    image: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&q=80',
    description: 'High-contrast, variable slab serifs designed to animate in response to active scroll speed deceleration properties.',
    timeText: 'High Impact',
    isBookmarked: false,
  }
];

export const INITIAL_BRIEFS: BriefType[] = [
  {
    id: 'brief-001',
    title: 'Premium Glassmorphism & UI Textures',
    summary: 'A detailed review of transparent and reflective textures in modern design solutions, incorporating Retro-Translucency in corporate identity.',
    cards: ['retro-translucency', 'generative-grids'],
    createdAt: '2026-06-08',
    author: 'Elena Rostova',
    industry: 'Consumer Technology'
  },
  {
    id: 'brief-002',
    title: 'Sustainable Luxury Design Protocols',
    summary: 'Leveraging organic materials and micro grids to minimize graphic footprint while capturing user attention with clean pastel colors and botanical gradients.',
    cards: ['eco-minimalism', 'hyper-gradients'],
    createdAt: '2026-06-09',
    author: 'Marcus Vance',
    industry: 'Branding & Apparel'
  }
];

export const CATEGORIES = [
  'All Trends',
  'Typography',
  'Motion Design',
  'Biotechnology',
  'Branding'
];

export const AI_TREND_INSIGHTS = [
  "Fluid microtextures will dominate tactile UX surfaces in Q3 as optical hand-tracking sensors advance.",
  "Biomimetic active typography is shifting brand voices from static authorities to living interfaces.",
  "We are moving from high-key brutalism towards premium organic grids accented with glass tiles.",
  "Noise-textured mesh gradients have shown a 42% uplift in digital retention metrics over vintage solid palettes.",
  "Corporate discovery platforms are adopting atmospheric glows to lower reader cognitive fatigue."
];
