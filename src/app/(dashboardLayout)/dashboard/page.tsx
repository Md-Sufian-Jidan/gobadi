"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";
import { OverviewStats } from "@/components/module/dashboard/OverviewStats";
import { UserGrowthChart } from "@/components/module/dashboard/UserGrowthChart";
import { UsersOSChart } from "@/components/module/dashboard/UsersOSChart";
import { UserRetentionChart } from "@/components/module/dashboard/UserRetentionChart";

export default function DashboardPage() {
    const [globalFilter, setGlobalFilter] = useState("last 7 days");
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[28px] p-4 sm:p-7 flex flex-col gap-4 sm:gap-6"
        >
            {/* Top Header of Overview */}
            <div className="flex items-center justify-between border-b border-[#F5F2EC] pb-3.5 sm:pb-4">
                <h1 className="text-lg sm:text-2xl font-extrabold text-[#1A1A1A] font-display tracking-tight">
                    Overview
                </h1>

                {/* Overview Time Filter Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-[#E5E0D8] bg-[#F7F4EE] text-xs font-semibold text-[#525252] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                        <Filter className="w-3.5 h-3.5 text-[#C1652F]" />
                        <span>{globalFilter}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#737373]" />
                    </button>

                    {filterOpen && (
                        <div className="absolute right-0 mt-1.5 w-36 bg-white border border-[#EAE5DD] shadow-lg rounded-xl py-1.5 z-20 text-xs">
                            {["last 7 days", "last 30 days", "this year"].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        setGlobalFilter(opt);
                                        setFilterOpen(false);
                                    }}
                                    className="w-full text-left px-3.5 py-1.5 hover:bg-[#F7F4EE] text-[#525252] hover:text-[#1A1A1A] font-medium cursor-pointer"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Overview 4 Stat Cards */}
            <OverviewStats />

            {/* 3 Interactive Chart Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                <UserGrowthChart />
                <UsersOSChart />
                <UserRetentionChart />
            </div>
        </motion.div>
    );
}