"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from 'react';
import { type TradeFormValues } from '@/lib/schemas';

export type TradeResult = 'Win' | 'Loss' | 'Break Even';
export type TradeSession = 'Asia' | 'London' | 'New York';
export type Emotion = 'Confident' | 'Neutral' | 'Fear' | 'Revenge' | 'Tired' | 'Excited';

export type Trade = {
  id: number;
  date: string;
  time: string;
  pair: string;
  side: 'Buy' | 'Sell';
  session: TradeSession;
  strategy: string;
  setup: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  exitPrice: number;
  lotSize: number;
  riskPercent: number;
  riskAmount: number;
  rewardAmount: number;
  rr: number;
  result: TradeResult;
  pnl: number;
  pnlPercent: number;
  notes: string;
  emotion: Emotion;
  discipline: number;
  trendConfirmed: boolean;
  supportResistance: boolean;
  liquidity: boolean;
  confirmationCandle: boolean;
  riskManagement: boolean;
  newsChecked: boolean;
};

type ToastState = { message: string };

type TradeStoreContextValue = {
  trades: Trade[];
  isLoading: boolean;
  isSaving: boolean;
  saveTrade: (values: TradeFormValues, options?: { mode?: 'create' | 'edit'; tradeId?: number }) => Promise<void>;
  deleteTrade: (tradeId: number) => Promise<void>;
  showToast: (message: string) => void;
};

const TradeStoreContext = createContext<TradeStoreContextValue | undefined>(undefined);

const STORAGE_KEY = 'journal-forex-trades';

function pause(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function TradeProvider({ children }: { children: ReactNode }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Trade[];
        setTrades(parsed);
      }
    } catch {
      // Ignore malformed storage data.
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || isLoading) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trades));
  }, [trades, isLoading]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const showToast = useCallback((message: string) => setToast({ message }), []);

  const saveTrade = useCallback(async (values: TradeFormValues, options?: { mode?: 'create' | 'edit'; tradeId?: number }) => {
    setIsSaving(true);
    await pause(500);

    const trade: Trade = formValuesToTrade(values, options?.tradeId);

    setTrades((previous) => {
      if (options?.mode === 'edit' && options.tradeId) {
        return previous.map((item) => (item.id === options.tradeId ? trade : item));
      }
      return [trade, ...previous];
    });

    setIsSaving(false);
    showToast(options?.mode === 'edit' ? 'Trade updated.' : 'Trade saved.');
  }, [showToast]);

  const deleteTrade = useCallback(async (tradeId: number) => {
    setIsSaving(true);
    await pause(350);
    setTrades((previous) => previous.filter((item) => item.id !== tradeId));
    setIsSaving(false);
    showToast('Trade deleted.');
  }, [showToast]);

  const value = useMemo<TradeStoreContextValue>(
    () => ({ trades, isLoading, isSaving, saveTrade, deleteTrade, showToast }),
    [trades, isLoading, isSaving, saveTrade, deleteTrade, showToast]
  );

  return (
    <TradeStoreContext.Provider value={value}>
      {children}
      {toast ? (
        <div className="fixed bottom-4 right-4 z-50 rounded-[16px] border border-[#22C55E]/20 bg-[#101010]/95 px-4 py-3 text-sm text-zinc-100 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {toast.message}
        </div>
      ) : null}
    </TradeStoreContext.Provider>
  );
}

export function useTradeStore() {
  const context = useContext(TradeStoreContext);
  if (!context) {
    throw new Error('useTradeStore must be used within TradeProvider');
  }
  return context;
}

export function tradeToFormValues(trade: Trade): TradeFormValues {
  return {
    date: trade.date,
    time: trade.time,
    pair: trade.pair,
    side: trade.side,
    session: trade.session,
    strategy: trade.strategy,
    setup: trade.setup,
    entryPrice: trade.entryPrice,
    stopLoss: trade.stopLoss,
    takeProfit: trade.takeProfit,
    exitPrice: trade.exitPrice,
    lotSize: trade.lotSize,
    riskPercent: trade.riskPercent,
    riskAmount: trade.riskAmount,
    rewardAmount: trade.rewardAmount,
    rr: trade.rr,
    result: trade.result,
    pnl: trade.pnl,
    pnlPercent: trade.pnlPercent,
    notes: trade.notes,
    emotion: trade.emotion,
    discipline: trade.discipline,
    trendConfirmed: trade.trendConfirmed,
    supportResistance: trade.supportResistance,
    liquidity: trade.liquidity,
    confirmationCandle: trade.confirmationCandle,
    riskManagement: trade.riskManagement,
    newsChecked: trade.newsChecked,
  };
}

export function formValuesToTrade(values: TradeFormValues, existingId?: number): Trade {
  const pnl = values.result === 'Win' ? values.rewardAmount : values.result === 'Loss' ? -values.riskAmount : 0;
  const pnlPercent = values.result === 'Win' ? (values.rewardAmount / Math.max(values.riskAmount, 1)) * 100 : values.result === 'Loss' ? -100 : 0;

  return {
    id: existingId ?? Date.now(),
    date: values.date,
    time: values.time,
    pair: values.pair,
    side: values.side,
    session: values.session,
    strategy: values.strategy,
    setup: values.setup,
    entryPrice: values.entryPrice,
    stopLoss: values.stopLoss,
    takeProfit: values.takeProfit,
    exitPrice: values.exitPrice,
    lotSize: values.lotSize,
    riskPercent: values.riskPercent,
    riskAmount: values.riskAmount,
    rewardAmount: values.rewardAmount,
    rr: values.rr,
    result: values.result,
    pnl,
    pnlPercent,
    notes: values.notes,
    emotion: values.emotion,
    discipline: values.discipline,
    trendConfirmed: values.trendConfirmed ?? false,
    supportResistance: values.supportResistance ?? false,
    liquidity: values.liquidity ?? false,
    confirmationCandle: values.confirmationCandle ?? false,
    riskManagement: values.riskManagement ?? false,
    newsChecked: values.newsChecked ?? false,
  };
}
