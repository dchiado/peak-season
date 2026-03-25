export const SPORTS = [
  'NFL',
  'NBA',
  'MLB',
  'NHL',
  'NCAAF',
  'NCAAB',
  'EU Soccer',
  'MLS',
  'Golf',
  'Tennis',
  'Formula 1',
] as const;

export type Sport = typeof SPORTS[number];
