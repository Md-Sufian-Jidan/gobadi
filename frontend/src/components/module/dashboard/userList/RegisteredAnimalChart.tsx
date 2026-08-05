"use client";

import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import filtericon from "@/assets/filter-icon.svg"
import filterarrowicon from "@/assets/filter-arrow-icon.svg"
import Image from "next/image";
import dashboardtringleicon from "@/assets/dashboardtriangle.svg";
import dashboardredtringleicon from "@/assets/dashboardredtraingle.svg";

const stat = {
    id: "downloads",
    title: "Downloads",
    value: "678",
    change: "32%",
    isPositive: true
};

// Data points approximated based on the bar heights in the image
const chartData = [
    { day: "M", fullDay: "Mon", count: 170 },
    { day: "T", fullDay: "Tue", count: 300 },
    { day: "W", fullDay: "Wed", count: 95 },
    { day: "T", fullDay: "Thu", count: 360 },
    { day: "F", fullDay: "Fri", count: 260 },
    { day: "S", fullDay: "Sat", count: 290 },
    { day: "S", fullDay: "Sun", count: 260 },
];

const chartConfig = {
    count: {
        label: "Registered Animals",
        color: "#C15C2B", // Warm terracotta / rust orange bar color
    },
} satisfies ChartConfig;

export default function RegisteredAnimalChart() {
    const [timeFilter, setTimeFilter] = useState("last 7 days");

    return (
        <div className="w-full h-full rounded-[24px] border border-[#EAE5DD] bg-white p-6 shadow-xs flex flex-col justify-between">
            {/* Header Section */}
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold leading-tight text-[#1A1A1A] font-display">
                    Registered
                    <br />
                    Animal
                </h3>

                {/* Filter Dropdown */}
                 <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[10px] border border-[#E5E0D8] text-xs font-semibold text-[#525252] hover:text-[#1A1A1A] transition-colors cursor-pointer outline-none">
                        <Image src={filtericon} alt="Filter Icon" className="w-3.5 h-3.5" />
                        <span>{timeFilter}</span>
                        <Image src={filterarrowicon} alt="Filter Icon" className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36 bg-white border border-[#EAE5DD] shadow-lg rounded-[10px] py-1 z-20 text-xs">
                        {["last 7 days", "last 30 days", "this year"].map((opt) => (
                            <DropdownMenuItem
                                key={opt}
                                onClick={() => setTimeFilter(opt)}
                                className="w-full text-left px-3.5 py-1.5 hover:bg-[#F7F4EE] text-[#525252] hover:text-[#1A1A1A] font-medium cursor-pointer rounded-[10px] transition-colors"
                            >
                                {opt}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Metrics Row */}
            <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A] font-display">
                    678
                </span>
                <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#16A34A]">
                    {/* <Triangle className="h-2.5 w-2.5 fill-[#16A34A] stroke-none" />
                    <span>32%</span> */}
                    {
                        stat.isPositive ? (
                            <>
                                <Image src={dashboardtringleicon} alt="Trend Indicator" className={`w-2.5 h-2.5 ${stat.isPositive
                                    ? "fill-[#16A34A] stroke-none"
                                    : "fill-[#DC2626] stroke-none rotate-180"
                                    }`}
                                />
                                <span>{stat.change}</span>
                            </>
                        ) :
                            (
                                <>
                                    <Image src={dashboardredtringleicon} alt="Trend Indicator" className={`w-2.5 h-2.5 ${stat.isPositive
                                        ? "fill-[#16A34A] stroke-none"
                                        : "fill-[#DC2626] stroke-none rotate-180"
                                        }`}
                                    />
                                    <span>{stat.change}</span>
                                </>
                            )
                    }
                </div>
            </div>

            {/* Chart Section */}
            <div className="w-full mt-4">
                <ChartContainer config={chartConfig} className="h-56 w-full">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 0, left: -24, bottom: 0 }}
                        barSize={8}
                    >
                        {/* Very faint horizontal grid lines matching the image */}
                        <CartesianGrid
                            vertical={false}
                            stroke="#F3F3F3"
                            strokeDasharray="0"
                        />

                        <YAxis
                            domain={[0, 400]}
                            ticks={[0, 100, 200, 300, 400]}
                            axisLine={false}
                            tickLine={false}
                            className="text-[11px] font-medium fill-[#A39E93]"
                        />

                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={12}
                            className="text-[12px] font-medium fill-[#A39E93]"
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        {/* Thin rounded bars in terracotta color */}
                        <Bar
                            dataKey="count"
                            fill="var(--color-count)"
                            radius={[10, 10, 10, 10]}
                        />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
}