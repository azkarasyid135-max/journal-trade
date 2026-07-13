"use client";

import { useMemo } from 'react';
import { BarChart3, BrainCircuit, CalendarDays, Flame, Target, TrendingUp } from 'lucide-react';
import { useTradeStore } from '@/lib/trades-store';

export default function AnalyticsPage() {
  const { trades } = useTradeStore();

  const stats = useMemo(() => {
    if (!trades.length) {
      return [
        { label: 'Best Pair', value: 'No data yet', icon: TrendingUp },
        { label: 'Worst Pair', value: 'No data yet', icon: BarChart3 },
        { label: 'Best Strategy', value: 'No data yet', icon: Target },
        { label: 'Worst Strategy', value: 'No data yet', icon: Flame },
      ];
    }

    const pairMap = new Map<string, { pnl: number; count: number }>();
    const strategyMap = new Map<string, { pnl: number; count: number }>();

    trades.forEach((trade) => {
      const pairEntry = pairMap.get(trade.pair) ?? { pnl: 0, count: 0 };
      pairEntry.pnl += trade.pnl;
      pairEntry.count += 1;
      pairMap.set(trade.pair, pairEntry);

      const strategyEntry = strategyMap.get(trade.strategy) ?? { pnl: 0, count: 0 };
      strategyEntry.pnl += trade.pnl;
      strategyEntry.count += 1;
      strategyMap.set(trade.strategy, strategyEntry);
    });

    const bestPair = [...pairMap.entries()].sort((a, b) => b[1].pnl - a[1].pnl)[0]?.[0] ?? '—';
    const worstPair = [...pairMap.entries()].sort((a, b) => a[1].pnl - b[1].pnl)[0]?.[0] ?? '—';
    const bestStrategy = [...strategyMap.entries()].sort((a, b) => b[1].pnl - a[1].pnl)[0]?.[0] ?? '—';
    const worstStrategy = [...strategyMap.entries()].sort((a, b) => a[1].pnl - b[1].pnl)[0]?.[0] ?? '—';

    return [
      { label: 'Best Pair', value: bestPair, icon: TrendingUp },
      { label: 'Worst Pair', value: worstPair, icon: BarChart3 },
      { label: 'Best Strategy', value: bestStrategy, icon: Target },
      { label: 'Worst Strategy', value: worstStrategy, icon: Flame },
    ];
  }, [trades]);

  const weekdayRates = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return days.map((day) => {
      const matches = trades.filter((trade) => new Date(trade.date).toLocaleDateString('en-US', { weekday: 'short' }) === day);
      const wins = matches.filter((trade) => trade.result === 'Win').length;
      const rate = matches.length ? Math.round((wins / matches.length) * 100) : 0;
      return { day, rate };
    });
  }, [trades]);

  return (
    <main className="page-shell">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="glass-panel p-6">
          <p className="section-label">Analytics</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-100">Deep performance intelligence</h1>
          <p className="mt-3 text-sm leading-7 text-zinc-400">Understand what works, what breaks, and where the next edge is hiding.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass-panel p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{label}</p>
                <Icon className="text-[#22C55E]" size={18} />
              </div>
              <p className="mt-4 text-xl font-semibold text-zinc-100">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <CalendarDays size={18} />
              <p className="text-sm font-medium">Win rate per weekday</p>
            </div>
            <div className="mt-4 space-y-3">
              {weekdayRates.map(({ day, rate }) => (
                <div key={day} className="space-y-1">
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>{day}</span>
                    <span>{rate}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-[#22C55E]" style={{ width: `${rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <BrainCircuit size={18} />
              <p className="text-sm font-medium">AI review insights</p>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-400">
              <p>• {trades.length ? `You have ${trades.length} saved trades to review.` : 'Create a trade to unlock personalized insights.'}</p>
              <p>• {trades.some((trade) => trade.emotion === 'Fear') ? 'Fear-driven entries are present—review your checklist before the next setup.' : 'Discipline looks steady across your recent entries.'}</p>
              <p>• {trades.length > 3 ? 'Your recent records show enough data for a weekly review cadence.' : 'A few more trades will make the review more reliable.'}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
