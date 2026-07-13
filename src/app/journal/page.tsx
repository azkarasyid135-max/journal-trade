"use client";

import { useMemo, useState } from 'react';
import { TradeJournalForm } from '@/components/trade-journal-form';
import { tradeToFormValues, useTradeStore } from '@/lib/trades-store';
import { PencilLine, Trash2 } from 'lucide-react';

export default function JournalPage() {
  const { trades, isLoading, deleteTrade, isSaving } = useTradeStore();
  const [editingTradeId, setEditingTradeId] = useState<number | null>(null);

  const editingTrade = useMemo(() => trades.find((trade) => trade.id === editingTradeId), [editingTradeId, trades]);

  return (
    <main className="page-shell">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="glass-panel p-6">
          <p className="section-label">Trade journal</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-100">Capture every setup with discipline</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
            Build a clean history of your decisions with a polished workflow designed for premium execution.
          </p>
        </div>

        <TradeJournalForm
          mode={editingTrade ? 'edit' : 'create'}
          tradeId={editingTrade?.id}
          initialValues={editingTrade ? tradeToFormValues(editingTrade) : undefined}
          onSuccess={() => setEditingTradeId(null)}
        />

        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-label">Saved entries</p>
              <p className="mt-2 text-xl font-semibold text-zinc-100">Recent journal history</p>
            </div>
            <button onClick={() => setEditingTradeId(null)} className="rounded-full border border-white/10 bg-[#0b0b0d]/80 px-3 py-2 text-sm text-zinc-300 transition hover:border-[#22C55E]/40 hover:text-white">
              New entry
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {isLoading ? (
              <p className="text-sm text-zinc-500">Loading your trades…</p>
            ) : trades.length ? trades.map((trade) => (
              <div key={trade.id} className="rounded-[16px] border border-white/10 bg-[#0b0b0d]/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-zinc-100">{trade.pair} · {trade.side}</p>
                    <p className="mt-1 text-sm text-zinc-500">{trade.date} · {trade.session} · {trade.strategy}</p>
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
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setEditingTradeId(trade.id)} className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-[#22C55E]/40 hover:text-white">
                    <PencilLine size={14} />
                    Edit
                  </button>
                  <button disabled={isSaving} onClick={() => void deleteTrade(trade.id)} className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-rose-400/40 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-60">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            )) : <p className="text-sm text-zinc-500">No saved trades yet. Submit the form to create your first entry.</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
