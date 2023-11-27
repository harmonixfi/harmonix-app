"use client";

import { HOW_IT_WORKS } from "@/constants";
import { motion } from "framer-motion";
import Image from "next/image";

const HowItWorks = () => {
  return (
    <motion.ul
      initial={{ y: 400, opacity: 0 }}
      viewport={{ once: true }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-4 md:gap-6 lg:gap-16"
    >
      {HOW_IT_WORKS.map(({ name, imgUrl }) => (
        <li
          key={name}
          className="bg-secondary rounded-xl px-2 sm:px-8 pt-4 pb-4 sm:pb-16 flex flex-col items-center"
        >
          <div className="relative w-56 h-56 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-4">
            <Image
              src={imgUrl}
              alt={name}
              fill
              className="rounded-full"
              sizes="100%"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="text-lg text-center font-semibold capitalize">{name}</p>
        </li>
      ))}
    </motion.ul>
  );
};

export default HowItWorks;
