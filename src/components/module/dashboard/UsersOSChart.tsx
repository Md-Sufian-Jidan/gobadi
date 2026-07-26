"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";

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
  { date: "07", value: 280 },
  { date: "08", value: 380 },
  { date: "09", value: 320 },
  { date: "10", value: 290 },
  { date: "11", value: 360 },
  { date: "12", value: 340 },
  { date: "13", value: 270 },
];

const iosData: OSDataPoint[] = [
  { date: "01", value: 180 },
  { date: "02", value: 220 },
  { date: "03", value: 200 },
  { date: "04", value: 150 },
  { date: "05", value: 190 },
  { date: "06", value: 280 },
  { date: "07", value: 240 },
  { date: "08", value: 310 },
  { date: "09", value: 270 },
  { date: "10", value: 230 },
  { date: "11", value: 300 },
  { date: "12", value: 280 },
  { date: "13", value: 220 },
];

export const UsersOSChart: React.FC = () => {
  const [selectedOS, setSelectedOS] = useState<"android" | "ios">("android");
  const [timeFilter, setTimeFilter] = useState("last month");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeData = selectedOS === "android" ? androidData : iosData;

  const maxY = 500;
  const height = 180;
  const width = 450;
  const paddingX = 40;
  const paddingY = 20;

  const getCoords = (index: number, val: number) => {
    const x = paddingX + (index / (activeData.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - (val / maxY) * (height - 2 * paddingY);
    return { x, y };
  };

  const coords = activeData.map((d, i) => getCoords(i, d.value));

  // Build SVG path
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

  const highlightIdx = 7; // Index of '08'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="bg-white border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top row: Title and Filter */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold text-sm sm:text-base text-[#1A1A1A] font-display">
          User's OS
        </h3>

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
              {["last 7 days", "last month", "this year"].map((opt) => (
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

      {/* Segmented Switcher for Android vs iOS */}
      <div className="mt-3 bg-[#F4EFEA] p-1 rounded-2xl flex items-center gap-1 border border-[#EBE6DD]">
        <button
          onClick={() => setSelectedOS("android")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
            selectedOS === "android"
              ? "bg-white text-[#1A1A1A] shadow-xs"
              : "text-[#737373] hover:text-[#1A1A1A]"
          }`}
        >
          Android
        </button>
        <button
          onClick={() => setSelectedOS("ios")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
            selectedOS === "ios"
              ? "bg-white text-[#1A1A1A] shadow-xs"
              : "text-[#737373] hover:text-[#1A1A1A]"
          }`}
        >
          iOS
        </button>
      </div>

      {/* SVG Line Chart */}
      <div className="mt-3 relative w-full overflow-x-auto min-w-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[280px] h-40 sm:h-44 overflow-visible"
        >
          {/* Grid lines */}
          {[0, 100, 200, 300, 400, 500].map((val) => {
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

          {/* Vertical Highlight Band on Day 08 */}
          {coords[highlightIdx] && (
            <rect
              x={coords[highlightIdx].x - 12}
              y={paddingY}
              width="24"
              height={height - 2 * paddingY}
              fill="#FBE6DA"
              opacity="0.6"
              rx="4"
            />
          )}

          {/* Smooth Solid Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#C1652F"
            strokeWidth="2.5"
          />

          {/* Highlight Dot on Day 08 */}
          {coords[highlightIdx] && (
            <circle
              cx={coords[highlightIdx].x}
              cy={coords[highlightIdx].y}
              r="4.5"
              fill="#C1652F"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          )}

          {/* X Axis Labels */}
          {coords.map((pt, i) => {
            const isHighlight = i === highlightIdx;
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                {/* Date Label Pill or text */}
                {isHighlight ? (
                  <g>
                    <rect
                      x={pt.x - 10}
                      y={height - 14}
                      width="20"
                      height="16"
                      rx="8"
                      fill="#C1652F"
                    />
                    <text
                      x={pt.x}
                      y={height - 3}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#FFFFFF"
                      fontWeight="bold"
                    >
                      {activeData[i].date}
                    </text>
                  </g>
                ) : (
                  <text
                    x={pt.x}
                    y={height - 3}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#737373"
                    fontWeight="500"
                  >
                    {activeData[i].date}
                  </text>
                )}

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
                      {activeData[i].value}
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
