"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BrainCircuit, FilePlus2, Goal, Home, ShieldCheck, Sparkles, Settings2, TrendingUp } from 'lucide-react';

const links = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/journal', label: 'Journal', icon: FilePlus2 },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/risk', label: 'Risk', icon: ShieldCheck },
  { href: '/settings', label: 'Settings', icon: Settings2 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-3 lg:flex-row lg:px-6 lg:py-6">
        <aside className="glass-panel w-full p-3 lg:w-72">
          <div className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-[#0c0c0d]/90 p-3">
            <div className="rounded-2xl bg-[#22C55E]/15 p-2 text-[#22C55E]">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Journal Forex</p>
              <p className="text-xs text-zinc-500">Premium trading OS</p>
            </div>
          </div>

          <nav className="mt-4 space-y-2">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-[16px] px-3 py-3 text-sm transition ${active ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'text-zinc-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-[20px] border border-[#22C55E]/20 bg-gradient-to-br from-[#22C55E]/12 via-[#111111] to-[#0a0a0a] p-4">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <BrainCircuit size={16} />
              <p className="text-sm font-medium">AI Review</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Discipline scoring, emotional analysis, and weekly summaries are ready for the next layer of automation.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-200">
              <TrendingUp size={15} />
              Monthly target 75%
            </div>
          </div>
        </aside>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
