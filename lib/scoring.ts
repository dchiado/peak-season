import { SPORT_SEASONS, SportPhase } from './values';
import { INTEREST_WEIGHTS } from './preferences';
import { InterestLevel } from './preferences';

export type DisplayMonthScore = {
  month: number;
  rawScore: number;
  normalizedScore: number; // 0–100
};

export type MonthScore = {
  month: number;
  score: number;
};

export type MonthBreakdownItem = {
  sport: string;
  score: number;
  phases: SportPhase[];
};

/**
 * Returns the total score for a given month (0–11),
 * based on user sport interests.
 */
export function getMonthScore(
  month: number,
  sportPreferences: Record<string, InterestLevel>
): number {
  let total = 0;

  for (const sportSeason of SPORT_SEASONS) {
    const interest = sportPreferences[sportSeason.sport] ?? 'neutral';
    const interestWeight = INTEREST_WEIGHTS[interest];

    if (interestWeight === 0) continue;

    const monthProfile = sportSeason.months.find(
      (m) => m.month === month
    );

    if (!monthProfile) continue;

    total += monthProfile.baseScore * interestWeight;
  }

  return Math.round(total * 100) / 100;
}

export function getAllMonthScores(
  sportPreferences: Record<string, InterestLevel>
) {
  return Array.from({ length: 12 }, (_, month) => ({
    month,
    score: getMonthScore(month, sportPreferences),
  })).sort((a, b) => b.score - a.score);
}

/**
 * Normalize scores making the max month 100.
 */
export function normalizeByMax(
  scores: { month: number; score: number }[]
) {
  const max = Math.max(...scores.map(s => s.score));

  if (max === 0) return scores;

  return scores.map(s => ({
    ...s,
    score: Math.round((s.score / max) * 100),
  }));
}

/**
 * Normalize scores to a 0–100 range.
 */
export function normalizeMonthScores(
  scores: MonthScore[]
): MonthScore[] {
  const max = Math.max(...scores.map(s => s.score));
  const min = Math.min(...scores.map(s => s.score));

  // Avoid divide-by-zero if all months are equal
  if (max === min) {
    return scores.map(s => ({
      ...s,
      score: 100,
    }));
  }

  return scores.map(s => ({
    ...s,
    score: Math.round(((s.score - min) / (max - min)) * 100),
  }));
}

export function orderAndNormalizeMonthScores(
  data: MonthScore[]
): DisplayMonthScore[] {
  if (data.length === 0) return [];

  const maxScore = Math.max(...data.map(d => d.score));

  return [...data]
    .sort((a, b) => a.month - b.month)
    .map(d => ({
      month: d.month,
      rawScore: d.score,
      normalizedScore: Math.round((d.score / maxScore) * 100),
    }));
}

/**
 * Get a breakdown of which sports contributed to a given month's score,
 * sorted by contribution (highest first).
 */
export function getMonthBreakdown(
  month: number,
  sportPreferences: Record<string, InterestLevel>
): MonthBreakdownItem[] {
  const breakdown: MonthBreakdownItem[] = [];

  for (const sportSeason of SPORT_SEASONS) {
    const interest = sportPreferences[sportSeason.sport] ?? 'neutral';
    const interestWeight = INTEREST_WEIGHTS[interest];

    if (interestWeight === 0) continue;

    const monthProfile = sportSeason.months.find(m => m.month === month);
    if (!monthProfile) continue;

    const score = monthProfile.baseScore * interestWeight;
    breakdown.push({
      sport: sportSeason.sport,
      score: Math.round(score * 100) / 100,
      phases: monthProfile.phases,
    });
  }

  return breakdown.sort((a, b) => b.score - a.score);
}
