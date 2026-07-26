"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  User,
  Wheat,
  Stethoscope,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface StatItem {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

const stats: StatItem[] = [
  {
    id: "downloads",
    title: "Downloads",
    value: "678",
    change: "32%",
    isPositive: true,
    icon: Smartphone,
  },
  {
    id: "total_user",
    title: "Total User",
    value: "788",
    change: "32%",
    isPositive: true,
    icon: User,
  },
  {
    id: "farmers",
    title: "Farmers",
    value: "678",
    change: "32%",
    isPositive: true,
    icon: Wheat,
  },
  {
    id: "doctors",
    title: "Doctors",
    value: "678",
    change: "48%",
    isPositive: false,
    icon: Stethoscope,
  },
];

export const OverviewStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            whileHover={{ y: -3 }}
            className="bg-white border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group transition-all duration-200"
          >
            {/* Top row: Title and Icon */}
            <div className="flex items-start justify-between">
              <span className="text-[#525252] font-semibold text-xs sm:text-sm tracking-tight">
                {stat.title}
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FBE6DA] text-[#C1652F] flex items-center justify-center border border-[#F2D7C7] group-hover:scale-110 transition-transform duration-200 shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Bottom row: Large value & Trend Badge */}
            <div className="mt-3 sm:mt-4 flex items-baseline gap-2.5 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight font-display">
                {stat.value}
              </span>

              <div
                className={`inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.isPositive
                    ? "text-[#16A34A] bg-[#DCFCE7]"
                    : "text-[#DC2626] bg-[#FEE2E2]"
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
