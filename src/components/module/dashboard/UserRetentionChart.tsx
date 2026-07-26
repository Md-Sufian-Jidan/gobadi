"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ArrowUpRight, ChevronDown } from "lucide-react";

interface BarPoint {
  day: string;
  value: number;
  isHighlighted?: boolean;
}

const barData: BarPoint[] = [
  { day: "Mon", value: 200 },
  { day: "Tue", value: 160 },
  { day: "Wed", value: 310 },
  { day: "Thu", value: 280 },
  { day: "Fri", value: 440, isHighlighted: true }, // Highlighted bar on Friday
  { day: "Sat", value: 290 },
  { day: "Sun", value: 360 },
];

export const UserRetentionChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [timeFilter, setTimeFilter] = useState("last 7 days");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const maxY = 500;
  const height = 180;
  const width = 450;
  const paddingX = 30;
  const paddingY = 25;
  const targetValue = 350;

  const barWidth = 32;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="bg-white border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Header section */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-[#1A1A1A] font-display">
            User Retention
          </h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] font-display">
              678
            </span>
            <div className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>32%</span>
            </div>
          </div>
        </div>

        {/* Dropdown Filter */}
        <div className="relative shrink-0">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#E5E0D8] bg-[#F7F4EE] text-xs font-medium text-[#525252] hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-[#C1652F]" />
            <span>{timeFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#737373]" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white border border-[#EAE5DD] shadow-lg rounded-xl py-1 z-20 text-xs">
              {["last 7 days", "last 30 days", "this year"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setTimeFilter(opt);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#F7F4EE] text-[#525252] hover:text-[#1A1A1A] cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG Bar Chart with Horizontal Target Threshold Line */}
      <div className="mt-4 relative w-full overflow-x-auto min-w-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[280px] h-40 sm:h-44 overflow-visible"
        >
          {/* Target Threshold Line (dashed horizontal at 350) */}
          {(() => {
            const targetY =
              height - paddingY - (targetValue / maxY) * (height - 2 * paddingY);
            return (
              <g>
                <line
                  x1={paddingX}
                  y1={targetY}
                  x2={width - paddingX}
                  y2={targetY}
                  stroke="#52392E"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                {/* Badge for 350 users matching mockup image */}
                <rect
                  x={paddingX}
                  y={targetY - 10}
                  width="54"
                  height="18"
                  rx="6"
                  fill="#2A1B14"
                />
                <text
                  x={paddingX + 27}
                  y={targetY + 2}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#FFFFFF"
                  fontWeight="bold"
                >
                  350 users
                </text>
              </g>
            );
          })()}

          {/* Render Bars */}
          {barData.map((d, i) => {
            const x =
              paddingX +
              (i / (barData.length - 1)) * (width - 2 * paddingX - barWidth);
            const barHeight = (d.value / maxY) * (height - 2 * paddingY);
            const y = height - paddingY - barHeight;
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                {/* Rounded Bar */}
                <motion.rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="10"
                  fill={
                    d.isHighlighted
                      ? "#C1652F"
                      : isHovered
                      ? "#E8DCC4"
                      : "#F7EFEA"
                  }
                  className="transition-colors duration-200"
                />

                {/* Day Label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 5}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#737373"
                  fontWeight="500"
                >
                  {d.day}
                </text>

                {/* Hover Tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={x + barWidth / 2 - 24}
                      y={y - 28}
                      width="48"
                      height="20"
                      rx="6"
                      fill="#1A1A1A"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 14}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#FFFFFF"
                      fontWeight="bold"
                    >
                      {d.value}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
};
