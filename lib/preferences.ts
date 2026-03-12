export type InterestLevel = 'obsessed' | 'love' | 'like' | 'meh' | 'dontcare';

export const INTEREST_OPTIONS: {
  label: string;
  value: InterestLevel;
}[] = [
  { label: 'Obsessed', value: 'obsessed' },
  { label: 'Love', value: 'love' },
  { label: 'Like', value: 'like' },
  { label: 'Meh', value: 'meh' },
  { label: "Don't care", value: 'dontcare' },
];

export const INTEREST_WEIGHTS: Record<InterestLevel, number> = {
  obsessed: 2.0,
  love: 1.5,
  like: 1.0,
  meh: 0.5,
  dontcare: 0,
};

export function defaultPreferences(sports: readonly string[]) {
  return Object.fromEntries(
    sports.map((sport) => [sport, 'like' as InterestLevel])
  ) as Record<string, InterestLevel>;
}
