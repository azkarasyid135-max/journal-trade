"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  CircleDollarSign,
  FileSpreadsheet,
  Goal,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trash2,
  Wallet,
  Zap,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, PieChart, Pie, Cell, XAxis, YAxis } from 'recharts';
import { accounts, monthlyPerformance } from '@/lib/mock-data';
import { TradeModal } from '@/components/trade-modal';
import { useTradeStore } from '@/lib/trades-store';

export function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trades, isLoading, deleteTrade, isSaving } = useTradeStore();

  const metrics = useMemo(() => {
    if (!trades.length) {
      return [
        { label: 'Total Trades', value: '0', icon: BarChart3, glow: false },
        { label: 'Win Rate', value: '0%', icon: TrendingUp, glow: true },
        { label: 'Profit Factor', value: '0.00', icon: Sparkles, glow: false },
        { label: 'Total P/L', value: '$0', icon: CircleDollarSign, glow: true },
        { label: 'Current Balance', value: '$24,000', icon: Wallet, glow: true },
        { label: 'Largest Win', value: '$0', icon: ArrowUpRight, glow: false },
        { label: 'Largest Loss', value: '$0', icon: ShieldCheck, glow: false },
        { label: 'Average RR', value: '0.00', icon: Zap, glow: false },
      ];
    }

    const wins = trades.filter((trade) => trade.result === 'Win').length;
    const losses = trades.filter((trade) => trade.result === 'Loss').length;
    const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
    const totalRisk = Math.abs(trades.filter((trade) => trade.result === 'Loss').reduce((sum, trade) => sum + trade.riskAmount, 0));
    const profitFactor = totalRisk > 0 ? (trades.filter((trade) => trade.result === 'Win').reduce((sum, trade) => sum + trade.rewardAmount, 0) / totalRisk).toFixed(2) : '0.00';
    const largestWin = Math.max(...trades.map((trade) => trade.pnl > 0 ? trade.pnl : 0));
    const largestLoss = Math.min(...trades.map((trade) => trade.pnl < 0 ? trade.pnl : 0));
    const averageRr = (trades.reduce((sum, trade) => sum + trade.rr, 0) / trades.length).toFixed(2);
    const balance = 24000 + totalPnl;

    return [
      { label: 'Total Trades', value: trades.length.toString(), icon: BarChart3, glow: false },
      { label: 'Win Rate', value: `${Math.round((wins / trades.length) * 100)}%`, icon: TrendingUp, glow: true },
      { label: 'Profit Factor', value: profitFactor, icon: Sparkles, glow: false },
      { label: 'Total P/L', value: `${totalPnl >= 0 ? '+' : ''}$${totalPnl.toLocaleString()}`, icon: CircleDollarSign, glow: true },
      { label: 'Current Balance', value: `$${balance.toLocaleString()}`, icon: Wallet, glow: true },
      { label: 'Largest Win', value: `$${largestWin.toLocaleString()}`, icon: ArrowUpRight, glow: false },
      { label: 'Largest Loss', value: `$${Math.abs(largestLoss).toLocaleString()}`, icon: ShieldCheck, glow: false },
      { label: 'Average RR', value: averageRr, icon: Zap, glow: false },
    ];
  }, [trades]);

  const pieData = useMemo(() => {
    const wins = trades.filter((trade) => trade.result === 'Win').length;
    const losses = trades.filter((trade) => trade.result === 'Loss').length;
    const breakevens = trades.filter((trade) => trade.result === 'Break Even').length;
    return [
      { name: 'Wins', value: wins, color: '#22C55E' },
      { name: 'Losses', value: losses, color: '#7F1D1D' },
      { name: 'Breakevens', value: breakevens, color: '#4B5563' },
    ];
  }, [trades]);

  return (
    <main className="page-shell">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel overflow-hidden p-6 md:p-7"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-label">Trading terminal / live workspace</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                Premium journal for disciplined execution.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                Track setups, review psychology, and keep your edge sharp with a premium dashboard that feels built for serious operators.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Live', 'AI Review', 'Risk Focus'].map((chip) => (
                <div key={chip} className="rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-3 py-1.5 text-sm text-[#22C55E]">
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </motion.header>

        <section className="grid gap-5 xl:grid-cols-[1.45fr_0.75fr]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-label">Equity curve</p>
                <p className="mt-2 text-xl font-semibold text-zinc-100">Monthly growth</p>
              </div>
              <div className="rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-3 py-1 text-sm text-[#22C55E]">{trades.length ? '+18.2%' : 'Ready'}</div>
            </div>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyPerformance}>
                  <defs>
                    <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#7f7f85', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#7f7f85', fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="pnl" stroke="#22C55E" fill="url(#colorPnl)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <BrainCircuit size={18} />
              <p className="text-sm font-medium">AI Assistant</p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-100">Weekly review ready</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-400">
              The assistant flags discipline and risk patterns using your latest journal entries.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="rounded-[16px] border border-white/10 bg-[#0b0b0d]/85 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Discipline score</span>
                  <span className="font-semibold text-[#22C55E]">{trades.length ? Math.round(trades.reduce((sum, trade) => sum + trade.discipline, 0) / trades.length) : 0}/10</span>
                </div>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-[#0b0b0d]/85 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Revenge trading warning</span>
                  <span className="font-semibold text-amber-400">{trades.some((trade) => trade.emotion === 'Revenge') ? 'Higher' : 'Low'}</span>
                </div>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-[#0b0b0d]/85 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Overtrading risk</span>
                  <span className="font-semibold text-rose-400">{trades.length > 5 ? 'Medium' : 'Low'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, icon: Icon, glow }) => (
            <motion.article
              key={label}
              whileHover={{ y: -3, scale: 1.01 }}
              className="glass-panel-soft p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{label}</p>
                <div className="rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/10 p-2 text-[#22C55E]">
                  <Icon size={16} />
                </div>
              </div>
              <p className={`mt-5 text-2xl font-semibold ${glow ? 'text-glow text-[#22C55E]' : 'text-zinc-100'}`}>{value}</p>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-label">Recent trades</p>
                <p className="mt-2 text-xl font-semibold text-zinc-100">Journal entries</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="rounded-full border border-white/10 bg-[#0b0b0d]/80 px-3 py-2 text-sm text-zinc-300 transition hover:border-[#22C55E]/40 hover:text-white">
                + New Trade
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {isLoading ? (
                <p className="text-sm text-zinc-500">Loading your trades…</p>
              ) : trades.length ? trades.slice(0, 5).map((trade) => (
                <div key={trade.id} className="rounded-[16px] border border-white/10 bg-[#0b0b0d]/80 p-4 transition hover:border-[#22C55E]/30 hover:bg-[#111111]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-zinc-100">{trade.pair} · {trade.side}</p>
                      <p className="mt-1 text-sm text-zinc-500">{trade.date} · {trade.session}</p>
                    </div>
                    <div className={`rounded-full px-3 py-1 text-sm ${trade.result === 'Win' ? 'bg-[#22C55E]/15 text-[#22C55E]' : trade.result === 'Loss' ? 'bg-rose-500/15 text-rose-400' : 'bg-zinc-700/20 text-zinc-300'}`}>
                      {trade.result}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-500">
                    <span>RR {trade.rr}</span>
                    <span>Emotion {trade.emotion}</span>
                    <span>Discipline {trade.discipline}/10</span>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button disabled={isSaving} onClick={() => void deleteTrade(trade.id)} className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-rose-400/40 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-60">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              )) : <p className="text-sm text-zinc-500">No trades yet. Create your first entry to start tracking performance.</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 text-[#22C55E]">
                <LayoutGrid size={18} />
                <p className="text-sm font-medium">Performance split</p>
              </div>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass-panel p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="section-label">Accounts</p>
                  <p className="mt-2 text-xl font-semibold text-zinc-100">Multi-account view</p>
                </div>
                <Goal size={18} className="text-[#22C55E]" />
              </div>
              <div className="mt-4 space-y-3">
                {accounts.map((account) => (
                  <div key={account.name} className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0b0b0d]/80 px-3 py-3">
                    <div>
                      <p className="font-medium text-zinc-100">{account.name}</p>
                      <p className="text-sm text-zinc-500">{account.currency}</p>
                    </div>
                    <p className="font-semibold text-[#22C55E]">${account.balance.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <CalendarDays size={18} />
              <p className="text-sm font-medium">Calendar</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-zinc-400">Green and red calendar states make weekly review simple and quick.</p>
          </div>
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <FileSpreadsheet size={18} />
              <p className="text-sm font-medium">Export & backup</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-zinc-400">CSV, Excel, PDF and JSON backup flows are ready for future integration.</p>
          </div>
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <ShieldCheck size={18} />
              <p className="text-sm font-medium">Risk management</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-zinc-400">Lot size, potential loss and RR calculations are structured for a dedicated calculator screen.</p>
          </div>
        </section>
      </div>
      <TradeModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
