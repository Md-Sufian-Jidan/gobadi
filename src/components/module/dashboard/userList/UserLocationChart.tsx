"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LocationData {
    location: string;
    count: number;
}

const farmerData: LocationData[] = [
    { location: "Bagerhat", count: 240 },
    { location: "Bandarban", count: 270 },
    { location: "Barguna", count: 240 },
    { location: "Barishal", count: 300 },
    { location: "Bhola", count: 230 },
    { location: "Brahman...", count: 270 },
    { location: "Chandpur", count: 350 },
    { location: "Chapai...", count: 300 },
    { location: "Chattogr...", count: 400 },
    { location: "Chuadan...", count: 360 },
];

const doctorData: LocationData[] = [
    { location: "Bagerhat", count: 180 },
    { location: "Bandarban", count: 210 },
    { location: "Barguna", count: 190 },
    { location: "Barishal", count: 240 },
    { location: "Bhola", count: 170 },
    { location: "Brahman...", count: 220 },
    { location: "Chandpur", count: 290 },
    { location: "Chapai...", count: 250 },
    { location: "Chattogr...", count: 320 },
    { location: "Chuadan...", count: 280 },
];

const chartConfig = {
    count: {
        label: "Users",
        color: "#C1652F",
    },
} satisfies ChartConfig;

export const UserLocationChart: React.FC = () => {
    const [roleTab, setRoleTab] = useState<"farmer" | "doctor">("farmer");
    const [filter, setFilter] = useState("District");
    const [activeLocation, setActiveLocation] = useState<string>("Chandpur");
    const [page, setPage] = useState(1);

    const activeData = roleTab === "farmer" ? farmerData : doctorData;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-[#EAE5DD] shadow-xs rounded-[24px] p-6 flex flex-col justify-between relative overflow-hidden h-full"
        >
            {/* Header Section */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-bold text-lg text-[#1A1A1A] font-display">
                    User’s Location
                </h3>

                {/* Dropdown Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E0D8] text-xs font-semibold text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors cursor-pointer outline-none shrink-0">
                        <Filter className="w-3.5 h-3.5 text-[#525252]" />
                        <span>{filter}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#525252]" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32 bg-white border border-[#EAE5DD] shadow-lg rounded-xl py-1 z-20 text-xs">
                        {["District", "Upazila", "Division"].map((opt) => (
                            <DropdownMenuItem
                                key={opt}
                                onClick={() => setFilter(opt)}
                                className="w-full text-left px-3 py-1.5 hover:bg-[#F7F4EE] text-[#525252] hover:text-[#1A1A1A] cursor-pointer"
                            >
                                {opt}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Role Switcher Pill Container */}
            <div className="bg-[#F4F1EA] p-1 rounded-2xl flex items-center mb-6">
                <button
                    onClick={() => setRoleTab("farmer")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${roleTab === "farmer"
                        ? "bg-white text-[#1A1A1A] shadow-xs"
                        : "text-[#737373] hover:text-[#1A1A1A]"
                        }`}
                >
                    Farmer
                </button>
                <button
                    onClick={() => setRoleTab("doctor")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${roleTab === "doctor"
                        ? "bg-white text-[#1A1A1A] shadow-xs"
                        : "text-[#737373] hover:text-[#1A1A1A]"
                        }`}
                >
                    Doctor
                </button>
            </div>

            {/* Recharts Chart Canvas using Shadcn UI Container */}
            <div className="relative w-full">
                <ChartContainer config={chartConfig} className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={activeData}
                            margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#C1652F" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#C1652F" stopOpacity={0.0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="0"
                                vertical={false}
                                stroke="#F0ECE6"
                            />

                            <XAxis
                                dataKey="location"
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                                tick={({ x, y, payload }) => {
                                    const isSelected = payload.value === activeLocation;
                                    return (
                                        <g transform={`translate(${x},${y})`}>
                                            {isSelected ? (
                                                <rect
                                                    x={-35}
                                                    y={8}
                                                    width={70}
                                                    height={22}
                                                    rx={11}
                                                    fill="#C1652F"
                                                />
                                            ) : null}
                                            <text
                                                x={0}
                                                y={22}
                                                textAnchor="middle"
                                                fill={isSelected ? "#FFFFFF" : "#A39E93"}
                                                fontSize={10}
                                                fontWeight={isSelected ? "bold" : "normal"}
                                            >
                                                {payload.value}
                                            </text>
                                        </g>
                                    );
                                }}
                            />

                            <YAxis
                                domain={[0, 500]}
                                ticks={[0, 100, 200, 300, 400, 500]}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#A39E93", fontSize: 11 }}
                            />

                            <Tooltip content={<ChartTooltipContent indicator="line" />} />

                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#C1652F"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#colorCount)"
                                activeDot={{
                                    r: 5,
                                    fill: "#C1652F",
                                    stroke: "#FFFFFF",
                                    strokeWidth: 2,
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between mt-8 pt-2">
                <span className="text-xs font-semibold text-[#525252]">
                    Page {page} of 10
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="p-2 rounded-xl text-[#525252] hover:bg-[#F7F4EE] hover:text-[#1A1A1A] disabled:opacity-40 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, 10))}
                        disabled={page === 10}
                        className="p-2 rounded-xl bg-[#F4F1EA] text-[#1A1A1A] hover:bg-[#EAE5DD] disabled:opacity-40 transition-colors cursor-pointer"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};