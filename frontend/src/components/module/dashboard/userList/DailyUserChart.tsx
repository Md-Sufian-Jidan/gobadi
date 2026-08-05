"use client";

import { useState } from "react";
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
import Image from "next/image";
import filtericon from "@/assets/filter-icon.svg"
import filterarrowicon from "@/assets/filter-arrow-icon.svg"
import dashboardtringleicon from "@/assets/dashboardtriangle.svg";
import dashboardredtringleicon from "@/assets/dashboardredtraingle.svg";

const stat = {
    id: "downloads",
    title: "Downloads",
    value: "678",
    change: "32%",
    isPositive: true
};

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

export default function DailyUserChart() {
    const [timeFilter, setTimeFilter] = useState("last 7 days");

    return (
        <div className="w-full h-full rounded-[24px] border border-[#EAE5DD] bg-white p-6 shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1A1A1A] font-display">Daily User</h3>

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