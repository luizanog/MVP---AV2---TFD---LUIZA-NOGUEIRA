/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TrendCardType {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeType: 'aesthetic' | 'tech' | 'motion' | 'strategy' | 'palette' | 'data' | string;
  image: string;
  description: string;
  timeText?: string;
  isBookmarked: boolean;
  isCustom?: boolean;
}

export interface BriefType {
  id: string;
  title: string;
  summary: string;
  cards: string[]; // references of TrendCardType IDs
  createdAt: string;
  author: string;
  industry: string;
}
