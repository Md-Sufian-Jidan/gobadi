"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserListOverviewStats from "@/components/module/dashboard/userList/UserListOverviewStats";
import DailyUserChart from "@/components/module/dashboard/userList/DailyUserChart";
import RegisteredAnimalChart from "@/components/module/dashboard/userList/RegisteredAnimalChart";
import UserLocationChart from "@/components/module/dashboard/userList/UserLocationChart";
import TaskFeatureChart from "@/components/module/dashboard/userList/TaskFeatureChart";

export default function UserListPage() {
    const [globalFilter, setGlobalFilter] = useState("last 7 days");

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#FCFCFC] border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[28px] p-4 sm:p-7 flex flex-col gap-5 sm:gap-6"
        >
            {/* Top Header of Overview */}
            <div className="flex items-center justify-between border-b border-[#F5F2EC] pb-3.5 sm:pb-4">
                <h1 className="text-lg sm:text-xl font-extrabold text-[#1A1A1A] font-display tracking-tight">
                    Total User Info
                </h1>

                {/* Time Filter Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-[#E5E0D8] text-xs font-semibold text-[#525252] hover:text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors cursor-pointer outline-none">
                        <Filter className="w-3.5 h-3.5 text-[#525252]" />
                        <span>{globalFilter}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#525252]" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36 bg-white border border-[#EAE5DD] shadow-lg rounded-xl py-1 z-20 text-xs">
                        {["last 7 days", "last 30 days", "this year"].map((opt) => (
                            <DropdownMenuItem
                                key={opt}
                                onClick={() => setGlobalFilter(opt)}
                                className="w-full text-left px-3.5 py-1.5 hover:bg-[#F7F4EE] text-[#525252] hover:text-[#1A1A1A] font-medium cursor-pointer"
                            >
                                {opt}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Overview 4 Stat Cards */}
            <UserListOverviewStats />

            {/* Middle Row: User Location, Daily User & Registered Animal Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
                <div className="lg:col-span-6 flex flex-col">
                    <UserLocationChart />
                </div>
                <div className="lg:col-span-3 flex flex-col">
                    <DailyUserChart />
                </div>
                <div className="lg:col-span-3 flex flex-col">
                    <RegisteredAnimalChart />
                </div>
            </div>

            {/* Bottom Row: Task Feature User Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
                <div className="lg:col-span-5 flex flex-col">
                    <TaskFeatureChart />
                </div>
            </div>
        </motion.div>
    );
}