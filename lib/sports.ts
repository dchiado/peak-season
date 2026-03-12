export const SPORTS = [
  'NFL',
  'NBA',
  'MLB',
  'NHL',
  'College Football',
  'College Basketball',
  'European Soccer',
  'MLS',
  'Golf',
  'Tennis',
  'Formula 1',
] as const;

export type Sport = typeof SPORTS[number];
