"use client";

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { TradeJournalForm } from '@/components/trade-journal-form';

export function TradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  if (!open) return null;

  const handleClose = () => {
    onClose();
    router.push('/journal');
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-3 py-5 backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} className="glass-panel relative max-h-[95vh] w-full max-w-5xl overflow-auto p-4 md:p-6">
          <button type="button" onClick={handleClose} className="absolute right-4 top-4 rounded-full border border-white/10 bg-[#0b0b0d]/90 p-2 text-zinc-300 transition hover:border-[#22C55E]/40 hover:text-white">
            <X size={16} />
          </button>
          <div className="mb-4 flex items-center gap-2 text-[#22C55E]">
            <Plus size={18} />
            <p className="text-sm font-medium">Create trade journal</p>
          </div>
          <TradeJournalForm onSuccess={handleClose} compact />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
