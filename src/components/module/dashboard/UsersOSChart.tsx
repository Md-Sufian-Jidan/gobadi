"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceArea,
  DotProps,
} from "recharts";
import { Filter, ChevronDown } from "lucide-react";
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

interface OSDataPoint {
  date: string;
  value: number;
}

const androidData: OSDataPoint[] = [
  { date: "01", value: 240 },
  { date: "02", value: 290 },
  { date: "03", value: 260 },
  { date: "04", value: 180 },
  { date: "05", value: 220 },
  { date: "06", value: 340 },
  { date: "07", value: 350 },
  { date: "08", value: 330 },
  { date: "09", value: 270 },
  { date: "10", value: 300 },
  { date: "11", value: 360 },
  { date: "12", value: 380 },
  { date: "13", value: 340 },
];

const iosData: OSDataPoint[] = [
  { date: "01", value: 180 },
  { date: "02", value: 220 },
  { date: "03", value: 200 },
  { date: "04", value: 150 },
  { date: "05", value: 190 },
  { date: "06", value: 280 },
  { date: "07", value: 290 },
  { date: "08", value: 260 },
  { date: "09", value: 220 },
  { date: "10", value: 250 },
  { date: "11", value: 310 },
  { date: "12", value: 300 },
  { date: "13", value: 250 },
];

const chartConfig = {
  value: {
    label: "Users",
    color: "#C1652F",
  },
} satisfies ChartConfig;

// Custom X-Axis Tick to highlight '08' in a filled orange capsule
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const isHighlight = payload.value === "08";

  if (isHighlight) {
    return (
      <g transform={`translate(${x - 12}, ${y + 4})`}>
        <rect width="24" height="18" rx="9" fill="#C1652F" />
        <text
          x="12"
          y="12"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="10"
          fontWeight="bold"
        >
          {payload.value}
        </text>
      </g>
    );
  }

  return (
    <text
      x={x}
      y={y + 16}
      textAnchor="middle"
      fill="#A3A3A3"
      fontSize="10"
      fontWeight="500"
    >
      {payload.value}
    </text>
  );
};

// Custom Dot specifically rendered on Day '08'
const CustomDot = (props: DotProps & { payload?: OSDataPoint }) => {
  const { cx, cy, payload } = props;

  if (payload?.date === "08" && cx !== undefined && cy !== undefined) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#C1652F"
        stroke="#FFFFFF"
        strokeWidth={2}
      />
    );
  }

  return null;
};

export default function UsersOSChart() {
  const [selectedOS, setSelectedOS] = useState<"android" | "ios">("android");
  const [timeFilter, setTimeFilter] = useState("last month");

  const activeData = selectedOS === "android" ? androidData : iosData;

  return (
    <div className="w-full h-full bg-white border border-[#EAE5DD] shadow-xs rounded-[24px] p-6 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold text-lg text-[#1A1A1A] font-display tracking-tight">
          User's OS
        </h3>

        {/* Time Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E0D8] text-xs font-semibold text-[#525252] hover:text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors cursor-pointer outline-none shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#525252]" />
            <span>{timeFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#525252]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 bg-white border border-[#EAE5DD] shadow-lg rounded-xl py-1 z-20 text-xs">
            {["last 7 days", "last month", "this year"].map((opt) => (
              <DropdownMenuItem
                key={opt}
                onClick={() => setTimeFilter(opt)}
                className="w-full text-left px-3 py-1.5 hover:bg-[#F7F4EE] text-[#525252] hover:text-[#1A1A1A] cursor-pointer"
              >
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Segmented OS Switcher */}
      <div className="mt-4 bg-[#F5F2EC] p-1 rounded-2xl flex items-center gap-1 border border-[#EAE5DD]">
        <button
          onClick={() => setSelectedOS("android")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${selectedOS === "android"
            ? "bg-white text-[#1A1A1A] shadow-xs"
            : "text-[#8C8881] hover:text-[#1A1A1A]"
            }`}
        >
          Android
        </button>
        <button
          onClick={() => setSelectedOS("ios")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${selectedOS === "ios"
            ? "bg-white text-[#1A1A1A] shadow-xs"
            : "text-[#8C8881] hover:text-[#1A1A1A]"
            }`}
        >
          iOS
        </button>
      </div>

      {/* Line Chart */}
      <div className="w-full h-56 mt-4">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activeData}
              margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#F2EFEA"
                strokeWidth={1}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick />}
                padding={{ left: 10, right: 10 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 500]}
                ticks={[0, 100, 200, 300, 400, 500]}
                tick={{ fill: "#A3A3A3", fontSize: 10, fontWeight: 500 }}
              />

              <ChartTooltip
                cursor={{ stroke: "rgba(0, 0, 0, 0.05)" }}
                content={<ChartTooltipContent hideLabel />}
              />

              {/* Vertical soft orange highlight band for Day 08 */}
              <ReferenceArea
                x1="07"
                x2="08"
                fill="#FBE9DF"
                fillOpacity={0.6}
              />

              {/* Smooth Spline Curve */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#C1652F"
                strokeWidth={2.5}
                dot={<CustomDot />}
                activeDot={{
                  r: 6,
                  fill: "#C1652F",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
