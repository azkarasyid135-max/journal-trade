export type TradeResult = 'Win' | 'Loss' | 'Break Even';
export type TradeSession = 'Asia' | 'London' | 'New York';
export type Emotion = 'Confident' | 'Neutral' | 'Fear' | 'Revenge' | 'Tired' | 'Excited';

export type Trade = {
  id: number;
  date: string;
  pair: string;
  side: 'Buy' | 'Sell';
  session: TradeSession;
  strategy: string;
  setup: string;
  entry: number;
  stopLoss: number;
  takeProfit: number;
  exit: number;
  riskPercent: number;
  result: TradeResult;
  pnl: number;
  pnlPercent: number;
  rr: number;
  emotion: Emotion;
  discipline: number;
  notes: string;
};

export const trades: Trade[] = [
  {
    id: 1,
    date: '2026-07-10',
    pair: 'EUR/USD',
    side: 'Buy',
    session: 'London',
    strategy: 'Trend Pullback',
    setup: 'Breakout Retest',
    entry: 1.0825,
    stopLoss: 1.0785,
    takeProfit: 1.0925,
    exit: 1.0912,
    riskPercent: 1.2,
    result: 'Win',
    pnl: 840,
    pnlPercent: 3.2,
    rr: 2.2,
    emotion: 'Confident',
    discipline: 9,
    notes: 'Strong bullish context with a clean retest and break of structure.',
  },
  {
    id: 2,
    date: '2026-07-09',
    pair: 'GBP/USD',
    side: 'Sell',
    session: 'New York',
    strategy: 'Reversal',
    setup: 'Supply Zone',
    entry: 1.2685,
    stopLoss: 1.2725,
    takeProfit: 1.2585,
    exit: 1.2741,
    riskPercent: 1.5,
    result: 'Loss',
    pnl: -610,
    pnlPercent: -2.1,
    rr: 0.9,
    emotion: 'Fear',
    discipline: 5,
    notes: 'News spike invalidated the setup and the plan was not followed.',
  },
  {
    id: 3,
    date: '2026-07-08',
    pair: 'USD/JPY',
    side: 'Buy',
    session: 'Asia',
    strategy: 'Mean Reversion',
    setup: 'Support Hold',
    entry: 158.15,
    stopLoss: 157.8,
    takeProfit: 159.4,
    exit: 158.9,
    riskPercent: 0.8,
    result: 'Break Even',
    pnl: 0,
    pnlPercent: 0,
    rr: 1.0,
    emotion: 'Neutral',
    discipline: 7,
    notes: 'Good risk control, but patience was needed before taking the trade.',
  },
];

export const monthlyPerformance = [
  { month: 'Jan', pnl: 1200 },
  { month: 'Feb', pnl: 980 },
  { month: 'Mar', pnl: 1450 },
  { month: 'Apr', pnl: 2020 },
  { month: 'May', pnl: 1880 },
  { month: 'Jun', pnl: 2205 },
  { month: 'Jul', pnl: 1650 },
];

export const accounts = [
  { name: 'FTMO', balance: 15000, currency: 'USD' },
  { name: 'FundedNext', balance: 10000, currency: 'USD' },
  { name: 'Exness', balance: 8500, currency: 'USD' },
];
