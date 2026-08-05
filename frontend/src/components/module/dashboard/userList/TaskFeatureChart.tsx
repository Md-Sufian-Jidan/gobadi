"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
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

const taskData = [
  { month: "JAN", value: 120 },
  { month: "FEB", value: 170 },
  { month: "MAR", value: 230 },
  { month: "APR", value: 210 },
  { month: "MAY", value: 260, isHighlighted: true },
  { month: "JUN", value: 430 },
  { month: "AUG", value: 330 },
  { month: "SEP", value: 280 },
  { month: "OCT", value: 210 },
  { month: "NOV", value: 240 },
  { month: "DEC", value: 300 },
];

const chartConfig = {
  value: {
    label: "Users",
    color: "#C15C2B",
  },
} satisfies ChartConfig;

// Custom X-Axis Tick for bolding 'MAY'
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const isMay = payload.value === "MAY";

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fill={isMay ? "#1A1A1A" : "#A3A3A3"}
        fontSize={11}
        fontWeight={isMay ? 800 : 500}
      >
        {payload.value}
      </text>
    </g>
  );
};

// Custom Dot to render the highlighted ring at 'MAY'
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (payload.month === "MAY") {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={7}
          fill="#C15C2B"
        />
        <circle
          cx={cx}
          cy={cy}
          r={3.5}
          fill="#FFFFFF"
        />
      </g>
    );
  }
  return null;
};

export default function TaskFeatureChart() {
  const [timeFilter, setTimeFilter] = useState("last 7 days");

  return (
    <div className="w-full h-full bg-white border border-[#EAE5DD] shadow-xs rounded-[24px] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-[#1A1A1A] font-display tracking-tight">
            Task Feature User
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A] font-display">
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
        </div>

        {/* Time Filter Dropdown */}
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

      {/* Chart Section */}
      <div className="w-full h-48 sm:h-52 relative mt-2">
        {/* Background highlight column overlay for MAY */}
        <div
          className="absolute pointer-events-none rounded-2xl bg-gradient-to-b from-[#FDF4EE] via-[#FDF4EE]/80 to-transparent z-0"
          style={{
            top: "0px",
            bottom: "24px",
            left: "37%",
            width: "12%",
          }}
        />

        <ChartContainer config={chartConfig} className="w-full h-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={taskData}
              margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C15C2B" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#C15C2B" stopOpacity={0.01} />
                </linearGradient>
              </defs>

              <YAxis hide domain={[0, 480]} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick />}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#C15C2B"
                strokeWidth={2.5}
                fill="url(#taskGradient)"
                dot={<CustomDot />}
                activeDot={{ r: 5, fill: "#C15C2B" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}