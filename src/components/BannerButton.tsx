"use client";

import { motion } from "framer-motion";
import RocketLaunch from "./icons/RocketLaunch";

const BannerButton = () => {
  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
    >
      <button className="flex items-center gap-1 bg-cta text-black font-semibold px-6 py-3 rounded-[20px] mx-auto sm:mx-0">
        <RocketLaunch />
        Onyx Vaults
      </button>
    </motion.div>
  );
};

export default BannerButton;
