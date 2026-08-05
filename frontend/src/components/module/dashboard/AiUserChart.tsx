"use client";

import React, { useState } from "react";
import { Filter, ChevronDown, Triangle } from "lucide-react";
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

interface AiUserChartProps {
  initialCount?: number;
  growthPercentage?: number;
}
const stat = {
    id: "downloads",
    title: "Downloads",
    value: "678",
    change: "32%",
    isPositive: true,
  };

export default function AiUserChart({
  initialCount = 1268,
  growthPercentage = 32,
}: AiUserChartProps) {
  const [timeFilter, setTimeFilter] = useState("last 7 days");

  // SVG Gauge Calculations
  const cx = 130;
  const cy = 130;
  const radius = 84;
  const innerRadius = 70;

  // Arc angles in degrees (140° bottom-left to 400° bottom-right = 260° arc)
  const startAngle = 140;
  const endAngle = 400;
  const totalSweep = endAngle - startAngle; // 260 deg

  // Progress percentage (e.g. 78% filled)
  const progressPct = 0.78;
  const currentAngle = startAngle + totalSweep * progressPct; // ~342.8°

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    r: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    r: number,
    startDeg: number,
    endDeg: number
  ) => {
    const start = polarToCartesian(x, y, r, startDeg);
    const end = polarToCartesian(x, y, r, endDeg);
    const largeArcFlag = endDeg - startDeg <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      r,
      r,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
    ].join(" ");
  };

  // Paths
  const backgroundTrackPath = describeArc(cx, cy, radius, startAngle, endAngle);
  const activeTrackPath = describeArc(cx, cy, radius, startAngle, currentAngle);
  const innerDottedPath = describeArc(cx, cy, innerRadius, startAngle + 5, endAngle - 5);

  // Endpoint for indicator dot
  const dotPos = polarToCartesian(cx, cy, radius, currentAngle);

  return (
    <div className="w-full h-full bg-white border border-[#EAE5DD] shadow-xs rounded-[24px] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-[#1A1A1A] font-display tracking-tight">
            AI User
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A] font-display">
              {initialCount.toLocaleString()}
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

      {/* Radial Gauge Visual */}
      <div className="relative w-full flex items-center justify-center my-2 sm:my-3">
        <svg
          viewBox="0 0 260 220"
          className="w-52 h-44 sm:w-60 sm:h-52 max-w-full drop-shadow-xs"
        >
          <defs>
            {/* Smooth Terracotta Gradient */}
            <linearGradient id="aiGaugeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C15C2B" />
              <stop offset="50%" stopColor="#D97A48" />
              <stop offset="100%" stopColor="#E2A17E" />
            </linearGradient>
          </defs>

          {/* Background Arc Track */}
          <path
            d={backgroundTrackPath}
            fill="none"
            stroke="#F7F1EB"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* Inner Dotted Guide Line */}
          <path
            d={innerDottedPath}
            fill="none"
            stroke="#D9CBBF"
            strokeWidth="1.5"
            strokeDasharray="2, 5"
            strokeLinecap="round"
          />

          {/* Active Filled Arc Track */}
          <path
            d={activeTrackPath}
            fill="none"
            stroke="url(#aiGaugeGradient)"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* White Dot Indicator at Endpoint */}
          <circle
            cx={dotPos.x}
            cy={dotPos.y}
            r="3.5"
            fill="#FFFFFF"
          />

          {/* Centered Content inside Gauge */}
          <text
            x={cx}
            y={cy - 10}
            textAnchor="middle"
            className="text-xs font-semibold fill-[#525252] font-sans"
          >
            Total AI User
          </text>
          <text
            x={cx}
            y={cy + 22}
            textAnchor="middle"
            className="text-3xl font-extrabold fill-[#C15C2B] font-display"
          >
            {initialCount.toLocaleString()}
          </text>
        </svg>
      </div>
    </div>
  );
}