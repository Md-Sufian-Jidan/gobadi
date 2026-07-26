"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ArrowUpRight, ChevronDown } from "lucide-react";

interface Point {
  day: string;
  value: number;
}

const data: Point[] = [
  { day: "Sat", value: 70 },
  { day: "Sun", value: 100 },
  { day: "Mon", value: 230 },
  { day: "Tue", value: 320 },
  { day: "Wed", value: 80 },
  { day: "Thur", value: 140 },
  { day: "Fri", value: 390 },
];

export const UserGrowthChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [timeFilter, setTimeFilter] = useState("last 7 days");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const maxY = 400;
  const height = 180;
  const width = 450;
  const paddingX = 40;
  const paddingY = 20;

  // Calculate coordinates
  const getCoords = (index: number, val: number) => {
    const x = paddingX + (index / (data.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - (val / maxY) * (height - 2 * paddingY);
    return { x, y };
  };

  const coords = data.map((d, i) => getCoords(i, d.value));

  // Build SVG smooth bezier path string
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];
    const cp1x = curr.x + (next.x - curr.x) / 2;
    const cp1y = curr.y;
    const cp2x = curr.x + (next.x - curr.x) / 2;
    const cp2y = next.y;
    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="bg-white border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Header section */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-[#1A1A1A] font-display">
            User Growth
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

      {/* SVG Chart Canvas */}
      <div className="mt-4 relative w-full overflow-x-auto min-w-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[280px] h-40 sm:h-44 overflow-visible"
        >
          <defs>
            <linearGradient id="userGrowthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C1652F" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C1652F" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[0, 100, 200, 300, 400].map((val) => {
            const y = height - paddingY - (val / maxY) * (height - 2 * paddingY);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#F0ECE6"
                  strokeWidth="1"
                />
                <text
                  x={10}
                  y={y + 3}
                  fontSize="10"
                  fill="#A39E93"
                  fontFamily="sans-serif"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#userGrowthGrad)" />

          {/* Line Curve with Dotted Style matching screenshot */}
          <path
            d={pathD}
            fill="none"
            stroke="#C1652F"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />

          {/* Interactive points & hover circles */}
          {coords.map((pt, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 3.5}
                  fill={isHovered ? "#C1652F" : "#FFFFFF"}
                  stroke="#C1652F"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
                {/* X Axis Label */}
                <text
                  x={pt.x}
                  y={height - 2}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#737373"
                  fontWeight="500"
                >
                  {data[i].day}
                </text>

                {/* Hover Tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={pt.x - 24}
                      y={pt.y - 30}
                      width="48"
                      height="20"
                      rx="6"
                      fill="#1A1A1A"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 16}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#FFFFFF"
                      fontWeight="bold"
                    >
                      {data[i].value}
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
