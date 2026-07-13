"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tradeFormSchema, type TradeFormValues } from '@/lib/schemas';
import { useTradeStore } from '@/lib/trades-store';

const emotionOptions = ['Confident', 'Neutral', 'Fear', 'Revenge', 'Tired', 'Excited'] as const;
const sessionOptions = ['Asia', 'London', 'New York'] as const;

const getDefaultValues = (): TradeFormValues => ({
  date: new Date().toISOString().slice(0, 10),
  time: '09:30',
  pair: 'EUR/USD',
  side: 'Buy',
  session: 'London',
  strategy: 'Trend Pullback',
  setup: 'Breakout retest',
  entryPrice: 1.0825,
  stopLoss: 1.0785,
  takeProfit: 1.0925,
  exitPrice: 1.0912,
  lotSize: 0.1,
  riskPercent: 1.2,
  riskAmount: 10,
  rewardAmount: 20,
  rr: 2,
  result: 'Win',
  pnl: 10,
  pnlPercent: 100,
  notes: 'The setup was clean and the plan stayed intact.',
  emotion: 'Confident',
  discipline: 8,
  trendConfirmed: true,
  supportResistance: true,
  liquidity: true,
  confirmationCandle: true,
  riskManagement: true,
  newsChecked: true,
});

type TradeJournalFormProps = {
  mode?: 'create' | 'edit';
  initialValues?: TradeFormValues;
  tradeId?: number;
  onSuccess?: () => void;
  compact?: boolean;
};

export function TradeJournalForm({ mode = 'create', initialValues, tradeId, onSuccess, compact = false }: TradeJournalFormProps) {
  const router = useRouter();
  const { saveTrade, isSaving } = useTradeStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TradeFormValues>({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    reset(initialValues ?? getDefaultValues());
  }, [initialValues, reset]);

  const onSubmit = async (values: TradeFormValues) => {
    await saveTrade(values, { mode, tradeId });
    onSuccess?.();
    if (!onSuccess) {
      router.push('/journal');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={compact ? 'space-y-4' : 'glass-panel p-5 md:p-6'}>
      {!compact ? (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-label">Trade journal</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-100">{mode === 'edit' ? 'Update trade' : 'Add a new trade'}</h2>
          </div>
          <div className="rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-3 py-1 text-sm text-[#22C55E]">Validated</div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Date</span>
          <input type="date" {...register('date')} className="input-shell w-full" />
          {errors.date && <p className="text-xs text-rose-400">{errors.date.message}</p>}
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Time</span>
          <input type="time" {...register('time')} className="input-shell w-full" />
          {errors.time && <p className="text-xs text-rose-400">{errors.time.message}</p>}
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Currency Pair</span>
          <input {...register('pair')} placeholder="EUR/USD" className="input-shell w-full" />
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Buy / Sell</span>
          <select {...register('side')} className="input-shell w-full">
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Session</span>
          <select {...register('session')} className="input-shell w-full">
            {sessionOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Strategy</span>
          <input {...register('strategy')} placeholder="Trend Pullback" className="input-shell w-full" />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Setup</span>
          <input {...register('setup')} placeholder="Breakout retest" className="input-shell w-full" />
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Result</span>
          <select {...register('result')} className="input-shell w-full">
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
            <option value="Break Even">Break Even</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Entry Price</span>
          <input type="number" step="0.0001" {...register('entryPrice')} className="input-shell w-full" />
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Stop Loss</span>
          <input type="number" step="0.0001" {...register('stopLoss')} className="input-shell w-full" />
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Take Profit</span>
          <input type="number" step="0.0001" {...register('takeProfit')} className="input-shell w-full" />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Exit Price</span>
          <input type="number" step="0.0001" {...register('exitPrice')} className="input-shell w-full" />
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Lot Size</span>
          <input type="number" step="0.01" {...register('lotSize')} className="input-shell w-full" />
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>R:R Ratio</span>
          <input type="number" step="0.1" {...register('rr')} className="input-shell w-full" />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Risk %</span>
          <input type="number" step="0.1" {...register('riskPercent')} className="input-shell w-full" />
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Risk Amount</span>
          <input type="number" step="0.1" {...register('riskAmount')} className="input-shell w-full" />
        </label>
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Reward Amount</span>
          <input type="number" step="0.1" {...register('rewardAmount')} className="input-shell w-full" />
        </label>
      </div>

      <div className="mt-6 rounded-[18px] border border-white/10 bg-[#0b0b0d]/80 p-4">
        <p className="text-sm font-medium text-zinc-100">Checklist before entry</p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {[
            ['trendConfirmed', 'Trend confirmed'],
            ['supportResistance', 'Support/Resistance'],
            ['liquidity', 'Liquidity'],
            ['confirmationCandle', 'Confirmation Candle'],
            ['riskManagement', 'Risk Management'],
            ['newsChecked', 'News Checked'],
          ].map(([field, label]) => (
            <label key={field} className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" {...register(field as keyof TradeFormValues)} className="h-4 w-4 rounded border-white/10 bg-transparent" />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <label className="space-y-2 text-sm text-zinc-400">
          <span>Emotion</span>
          <select {...register('emotion')} className="input-shell w-full">
            {emotionOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label className="space-y-2 text-sm text-zinc-400">
          <span>Discipline Score (1-10)</span>
          <input type="range" min="1" max="10" {...register('discipline')} className="w-full accent-[#22C55E]" />
        </label>
      </div>

      <label className="mt-6 block space-y-2 text-sm text-zinc-400">
        <span>Trade Notes</span>
        <textarea {...register('notes')} rows={5} placeholder="What happened in the trade?" className="input-shell w-full min-h-[140px]" />
      </label>

      <button type="submit" disabled={isSaving} className="mt-6 rounded-full bg-[#22C55E] px-5 py-3 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70">
        {isSaving ? 'Saving…' : mode === 'edit' ? 'Update trade' : 'Save trade'}
      </button>
    </form>
  );
}
