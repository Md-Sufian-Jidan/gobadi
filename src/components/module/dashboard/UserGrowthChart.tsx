"use client";

import React, { useState } from "react";
import { Filter, ChevronDown, Triangle } from "lucide-react";
import {
  Area,
  AreaChart,
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

// Data matching the line points in the provided image
const chartData = [
  { day: "Sat", value: 70 },
  { day: "Sun", value: 100 },
  { day: "Mon", value: 250 },
  { day: "Tue", value: 320 },
  { day: "Wed", value: 80 },
  { day: "Thur", value: 140 },
  { day: "Fri", value: 390 },
];

const chartConfig = {
  value: {
    label: "Users",
    color: "#C15C2B",
  },
} satisfies ChartConfig;

export default function UserGrowthChart() {
  const [timeFilter, setTimeFilter] = useState("last 7 days");

  return (
    <div className="w-full h-full rounded-[24px] border border-[#EAE5DD] bg-white p-6 shadow-xs flex flex-col justify-between">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#1A1A1A] font-display">
          User Growth
        </h3>

        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full border border-[#E5E0D8] px-3 py-1.5 text-xs font-semibold text-[#525252] hover:text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors cursor-pointer outline-none">
            <Filter className="h-3.5 w-3.5 text-[#525252]" />
            <span>{timeFilter}</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#525252]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 rounded-xl border border-[#EAE5DD] bg-white py-1 text-xs shadow-lg z-20">
            {["last 7 days", "last 30 days", "this year"].map((option) => (
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
      <div className="mt-4 w-full">
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -24, bottom: 0 }}
          >
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C15C2B" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#C15C2B" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            {/* Faint Grid Lines */}
            <CartesianGrid
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

            {/* Dotted Straight Line Area Chart */}
            <Area
              type="linear"
              dataKey="value"
              stroke="#C15C2B"
              strokeWidth={1.5}
              strokeDasharray="2 2"
              fill="url(#growthGradient)"
              activeDot={{ r: 4, fill: "#C15C2B" }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}