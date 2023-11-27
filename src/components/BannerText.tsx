"use client";

import { motion } from "framer-motion";

const BannerText = () => {
  return (
    <motion.div
      initial={{ y: 400, opacity: 0 }}
      viewport={{ once: true }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold capitalize">
        Automatic hedging vaults while earning good yields with low risk
      </h1>
      <p className="mt-6 mb-12 capitalize">
        Long only eth and stable coins vaults that beat market performance and
        reduce 50% drawdown during volatility period
      </p>
    </motion.div>
  );
};

export default BannerText;
