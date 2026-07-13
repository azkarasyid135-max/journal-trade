import { ShieldCheck } from 'lucide-react';

export default function RiskPage() {
  return (
    <main className="page-shell">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="glass-panel p-6">
          <p className="section-label">Risk management</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-100">Precision sizing and reward control</h1>
          <p className="mt-3 text-sm leading-7 text-zinc-400">Make each position sized for disciplined risk and long-term consistency.</p>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center gap-2 text-[#22C55E]">
            <ShieldCheck size={18} />
            <p className="text-sm font-medium">Risk calculator</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-sm text-zinc-400">
                <span>Balance</span>
                <input className="input-shell mt-2 w-full" defaultValue="10000" />
              </label>
              <label className="block text-sm text-zinc-400">
                <span>Risk %</span>
                <input className="input-shell mt-2 w-full" defaultValue="1" />
              </label>
              <label className="block text-sm text-zinc-400">
                <span>SL (Pips)</span>
                <input className="input-shell mt-2 w-full" defaultValue="50" />
              </label>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-[#0b0b0d]/80 p-4">
              <p className="text-sm text-zinc-500">Projected outputs</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-zinc-300"><span>Lot Size</span><span className="font-semibold text-[#22C55E]">0.20</span></div>
                <div className="flex items-center justify-between text-zinc-300"><span>Potential Loss</span><span className="font-semibold">$100</span></div>
                <div className="flex items-center justify-between text-zinc-300"><span>Potential Profit</span><span className="font-semibold">$200</span></div>
                <div className="flex items-center justify-between text-zinc-300"><span>Required RR</span><span className="font-semibold">2.0</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
