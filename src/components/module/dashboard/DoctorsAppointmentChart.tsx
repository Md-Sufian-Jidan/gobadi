"use client";

import React, { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
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

const appointmentData = [
  { day: "Mon", bar1: 170, bar2: 200 },
  { day: "Tue", bar1: 240, bar2: 300 },
  { day: "Wed", bar1: 320, bar2: 410 },
  { day: "Thu", bar1: 360, bar2: 470, isHighlighted: true },
  { day: "Fri", bar1: 180, bar2: 210 },
  { day: "Sat", bar1: 140, bar2: 150 },
  { day: "Sun", bar1: 310, bar2: 410 },
];

const chartConfig = {
  bar1: {
    label: "Normal",
    color: "#EACFBF",
  },
  bar2: {
    label: "Urgent",
    color: "#C15C2B",
  },
} satisfies ChartConfig;

// Custom XAxis Tick to render the bold 'Thu' and terracotta dot indicator underneath
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const isThu = payload.value === "Thu";

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fill={isThu ? "#1A1A1A" : "#A3A3A3"}
        fontSize={12}
        fontWeight={isThu ? 700 : 500}
      >
        {payload.value}
      </text>
      {isThu && (
        <circle
          cx={0}
          cy={28}
          r={4}
          fill="#C15C2B"
        />
      )}
    </g>
  );
};

export default function DoctorsAppointmentChart() {
  const [selectedOS, setSelectedOS] = useState<"android" | "ios">("android");
  const [timeFilter, setTimeFilter] = useState("last 7 days");

  return (
    <div className="w-full h-full bg-white border border-[#EAE5DD] shadow-xs rounded-[24px] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="font-bold text-base sm:text-lg text-[#1A1A1A] font-display tracking-tight">
          Doctor's Appointment
        </h3>

        {/* Time Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E0D8] text-xs font-semibold text-[#525252] hover:text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors cursor-pointer outline-none shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#525252]" />
            <span>{timeFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#525252]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-32 bg-white border border-[#EAE5DD] shadow-lg rounded-xl py-1 z-20 text-xs"
          >
            {["last 7 days", "last 30 days", "this year"].map((opt) => (
              <DropdownMenuItem
                key={opt}
                onClick={() => setTimeFilter(opt)}
                className="w-full text-left px-3 py-1.5 hover:bg-[#F7F4EE] text-[#525252] hover:text-[#1A1A1A] cursor-pointer font-medium"
              >
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* OS Filter Toggle Tabs (Android / iOS) */}
      <div className="w-full bg-[#F1EFF0] p-1 rounded-2xl flex items-center gap-1 mb-4">
        <button
          type="button"
          onClick={() => setSelectedOS("android")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
            selectedOS === "android"
              ? "bg-white text-[#1A1A1A] shadow-xs"
              : "text-[#8C8881] hover:text-[#1A1A1A]"
          }`}
        >
          Android
        </button>
        <button
          type="button"
          onClick={() => setSelectedOS("ios")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
            selectedOS === "ios"
              ? "bg-white text-[#1A1A1A] shadow-xs"
              : "text-[#8C8881] hover:text-[#1A1A1A]"
          }`}
        >
          iOS
        </button>
      </div>

      {/* Chart Section */}
      <div className="w-full h-56 relative">
        {/* Background highlight column overlay for Thursday (Thu is index 3) */}
        <div
          className="absolute pointer-events-none rounded-2xl bg-[#FDF5F0] border border-[#F5E6DC]/60 z-0"
          style={{
            top: "0px",
            bottom: "30px",
            left: "48%",
            width: "14%",
          }}
        />

        <ChartContainer config={chartConfig} className="w-full h-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={appointmentData}
              margin={{ top: 10, right: 10, left: -22, bottom: 10 }}
              barGap={4}
              barCategoryGap="16%"
            >
              <CartesianGrid stroke="#F3F0EC" vertical={false} />
              <YAxis
                domain={[0, 500]}
                ticks={[0, 100, 200, 300, 400, 500]}
                axisLine={false}
                tickLine={false}
                className="text-[11px] font-medium fill-[#A39E93]"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick />}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              {/* Bar 1 (Light Peach) */}
              <Bar
                dataKey="bar1"
                fill="#EACFBF"
                radius={[6, 6, 6, 6]}
              />

              {/* Bar 2 (Terracotta) */}
              <Bar
                dataKey="bar2"
                fill="#C15C2B"
                radius={[6, 6, 6, 6]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}