import { MoonStar, Sparkles, TimerReset } from 'lucide-react';

export default function SettingsPage() {
  return (
    <main className="page-shell">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="glass-panel p-6">
          <p className="section-label">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-100">Personalize your trading OS</h1>
          <p className="mt-3 text-sm leading-7 text-zinc-400">Tune the experience for your flow and keep your workspace calm, focused, and premium.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <MoonStar size={18} />
              <p className="text-sm font-medium">Appearance</p>
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-400">
              <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0b0b0d]/80 px-3 py-3">Dark mode <span className="text-[#22C55E]">Enabled</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0b0b0d]/80 px-3 py-3">Currency <span>USD</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0b0b0d]/80 px-3 py-3">Timezone <span>UTC</span></div>
            </div>
          </div>

          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <TimerReset size={18} />
              <p className="text-sm font-medium">Notifications</p>
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-400">
              <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0b0b0d]/80 px-3 py-3">Daily reminder <span className="text-[#22C55E]">On</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0b0b0d]/80 px-3 py-3">Weekly review <span className="text-[#22C55E]">On</span></div>
              <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#0b0b0d]/80 px-3 py-3">Monthly report <span className="text-[#22C55E]">On</span></div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center gap-2 text-[#22C55E]">
            <Sparkles size={18} />
            <p className="text-sm font-medium">Next steps</p>
          </div>
          <p className="mt-3 text-sm leading-7 text-zinc-400">Supabase auth, cloud sync, and image storage are prepared as the next backend integration milestone.</p>
        </div>
      </div>
    </main>
  );
}
