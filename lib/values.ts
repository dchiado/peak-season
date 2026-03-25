export type SportPhase =
  | 'offseason'
  | 'preseason'
  | 'regular'
  | 'playoffs'
  | 'championship'
  | 'superbowl'
  | 'tournament'
  | 'major'
  | 'push'
  | 'return';

export type SportPhaseLabelMap = Record<SportPhase, string>;

export const SPORT_PHASE_LABELS: SportPhaseLabelMap = {
  offseason: 'Offseason',
  preseason: 'Preseason',
  regular: 'Regular Season',
  playoffs: 'Playoffs',
  push: 'Playoff push',
  return: 'Return to play',
  championship: 'Championship',
  superbowl: 'Super Bowl',
  tournament: 'Tournament',
  major: 'Major Tournament',
};

export type SportMonthProfile = {
  month: number;        // 0 = Jan, 11 = Dec
  baseScore: number;    // 0–5
  phases: SportPhase[];
};

export type SportSeasonProfile = {
  sport: string;
  months: SportMonthProfile[];
};

export const SPORT_SEASONS: SportSeasonProfile[] = [
  // ======================
  // NFL
  // ======================
  {
    sport: 'NFL',
    months: [
      { month: 0, baseScore: 5, phases: ['playoffs'] },          // January: playoffs
      { month: 1, baseScore: 3, phases: ['superbowl'] },        // February: Super Bowl
      { month: 8, baseScore: 4, phases: ['return'] },           // September: season starts
      { month: 9, baseScore: 3, phases: ['regular'] },          // October: mid-season
      { month: 10, baseScore: 3, phases: ['regular'] },         // November: mid-season
      { month: 11, baseScore: 4, phases: ['regular'] },         // December: playoff push
    ],
  },

  // ======================
  // College Football
  // ======================
  {
    sport: 'NCAAF',
    months: [
      { month: 0, baseScore: 5, phases: ['championship'] },     // January: CFP + bowls
      { month: 8, baseScore: 4, phases: ['return'] },           // September: season start
      { month: 9, baseScore: 3, phases: ['regular'] },          // October: mid-season
      { month: 10, baseScore: 3, phases: ['regular'] },         // November: mid-season
      { month: 11, baseScore: 4, phases: ['playoffs'] },        // December: playoff push
    ],
  },

  // ======================
  // NBA
  // ======================
  {
    sport: 'NBA',
    months: [
      { month: 0, baseScore: 3, phases: ['regular'] },          // Jan
      { month: 1, baseScore: 3, phases: ['regular'] },          // Feb
      { month: 2, baseScore: 3, phases: ['regular'] },          // Mar
      { month: 3, baseScore: 4, phases: ['playoffs'] },         // Apr: early playoffs
      { month: 4, baseScore: 5, phases: ['playoffs', 'push'] }, // May: playoff push
      { month: 5, baseScore: 5, phases: ['championship'] },     // Jun: Finals
      { month: 9, baseScore: 4, phases: ['return'] },           // Oct: season return
      { month: 10, baseScore: 3, phases: ['regular'] },         // Nov: early season
      { month: 11, baseScore: 3, phases: ['regular'] },         // Dec
    ],
  },

  // ======================
  // NHL
  // ======================
  {
    sport: 'NHL',
    months: [
      { month: 0, baseScore: 3, phases: ['regular'] },          // Jan
      { month: 1, baseScore: 3, phases: ['regular'] },          // Feb
      { month: 2, baseScore: 4, phases: ['regular'] },          // Mar: playoff push begins
      { month: 3, baseScore: 4, phases: ['playoffs'] },         // Apr
      { month: 4, baseScore: 5, phases: ['playoffs', 'push'] }, // May: deep playoffs
      { month: 5, baseScore: 4, phases: ['championship'] },     // Jun: Stanley Cup Final
      { month: 9, baseScore: 4, phases: ['return'] },           // Oct: season start
      { month: 10, baseScore: 3, phases: ['regular'] },         // Nov
      { month: 11, baseScore: 3, phases: ['regular'] },         // Dec
    ],
  },

  // ======================
  // MLB
  // ======================
  {
    sport: 'MLB',
    months: [
      { month: 2, baseScore: 1, phases: ['preseason'] },        // Mar: spring training
      { month: 3, baseScore: 4, phases: ['return'] },           // Apr: season starts
      { month: 4, baseScore: 3, phases: ['regular'] },          // May
      { month: 5, baseScore: 3, phases: ['regular'] },          // Jun
      { month: 6, baseScore: 3, phases: ['regular'] },          // Jul
      { month: 7, baseScore: 3, phases: ['regular'] },          // Aug
      { month: 8, baseScore: 4, phases: ['push'] },             // Sep: playoff push
      { month: 9, baseScore: 5, phases: ['playoffs'] },         // Oct: playoffs
    ],
  },

  // ======================
  // College Basketball
  // ======================
  {
    sport: 'NCAAB',
    months: [
      { month: 0, baseScore: 3, phases: ['regular'] },          // Jan
      { month: 1, baseScore: 3, phases: ['regular'] },          // Feb
      { month: 2, baseScore: 5, phases: ['tournament', 'push'] }, // Mar: March Madness
      { month: 3, baseScore: 3, phases: ['championship'] },     // Apr: Final Four / NCAA Final
      { month: 10, baseScore: 3, phases: ['regular'] },         // Nov: season start
      { month: 11, baseScore: 3, phases: ['regular'] },         // Dec
    ],
  },

  // ======================
  // European Soccer
  // ======================
  {
    sport: 'EU Soccer',
    months: [
      { month: 0, baseScore: 3, phases: ['regular'] },          // Jan: post-holiday, transfer window
      { month: 1, baseScore: 4, phases: ['regular', 'tournament'] }, // Feb: UCL knockouts
      { month: 2, baseScore: 4, phases: ['regular', 'push', 'tournament'] }, // Mar
      { month: 3, baseScore: 5, phases: ['push', 'tournament'] }, // Apr: title & UCL QF/SF
      { month: 4, baseScore: 5, phases: ['championship', 'tournament'] }, // May: titles + finals
      { month: 7, baseScore: 4, phases: ['return', 'regular'] }, // Aug: season return
      { month: 8, baseScore: 3, phases: ['regular', 'tournament'] }, // Sep: UCL group stage
      { month: 9, baseScore: 3, phases: ['regular', 'tournament'] }, // Oct
      { month: 10, baseScore: 3, phases: ['regular', 'tournament'] }, // Nov
      { month: 11, baseScore: 3, phases: ['regular'] },         // Dec: festive fixtures
    ],
  },

  // ======================
  // MLS
  // ======================
  {
    sport: 'MLS',
    months: [
      { month: 2, baseScore: 4, phases: ['regular'] },          // Mar: season start
      { month: 3, baseScore: 3, phases: ['regular'] },          // Apr
      { month: 4, baseScore: 3, phases: ['regular'] },          // May
      { month: 5, baseScore: 3, phases: ['regular'] },          // Jun
      { month: 6, baseScore: 3, phases: ['regular'] },          // Jul
      { month: 7, baseScore: 3, phases: ['regular'] },          // Aug
      { month: 8, baseScore: 3, phases: ['regular'] },          // Sep
      { month: 9, baseScore: 4, phases: ['playoffs'] },         // Oct: MLS Cup Playoffs
      { month: 10, baseScore: 4, phases: ['championship'] },    // Nov: MLS Cup Final
    ],
  },

  // ======================
  // Golf
  // ======================
  {
    sport: 'Golf',
    months: [
      { month: 0, baseScore: 1, phases: ['regular'] },          // Jan
      { month: 1, baseScore: 1, phases: ['regular'] },          // Feb
      { month: 2, baseScore: 3, phases: ['regular'] },          // Mar: lead-up events
      { month: 3, baseScore: 5, phases: ['major'] },            // Apr: Masters
      { month: 4, baseScore: 5, phases: ['major'] },            // May: PGA Championship
      { month: 5, baseScore: 5, phases: ['major'] },            // Jun: US Open
      { month: 6, baseScore: 5, phases: ['major'] },            // Jul: The Open Championship
      { month: 7, baseScore: 3, phases: ['regular'] },          // Aug
      { month: 8, baseScore: 2, phases: ['regular'] },          // Sep
      { month: 9, baseScore: 2, phases: ['regular'] },          // Oct
      { month: 10, baseScore: 1, phases: ['regular'] },         // Nov
      { month: 11, baseScore: 1, phases: ['offseason'] },       // Dec
    ],
  },

  // ======================
  // Tennis
  // ======================
  {
    sport: 'Tennis',
    months: [
      { month: 0, baseScore: 5, phases: ['major'] },            // Jan: Australian Open
      { month: 1, baseScore: 2, phases: ['regular'] },          // Feb
      { month: 2, baseScore: 2, phases: ['regular'] },          // Mar
      { month: 3, baseScore: 3, phases: ['regular'] },          // Apr
      { month: 4, baseScore: 4, phases: ['major'] },            // May: French Open
      { month: 5, baseScore: 4, phases: ['major'] },            // Jun: Wimbledon
      { month: 7, baseScore: 4, phases: ['return'] },           // Aug: US Open buildup
      { month: 8, baseScore: 5, phases: ['major'] },            // Sep: US Open
      { month: 9, baseScore: 3, phases: ['regular'] },          // Oct
      { month: 10, baseScore: 2, phases: ['regular'] },         // Nov
      { month: 11, baseScore: 2, phases: ['offseason'] },       // Dec
    ],
  },

  // ======================
  // Formula 1
  // ======================
  {
    sport: 'Formula 1',
    months: [
      { month: 2, baseScore: 4, phases: ['regular'] },          // Mar: season start
      { month: 3, baseScore: 3, phases: ['regular'] },          // Apr
      { month: 4, baseScore: 3, phases: ['regular'] },          // May
      { month: 5, baseScore: 3, phases: ['regular'] },          // Jun
      { month: 6, baseScore: 3, phases: ['regular'] },          // Jul
      { month: 7, baseScore: 3, phases: ['regular'] },          // Aug
      { month: 8, baseScore: 3, phases: ['regular'] },          // Sep
      { month: 9, baseScore: 4, phases: ['push'] },             // Oct: championship fight heats up
      { month: 10, baseScore: 4, phases: ['push', 'championship'] }, // Nov: final races
    ],
  },
];
