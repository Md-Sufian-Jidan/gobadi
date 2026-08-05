"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { Filter, ChevronDown, Triangle } from "lucide-react";
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

interface BarPoint {
  day: string;
  value: number;
  isHighlighted?: boolean;
}

const barData: BarPoint[] = [
  { day: "Mon", value: 200 },
  { day: "Tue", value: 160 },
  { day: "Wed", value: 310 },
  { day: "Thu", value: 210 },
  { day: "Fri", value: 440, isHighlighted: true },
  { day: "Sat", value: 290 },
  { day: "Sun", value: 360 },
];

const chartConfig = {
  value: {
    label: "Users",
    color: "#C1652F",
  },
} satisfies ChartConfig;

// Custom Label Component for the Reference Line Badge
const CustomReferenceLabel = (props: any) => {
  const { viewBox } = props;
  const { y } = viewBox;

  return (
    <g transform={`translate(10, ${y - 10})`}>
      <rect
        width="56"
        height="20"
        rx="6"
        fill="#2A1B14"
      />
      <text
        x="28"
        y="13"
        fill="#FFFFFF"
        fontSize="9"
        fontWeight="600"
        textAnchor="middle"
      >
        350 users
      </text>
    </g>
  );
};

const stat = {
    id: "downloads",
    title: "Downloads",
    value: "678",
    change: "32%",
    isPositive: true, 
  };

export default function UserRetentionChart() {
  const [timeFilter, setTimeFilter] = useState("last 7 days");

  return (
    <div className="w-full h-full bg-white border border-[#EAE5DD] shadow-xs rounded-[24px] p-6 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Header section */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div>
          <h3 className="font-bold text-lg text-[#1A1A1A] font-display tracking-tight">
            User Retention
          </h3>
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
        </div>

        {/* Time Filter Dropdown */}
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

      {/* Recharts Bar Chart */}
      <div className="w-full h-56 mt-2">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
              barCategoryGap="18%"
            >
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#A3A3A3", fontSize: 11, fontWeight: 500 }}
                dy={10}
              />
              <YAxis hide domain={[0, 500]} />

              <ChartTooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
                content={<ChartTooltipContent hideLabel />}
              />

              {/* Dotted Target Line (350 users) */}
              <ReferenceLine
                y={350}
                stroke="#52392E"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={<CustomReferenceLabel />}
              />

              {/* Bars with rounded caps */}
              <Bar
                dataKey="value"
                radius={[12, 12, 12, 12]}
              >
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isHighlighted ? "#C1652F" : "#FDF5F0"}
                    className="transition-colors duration-200 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
