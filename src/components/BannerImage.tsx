"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BannerImage = () => {
  return (
    <motion.div
      viewport={{ once: true }}
      whileInView={{
        y: [1, 20, 20, 1, 1],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
      }}
      className="w-full h-full"
    >
      <Image
        src="/images/nft_card.png"
        alt="NFT Card"
        width="0"
        height="0"
        sizes="100%"
        priority
        className="w-full h-auto lg:w-auto lg:h-full"
      />
    </motion.div>
  );
};

export default BannerImage;
