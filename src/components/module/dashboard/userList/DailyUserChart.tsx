"use client";

import React, { useState } from "react";
import { Filter, ChevronDown, Triangle } from "lucide-react";
import {
    Bar,
    BarChart,
    Cell,
    ReferenceLine,
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

// Sample dataset based on the image bar heights
const chartData = [
    { day: "Mon", users: 200 },
    { day: "Tue", users: 160 },
    { day: "Wed", users: 440 },
    { day: "Thu", users: 230 },
    { day: "Fri", users: 580, highlighted: true },
    { day: "Sat", users: 370 },
    { day: "Sun", users: 510 },
];

const chartConfig = {
    users: {
        label: "Users",
        color: "#C15C2B", // Main active bar color
    },
} satisfies ChartConfig;

export function DailyUserChart() {
    const [timeFilter, setTimeFilter] = useState("last 7 days");

    return (
        <div className="w-full h-full rounded-[24px] border border-[#EAE5DD] bg-white p-6 shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1A1A1A] font-display">Daily User</h3>

                {/* Filter Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full border border-[#E5E0D8] px-3 py-1.5 text-xs font-semibold text-[#525252] hover:text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors cursor-pointer outline-none">
                        <Filter className="h-3.5 w-3.5 text-[#525252]" />
                        <span>{timeFilter}</span>
                        <ChevronDown className="h-3.5 w-3.5 text-[#525252]" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32 rounded-xl border border-[#EAE5DD] bg-white py-1 text-xs shadow-lg z-20">
                        {["last 7 days", "last month", "this year"].map((option) => (
                            <DropdownMenuItem
                                key={option}
                                onClick={() => setTimeFilter(option)}
                                className="w-full px-3 py-1.5 text-left text-[#525252] hover:bg-[#F7F4EE] hover:text-[#1A1A1A] cursor-pointer"
                            >
                                {option}
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
                    <Triangle className="h-2.5 w-2.5 fill-[#16A34A] stroke-none" />
                    <span>32%</span>
                </div>
            </div>

            {/* Chart Section */}
            <div className="w-full mt-4">
                <ChartContainer config={chartConfig} className="h-56 w-full">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                        barCategoryGap="20%"
                    >
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            className="text-xs font-medium fill-[#A39E93]"
                        />
                        <YAxis hide domain={[0, 650]} />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        {/* Dashed Reference Line with custom Label Pill */}
                        <ReferenceLine
                            y={350}
                            stroke="#8C7063"
                            strokeDasharray="3 3"
                            strokeWidth={1.5}
                            label={({ viewBox }) => {
                                const { x, y } = viewBox;
                                return (
                                    <g transform={`translate(${x + 4}, ${y - 12})`}>
                                        <rect
                                            width={68}
                                            height={22}
                                            rx={6}
                                            fill="#3B2319"
                                        />
                                        <text
                                            x={34}
                                            y={14}
                                            textAnchor="middle"
                                            fill="#FFFFFF"
                                            fontSize={10}
                                            fontWeight={600}
                                        >
                                            350 users
                                        </text>
                                    </g>
                                );
                            }}
                        />

                        {/* Rounded Bars */}
                        <Bar dataKey="users" radius={[12, 12, 12, 12]}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.highlighted ? "#C15C2B" : "#F7EFEA"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
}