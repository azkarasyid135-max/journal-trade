import { z } from 'zod';

export const tradeFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  pair: z.string().min(1, 'Currency pair is required'),
  side: z.enum(['Buy', 'Sell']),
  session: z.enum(['Asia', 'London', 'New York']),
  strategy: z.string().min(1, 'Strategy is required'),
  setup: z.string().min(1, 'Setup is required'),
  entryPrice: z.coerce.number().positive(),
  stopLoss: z.coerce.number().positive(),
  takeProfit: z.coerce.number().positive(),
  exitPrice: z.coerce.number().positive(),
  lotSize: z.coerce.number().positive(),
  riskPercent: z.coerce.number().min(0.1),
  riskAmount: z.coerce.number().positive(),
  rewardAmount: z.coerce.number().positive(),
  rr: z.coerce.number().positive(),
  result: z.enum(['Win', 'Loss', 'Break Even']),
  pnl: z.coerce.number(),
  pnlPercent: z.coerce.number(),
  notes: z.string().min(10, 'Add detailed notes for the trade'),
  emotion: z.enum(['Confident', 'Neutral', 'Fear', 'Revenge', 'Tired', 'Excited']),
  discipline: z.coerce.number().min(1).max(10),
  trendConfirmed: z.boolean().optional(),
  supportResistance: z.boolean().optional(),
  liquidity: z.boolean().optional(),
  confirmationCandle: z.boolean().optional(),
  riskManagement: z.boolean().optional(),
  newsChecked: z.boolean().optional(),
});

export type TradeFormValues = z.infer<typeof tradeFormSchema>;
