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
import filtericon from "@/assets/filter-icon.svg"
import filterarrowicon from "@/assets/filter-arrow-icon.svg"
import Image from "next/image";
import dashboardtringleicon from "@/assets/dashboardtriangle.svg";
import dashboardredtringleicon from "@/assets/dashboardredtraingle.svg";

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
const stat = {
  id: "downloads",
  title: "Downloads",
  value: "678",
  change: "32%",
  isPositive: true,
}

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
          <DropdownMenuTrigger className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[10px] border border-[#ECECEC] text-xs font-semibold text-[#525252] hover:text-[#1A1A1A] transition-colors cursor-pointer outline-none">
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
          {stat.value}
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