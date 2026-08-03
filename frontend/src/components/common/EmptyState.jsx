import { motion } from "framer-motion";
import {
  Inbox,
  Sparkles,
} from "lucide-react";

export default function EmptyState({
  title,
  description,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#10192F] px-10 py-16 text-center"
    >
      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-cyan-500/10">

          <Inbox
            size={42}
            className="text-cyan-400"
          />

        </div>

        <div className="mt-8 flex justify-center">

          <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">

            <Sparkles size={15} />

            Relay AI

          </div>

        </div>

        <h2 className="mt-8 text-3xl font-bold">

          {title}

        </h2>

        <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-400">

          {description}

        </p>

      </div>

    </motion.div>
  );
}