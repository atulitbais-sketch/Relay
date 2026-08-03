import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
} from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center py-28">

      <div className="flex flex-col items-center">

        {/* Loader */}

        <div className="relative flex h-24 w-24 items-center justify-center">

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border-[3px] border-cyan-500/20 border-t-cyan-400"
          />

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
            }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10"
          >

            <BrainCircuit
              size={28}
              className="text-cyan-400"
            />

          </motion.div>

        </div>

        {/* Badge */}

        <div className="mt-8 flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2">

          <Sparkles
            size={15}
            className="text-cyan-400"
          />

          <span className="text-sm text-cyan-400">

            Relay AI Engine

          </span>

        </div>

        {/* Text */}

        <h2 className="mt-6 text-2xl font-semibold">

          Processing Knowledge

        </h2>

        <p className="mt-3 max-w-sm text-center leading-7 text-slate-400">

          Relay is analyzing enterprise documents,
          extracting semantic memories and preparing
          AI responses.

        </p>

      </div>

    </div>
  );
}